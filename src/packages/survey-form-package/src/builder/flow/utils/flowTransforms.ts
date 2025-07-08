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

  // Create a sequential flow map to track all blocks in order
  const sequentialBlocks: Array<{
    blockId: string;
    pageIndex: number;
    blockIndex: number;
    hasNavigationRules: boolean;
  }> = [];

  if (pagesToProcess.length > 0) {
    console.log("Processing pages:", pagesToProcess);
    
    // Better page layout algorithm - calculate optimal grid layout
    const optimalPagesPerRow = Math.min(pagesToProcess.length, 3); // Max 3 pages per row for better visibility
    
    pagesToProcess.forEach((childNode, pageIndex) => {
      // Handle both string UUIDs and actual NodeData objects
      let actualChildNode: NodeData;
      
      if (typeof childNode === 'string') {
        console.log("Found string node UUID:", childNode);
        actualChildNode = {
          uuid: childNode,
          type: "set",
          name: `Page ${pageIndex + 1}`,
          items: [],
          nodes: []
        };
      } else {
        actualChildNode = childNode as NodeData;
      }
      
      // Ensure child node has UUID
      if (!actualChildNode.uuid) {
        console.error("Child node missing UUID, generating one");
        actualChildNode.uuid = `page_${Date.now()}_${pageIndex}`;
      }
      
      // Calculate dynamic page size to accommodate all blocks
      const blockCount = actualChildNode.items?.filter(item => item.type !== "set").length || 0;
      const blocksPerRow = Math.min(
        Math.floor(layout.pageSize.width / (layout.blockSize.width + layout.blockSpacing.x)), 
        Math.max(1, Math.ceil(Math.sqrt(blockCount)))
      );
      const blockRows = Math.max(1, Math.ceil(blockCount / blocksPerRow));
      
      // Calculate required space for all blocks with generous padding
      const requiredWidth = Math.max(
        layout.pageSize.width, 
        blocksPerRow * (layout.blockSize.width + layout.blockSpacing.x) + layout.blockSpacing.x * 2 + 40 // Extra padding
      );
      const requiredHeight = Math.max(
        layout.pageSize.height, 
        60 + blockRows * (layout.blockSize.height + layout.blockSpacing.y) + layout.blockSpacing.y * 2 + 40 // Extra padding
      );
      
      // Dynamic page size with generous boundaries
      const dynamicPageSize = {
        width: requiredWidth,
        height: requiredHeight
      };
      
      // Position pages using dynamic sizing to prevent overlap
      const row = Math.floor(pageIndex / optimalPagesPerRow);
      const col = pageIndex % optimalPagesPerRow;
      const pageX = layout.startPosition.x + col * (dynamicPageSize.width + layout.pageSpacing.x);
      const pageY = layout.startPosition.y + row * (dynamicPageSize.height + layout.pageSpacing.y);
      
      console.log(`Adding page node ${pageIndex} at (${pageX}, ${pageY}) with size (${dynamicPageSize.width} x ${dynamicPageSize.height}):`, actualChildNode);
      
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
          
          // Add to sequential tracking
          sequentialBlocks.push({
            blockId,
            pageIndex,
            blockIndex,
            hasNavigationRules: !!(block.navigationRules && block.navigationRules.length > 0)
          });
          
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
          
          // Only connect page to first block of the page
          if (blockIndex === 0) {
            edges.push({
              id: `${actualChildNode.uuid}-${blockId}`,
              source: actualChildNode.uuid,
              target: blockId,
              type: "default",
              style: {
                stroke: '#10b981', // Green color for page entry
                strokeWidth: 1.5
              },
              data: {
                label: "Start",
                isPageEntry: true
              }
            });
          }
        });
      }
    });

    // Now add sequential flow connections and navigation rule connections
    console.log("Sequential blocks order:", sequentialBlocks);
    
    // Add sequential flow edges between all blocks
    for (let i = 0; i < sequentialBlocks.length - 1; i++) {
      const currentBlock = sequentialBlocks[i];
      const nextBlock = sequentialBlocks[i + 1];
      
      // Add sequential flow edge (unless the current block has navigation rules that override)
      const sequentialEdgeId = `${currentBlock.blockId}-sequential-${nextBlock.blockId}`;
      edges.push({
        id: sequentialEdgeId,
        source: currentBlock.blockId,
        target: nextBlock.blockId,
        type: "default",
        style: { 
          stroke: '#94a3b8', // Gray color for sequential flow
          strokeDasharray: currentBlock.hasNavigationRules ? '5,5' : undefined // Dashed if has nav rules
        },
        data: {
          label: currentBlock.hasNavigationRules ? "Default" : "",
          isSequential: true
        }
      });
    }

    // Add final sequential edge to submit for the last block (if no navigation rules)
    if (sequentialBlocks.length > 0) {
      const lastBlock = sequentialBlocks[sequentialBlocks.length - 1];
      
      // Add a virtual submit node if it doesn't exist
      const submitNodeId = "submit-node";
      if (!nodes.find(n => n.id === submitNodeId)) {
        // Position submit node to the right of the last page
        const lastPageNode = nodes.find(n => n.type === "set" && sequentialBlocks.some(b => b.blockId.startsWith(n.id)));
        const submitX = lastPageNode ? lastPageNode.position.x + 400 : 800;
        const submitY = lastPageNode ? lastPageNode.position.y + 100 : 400;
        
        nodes.push({
          id: submitNodeId,
          type: "submit",
          position: { x: submitX, y: submitY },
          data: { 
            name: "Submit", 
            type: "submit",
            containerSize: { width: 100, height: 60 }
          }
        });
      }
      
      // Add sequential edge to submit for last block
      edges.push({
        id: `${lastBlock.blockId}-sequential-submit`,
        source: lastBlock.blockId,
        target: submitNodeId,
        type: "default",
        style: { 
          stroke: '#94a3b8',
          strokeDasharray: lastBlock.hasNavigationRules ? '5,5' : undefined
        },
        data: {
          label: lastBlock.hasNavigationRules ? "Default" : "",
          isSequential: true
        }
      });
    }

    // Now add navigation rule edges (conditional branches)
    pagesToProcess.forEach((childNode, pageIndex) => {
      let actualChildNode: NodeData;
      
      if (typeof childNode === 'string') {
        actualChildNode = {
          uuid: childNode,
          type: "set", 
          name: `Page ${pageIndex + 1}`,
          items: [],
          nodes: []
        };
      } else {
        actualChildNode = childNode as NodeData;
      }

      if (actualChildNode.items && actualChildNode.items.length > 0) {
        actualChildNode.items.forEach((item, blockIndex) => {
          if (item.type === "set") return;
          
          const block = item as BlockData;
          const blockId = `${actualChildNode.uuid}-block-${blockIndex}`;
          
          // Add navigation rule edges (conditional branches)
          if (block.navigationRules && block.navigationRules.length > 0) {
            block.navigationRules.forEach((rule, ruleIndex) => {
              if (rule.target && rule.target !== "submit") {
                let targetNodeId = null;
                
                if (rule.isPage) {
                  // Target is a page - find the page and connect to its first block
                  const targetPage = pagesToProcess.find(page => {
                    const pageNode = typeof page === 'string' ? { uuid: page, name: page } : page;
                    return pageNode.name === rule.target || pageNode.uuid === rule.target;
                  });
                  
                  if (targetPage) {
                    const targetPageNode = typeof targetPage === 'string' ? { uuid: targetPage, items: [] } : targetPage;
                    if (targetPageNode.items && targetPageNode.items.length > 0) {
                      // Connect to first block of target page
                      targetNodeId = `${targetPageNode.uuid}-block-0`;
                    } else {
                      // Connect to page itself if no blocks
                      targetNodeId = targetPageNode.uuid;
                    }
                  }
                } else {
                  // Target is a specific block - search through all blocks
                  const targetBlock = sequentialBlocks.find(seqBlock => {
                    const blockData = nodes.find(n => n.id === seqBlock.blockId)?.data as BlockData;
                    return blockData?.fieldName === rule.target || 
                           blockData?.label === rule.target ||
                           blockData?.uuid === rule.target;
                  });
                  
                  if (targetBlock) {
                    targetNodeId = targetBlock.blockId;
                  }
                }
                
                if (targetNodeId) {
                  edges.push({
                    id: `${blockId}-nav-${ruleIndex}`,
                    source: blockId,
                    target: targetNodeId,
                    type: "conditional",
                    animated: true,
                    style: {
                      stroke: rule.isDefault ? '#f59e0b' : '#3b82f6', // Orange for default, blue for conditional
                      strokeWidth: 2
                    },
                    data: {
                      condition: rule.condition,
                      label: rule.condition || "Default",
                      isDefault: rule.isDefault || false
                    }
                  });
                }
              } else if (rule.target === "submit") {
                const submitNodeId = "submit-node";
                edges.push({
                  id: `${blockId}-submit-${ruleIndex}`,
                  source: blockId,
                  target: submitNodeId,
                  type: "conditional", 
                  animated: true,
                  style: {
                    stroke: rule.isDefault ? '#f59e0b' : '#10b981', // Orange for default, green for submit
                    strokeWidth: 2
                  },
                  data: {
                    condition: rule.condition,
                    label: rule.condition ? rule.condition : "Submit",
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