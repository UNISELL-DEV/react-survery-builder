"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { NodeData, NavigationRule } from "../types";
import { useSurveyBuilder } from "../context/SurveyBuilderContext";
import { Plus, Trash2, Edit2, Save, X, ChevronRight, ChevronLeft, Settings, Link2, Unlink, ZoomIn, ZoomOut, Maximize2, Move, MousePointer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { NavigationRulesEditorDialog } from "../components/common/NavigationRulesEditorDialog";

interface SurveyGraphProps {
  rootNode: NodeData | null;
  zoomable?: boolean;
  height?: string;
}

interface FlowNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data: {
    label: string;
    description?: string;
    nodeType: string;
    itemType: string;
    originalData: any;
    hasConditionalFlow: boolean;
  };
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  isConditional: boolean;
}

export const SurveyGraph: React.FC<SurveyGraphProps> = ({
  rootNode,
  zoomable = true,
  height = "600px",
}) => {
  const { state, updateNode } = useSurveyBuilder();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingRules, setEditingRules] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = useState<'select' | 'pan'>('select');

  // Color scheme for different node types
  const getNodeColorByType = (type: string) => {
    const colorMap: Record<string, any> = {
      'section': { fill: '#dbeafe', stroke: '#3b82f6', darkFill: '#1e3a8a', darkStroke: '#60a5fa' },
      'set': { fill: '#dcfce7', stroke: '#22c55e', darkFill: '#14532d', darkStroke: '#4ade80' },
      'page': { fill: '#dcfce7', stroke: '#22c55e', darkFill: '#14532d', darkStroke: '#4ade80' },
      'selectablebox': { fill: '#fef3c7', stroke: '#f59e0b', darkFill: '#78350f', darkStroke: '#fbbf24' },
      'textfield': { fill: '#e0e7ff', stroke: '#6366f1', darkFill: '#312e81', darkStroke: '#818cf8' },
      'html': { fill: '#fce7f3', stroke: '#ec4899', darkFill: '#831843', darkStroke: '#f472b6' },
      'button': { fill: '#f3e8ff', stroke: '#a855f7', darkFill: '#581c87', darkStroke: '#c084fc' },
      'checkbox': { fill: '#ecfdf5', stroke: '#10b981', darkFill: '#064e3b', darkStroke: '#34d399' },
      'radio': { fill: '#fff7ed', stroke: '#f97316', darkFill: '#7c2d12', darkStroke: '#fb923c' },
      'textarea': { fill: '#f0f9ff', stroke: '#0ea5e9', darkFill: '#0c4a6e', darkStroke: '#38bdf8' },
      'date': { fill: '#fef2f2', stroke: '#ef4444', darkFill: '#7f1d1d', darkStroke: '#f87171' },
      'time': { fill: '#f5f3ff', stroke: '#8b5cf6', darkFill: '#5b21b6', darkStroke: '#a78bfa' },
      'number': { fill: '#fefce8', stroke: '#eab308', darkFill: '#713f12', darkStroke: '#facc15' },
      'block': { fill: '#fff4e8', stroke: '#ffd7a8', darkFill: '#78350f', darkStroke: '#fbbf24' },
    };

    return colorMap[type] || { fill: '#f3f4f6', stroke: '#9ca3af', darkFill: '#374151', darkStroke: '#6b7280' };
  };

  // Collect all field names and targets for navigation rules
  const collectFieldNames = useCallback((node: any): string[] => {
    if (!node) return [];
    let names: string[] = [];
    if (node.fieldName) names.push(node.fieldName);
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        names = names.concat(collectFieldNames(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          names = names.concat(collectFieldNames(n));
        }
      }
    }
    return names;
  }, []);

  const collectTargets = useCallback((node: any): { pages: Array<{ uuid: string; name: string }>, blocks: Array<{ uuid: string; name: string }> } => {
    if (!node) return { pages: [], blocks: [] };
    let pages: Array<{ uuid: string; name: string }> = [];
    let blocks: Array<{ uuid: string; name: string }> = [];
    
    if (node.uuid) {
      if (node.type === "set" || node.type === "section") {
        pages.push({ uuid: node.uuid, name: node.name || node.uuid });
      } else {
        blocks.push({ 
          uuid: node.uuid, 
          name: node.name || node.fieldName || node.uuid 
        });
      }
    }
    
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        const subTargets = collectTargets(item);
        pages = pages.concat(subTargets.pages);
        blocks = blocks.concat(subTargets.blocks);
      }
    }

    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          const subTargets = collectTargets(n);
          pages = pages.concat(subTargets.pages);
          blocks = blocks.concat(subTargets.blocks);
        }
      }
    }
    
    return { pages, blocks };
  }, []);

  // Enhanced layout algorithm with proper sequential flow handling
  const layoutNodes = useCallback((rootNode: any): { nodes: FlowNode[], edges: FlowEdge[] } => {
    const flowNodes: FlowNode[] = [];
    const flowEdges: FlowEdge[] = [];
    const visited = new Set<string>();
    const allNodes: any[] = [];

    // First pass: collect all nodes in order
    const collectAllNodes = (node: any) => {
      if (!node || !node.uuid) return;
      allNodes.push(node);
      
      // Collect from items array (new structure)
      if (node.items) {
        node.items.forEach((item: any) => {
          if (item.uuid) {
            collectAllNodes(item);
          }
        });
      }
      
      // Collect from nodes array (old structure)
      if (node.nodes) {
        node.nodes.forEach((childNode: any) => {
          if (typeof childNode !== "string" && childNode.uuid) {
            collectAllNodes(childNode);
          }
        });
      }
    };

    collectAllNodes(rootNode);

    const processNode = (node: any, x: number = 0, y: number = 0, level: number = 0) => {
      if (!node.uuid || visited.has(node.uuid)) return { width: 0, height: 0 };
      visited.add(node.uuid);

      // Determine the actual item type
      let itemType = node.type;
      if (node.items && node.items.length > 0 && node.items[0].type) {
        itemType = node.items[0].type;
      }

      const flowNode: FlowNode = {
        id: node.uuid,
        x,
        y,
        width: 240,
        height: 100,
        data: {
          label: node.name || 'Unnamed',
          description: node.items?.[0]?.questionTitle || node.items?.[0]?.label || '',
          nodeType: node.type,
          itemType: itemType,
          originalData: node,
          hasConditionalFlow: node.items?.some((item: any) => item.navigationRules && item.navigationRules.length > 0) || 
                             (node.navigationRules && node.navigationRules.length > 0),
        },
      };
      
      flowNodes.push(flowNode);

      let maxChildWidth = 0;
      let totalChildHeight = 0;
      const childSpacing = 30;
      const levelSpacing = 350;

      // Check if this node has navigation rules
      let hasNavigationRules = false;
      const targetNodes: any[] = [];

      // Check navigation rules from items
      if (node.items) {
        node.items.forEach((item: any) => {
          if (item.navigationRules && item.navigationRules.length > 0) {
            hasNavigationRules = true;
            item.navigationRules.forEach((rule: NavigationRule) => {
              const edge: FlowEdge = {
                id: `${node.uuid}-${rule.target}`,
                source: node.uuid!,
                target: rule.target,
                label: rule.condition === 'true' ? 'default' : rule.condition,
                isConditional: rule.condition !== 'true' && !rule.isDefault,
              };
              flowEdges.push(edge);

              // Find target node
              const targetNode = findNodeByUuid(rootNode, rule.target);
              if (targetNode && !visited.has(rule.target)) {
                targetNodes.push(targetNode);
              }
            });
          }
        });
      }

      // Check navigation rules directly on the node
      if (node.navigationRules && node.navigationRules.length > 0) {
        hasNavigationRules = true;
        node.navigationRules.forEach((rule: NavigationRule) => {
          const edge: FlowEdge = {
            id: `${node.uuid}-${rule.target}`,
            source: node.uuid!,
            target: rule.target,
            label: rule.condition === 'true' ? 'default' : rule.condition,
            isConditional: rule.condition !== 'true' && !rule.isDefault,
          };
          flowEdges.push(edge);

          // Find target node
          const targetNode = findNodeByUuid(rootNode, rule.target);
          if (targetNode && !visited.has(rule.target)) {
            targetNodes.push(targetNode);
          }
        });
      }

      // If no navigation rules, connect to next node in sequence
      if (!hasNavigationRules) {
        const currentIndex = allNodes.findIndex(n => n.uuid === node.uuid);
        if (currentIndex !== -1 && currentIndex < allNodes.length - 1) {
          const nextNode = allNodes[currentIndex + 1];
          if (nextNode && !visited.has(nextNode.uuid)) {
            const edge: FlowEdge = {
              id: `${node.uuid}-${nextNode.uuid}`,
              source: node.uuid!,
              target: nextNode.uuid,
              isConditional: false,
            };
            flowEdges.push(edge);
            targetNodes.push(nextNode);
          }
        }
      }

      // Layout target nodes
      if (targetNodes.length > 0) {
        let currentY = y;
        targetNodes.forEach((targetNode, index) => {
          const childDimensions = processNode(targetNode, x + levelSpacing, currentY, level + 1);
          currentY += childDimensions.height + childSpacing;
          totalChildHeight += childDimensions.height + (index > 0 ? childSpacing : 0);
          maxChildWidth = Math.max(maxChildWidth, childDimensions.width);
        });
      }

      return {
        width: flowNode.width + (maxChildWidth > 0 ? levelSpacing + maxChildWidth : 0),
        height: Math.max(flowNode.height, totalChildHeight)
      };
    };

    const findNodeByUuid = (node: any, uuid: string): any => {
      if (node.uuid === uuid) return node;
      if (node.items) {
        for (const item of node.items) {
          const found = findNodeByUuid(item, uuid);
          if (found) return found;
        }
      }
      if (node.nodes) {
        for (const childNode of node.nodes) {
          if (typeof childNode !== "string") {
            const found = findNodeByUuid(childNode, uuid);
            if (found) return found;
          }
        }
      }
      return null;
    };

    if (rootNode) {
      processNode(rootNode, 100, 100, 0);
    }
    return { nodes: flowNodes, edges: flowEdges };
  }, []);

  // Convert survey data to flow nodes and edges
  useEffect(() => {
    if (!rootNode) {
      setNodes([]);
      setEdges([]);
      return;
    }
    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutNodes(rootNode);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [rootNode, layoutNodes]);

  // Mouse event handlers
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!zoomable) return;
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom(prev => Math.max(0.3, Math.min(2, prev + delta)));
  }, [zoomable]);

  const handleMouseDown = (e: React.MouseEvent, nodeId?: string) => {
    if (!zoomable) return;
    e.preventDefault();
    
    if (e.button === 0) { // Left click
      if (nodeId && cursorMode === 'select') {
        setSelectedNode(nodeId);
        setDragNode(nodeId);
        const rect = svgRef.current?.getBoundingClientRect();
        if (rect) {
          const node = nodes.find(n => n.id === nodeId);
          if (node) {
            const x = (e.clientX - rect.left - pan.x) / zoom;
            const y = (e.clientY - rect.top - pan.y) / zoom;
            setDragStart({ x: x - node.x, y: y - node.y });
          }
        }
      } else if (!nodeId || cursorMode === 'pan') {
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        setSelectedNode(null);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomable) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    setMousePos({ x, y });

    if (dragNode && cursorMode === 'select') {
      setNodes(prev => prev.map(node => 
        node.id === dragNode 
          ? { ...node, x: x - dragStart.x, y: y - dragStart.y }
          : node
      ));
    } else if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleMouseUp = () => {
    setDragNode(null);
    setIsPanning(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        setCursorMode('pan');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setCursorMode('select');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Zoom controls
  const handleZoom = (delta: number) => {
    if (!zoomable) return;
    setZoom(prev => Math.max(0.3, Math.min(2, prev + delta)));
  };

  const handleFitView = () => {
    if (!zoomable || nodes.length === 0) return;

    const padding = 100;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    });

    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const scaleX = containerRect.width / width;
      const scaleY = containerRect.height / height;
      const newZoom = Math.min(scaleX, scaleY, 1);

      setZoom(newZoom);
      setPan({ 
        x: (containerRect.width - width * newZoom) / 2 - minX * newZoom + padding * newZoom,
        y: (containerRect.height - height * newZoom) / 2 - minY * newZoom + padding * newZoom
      });
    }
  };

  // Generate curved path for edges
  const generateEdgePath = (edge: FlowEdge) => {
    const source = nodes.find(n => n.id === edge.source);
    const target = nodes.find(n => n.id === edge.target);
    
    if (!source || !target) return '';

    const sx = source.x + source.width / 2;
    const sy = source.y + source.height;
    const tx = target.x + target.width / 2;
    const ty = target.y;

    const dx = tx - sx;
    const dy = ty - sy;
    const dr = Math.sqrt(dx * dx + dy * dy) / 2;

    return `M ${sx} ${sy} C ${sx} ${sy + dr}, ${tx} ${ty - dr}, ${tx} ${ty}`;
  };

  // Save navigation rules
  const saveNavigationRules = (nodeId: string, rules: NavigationRule[]) => {
    // Update edges
    setEdges(prev => {
      const otherEdges = prev.filter(e => e.source !== nodeId);
      const newEdges = rules.map(rule => ({
        id: `${nodeId}-${rule.target}`,
        source: nodeId,
        target: rule.target,
        label: rule.condition === 'true' ? 'default' : rule.condition,
        isConditional: rule.condition !== 'true' && !rule.isDefault,
      }));
      return [...otherEdges, ...newEdges];
    });

    // Update the actual node data in context
    if (updateNode) {
      const selectedNodeData = nodes.find(n => n.id === nodeId);
      if (selectedNodeData?.data.originalData) {
        updateNode(nodeId, {
          ...selectedNodeData.data.originalData,
          navigationRules: rules
        });
      }
    }

    setNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            hasConditionalFlow: rules.length > 0,
          },
        };
      }
      return node;
    }));
  };

  const isDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const selectedNodeData = nodes.find(n => n.id === selectedNode);
  const fieldNames = useMemo(() => collectFieldNames(rootNode), [rootNode, collectFieldNames]);
  const targets = useMemo(() => collectTargets(rootNode), [rootNode, collectTargets]);

  if (!rootNode) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md"
        style={{ height }}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Survey Data</h3>
          <p className="text-gray-600 dark:text-gray-400">Create a survey to see the graph visualization.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full bg-gray-50 dark:bg-gray-900 relative rounded-md"
      style={{ height, overflow: 'hidden' }}
      ref={containerRef}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className={`w-full h-full ${cursorMode === 'pan' ? 'cursor-move' : 'cursor-default'}`}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ 
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDarkMode ? '#9ca3af' : '#6b7280'}
            />
          </marker>
          
          <marker
            id="arrowhead-conditional"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDarkMode ? '#fb923c' : '#f97316'}
            />
          </marker>
          
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feFlood floodColor="#000000" floodOpacity="0.1"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>

          {/* Edges */}
          {edges.map(edge => {
            const path = generateEdgePath(edge);
            const pathId = `path-${edge.id}`;
            return (
              <g key={edge.id}>
                <defs>
                  <path id={pathId} d={path} />
                </defs>
                <path
                  d={path}
                  fill="none"
                  stroke={edge.isConditional ? (isDarkMode ? '#fb923c' : '#f97316') : (isDarkMode ? '#9ca3af' : '#6b7280')}
                  strokeWidth="2"
                  strokeDasharray={edge.isConditional ? '5,5' : ''}
                  markerEnd={edge.isConditional ? 'url(#arrowhead-conditional)' : 'url(#arrowhead)'}
                />
                {edge.label && (
                  <text className="text-xs fill-gray-600 dark:fill-gray-400" dy="-5">
                    <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                      {edge.label.length > 30 ? edge.label.substring(0, 27) + '...' : edge.label}
                    </textPath>
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const colors = getNodeColorByType(node.data.itemType);
            const isSelected = selectedNode === node.id;
            
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className={cursorMode === 'select' ? 'cursor-pointer' : ''}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, node.id);
                }}
              >
                {/* Node shadow and selection */}
                <rect
                  x="-4"
                  y="-4"
                  width={node.width + 8}
                  height={node.height + 8}
                  rx="8"
                  fill="none"
                  stroke={isSelected ? (isDarkMode ? '#3b82f6' : '#2563eb') : 'transparent'}
                  strokeWidth="3"
                  filter={isSelected ? 'url(#shadow)' : ''}
                />
                
                {/* Node background */}
                <rect
                  width={node.width}
                  height={node.height}
                  rx="6"
                  fill={isDarkMode ? colors.darkFill : colors.fill}
                  stroke={isDarkMode ? colors.darkStroke : colors.stroke}
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
                
                {/* Node header */}
                <rect
                  width={node.width}
                  height="30"
                  rx="6"
                  fill={isDarkMode ? colors.darkStroke : colors.stroke}
                  opacity="0.2"
                />
                
                {/* Node content */}
                <text
                  x="12"
                  y="20"
                  className="text-xs font-medium"
                  fill={isDarkMode ? '#f3f4f6' : '#374151'}
                >
                  {node.data.nodeType.toUpperCase()} - {node.data.itemType}
                </text>
                
                <text
                  x="12"
                  y="50"
                  className="text-sm font-semibold"
                  fill={isDarkMode ? '#f3f4f6' : '#111827'}
                >
                  {node.data.label.length > 25 ? node.data.label.substring(0, 22) + '...' : node.data.label}
                </text>
                
                {node.data.description && (
                  <text
                    x="12"
                    y="70"
                    className="text-xs"
                    fill={isDarkMode ? '#d1d5db' : '#4b5563'}
                  >
                    {node.data.description.length > 35 ? node.data.description.substring(0, 32) + '...' : node.data.description}
                  </text>
                )}
                
                {/* Conditional flow indicator */}
                {node.data.hasConditionalFlow && (
                  <g transform={`translate(${node.width - 30}, 10)`}>
                    <circle cx="10" cy="10" r="10" fill={isDarkMode ? '#fb923c' : '#f97316'} opacity="0.2" />
                    <ChevronRight className="w-5 h-5" x="7.5" y="7.5" stroke={isDarkMode ? '#fb923c' : '#f97316'} />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Controls */}
      {zoomable && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border flex">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-r"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-r"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleFitView}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-r"
            title="Fit View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCursorMode(cursorMode === 'select' ? 'pan' : 'select')}
            className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${cursorMode === 'pan' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
            title={cursorMode === 'select' ? 'Switch to Pan Mode' : 'Switch to Select Mode'}
          >
            {cursorMode === 'select' ? <Move className="w-4 h-4" /> : <MousePointer className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Info Panel */}
      {selectedNode && selectedNodeData && (
        <div className="absolute top-4 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-semibold">Node Details</h3>
            <button
              onClick={() => setEditingRules(selectedNode)}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Name</label>
              <p className="text-sm">{selectedNodeData.data.label}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Type</label>
              <div className="flex gap-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {selectedNodeData.data.nodeType}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {selectedNodeData.data.itemType}
                </span>
              </div>
            </div>
            {selectedNodeData.data.description && (
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Description</label>
                <p className="text-xs">{selectedNodeData.data.description.length > 50 ? selectedNodeData.data.description.substring(0, 47) + '...' : selectedNodeData.data.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Rule Editor Modal */}
      {editingRules && selectedNodeData && (
        <NavigationRulesEditorDialog
          data={selectedNodeData.data.originalData}
          nodeId={editingRules}
          nodeName={selectedNodeData.data.label}
          navigationRules={edges.filter(e => e.source === editingRules).map(e => ({
            condition: e.label === 'default' ? 'true' : (e.label || ''),
            target: e.target,
            isDefault: e.label === 'default' || !e.isConditional,
          }))}
          availableFields={fieldNames}
          availableTargets={targets}
          onSave={(rules: NavigationRule[]) => saveNavigationRules(editingRules, rules)}
          onClose={() => setEditingRules(null)}
        />
      )}
    </div>
  );
};