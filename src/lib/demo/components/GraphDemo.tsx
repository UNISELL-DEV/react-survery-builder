"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyGraph } from "./SurveyGraph";
import { DemoSurveys } from "../surveys";
import { type NodeData } from "@/lib/survey/types";

interface GraphDemoProps {
  rootNode: NodeData | null;
}

export const GraphDemo: React.FC<GraphDemoProps> = ({ rootNode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Flow Visualization</CardTitle>
        <CardDescription>
          Interactive graph visualization of the survey structure and branching logic
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SurveyGraph rootNode={rootNode} height="600px" />

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Understanding the Graph</h3>

          <div className="space-y-2">
            <h4 className="text-base font-medium">Node Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-[#e2f0fc] border border-[#a8d1f2]">
                <div className="font-medium text-sm mb-1">Section Nodes</div>
                <p className="text-sm text-gray-600">
                  Represent survey sections that can contain multiple pages and child sections
                </p>
              </div>

              <div className="p-3 rounded-md bg-[#edfaef] border border-[#b7e0c2]">
                <div className="font-medium text-sm mb-1">Page Nodes</div>
                <p className="text-sm text-gray-600">
                  Represent individual pages within a section containing question blocks
                </p>
              </div>

              <div className="p-3 rounded-md bg-[#fff4e8] border border-[#ffd7a8]">
                <div className="font-medium text-sm mb-1">Block Nodes</div>
                <p className="text-sm text-gray-600">
                  Represent individual question or content blocks within pages
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-medium">Connection Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-md bg-white border">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-10 h-0.5 bg-[#b0b0b0]"></div>
                  <div className="font-medium text-sm">Standard Flow</div>
                </div>
                <p className="text-sm text-gray-600">
                  Regular connections between nodes representing the default flow
                </p>
              </div>

              <div className="p-3 rounded-md bg-white border">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-10 h-0.5 bg-[#ff7a45] border-dashed border-t border-t-[#ff7a45]"></div>
                  <div className="font-medium text-sm">Conditional Flow</div>
                </div>
                <p className="text-sm text-gray-600">
                  Connections with conditional logic based on responses
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-medium">Interaction</h4>
            <p className="text-sm text-gray-600">
              You can interact with the graph visualization:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Zoom in/out using the mouse wheel or the controls in the bottom right</li>
              <li>Pan by clicking and dragging to move around the graph</li>
              <li>Reset the view by clicking the "Reset" button</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
