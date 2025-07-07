import { NodeData, BlockData } from "../../../types";
import { FlowNode, FlowEdge } from "../types";

export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export function surveyToFlow(rootNode: NodeData): FlowData {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];
  
  console.log("surveyToFlow called with rootNode:", rootNode);
  
  // Ensure root node has a UUID
  if (!rootNode.uuid) {
    console.error("Root node missing UUID, generating one");
    rootNode.uuid = `root_${Date.now()}`;
  }
  
  // Layout configuration for hierarchical structure - removed large section container
  const layout = {
    startPosition: { x: 100, y: 100 },
    pageSpacing: { x: 50, y: 50 },
    blockSpacing: { x: 20, y: 20 },
    pageSize: { width: 350, height: 250 },
    blockSize: { width: 140, height: 80 }
  };
  
  // Skip creating section node since there's only one section
  
  // Process pages - they can be in both items array AND nodes array
  const pagesFromItems = rootNode.items?.filter(item => item.type === "set") || [];
  const pagesFromNodes = rootNode.nodes?.filter(node => 
    typeof node !== 'string' && node.type === "set"
  ) || [];
  
  // Combine both sources of pages
  const pagesToProcess = [...pagesFromItems, ...pagesFromNodes];
  
  console.log("Pages from items:", pagesFromItems.length);
  console.log("Pages from nodes:", pagesFromNodes.length);
  console.log("Total pages to process:", pagesToProcess.length);

  if (pagesToProcess.length > 0) {
    console.log("Processing pages:", pagesToProcess);
    
    // Better page layout algorithm - calculate optimal grid layout
    const optimalPagesPerRow = Math.min(pagesToProcess.length, 3); // Max 3 pages per row for better visibility
    
    pagesToProcess.forEach((childNode, index) => {
      // Handle both string UUIDs and actual NodeData objects
      let actualChildNode: NodeData;
      
      if (typeof childNode === 'string') {
        console.log("Found string node UUID:", childNode);
        actualChildNode = {
          uuid: childNode,
          type: "set",
          name: `Page ${index + 1}`,
          items: [],
          nodes: []
        };
      } else {
        actualChildNode = childNode as NodeData;
      }
      
      // Ensure child node has UUID
      if (!actualChildNode.uuid) {
        console.error("Child node missing UUID, generating one");
        actualChildNode.uuid = `page_${Date.now()}_${index}`;
      }
      
      // Calculate dynamic page size first to position correctly
      const blockCount = actualChildNode.items?.filter(item => item.type !== "set").length || 0;
      const blocksPerRow = Math.min(
        Math.floor(layout.pageSize.width / (layout.blockSize.width + layout.blockSpacing.x)), 
        Math.max(1, Math.ceil(Math.sqrt(blockCount)))
      );
      const blockRows = Math.max(1, Math.ceil(blockCount / blocksPerRow));
      
      // Dynamic page size
      const dynamicPageSize = {
        width: Math.max(layout.pageSize.width, blocksPerRow * (layout.blockSize.width + layout.blockSpacing.x) + layout.blockSpacing.x),
        height: Math.max(layout.pageSize.height, 60 + blockRows * (layout.blockSize.height + layout.blockSpacing.y) + layout.blockSpacing.y)
      };
      
      // Position pages using dynamic sizing to prevent overlap
      const row = Math.floor(index / optimalPagesPerRow);
      const col = index % optimalPagesPerRow;
      const pageX = layout.startPosition.x + col * (dynamicPageSize.width + layout.pageSpacing.x);
      const pageY = layout.startPosition.y + row * (dynamicPageSize.height + layout.pageSpacing.y);
      
      console.log(`Adding page node ${index} at (${pageX}, ${pageY}):`, actualChildNode);
      
      // Add page node with dynamic container size
      nodes.push({
        id: actualChildNode.uuid,
        type: "set",
        position: { x: pageX, y: pageY },
        data: { ...actualChildNode, containerSize: dynamicPageSize }
      });
      
      // Skip adding edges from root to pages since we removed the section node
      
      // Process blocks within this page in a smart grid layout
      if (actualChildNode.items && actualChildNode.items.length > 0) {
        console.log(`Processing ${actualChildNode.items.length} blocks in page:`, actualChildNode.name);
        
        // Dynamic block layout based on page size and number of blocks
        const availableWidth = layout.pageSize.width - (layout.blockSpacing.x * 2);
        const blocksPerRow = Math.min(
          Math.floor(availableWidth / (layout.blockSize.width + layout.blockSpacing.x)), 
          Math.max(1, Math.ceil(Math.sqrt(actualChildNode.items.length)))
        );
        
        actualChildNode.items.forEach((item, blockIndex) => {
          // Skip non-block items (like other sets)
          if (item.type === "set") {
            console.log("Skipping nested set in page items");
            return;
          }
          
          // This is a block item
          const block = item as BlockData;
          const blockId = `${actualChildNode.uuid}-block-${blockIndex}`;
          
          // Position blocks in an optimal grid layout within the page
          const blockRow = Math.floor(blockIndex / blocksPerRow);
          const blockCol = blockIndex % blocksPerRow;
          const blockX = pageX + layout.blockSpacing.x + blockCol * (layout.blockSize.width + layout.blockSpacing.x);
          const blockY = pageY + 45 + layout.blockSpacing.y + blockRow * (layout.blockSize.height + layout.blockSpacing.y); // 45px for page header
          
          console.log(`Adding block node ${blockIndex} at (${blockX}, ${blockY}):`, block);
          
          // Add block node
          nodes.push({
            id: blockId,
            type: "block",
            position: { x: blockX, y: blockY },
            data: { ...block, containerSize: layout.blockSize }
          });
          
          // Add edge from page to block
          edges.push({
            id: `${actualChildNode.uuid}-${blockId}`,
            source: actualChildNode.uuid,
            target: blockId,
            type: "default"
          });
          
          // Add navigation rule edges
          if (block.navigationRules && block.navigationRules.length > 0) {
            block.navigationRules.forEach((rule, ruleIndex) => {
              if (rule.target && rule.target !== "submit") {
                // Try to find target in current page blocks first
                let targetNodeId = null;
                
                // Look for target in current page
                const targetInCurrentPage = actualChildNode.items?.findIndex(item => 
                  item.fieldName === rule.target || 
                  item.label === rule.target ||
                  (item as any).uuid === rule.target
                );
                
                if (targetInCurrentPage !== undefined && targetInCurrentPage >= 0) {
                  targetNodeId = `${actualChildNode.uuid}-block-${targetInCurrentPage}`;
                } else {
                  // Look for target in other pages
                  targetNodeId = findNodeIdByTarget(nodes, rule.target);
                }
                
                if (targetNodeId) {
                  edges.push({
                    id: `${blockId}-nav-${ruleIndex}`,
                    source: blockId,
                    target: targetNodeId,
                    type: "conditional",
                    animated: true,
                    data: {
                      condition: rule.condition,
                      label: rule.condition ? `If ${rule.condition}` : "Default",
                      isDefault: rule.isDefault || false
                    }
                  });
                }
              } else if (rule.target === "submit") {
                // Add a virtual submit node if it doesn't exist
                const submitNodeId = "submit-node";
                if (!nodes.find(n => n.id === submitNodeId)) {
                  nodes.push({
                    id: submitNodeId,
                    type: "submit",
                    position: { x: pageX + 200, y: pageY + 300 },
                    data: { 
                      name: "Submit", 
                      type: "submit",
                      containerSize: { width: 100, height: 60 }
                    }
                  });
                }
                
                edges.push({
                  id: `${blockId}-submit-${ruleIndex}`,
                  source: blockId,
                  target: submitNodeId,
                  type: "conditional",
                  animated: true,
                  data: {
                    condition: rule.condition,
                    label: rule.condition ? `If ${rule.condition} → Submit` : "Submit",
                    isDefault: rule.isDefault || false
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    console.log("No child nodes found in root node");
  }
  
  return { nodes, edges };
}

export function flowToSurvey(flowData: FlowData): NodeData | null {
  const { nodes, edges } = flowData;
  
  // Since we removed the section node, create a root structure from pages
  if (nodes.length === 0) return null;
  
  // Build the survey structure with a virtual root
  const result: NodeData = {
    uuid: `root_${Date.now()}`,
    type: "section",
    name: "Survey",
    nodes: [],
    items: []
  };
  
  // Find all page nodes connected to root
  const pageNodes = nodes.filter(n => n.type === "set");
  
  pageNodes.forEach(pageNode => {
    const pageData = pageNode.data as NodeData;
    const page: NodeData = {
      ...pageData,
      items: [],
      nodes: []
    };
    
    // Find all blocks connected to this page
    const pageBlocks = nodes.filter(n => 
      n.type === "block" && 
      edges.some(e => e.source === pageNode.id && e.target === n.id)
    );
    
    pageBlocks.forEach(blockNode => {
      const blockData = blockNode.data as BlockData;
      
      // Rebuild navigation rules from edges
      const navigationRules = edges
        .filter(e => e.source === blockNode.id && e.type === "conditional")
        .map(e => ({
          condition: e.data?.condition || "",
          target: findTargetByNodeId(nodes, e.target),
          isPage: true,
          isDefault: !e.data?.condition
        }));
      
      page.items!.push({
        ...blockData,
        navigationRules
      });
    });
    
    result.nodes!.push(page);
  });
  
  return result;
}

function findNodeIdByTarget(nodes: FlowNode[], target: string): string | null {
  // This is a simplified version - in a real implementation,
  // you'd need to map survey targets to node IDs
  const targetNode = nodes.find(n => {
    if (n.type === "set") {
      const nodeData = n.data as NodeData;
      return nodeData.name === target || nodeData.uuid === target;
    }
    return false;
  });
  
  return targetNode ? targetNode.id : null;
}

function findTargetByNodeId(nodes: FlowNode[], nodeId: string): string {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return "";
  
  if (node.type === "set") {
    const nodeData = node.data as NodeData;
    return nodeData.name || nodeData.uuid;
  }
  
  return "";
}

export function autoLayoutNodes(nodes: FlowNode[], edges: FlowEdge[]): FlowNode[] {
  // Simple auto-layout algorithm
  const layoutNodes = [...nodes];
  
  // Find root nodes (nodes with no incoming edges)
  const rootNodes = layoutNodes.filter(node => 
    !edges.some(edge => edge.target === node.id)
  );
  
  // Perform breadth-first layout
  const visited = new Set<string>();
  const queue = rootNodes.map((node, index) => ({
    node,
    level: 0,
    index
  }));
  
  while (queue.length > 0) {
    const { node, level, index } = queue.shift()!;
    
    if (visited.has(node.id)) continue;
    visited.add(node.id);
    
    // Position node
    node.position = {
      x: index * 300 + 100,
      y: level * 200 + 100
    };
    
    // Add children to queue
    const childEdges = edges.filter(edge => edge.source === node.id);
    childEdges.forEach((edge, childIndex) => {
      const childNode = layoutNodes.find(n => n.id === edge.target);
      if (childNode && !visited.has(childNode.id)) {
        queue.push({
          node: childNode,
          level: level + 1,
          index: childIndex
        });
      }
    });
  }
  
  return layoutNodes;
}