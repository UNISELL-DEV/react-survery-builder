import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ContentBlockItem } from "./ContentBlockItem";
import { v4 as uuidv4 } from "uuid";
import { useSurveyBuilder } from "../../context/SurveyBuilderContext";
import { BlockData } from "../../types";

interface ContentBlockPageProps {
  data: BlockData;
  onUpdate: (data: BlockData) => void;
  onRemove: () => void;
}

export const ContentBlockPage: React.FC<ContentBlockPageProps> = ({
  data,
  onUpdate,
  onRemove,
}) => {
  const { state } = useSurveyBuilder();
  const [collapsed, setCollapsed] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...data,
      name: e.target.value,
    });
  };

  const handleAddBlockItem = (blockType: string) => {
    const blockDefinition = state.definitions.blocks[blockType];
    if (!blockDefinition) return;

    onUpdate({
      ...data,
      items: [
        ...(data.items || []),
        {
          ...blockDefinition.defaultData,
          uuid: uuidv4(),
        },
      ],
    });
  };

  const handleBlockUpdate = (index: number, blockData: BlockData) => {
    const newItems = [...(data.items || [])];
    newItems[index] = blockData;
    onUpdate({
      ...data,
      items: newItems,
    });
  };

  const handleBlockRemove = (index: number) => {
    const newItems = [...(data.items || [])];
    newItems.splice(index, 1);
    onUpdate({
      ...data,
      items: newItems,
    });
  };

  return (
    <Card className="mb-4 content-block-page">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2 items-center">
          <Input
            value={data.name || ""}
            onChange={handleNameChange}
            placeholder="Page Name"
            className="w-[300px]"
          />
        </div>
        <div className="flex gap-2">
          <Button type="button"
            variant="outline"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
          <Button type="button"
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
          <div className="space-y-4">
            {/* Render the content block items */}
            {(data.items || []).map((block, index) => (
              <ContentBlockItem
                key={block.uuid || index}
                data={block}
                onUpdate={(updatedBlock) => handleBlockUpdate(index, updatedBlock)}
                onRemove={() => handleBlockRemove(index)}
              />
            ))}

            {/* Menu to add new blocks */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Add Item</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {Object.entries(state.definitions.blocks).map(([type, definition]) => (
                  <Button type="button"
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddBlockItem(type)}
                    className="justify-start"
                  >
                    {definition.icon && <span className="mr-2">{definition.icon}</span>}
                    <span className="truncate">{definition.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="bg-muted/50 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {`Items: ${data.items?.length || 0}`}
        </div>
        <div className="text-xs text-muted-foreground">
          {data.uuid ? `ID: ${data.uuid}` : "New Page"}
        </div>
      </CardFooter>
    </Card>
  );
};
