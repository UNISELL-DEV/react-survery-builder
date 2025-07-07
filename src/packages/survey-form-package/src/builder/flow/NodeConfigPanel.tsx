import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { useSurveyBuilder } from "../../context/SurveyBuilderContext";
import { NodeData, BlockData } from "../../types";
import { X, Settings } from "lucide-react";
import { NavigationRulesEditor } from "../common/NavigationRulesEditor";
import { CommonBlockRules } from "../common/CommonBlockRules";

interface NodeConfigPanelProps {
  nodeId: string;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
}

export const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  nodeId,
  onClose,
  onUpdate
}) => {
  const { state } = useSurveyBuilder();
  
  // Find the node data - improved to handle flow node IDs
  const findNodeData = (node: NodeData | null, id: string): { data: NodeData | BlockData, path: string } | null => {
    if (!node) return null;
    
    // Direct node match
    if (node.uuid === id) return { data: node, path: id };
    
    // Check for block IDs in format: pageUuid-block-index
    const blockMatch = id.match(/^(.+)-block-(\d+)$/);
    if (blockMatch) {
      const [, pageUuid, blockIndexStr] = blockMatch;
      const blockIndex = parseInt(blockIndexStr, 10);
      
      // Find the page with matching UUID
      const findPageWithBlock = (searchNode: NodeData): { data: BlockData, path: string } | null => {
        if (searchNode.uuid === pageUuid && searchNode.items && searchNode.items[blockIndex]) {
          return { data: searchNode.items[blockIndex], path: `${pageUuid}.items[${blockIndex}]` };
        }
        
        // Search in items (for nested pages)
        if (searchNode.items) {
          for (const item of searchNode.items) {
            if (item.type === 'set' && typeof item !== 'string') {
              const found = findPageWithBlock(item as NodeData);
              if (found) return found;
            }
          }
        }
        
        // Search in child nodes
        if (searchNode.nodes) {
          for (const childNode of searchNode.nodes) {
            if (typeof childNode !== 'string') {
              const found = findPageWithBlock(childNode);
              if (found) return found;
            }
          }
        }
        
        return null;
      };
      
      const blockResult = findPageWithBlock(node);
      if (blockResult) return blockResult;
    }
    
    // Check in items (blocks) - fallback
    if (node.items) {
      for (let i = 0; i < node.items.length; i++) {
        const item = node.items[i];
        if ((item as any).uuid === id || (item as any).fieldName === id) {
          return { data: item, path: `${node.uuid}.items[${i}]` };
        }
      }
    }
    
    // Check in child nodes
    if (node.nodes) {
      for (const childNode of node.nodes) {
        if (typeof childNode !== 'string') {
          const found = findNodeData(childNode, id);
          if (found) return found;
        }
      }
    }
    
    return null;
  };

  const nodeResult = findNodeData(state.rootNode, nodeId);
  const nodeData = nodeResult?.data;
  const nodePath = nodeResult?.path;

  if (!nodeData) {
    console.log("Node not found for ID:", nodeId);
    console.log("Available root node:", state.rootNode);
    return (
      <div className="node-config-panel w-80 bg-white border-l border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Node Configuration</h3>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600">Node not found</p>
        <p className="text-xs text-gray-500 mt-2">ID: {nodeId}</p>
        <p className="text-xs text-gray-500">Path: {nodePath || "Not found"}</p>
      </div>
    );
  }

  const isBlockData = (data: any): data is BlockData => {
    return data && typeof data === 'object' && 'fieldName' in data;
  };

  const isNodeData = (data: any): data is NodeData => {
    return data && typeof data === 'object' && 'uuid' in data;
  };

  const handleUpdateField = (field: string, value: any) => {
    const updatedData = { ...nodeData, [field]: value };
    onUpdate(nodeId, updatedData);
  };

  const handleBlockUpdate = (updatedData: BlockData) => {
    onUpdate(nodeId, updatedData);
  };

  const renderBlockConfig = (blockData: BlockData) => {
    const definition = state.definitions.blocks[blockData.type];
    
    return (
      <div className="space-y-4">
        {/* Common Block Rules */}
        <CommonBlockRules 
          data={blockData} 
          onUpdate={handleBlockUpdate} 
        />

        <Separator />

        {/* Block-specific configuration using renderFormFields */}
        {definition && definition.renderFormFields && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Block Configuration</Label>
            {definition.renderFormFields({
              data: blockData,
              onUpdate: handleBlockUpdate,
              onRemove: () => {}
            })}
          </div>
        )}

        <Separator />

        {/* Navigation Rules */}
        <NavigationRulesEditor
          data={blockData}
          onUpdate={handleBlockUpdate}
        />
      </div>
    );
  };

  const renderNodeConfig = (nodeData: NodeData) => {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="node-name">Name</Label>
          <Input
            id="node-name"
            value={nodeData.name || ''}
            onChange={(e) => handleUpdateField('name', e.target.value)}
            placeholder="Enter node name"
          />
        </div>

        <div>
          <Label htmlFor="node-type">Type</Label>
          <Input
            id="node-type"
            value={nodeData.type}
            disabled
            className="bg-gray-50"
          />
        </div>

        {nodeData.type === 'section' && (
          <div>
            <Label htmlFor="navigation-logic">Navigation Logic</Label>
            <Textarea
              id="navigation-logic"
              value={nodeData.navigationLogic || ''}
              onChange={(e) => handleUpdateField('navigationLogic', e.target.value)}
              placeholder="Enter navigation logic"
              rows={4}
            />
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm font-medium mb-2">Structure</div>
          <div className="text-xs text-gray-600 space-y-1">
            {nodeData.items && (
              <div>Blocks: {nodeData.items.length}</div>
            )}
            {nodeData.nodes && (
              <div>Child Nodes: {nodeData.nodes.length}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="node-config-panel w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-lg">Configuration</h3>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {isBlockData(nodeData) ? `Block: ${nodeData.type}` : `Node: ${nodeData.type}`}
        </p>
        <p className="text-xs text-gray-500">ID: {nodeId}</p>
        {nodePath && <p className="text-xs text-gray-500">Path: {nodePath}</p>}
      </div>

      <ScrollArea className="flex-1 p-4">
        {isBlockData(nodeData) ? renderBlockConfig(nodeData) : renderNodeConfig(nodeData)}
      </ScrollArea>
    </div>
  );
};