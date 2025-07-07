import React from "react";
import { FlowNode } from "./types";
import { NodeData, BlockData } from "../../types";
import { useSurveyBuilder } from "../../context/SurveyBuilderContext";
import { Button } from "../../components/ui/button";
import { X, Settings, Copy } from "lucide-react";

interface FlowNodeComponentProps {
  node: FlowNode;
  selected: boolean;
  onSelect: (nodeId: string) => void;
  onDragStart: (e: React.MouseEvent, nodeId: string) => void;
  onDelete: (nodeId: string) => void;
  onConfigure?: (nodeId: string) => void;
  zoom: number;
  isDragOver?: boolean;
  isConnecting?: boolean;
  connectionSourceId?: string;
}

export const FlowNodeComponent: React.FC<FlowNodeComponentProps> = ({
  node,
  selected,
  onSelect,
  onDragStart,
  onDelete,
  onConfigure,
  zoom,
  isDragOver = false,
  isConnecting = false,
  connectionSourceId
}) => {
  const { state } = useSurveyBuilder();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect(node.id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDragStart(e, node.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(node.id);
  };

  const renderNodeContent = () => {
    if (node.type === "section") {
      const nodeData = node.data as NodeData & { containerSize?: { width: number; height: number } };
      return (
        <div className="flow-node-section h-full">
          <div className="flex items-center gap-2 p-3 bg-blue-50 border-b border-blue-200">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="font-semibold text-sm text-blue-900">Survey Section</span>
          </div>
          <div className="p-3">
            <div className="text-sm font-medium text-gray-800">
              {nodeData.name || "Untitled Section"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {nodeData.nodes?.length || 0} pages, {nodeData.items?.length || 0} direct items
            </div>
          </div>
        </div>
      );
    }

    if (node.type === "submit") {
      const nodeData = node.data as { name: string; type: string };
      return (
        <div className="flow-node-submit h-full">
          <div className="flex items-center gap-2 p-2 bg-red-50 border-b border-red-200">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-medium text-xs text-red-900">Submit</span>
          </div>
          <div className="p-2">
            <div className="text-xs font-medium text-gray-800 text-center">
              {nodeData.name || "Submit Form"}
            </div>
          </div>
        </div>
      );
    }

    if (node.type === "set") {
      const nodeData = node.data as NodeData & { containerSize?: { width: number; height: number } };
      return (
        <div className="flow-node-set h-full">
          <div className="flex items-center gap-2 p-2 bg-green-50 border-b border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium text-xs text-green-900">Page</span>
          </div>
          <div className="p-2">
            <div className="text-xs font-medium text-gray-800 truncate">
              {nodeData.name || "Untitled Page"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {nodeData.items?.length || 0} blocks
            </div>
          </div>
        </div>
      );
    }

    if (node.type === "block") {
      const blockData = node.data as BlockData & { containerSize?: { width: number; height: number } };
      const definition = state.definitions.blocks[blockData.type];
      
      return (
        <div className="flow-node-block h-full">
          <div className="flex items-center gap-1 p-1 bg-purple-50 border-b border-purple-200">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="font-medium text-xs text-purple-900 truncate">
              {definition?.name || blockData.type}
            </span>
          </div>
          <div className="p-1">
            <div className="text-xs font-medium text-gray-800 truncate">
              {blockData.label || blockData.fieldName || 'Untitled'}
            </div>
            {blockData.required && (
              <div className="text-xs text-red-500 mt-0.5">Required</div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  // Get container size from node data
  const nodeData = node.data as any;
  const containerSize = nodeData?.containerSize;
  
  // Define base styles for different node types
  const getNodeStyles = () => {
    const baseStyle = {
      left: node.position.x,
      top: node.position.y,
      transform: `scale(${Math.max(0.7, Math.min(1, zoom))})`,
      transformOrigin: "top left"
    };

    if (node.type === "section") {
      return {
        ...baseStyle,
        width: containerSize?.width || 2000,
        height: containerSize?.height || 1200,
        minWidth: 1800,
        minHeight: 1000
      };
    }
    
    if (node.type === "set") {
      return {
        ...baseStyle,
        width: containerSize?.width || 300,
        height: containerSize?.height || 200,
        minWidth: 280,
        minHeight: 180
      };
    }
    
    if (node.type === "block") {
      return {
        ...baseStyle,
        width: containerSize?.width || 120,
        height: containerSize?.height || 60,
        minWidth: 110,
        minHeight: 50
      };
    }

    if (node.type === "submit") {
      return {
        ...baseStyle,
        width: containerSize?.width || 100,
        height: containerSize?.height || 60,
        minWidth: 80,
        minHeight: 50
      };
    }
    
    return {
      ...baseStyle,
      minWidth: 200,
      maxWidth: 300
    };
  };

  const getNodeClasses = () => {
    const cursorClass = isConnecting ? "cursor-crosshair" : "cursor-move"; // Change cursor in connection mode
    const baseClasses = `flow-node absolute ${cursorClass} transition-none`; // Remove transitions for smoother movement
    const selectedClasses = selected ? "border-blue-500 shadow-xl ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300";
    const dragOverClasses = isDragOver ? "ring-4 ring-green-300 border-green-400 bg-green-50/50" : "";
    
    // Connection state styling
    const isConnectionSource = connectionSourceId === node.id;
    const canBeTarget = isConnecting && connectionSourceId !== node.id && 
                       (node.type === "block" || node.type === "set" || node.type === "submit");
    const connectionClasses = isConnectionSource ? "ring-4 ring-orange-300 border-orange-400" : 
                             canBeTarget ? "ring-2 ring-green-300 border-green-400 bg-green-50/30" : "";
    
    if (node.type === "section") {
      return `${baseClasses} bg-blue-25 border-2 border-blue-300 rounded-xl shadow-2xl ${selectedClasses} ${dragOverClasses} ${connectionClasses}`;
    }
    
    if (node.type === "set") {
      return `${baseClasses} bg-white border-2 border-green-200 rounded-lg shadow-lg ${selectedClasses} ${dragOverClasses} ${connectionClasses}`;
    }
    
    if (node.type === "block") {
      return `${baseClasses} bg-white border border-purple-200 rounded-md shadow-sm ${selectedClasses} ${dragOverClasses} ${connectionClasses}`;
    }

    if (node.type === "submit") {
      return `${baseClasses} bg-white border border-red-200 rounded-md shadow-sm ${selectedClasses} ${dragOverClasses} ${connectionClasses}`;
    }
    
    return `${baseClasses} bg-white rounded-lg shadow-lg border-2 ${selectedClasses} ${dragOverClasses} ${connectionClasses}`;
  };

  return (
    <div
      className={getNodeClasses()}
      style={getNodeStyles()}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Connection handles - blocks have output handles, pages have both */}
      {node.type === "block" && (
        <>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full border border-white shadow-sm" title="Input connection"></div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full border border-white shadow-sm" title="Output connection"></div>
        </>
      )}
      
      {node.type === "set" && (
        <>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm" title="Input connection"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm" title="Output connection"></div>
        </>
      )}

      {node.type === "submit" && (
        <>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm" title="Input connection"></div>
        </>
      )}

      {/* Node content */}
      <div className="w-full h-full overflow-hidden">
        {renderNodeContent()}
      </div>

      {/* Node controls */}
      {selected && (
        <div className="absolute -top-3 -right-3 flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-7 h-7 p-0 bg-white shadow-md hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log("Opening config for node:", node.id);
              onConfigure?.(node.id);
            }}
            title="Configure Node"
          >
            <Settings className="w-3.5 h-3.5" />
          </Button>
          {node.type !== "section" && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-7 h-7 p-0 bg-white shadow-md hover:shadow-lg"
              onClick={handleDelete}
              title="Delete Node"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      )}

      {/* Navigation rules indicator */}
      {node.type === "block" && (node.data as BlockData).navigationRules?.length > 0 && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-white"></div>
      )}
    </div>
  );
};