#!/bin/bash

# Next.js TSX Line of Code Counter
# Counts lines of code in .tsx files while excluding common non-source directories

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_colored() {
    local color=$1
    local text=$2
    echo -e "${color}${text}${NC}"
}

# Function to count lines in a single file (excluding empty lines and comments)
count_lines_in_file() {
    local file=$1
    
    # Count total lines
    local total_lines=$(wc -l < "$file")
    
    # Count non-empty lines (excluding whitespace-only lines)
    local non_empty_lines=$(grep -c -v '^[[:space:]]*$' "$file")
    
    # Count comment-only lines (basic detection for // and /* */ comments)
    local comment_lines=$(grep -c '^[[:space:]]*\/\/' "$file")
    local block_comment_lines=$(grep -c '^[[:space:]]*\/\*\|^[[:space:]]*\*' "$file")
    
    # Calculate effective lines (non-empty minus comment-only lines)
    local effective_lines=$((non_empty_lines - comment_lines - block_comment_lines))
    
    # Ensure we don't go negative
    if [ $effective_lines -lt 0 ]; then
        effective_lines=0
    fi
    
    echo "$total_lines $non_empty_lines $effective_lines"
}

# Check if directory argument is provided, otherwise use current directory
PROJECT_DIR=${1:-.}

# Check if the directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    print_colored $RED "Error: Directory '$PROJECT_DIR' does not exist."
    exit 1
fi

print_colored $BLUE "📊 Counting lines of code in Next.js TSX files..."
print_colored $YELLOW "Directory: $PROJECT_DIR"
echo

# Find all .tsx files, excluding common directories
tsx_files=$(find "$PROJECT_DIR" -name "*.tsx" \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.git/*" \
    -not -path "*/coverage/*" \
    -type f)

# Check if any .tsx files were found
if [ -z "$tsx_files" ]; then
    print_colored $RED "No .tsx files found in the specified directory."
    exit 1
fi

# Initialize counters
total_files=0
total_lines=0
total_non_empty_lines=0
total_effective_lines=0

# Create arrays to store file information for detailed output
declare -a file_names
declare -a file_total_lines
declare -a file_non_empty_lines
declare -a file_effective_lines

# Process each file
while IFS= read -r file; do
    if [ -n "$file" ]; then
        total_files=$((total_files + 1))
        
        # Get line counts for this file
        line_counts=$(count_lines_in_file "$file")
        file_total=$(echo $line_counts | cut -d' ' -f1)
        file_non_empty=$(echo $line_counts | cut -d' ' -f2)
        file_effective=$(echo $line_counts | cut -d' ' -f3)
        
        # Add to totals
        total_lines=$((total_lines + file_total))
        total_non_empty_lines=$((total_non_empty_lines + file_non_empty))
        total_effective_lines=$((total_effective_lines + file_effective))
        
        # Store for detailed output
        file_names+=("$file")
        file_total_lines+=("$file_total")
        file_non_empty_lines+=("$file_non_empty")
        file_effective_lines+=("$file_effective")
    fi
done <<< "$tsx_files"

# Display detailed results if requested
if [ "$2" = "--detailed" ] || [ "$2" = "-d" ]; then
    print_colored $BLUE "📋 Detailed File Breakdown:"
    echo "─────────────────────────────────────────────────────────────────"
    printf "%-60s %8s %8s %8s\n" "File" "Total" "Non-Empty" "Effective"
    echo "─────────────────────────────────────────────────────────────────"
    
    for i in "${!file_names[@]}"; do
        # Truncate long file paths for display
        display_file="${file_names[$i]}"
        if [ ${#display_file} -gt 55 ]; then
            display_file="...${display_file: -52}"
        fi
        
        printf "%-60s %8s %8s %8s\n" \
            "$display_file" \
            "${file_total_lines[$i]}" \
            "${file_non_empty_lines[$i]}" \
            "${file_effective_lines[$i]}"
    done
    echo "─────────────────────────────────────────────────────────────────"
    echo
fi

# Display summary
print_colored $GREEN "📊 Summary Statistics:"
echo "─────────────────────────────────────────"
printf "%-25s %10s\n" "TSX Files Found:" "$total_files"
printf "%-25s %10s\n" "Total Lines:" "$total_lines"
printf "%-25s %10s\n" "Non-Empty Lines:" "$total_non_empty_lines"
printf "%-25s %10s\n" "Effective Lines:" "$total_effective_lines"
echo "─────────────────────────────────────────"

# Calculate averages
if [ $total_files -gt 0 ]; then
    avg_lines_per_file=$((total_lines / total_files))
    avg_effective_per_file=$((total_effective_lines / total_files))
    
    echo
    print_colored $YELLOW "📈 Averages:"
    printf "%-25s %10s\n" "Avg Lines per File:" "$avg_lines_per_file"
    printf "%-25s %10s\n" "Avg Effective per File:" "$avg_effective_per_file"
fi

echo
print_colored $BLUE "ℹ️  Note:"
echo "  • Total Lines: All lines including empty lines"
echo "  • Non-Empty Lines: Lines with content (excluding whitespace-only)"
echo "  • Effective Lines: Non-empty lines minus basic comment detection"
echo "  • Use --detailed or -d flag for per-file breakdown"

echo
print_colored $GREEN "✅ Analysis complete!"