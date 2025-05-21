"use client";

import React, { useRef, useEffect, useState } from "react";
import { type NodeData } from "@/lib/survey/types";
import { extractGraph, layoutGraph, type GraphNode, type GraphEdge } from "@/lib/survey/utils/graphUtils";

interface SurveyGraphProps {
  rootNode: NodeData | null;
  zoomable?: boolean;
  height?: string;
}

export const SurveyGraph: React.FC<SurveyGraphProps> = ({
  rootNode,
  zoomable = true,
  height = "500px",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [viewBox, setViewBox] = useState("0 0 1000 600");
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Extract and layout the graph whenever rootNode changes
  useEffect(() => {
    if (!rootNode) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: graphNodes, edges: graphEdges } = extractGraph(rootNode);
    const layoutedNodes = layoutGraph(graphNodes, graphEdges);

    setNodes(layoutedNodes);
    setEdges(graphEdges);

    // Reset view
    setPan({ x: 0, y: 0 });
    setZoom(1);

    // Calculate appropriate viewBox
    calculateViewBox(layoutedNodes);
  }, [rootNode]);

  // Calculate the SVG viewBox based on node positions
  const calculateViewBox = (nodes: GraphNode[]) => {
    if (nodes.length === 0) {
      setViewBox("0 0 1000 600");
      return;
    }

    // Find the min/max extents of node positions
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
      if (!node.position) continue;

      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 180); // Node width
      maxY = Math.max(maxY, node.position.y + 60);  // Node height
    }

    // Add some padding
    minX -= 100;
    minY -= 100;
    maxX += 100;
    maxY += 100;

    const width = maxX - minX;
    const height = maxY - minY;

    setViewBox(`${minX} ${minY} ${width} ${height}`);
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (!zoomable) return;

    e.preventDefault();

    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom + delta));

    setZoom(newZoom);
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!zoomable) return;

    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !zoomable) return;

    const dx = (e.clientX - dragStart.x) / zoom;
    const dy = (e.clientY - dragStart.y) / zoom;

    setPan({
      x: pan.x + dx,
      y: pan.y + dy
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse up to end panning
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Node colors based on type
  const getNodeColor = (type: string) => {
    switch (type) {
      case "section": return "#e2f0fc";
      case "page": return "#edfaef";
      case "block": return "#fff4e8";
      default: return "#f5f5f5";
    }
  };

  // Node border colors based on type
  const getNodeBorderColor = (type: string) => {
    switch (type) {
      case "section": return "#a8d1f2";
      case "page": return "#b7e0c2";
      case "block": return "#ffd7a8";
      default: return "#e0e0e0";
    }
  };

  // Edge styles based on type
  const getEdgeStyle = (type: string = 'default') => {
    switch (type) {
      case "conditional": return {
        stroke: "#ff7a45",
        strokeWidth: 2,
        strokeDasharray: "5,5"
      };
      default: return {
        stroke: "#b0b0b0",
        strokeWidth: 2,
        strokeDasharray: "none"
      };
    }
  };

  // Generate a responsive SVG viewBox
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      calculateViewBox(nodes);
    });

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [nodes]);

  // Apply transform based on pan and zoom
  const svgStyle = {
    transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
    transformOrigin: "center",
    transition: dragging ? "none" : "transform 0.2s ease-out",
  };

  return (
    <div
      ref={containerRef}
      className="survey-graph-container overflow-hidden border rounded-md bg-gray-50 relative"
      style={{ height }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={viewBox}
        style={svgStyle}
      >
        {/* Render edges first (under nodes) */}
        <g className="edges">
          {edges.map((edge) => {
            // Find source and target nodes
            const source = nodes.find((n) => n.id === edge.sourceId);
            const target = nodes.find((n) => n.id === edge.targetId);

            if (!source?.position || !target?.position) return null;

            // Calculate edge path
            const startX = source.position.x + 90; // Half node width
            const startY = source.position.y + 30; // Half node height
            const endX = target.position.x + 90;
            const endY = target.position.y;

            // Generate a curved path
            const dx = endX - startX;
            const dy = endY - startY;
            const curve = Math.min(Math.abs(dx), 100) * Math.sign(dx);

            const path = `M ${startX} ${startY}
                          C ${startX + curve} ${startY + dy/3},
                            ${endX - curve} ${endY - dy/3},
                            ${endX} ${endY}`;

            const edgeStyle = getEdgeStyle(edge.type);

            return (
              <g key={edge.id} className="edge">
                <path
                  d={path}
                  fill="none"
                  stroke={edgeStyle.stroke}
                  strokeWidth={edgeStyle.strokeWidth}
                  strokeDasharray={edgeStyle.strokeDasharray}
                  markerEnd="url(#arrowhead)"
                />

                {/* Edge label */}
                {edge.label && (
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2 - 10}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="12"
                    className="pointer-events-none"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Render nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            if (!node.position) return null;

            const { x, y } = node.position;
            const nodeWidth = 180;
            const nodeHeight = 60;

            return (
              <g key={node.id} className="node" transform={`translate(${x}, ${y})`}>
                {/* Node background */}
                <rect
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={5}
                  ry={5}
                  fill={getNodeColor(node.type)}
                  stroke={getNodeBorderColor(node.type)}
                  strokeWidth={2}
                />

                {/* Node type indicator */}
                <rect
                  width={nodeWidth}
                  height={20}
                  rx={5}
                  ry={5}
                  fill={getNodeBorderColor(node.type)}
                />

                {/* Node type text */}
                <text
                  x={10}
                  y={15}
                  fontSize="12"
                  fontWeight="bold"
                  fill="#555"
                  className="capitalize pointer-events-none"
                >
                  {node.type}
                </text>

                {/* Node label */}
                <text
                  x={nodeWidth / 2}
                  y={nodeHeight / 2 + 10}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#333"
                  className="pointer-events-none"
                >
                  {node.label.length > 20 ? node.label.substring(0, 17) + '...' : node.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
          </marker>
        </defs>
      </svg>

      {/* Zoom controls */}
      {zoomable && (
        <div className="absolute bottom-0 right-0 bg-white border rounded-md shadow-sm flex">
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="p-2 hover:bg-gray-100 border-r"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-2 hover:bg-gray-100 border-r"
            aria-label="Reset zoom"
          >
            Reset
          </button>
          <button
            onClick={() => setZoom(Math.min(3, zoom + 0.1))}
            className="p-2 hover:bg-gray-100"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
