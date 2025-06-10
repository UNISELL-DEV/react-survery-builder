import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// Re‑use the same BlockData type used across the builder
import type { BlockData } from "../../types";

/**
 * CommonBlockRules
 * -----------------
 * A minimal editor for block‑level flags that will grow over time.
 * For now it only exposes a single option: whether the block is an
 * "End Block" (i.e. the survey should finish when the user reaches it).
 *
 * Props
 *  - data:       the current BlockData object
 *  - onUpdate:   optional callback fired with the updated BlockData
 */
export interface CommonBlockRulesProps {
  data: BlockData;
  onUpdate?: (data: BlockData) => void;
}

export const CommonBlockRules: React.FC<CommonBlockRulesProps> = ({ data, onUpdate }) => {
  // Keep local checkbox state in sync with incoming data
  const [isEndBlock, setIsEndBlock] = React.useState<boolean>(!!data.isEndBlock);

  // When the checkbox is toggled, update both local state and propagate the change
  const handleCheckedChange = (checked: boolean) => {
    setIsEndBlock(checked);
    onUpdate?.({
      ...data,
      isEndBlock: checked,
    });
  };

  // Keep local state up‑to‑date if parent swaps out the data object
  React.useEffect(() => {
    setIsEndBlock(!!data.isEndBlock);
  }, [data.isEndBlock]);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="is-end-block"
          checked={isEndBlock}
          onCheckedChange={handleCheckedChange}
        />
        <Label htmlFor="is-end-block">Mark as end block</Label>
      </div>
    </div>
  );
};

export default CommonBlockRules;
