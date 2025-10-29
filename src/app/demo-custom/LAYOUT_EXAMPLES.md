# Layout Examples

This folder contains three different approaches to creating custom survey layouts, demonstrating the flexibility of the system.

## 📁 Example Files

### 1. `RefillsLayout.tsx` - Healthcare/Professional Design 🏥
**Best for:** Professional applications, healthcare, clean corporate look
**Complexity:** Low (~110 lines)
**Flexibility:** Medium

A production-ready layout matching modern healthcare UX patterns:
- Dark teal header with back button and help icon
- Single progress bar in header
- Cream/beige background for reduced eye strain
- Centered content with clean typography
- Full-width primary action button
- Professional footer with contact and legal links

```typescript
// Professional design with helpers
<CurrentBlock />
<NavigationButtons renderNextButton={...} />
```

**Pros:**
- ✅ Professional, polished look
- ✅ Healthcare/medical industry appropriate
- ✅ Excellent readability
- ✅ Uses helper components for easy maintenance
- ✅ Production-ready design

**Cons:**
- ⚠️ Specific color scheme (easily customizable)

**When to use:**
- Healthcare/medical applications
- Professional surveys
- Corporate environments
- Need polished, trustworthy appearance
- Building patient-facing forms

**Based on:** Refills.com design pattern

---

### 2. `CustomSimpleLayout.tsx` - Using Helper Components ⚡
**Best for:** Quick development, standard layouts
**Complexity:** Low (~40 lines)
**Flexibility:** Medium

Uses helper components for everything:
- `<ProgressIndicator />` with custom render function
- `<CurrentBlock />` for automatic block rendering
- `<NavigationButtons />` with custom button rendering

```typescript
// Super simple!
<ProgressIndicator render={...} />
<CurrentBlock autoFocus />
<NavigationButtons renderNextButton={...} />
```

**Pros:**
- ✅ Fastest development time
- ✅ Automatic state management
- ✅ Automatic analytics tracking
- ✅ Less code to maintain
- ✅ Still highly customizable with render props

**Cons:**
- ⚠️ Slightly less control over internal behavior

**When to use:**
- Building MVPs or prototypes
- Standard layout requirements
- When development speed matters
- When you want minimal code

---

### 3. `HybridLayout.tsx` - Mix of Helpers and Custom 🎨
**Best for:** Unique designs with some standard components
**Complexity:** Medium (~160 lines)
**Flexibility:** High

Combines custom code with helpers:
- Custom multi-segment progress bar (your design)
- `<CurrentBlock />` helper (saves time)
- `<NavigationButtons />` with custom rendering
- Custom header, footer, and side panels

```typescript
// Mix and match!
<MyCustomProgressBar />  {/* Your design */}
<CurrentBlock />          {/* Use helper */}
<NavigationButtons renderNextButton={...} /> {/* Customize */}
```

**Pros:**
- ✅ Maximum flexibility
- ✅ Use helpers where convenient
- ✅ Custom components where needed
- ✅ Automatic analytics tracking
- ✅ Best of both worlds

**Cons:**
- ⚠️ Requires understanding both approaches
- ⚠️ Slightly more code than full helpers

**When to use:**
- Unique brand experiences
- Custom progress designs needed
- Want to balance speed with control
- Have specific design requirements

---

### 4. `FullyCustomLayout.tsx` - Complete Control 🚀
**Best for:** Totally unique experiences, maximum creative freedom
**Complexity:** High (~220 lines)
**Flexibility:** Maximum

Everything built from scratch using `useSurveyForm()`:
- Custom animated progress bar with shimmer effect
- Custom gradient navigation buttons
- Custom step indicators
- Custom hover effects and transitions
- Custom form submission logic

```typescript
// Full control!
const {
  currentPage, values, setValue,
  goToNextBlock, submit, isValid
} = useSurveyForm();

// Build whatever you want!
```

