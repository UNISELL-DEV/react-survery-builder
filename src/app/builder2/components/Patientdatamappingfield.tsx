import React, { useState, useEffect } from "react";
import { Button } from "@/packages/survey-form-package/src/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Label } from "@/packages/survey-form-package/src/components/ui/label";
import { Card, CardContent } from "@/packages/survey-form-package/src/components/ui/card";
import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { Switch } from "@/packages/survey-form-package/src/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/packages/survey-form-package/src/components/ui/select";
import { Alert, AlertDescription } from "@/packages/survey-form-package/src/components/ui/alert";
import { Info } from "lucide-react";
import { BlockData } from "@/packages/survey-form-package/src";

// Type definitions
interface PatientFieldMapping {
  id: string;
  patientField: string;
  objectPath: string;
}

interface PatientDataMapping {
  enabled: boolean;
  mappings: PatientFieldMapping[];
}

interface PatientDataMappingFieldProps {
  data: BlockData;
  onUpdate: (data: BlockData) => void;
  label?: string;
  description?: string;
  keyName?: string;
}

// Default patient field options
const PATIENT_FIELDS = [
  { value: "first_name", label: "First Name" },
  { value: "middle_name", label: "Middle Name" },
  { value: "last_name", label: "Last Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "dob", label: "Date of Birth" },
  { value: "gender", label: "Gender" },
  { value: "gender_biological", label: "Biological Gender" },
  { value: "height", label: "Height" },
  { value: "weight", label: "Weight" },
] as const;

export const PatientDataMappingField: React.FC<PatientDataMappingFieldProps> = ({
  data,
  onUpdate,
  label = "Patient Data Mapping",
  description = "Map this block's data to patient information. Add multiple mappings to extract different fields from the response.",
  keyName = "patientDataMapping"
}) => {
  const [mapping, setMapping] = useState<PatientDataMapping>(() => {
    const existingMapping = data[keyName];
    if (existingMapping && existingMapping.enabled) {
      return existingMapping;
    }
    return {
      enabled: false,
      mappings: [{ id: Date.now().toString(), patientField: "", objectPath: "" }]
    };
  });

  // Update parent component when mapping changes
  useEffect(() => {
    onUpdate({
      ...data,
      [keyName]: mapping
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapping]);

  const handleToggle = (checked: boolean) => {
    setMapping(prev => ({
      ...prev,
      enabled: checked,
      // Initialize with one empty mapping when enabling
      ...(!prev.enabled && checked && {
        mappings: [{ id: Date.now().toString(), patientField: "", objectPath: "" }]
      })
    }));
  };

  const handleAddMapping = () => {
    const newMapping: PatientFieldMapping = {
      id: Date.now().toString(),
      patientField: "",
      objectPath: ""
    };
    setMapping(prev => ({
      ...prev,
      mappings: [...prev.mappings, newMapping]
    }));
  };

  const handleRemoveMapping = (id: string) => {
    setMapping(prev => ({
      ...prev,
      mappings: prev.mappings.length > 1 
        ? prev.mappings.filter(m => m.id !== id)
        : prev.mappings
    }));
  };

  const handleUpdateMapping = (id: string, field: 'patientField' | 'objectPath', value: string) => {
    setMapping(prev => ({
      ...prev,
      mappings: prev.mappings.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      )
    }));
  };

  // Get already selected patient fields to show warnings
  const selectedFields = mapping.mappings
    .map(m => m.patientField)
    .filter(Boolean);
  
  const hasDuplicates = selectedFields.length !== new Set(selectedFields).size;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">{label}</Label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="patient-mapping-toggle" className="text-sm font-medium">
                  Enable Patient Data Mapping
                </Label>
                <p className="text-xs text-muted-foreground">
                  Map fields from this block to patient information
                </p>
              </div>
              <Switch
                id="patient-mapping-toggle"
                checked={mapping.enabled}
                onCheckedChange={handleToggle}
              />
            </div>

            {/* Patient Field Mappings */}
            {mapping.enabled && (
              <div className="space-y-4 pt-2 border-t">
                {/* Info Alert */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Note:</strong> Each mapping extracts a scalar value from the block's response data. 
                    Use object paths (e.g., "height" or "measurements.weight") to specify which data to extract.
                  </AlertDescription>
                </Alert>

                {/* Duplicate Warning */}
                {hasDuplicates && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Warning:</strong> Multiple mappings are using the same patient field. 
                      Each patient field should only be mapped once per block.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Mapping List */}
                <div className="space-y-3">
                  {mapping.mappings.map((fieldMapping, index) => (
                    <Card key={fieldMapping.id} className="border-2">
                      <CardContent className="pt-4 pb-3">
                        <div className="flex gap-3 items-start">
                          <div className="flex-1 space-y-3">
                            {/* Patient Field Selection */}
                            <div className="space-y-2">
                              <Label htmlFor={`patient-field-${fieldMapping.id}`} className="text-xs font-medium">
                                Patient Field <span className="text-destructive">*</span>
                              </Label>
                              <Select
                                value={fieldMapping.patientField}
                                onValueChange={(value) => handleUpdateMapping(fieldMapping.id, 'patientField', value)}
                              >
                                <SelectTrigger id={`patient-field-${fieldMapping.id}`} className="w-full">
                                  <SelectValue placeholder="Select a patient field..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {PATIENT_FIELDS.map((field) => {
                                    const isUsed = selectedFields.includes(field.value) && 
                                                   fieldMapping.patientField !== field.value;
                                    return (
                                      <SelectItem 
                                        key={field.value} 
                                        value={field.value}
                                        disabled={isUsed}
                                      >
                                        {field.label} {isUsed && "(already mapped)"}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Object Path */}
                            <div className="space-y-2">
                              <Label htmlFor={`object-path-${fieldMapping.id}`} className="text-xs font-medium">
                                Object Path <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id={`object-path-${fieldMapping.id}`}
                                value={fieldMapping.objectPath}
                                onChange={(e) => handleUpdateMapping(fieldMapping.id, 'objectPath', e.target.value)}
                                placeholder="e.g., height or measurements.weight"
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">
                                Path to the value in the response data (use dot notation for nested fields)
                              </p>
                            </div>

                            {/* Mapping Preview */}
                            {fieldMapping.patientField && fieldMapping.objectPath && (
                              <div className="rounded-md bg-muted px-3 py-2">
                                <code className="text-xs">
                                  response.{fieldMapping.objectPath} → patient.{fieldMapping.patientField}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMapping(fieldMapping.id)}
                            disabled={mapping.mappings.length === 1}
                            className="mt-6 h-9 w-9 shrink-0"
                            title="Remove mapping"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Mapping Counter */}
                        <div className="mt-2 text-xs text-muted-foreground">
                          Mapping {index + 1} of {mapping.mappings.length}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Mapping Button */}
                <Button
                  onClick={handleAddMapping}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Patient Field Mapping
                </Button>

                {/* Summary Section */}
                {mapping.mappings.some(m => m.patientField && m.objectPath) && (
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium mb-2">Active Mappings Summary:</p>
                    <div className="space-y-1">
                      {mapping.mappings
                        .filter(m => m.patientField && m.objectPath)
                        .map(m => (
                          <div key={m.id} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="font-mono bg-muted px-2 py-0.5 rounded">{m.objectPath}</span>
                            <span>→</span>
                            <span className="font-mono bg-muted px-2 py-0.5 rounded">
                              {PATIENT_FIELDS.find(f => f.value === m.patientField)?.label}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};