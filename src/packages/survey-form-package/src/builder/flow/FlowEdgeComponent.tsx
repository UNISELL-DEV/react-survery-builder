import React from "react";
import { FlowEdge, FlowNode } from "./types";

interface FlowEdgeComponentProps {
  edge: FlowEdge;
  nodes: FlowNode[];
  zoom: number;
  viewport?: { x: number; y: number; zoom: number };
}

export const FlowEdgeComponent: React.FC<FlowEdgeComponentProps> = ({
  edge,
  nodes,
  zoom,
  viewport
}) => {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  // Get node sizes from their data
  const sourceData = sourceNode.data as any;
  const targetData = targetNode.data as any;
  const sourceSize = sourceData?.containerSize || { width: 120, height: 60 };
  const targetSize = targetData?.containerSize || { width: 120, height: 60 };

  // Calculate connection points more accurately
  const sourceX = sourceNode.position.x + sourceSize.width / 2; // Center of source node
  const sourceY = sourceNode.position.y + sourceSize.height;    // Bottom of source node
  const targetX = targetNode.position.x + targetSize.width / 2; // Center of target node
  const targetY = targetNode.position.y;                        // Top of target node

  // Create smooth curve path with better control points
  const deltaY = Math.abs(targetY - sourceY);
  const controlPointOffset = Math.max(30, deltaY * 0.3); // Minimum 30px curve
  
  let path: string;
  if (targetY > sourceY) {
    // Target is below source - normal downward curve
    path = `M ${sourceX} ${sourceY} 
            C ${sourceX} ${sourceY + controlPointOffset} ${targetX} ${targetY - controlPointOffset} ${targetX} ${targetY}`;
  } else {
    // Target is above source - upward curve
    path = `M ${sourceX} ${sourceY} 
            C ${sourceX} ${sourceY - controlPointOffset} ${targetX} ${targetY + controlPointOffset} ${targetX} ${targetY}`;
  }

  const isConditional = edge.type === "conditional";
  const strokeColor = isConditional ? "#f59e0b" : "#6b7280";
  const strokeDasharray = isConditional ? "5,5" : "none";
  const markerEnd = isConditional ? "url(#arrowhead)" : "url(#arrowhead-gray)";

  return (
    <g>
      {/* Edge path */}
      <path
        d={path}
        stroke={strokeColor}
        strokeWidth={2}
        fill="none"
        strokeDasharray={strokeDasharray}
        className={edge.animated ? "animate-pulse" : ""}
        markerEnd={markerEnd}
      />

      {/* Edge label */}
      {edge.data?.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
          textAnchor="middle"
          className="text-xs fill-muted-foreground font-medium"
          style={{
            fontSize: Math.max(10, 12 * zoom)
          }}
        >
          {edge.data.label}
        </text>
      )}

    </g>
  );
};