**Pros:**
- ✅ Total creative freedom
- ✅ Complete control over behavior
- ✅ Unique brand experiences
- ✅ Custom animations and effects
- ✅ Automatic analytics still included

**Cons:**
- ⚠️ More code to write and maintain
- ⚠️ Longer development time
- ⚠️ Need to handle form submission logic
- ⚠️ Manual state management

**When to use:**
- Building something truly unique
- Specific UX requirements
- Need custom animations/transitions
- Have time for detailed implementation

---

## 🎯 Quick Comparison

| Feature | Refills | Helper Components | Hybrid | Fully Custom |
|---------|---------|------------------|--------|--------------|
| **Lines of Code** | ~110 | ~40 | ~160 | ~220 |
| **Dev Time** | ⚡ Fast | ⚡ Fastest | 🔥 Medium | 🐢 Slower |
| **Flexibility** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Customization** | Medium | High | Very High | Maximum |
| **Maintenance** | Easy | Easy | Medium | More work |
| **Analytics** | ✅ Auto | ✅ Auto | ✅ Auto | ✅ Auto |
| **Best For** | Professional | MVP, Standard | Unique + Quick | Total Control |
| **Industry** | Healthcare | Any | Any | Any |

## 🚀 Getting Started

### Using an Example

```typescript
import { RefillsLayout } from './RefillsLayout';
// or
import { CustomSimpleLayout } from './CustomSimpleLayout';
// or
import { HybridLayout } from './HybridLayout';
// or
import { FullyCustomLayout } from './FullyCustomLayout';

<SurveyForm
  survey={surveyData}
  layout={RefillsLayout}  // Choose your approach
  onSubmit={handleSubmit}
/>
```

### Creating Your Own

1. **Start with helpers** (CustomSimpleLayout.tsx) - Fastest way to get started
2. **Add custom elements** as needed (HybridLayout.tsx approach)
3. **Go fully custom** only if you need total control (FullyCustomLayout.tsx)

## 📚 Documentation

For complete documentation, see:
- `CUSTOM_LAYOUTS_GUIDE.md` - Comprehensive guide
- `CUSTOM_BLOCKS_GUIDE.md` - Custom blocks documentation
- Package README - Overview and features

## 💡 Pro Tips

### Tip 1: Start Simple
Begin with helper components and only add custom code where needed. Don't over-engineer!

### Tip 2: Use Custom Render Props
Helper components support custom render functions, giving you flexibility without losing automatic behavior:

```typescript
<ProgressIndicator
  render={({ progress }) => <YourCustomProgressBar value={progress} />}
/>
```

### Tip 3: Mix and Match
You don't have to use all helpers or no helpers. Pick what works:

```typescript
<YourCustomHeader />
<CurrentBlock />  {/* Use helper here */}
<YourCustomFooter />
```

### Tip 4: Analytics Are Free
All approaches automatically include analytics tracking. Configure once in `<SurveyForm>`:

```typescript
<SurveyForm
  layout={YourLayout}
  analytics={{ googleAnalytics: { measurementId: "G-XXX" } }}
/>
```

### Tip 5: Inspect the Default
Check out `RenderPageSurveyLayout.tsx` (the default layout) for inspiration and best practices.

## 🎨 Style Guide

### Colors
All examples use Tailwind CSS. Adjust to match your brand:

```typescript
// From purple/pink gradient
className="bg-gradient-to-r from-purple-500 to-pink-500"

// To your brand colors
className="bg-gradient-to-r from-blue-600 to-cyan-500"
```

### Animations
Examples include various animations:
- Progress bar transitions
- Button hover effects
- Shimmer effects
- Scale transforms

Feel free to customize or remove based on your needs!

## 🤝 Contributing

Found a useful pattern? Create a new example layout and submit a PR!

## ❓ Questions?

- Check `CUSTOM_LAYOUTS_GUIDE.md` for detailed documentation
- Review the survey form package README
- Look at the default layout implementation
