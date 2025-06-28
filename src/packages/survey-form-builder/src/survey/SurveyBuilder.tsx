import React, { useState } from "react";
import { Button } from "@survey-form-builder/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@survey-form-builder/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@survey-form-builder/components/ui/sheet";
import { SurveyNode } from "./SurveyNode";
import { LocalizationEditor } from "./helpers/LocalizationEditor";
import { v4 as uuidv4 } from "uuid";
import { BlockLibrary } from "./panels/BlockLibrary";
import { JsonEditor } from "./helpers/JsonEditor";
import { BlockDefinition, LocalizationMap, NodeData, NodeDefinition } from "../types";
import { SurveyBuilderProvider, useSurveyBuilder } from "../context/SurveyBuilderContext";
import { SurveyGraph } from "./SurveryGraph";
import { ThemeBuilder } from "./panels/ThemeBuilder";

// Define the props
interface SurveyBuilderProps {
  initialData?: {
    rootNode?: NodeData;
    localizations?: LocalizationMap;
  };
  onDataChange?: (data: { rootNode: NodeData | null; localizations: LocalizationMap }) => void;
  blockDefinitions?: BlockDefinition[];
  nodeDefinitions?: NodeDefinition[];
}

// The main component wrapped with provider
export const SurveyBuilder: React.FC<SurveyBuilderProps> = ({
  initialData,
  onDataChange,
  blockDefinitions = [],
  nodeDefinitions = [],
}) => {
  return (
    <SurveyBuilderProvider initialData={initialData}>
      <SurveyBuilderContent
        onDataChange={onDataChange}
        blockDefinitions={blockDefinitions}
        nodeDefinitions={nodeDefinitions}
      />
    </SurveyBuilderProvider>
  );
};

// The internal component using context
const SurveyBuilderContent: React.FC<Omit<SurveyBuilderProps, 'initialData'>> = ({
  onDataChange,
  blockDefinitions = [],
  nodeDefinitions = [],
}) => {
  const {
    state,
    addBlockDefinition,
    addNodeDefinition,
    initSurvey,
    createNode,
    setDisplayMode,
    exportSurvey
  } = useSurveyBuilder();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isThemeBuilderOpen, setIsThemeBuilderOpen] = useState(false);

  // 1. Block definitions (once or on true changes only)
  React.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.blocks));
    blockDefinitions.forEach(def => {
      if (!existing.has(def.type)) {
        addBlockDefinition(def.type, def);
      }
    });
  }, [blockDefinitions, state.definitions.blocks, addBlockDefinition]);

  // 2. Node definitions
  React.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.nodes));
    nodeDefinitions.forEach(def => {
      if (!existing.has(def.type)) {
        addNodeDefinition(def.type, def);
      }
    });
  }, [nodeDefinitions, state.definitions.nodes, addNodeDefinition]);

  // 3. Notify parent only on real data changes
  React.useEffect(() => {
    onDataChange?.(exportSurvey());
  }, [state.rootNode, state.localizations, onDataChange]);

  // Create root node if none exists
  const handleCreateRootNode = React.useCallback(() => {
    if (!state.rootNode && Object.keys(state.definitions.nodes).length > 0) {
      // const defaultType = Object.keys(state.definitions.nodes)[0];
      // const definition = state.definitions.nodes[defaultType];
      // if (definition) {
      //   createNode('root', defaultType);
      // }
      initSurvey();
    }
  }, [state.rootNode, state.definitions.nodes, createNode]);

  // Handle display mode changes
  const handleDisplayModeChange = (mode: "list" | "graph" | "lang") => {
    setDisplayMode(mode);
  };

  return (
    <div className="survey-builder h-full flex flex-col pb-5">
      <div className="survey-builder-header flex items-center justify-between p-4 bg-card border-b">
        <h2 className="text-xl font-bold">Form Builder</h2>

        <div className="flex items-center gap-2">
          <Tabs
            value={state.displayMode}
            onValueChange={(v) => handleDisplayModeChange(v as any)}
            className="mr-4"
          >
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="graph">Graph View</TabsTrigger>
              <TabsTrigger value="lang">Localizations</TabsTrigger>
            </TabsList>
          </Tabs>

          <Sheet open={isThemeBuilderOpen} onOpenChange={setIsThemeBuilderOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline">Theme Builder</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <SheetHeader>
                <SheetTitle>Theme Builder</SheetTitle>
              </SheetHeader>
              <ThemeBuilder onDataChange={onDataChange}/>
            </SheetContent>
          </Sheet>

          <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline">Tools</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[540px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Tools</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="blocks" className="mt-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="blocks">Block Library</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>

                <TabsContent value="blocks" className="overflow-y-scroll">
                  <BlockLibrary />
                </TabsContent>

                <TabsContent value="json">
                  <JsonEditor />
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>

          {!state.rootNode && (
            <Button type="button" onClick={handleCreateRootNode}>Create Form</Button>
          )}
        </div>
      </div>

      <div className="survey-builder-content flex-grow p-4 overflow-auto">
        {state.displayMode === "list" && (
          <div className="survey-list space-y-4">
            {state.rootNode ? (
              <SurveyNode data={state.rootNode} />
            ) : (
              <div className="text-center p-12 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-4">No Form Created</h3>
                <p className="text-muted-foreground mb-6">
                  Click "Create Form" to start building your Form.
                </p>
                <Button type="button" onClick={handleCreateRootNode}>Create Form</Button>
              </div>
            )}
          </div>
        )}

        {state.displayMode === "graph" && (
          <div className="survey-graph">
            {state.rootNode ? (
              <div className="h-full flex flex-col">
                <div className="text-sm text-muted-foreground mb-4 bg-muted rounded-md p-3">
                  <p>This graph view shows the structure of your survey, including sections, pages, and blocks. Conditional paths are shown with dashed lines.</p>
                  <p className="mt-1">You can zoom and pan to explore the graph. Hover over nodes to see more details.</p>
                </div>
                <div className="flex-grow">
                  <SurveyGraph rootNode={state.rootNode} />
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-4">No Survey Created</h3>
                <p className="text-muted-foreground mb-6">
                  Create a survey first to see the graph visualization.
                </p>
                <Button type="button" onClick={handleCreateRootNode}>Create Survey</Button>
              </div>
            )}
          </div>
        )}

        {state.displayMode === "lang" && (
          <div className="survey-lang">
            <LocalizationEditor />
          </div>
        )}
      </div>
    </div>
  );
};
