import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { type BlockData, useSurveyBuilder } from "@/lib/survey";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ContentBlockItemProps {
  data: BlockData;
  onUpdate: (data: BlockData) => void;
  onRemove: () => void;
}

export const ContentBlockItem: React.FC<ContentBlockItemProps> = ({
  data,
  onUpdate,
  onRemove,
}) => {
  const { state } = useSurveyBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const blockDefinition = state.definitions.blocks[data.type];

  if (!blockDefinition) {
    return (
      <Card className="mb-4 content-block-item border-destructive">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex gap-2 items-center">
            <span className="text-destructive">Unknown block type: {data.type}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-4 content-block-item">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2 items-center">
          {blockDefinition.icon && <span>{blockDefinition.icon}</span>}
          <span className="font-medium">{data.name || blockDefinition.name}</span>
          {data.fieldName && (
            <span className="text-xs bg-muted px-2 py-1 rounded-md">
              {data.fieldName}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit {blockDefinition.name}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {blockDefinition.renderFormFields({
                  data,
                  onUpdate,
                  onRemove: () => {
                    setIsEditing(false);
                    onRemove();
                  },
                })}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {blockDefinition.renderItem({
          data,
          onUpdate,
          onRemove,
        })}
      </CardContent>

      <CardFooter className="bg-muted/50 flex justify-end">
        <div className="text-xs text-muted-foreground">
          {data.uuid ? `ID: ${data.uuid.substring(0, 8)}` : "New Item"}
        </div>
      </CardFooter>
    </Card>
  );
};
