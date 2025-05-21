import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type NodeData, useSurveyBuilder } from "@/lib/survey";
import { ContentBlockPage } from "../blocks/ContentBlockPage";
import { v4 as uuidv4 } from "uuid";

interface SectionNodeProps {
  data: NodeData;
  onUpdate: (data: NodeData) => void;
  onRemove: () => void;
}

export const SectionNode: React.FC<SectionNodeProps> = ({
  data,
  onUpdate,
  onRemove,
}) => {
  const { createNode } = useSurveyBuilder();
  const [collapsed, setCollapsed] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...data,
      name: e.target.value,
    });
  };

  const handleScriptChange = (
    type: "entryLogic" | "exitLogic" | "navigationLogic" | "backLogic",
    value: string
  ) => {
    onUpdate({
      ...data,
      [type]: value,
    });
  };

  const handleAddPage = () => {
    // Add a new page (content block) to the section
    onUpdate({
      ...data,
      items: [
        ...(data.items || []),
        {
          type: "set",
          name: `Page ${(data.items?.length || 0) + 1}`,
          uuid: uuidv4(),
          items: [],
        },
      ],
    });
  };

  const handleUpdatePage = (index: number, pageData: any) => {
    const newItems = [...(data.items || [])];
    newItems[index] = pageData;
    onUpdate({
      ...data,
      items: newItems,
    });
  };

  const handleRemovePage = (index: number) => {
    const newItems = [...(data.items || [])];
    newItems.splice(index, 1);
    onUpdate({
      ...data,
      items: newItems,
    });
  };

  const handleAddChildSection = () => {
    if (data.uuid) {
      createNode(data.uuid, "section");
    }
  };

  return (
    <Card className="mb-4 section-node">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2 items-center">
          <Input
            value={data.name || ""}
            onChange={handleNameChange}
            placeholder="Section Name"
            className="w-[300px]"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </CardHeader>

      {!collapsed && (
        <CardContent>
          <Tabs defaultValue="pages">
            <TabsList className="mb-4">
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="scripts">Scripts</TabsTrigger>
              <TabsTrigger value="children">Child Nodes</TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <div className="space-y-4">
                {(data.items || []).map((page, index) => (
                  <ContentBlockPage
                    key={page.uuid || index}
                    data={page}
                    onUpdate={(updatedPage) => handleUpdatePage(index, updatedPage)}
                    onRemove={() => handleRemovePage(index)}
                  />
                ))}

                <Button onClick={handleAddPage}>Add Page</Button>
              </div>
            </TabsContent>

            <TabsContent value="scripts">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="entryLogic">On Entry Script</Label>
                  <Textarea
                    id="entryLogic"
                    value={data.entryLogic || ""}
                    onChange={(e) => handleScriptChange("entryLogic", e.target.value)}
                    placeholder="(formData, pageData, renderer, navigation) => { /* Initialize section */ }"
                    className="font-mono text-sm h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="exitLogic">On Exit Script</Label>
                  <Textarea
                    id="exitLogic"
                    value={data.exitLogic || ""}
                    onChange={(e) => handleScriptChange("exitLogic", e.target.value)}
                    placeholder="(formData, pageData, renderer, navigation) => { /* Cleanup section */ }"
                    className="font-mono text-sm h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="backLogic">On Back Navigation Script</Label>
                  <Textarea
                    id="backLogic"
                    value={data.backLogic || ""}
                    onChange={(e) => handleScriptChange("backLogic", e.target.value)}
                    placeholder="(formData, pageData, renderer, stack) => { /* Handle back navigation logic */ }"
                    className="font-mono text-sm h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="navigationLogic">Navigation Script</Label>
                  <Textarea
                    id="navigationLogic"
                    value={data.navigationLogic || ""}
                    onChange={(e) => handleScriptChange("navigationLogic", e.target.value)}
                    placeholder="(formData, pageData, renderer) => { return 0; }"
                    className="font-mono text-sm h-24"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="children">
              <div className="space-y-4">
                {(data.nodes || []).map((nodeRef, index) => {
                  // Display child node references here
                  return (
                    <div key={typeof nodeRef === "string" ? nodeRef : nodeRef.uuid || index} className="p-2 border rounded-md">
                      {typeof nodeRef === "string"
                        ? `Child Node Reference: ${nodeRef}`
                        : `Child Node: ${nodeRef.name || 'Unnamed Node'}`}
                    </div>
                  );
                })}

                <Button onClick={handleAddChildSection}>Add Child Section</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}

      <CardFooter className="bg-muted/50 flex justify-end">
        <div className="text-xs text-muted-foreground">
          {data.uuid ? `ID: ${data.uuid}` : "New Section"}
        </div>
      </CardFooter>
    </Card>
  );
};
