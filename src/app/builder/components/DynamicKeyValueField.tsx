import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/packages/survey-form-package/src/components/ui/card";
import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { BlockData } from "@/packages/survey-form-package/src";

// Type definitions
interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

interface DynamicKeyValueFieldProps {
  data: BlockData;
  onUpdate: (data: BlockData) => void;
  label?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  description?: string;
  keyName?: string;
}

export const DynamicKeyValueField: React.FC<DynamicKeyValueFieldProps> = ({
  data,
  onUpdate,
  label = "Key-Value Pairs",
  keyPlaceholder = "Enter key",
  valuePlaceholder = "Enter value",
  keyName = "keyValuePairs",
  description = "Add custom key-value pairs for data analysis and reporting. These help identify and organize information across different contexts."
}) => {
  const [pairs, setPairs] = useState<KeyValuePair[]>(() => {
    return data.keyValuePairs || [{ id: Date.now().toString(), key: "", value: "" }];
  });

  // Update parent component when pairs change
  useEffect(() => {
    onUpdate({
      ...data,
      [keyName]: pairs
    });
  }, [pairs]);

  const handleAddPair = () => {
    const newPair: KeyValuePair = {
      id: Date.now().toString(),
      key: "",
      value: ""
    };
    setPairs([...pairs, newPair]);
  };

  const handleRemovePair = (id: string) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter(pair => pair.id !== id));
    }
  };

  const handleUpdatePair = (id: string, field: 'key' | 'value', newValue: string) => {
    setPairs(pairs.map(pair => 
      pair.id === id 
        ? { ...pair, [field]: newValue }
        : pair
    ));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        {pairs.map((pair, index) => (
          <Card key={pair.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`key-${pair.id}`} className="text-xs font-medium">
                      Key
                    </Label>
                    <Input
                      id={`key-${pair.id}`}
                      value={pair.key}
                      onChange={(e) => handleUpdatePair(pair.id, 'key', e.target.value)}
                      placeholder={keyPlaceholder}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`value-${pair.id}`} className="text-xs font-medium">
                      Value
                    </Label>
                    <Input
                      id={`value-${pair.id}`}
                      value={pair.value}
                      onChange={(e) => handleUpdatePair(pair.id, 'value', e.target.value)}
                      placeholder={valuePlaceholder}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemovePair(pair.id)}
                  disabled={pairs.length === 1}
                  className="mt-7 h-9 w-9"
                  title="Remove pair"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Pair {index + 1} of {pairs.length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleAddPair}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Pair
      </Button>

      {/* Summary section showing all valid pairs
      {pairs.filter(p => p.key && p.value).length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <Label className="text-xs font-medium mb-2 block">Current Pairs Summary</Label>
            <div className="space-y-1">
              {pairs
                .filter(p => p.key && p.value)
                .map(pair => (
                  <div key={pair.id} className="text-xs font-mono">
                    <span className="text-primary">{pair.key}</span>
                    <span className="mx-2">:</span>
                    <span className="text-muted-foreground">{pair.value}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
};
