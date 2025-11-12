import React, { forwardRef, useState, useEffect, useMemo } from "react";
import { Calculator, Activity, TrendingDown, ChevronRight, ChevronLeft } from "lucide-react";
import { themes } from "@/packages/survey-form-package/src/themes";
import { useSurveyForm } from "@/packages/survey-form-package/src/context/SurveyFormContext";
import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { Label } from "@/packages/survey-form-package/src/components/ui/label";
import { Button } from "@/packages/survey-form-package/src/components/ui/button";
import { Card } from "@/packages/survey-form-package/src/components/ui/card";
import { Slider } from "@/packages/survey-form-package/src/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/packages/survey-form-package/src/components/ui/select";
import { Progress } from "@/packages/survey-form-package/src/components/ui/progress";
import { Badge } from "@/packages/survey-form-package/src/components/ui/badge";
import { Separator } from "@/packages/survey-form-package/src/components/ui/separator";
import { cn } from "@/packages/survey-form-package/src/lib/utils";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { BlockData, BlockDefinition, BlockRendererProps, ContentBlockItemProps } from "@/packages/survey-form-package/src";

// ============================================================================
// TYPES
// ============================================================================

export type InteractiveBmiValue = {
  weight: number;
  heightFeet: number;
  heightInches: number;
  bmi: number;
  targetWeightLossPercentage: number;
  timeframe: number; // weeks
};

// ============================================================================
// UTILITIES
// ============================================================================

const calculateBMI = (weightLbs: number, heightFeet: number, heightInches: number): number => {
  if (!weightLbs || (!heightFeet && !heightInches)) return 0;
  const totalInches = (heightFeet * 12) + heightInches;
  if (totalInches <= 0) return 0;
  // BMI = (weight in pounds / (height in inches)²) × 703
  const bmi = (weightLbs / (totalInches * totalInches)) * 703;
  return Math.round(bmi * 10) / 10;
};

const getBMICategory = (bmi: number): { label: string; color: string; description: string } => {
  if (bmi < 18.5) {
    return { label: "Underweight", color: "#3B82F6", description: "Below healthy weight range" };
  } else if (bmi < 25) {
    return { label: "Normal", color: "#10B981", description: "Healthy weight range" };
  } else if (bmi < 30) {
    return { label: "Overweight", color: "#F59E0B", description: "Above healthy weight range" };
  } else {
    return { label: "Obese", color: "#EF4444", description: "Significantly above healthy weight" };
  }
};

const generateWeightLossData = (
  currentWeight: number,
  targetPercentage: number,
  weeks: number
): Array<{ week: string; current: number; projected: number; healthy: number }> => {
  const targetWeight = currentWeight * (1 - targetPercentage / 100);
  const weeklyLoss = (currentWeight - targetWeight) / weeks;
  const healthyLossPerWeek = 2; // 2 lbs per week is considered healthy max
  
  const data = [];
  for (let i = 0; i <= weeks; i++) {
    const projectedWeight = currentWeight - (weeklyLoss * i);
    const healthyWeight = currentWeight - Math.min(healthyLossPerWeek * i, currentWeight - targetWeight);
    
    data.push({
      week: i === 0 ? "Start" : `Week ${i}`,
      current: Math.round(currentWeight * 10) / 10,
      projected: Math.round(projectedWeight * 10) / 10,
      healthy: Math.round(healthyWeight * 10) / 10,
    });
  }
  
  return data;
};

// ============================================================================
// BUILDER COMPONENTS
// ============================================================================

const InteractiveBmiBlockForm: React.FC<ContentBlockItemProps> = ({ data, onUpdate }) => {
  const handle = (field: string, value: any) => onUpdate?.({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Basic Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={data.fieldName || ""}
              onChange={(e) => handle("fieldName", e.target.value)}
              placeholder="bmiCalculator"
            />
            <p className="text-xs text-muted-foreground">Unique identifier for storing responses</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title || ""}
              onChange={(e) => handle("title", e.target.value)}
              placeholder="BMI Calculator & Weight Loss Planner"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={data.description || ""}
            onChange={(e) => handle("description", e.target.value)}
            placeholder="Calculate your BMI and visualize your weight loss journey"
          />
        </div>
      </div>

      <Separator />

      {/* Weight Loss Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Weight Loss Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minWeightLoss">Min Weight Loss (%)</Label>
            <Input
              id="minWeightLoss"
              type="number"
              value={data.minWeightLossPercentage || 5}
              onChange={(e) => handle("minWeightLossPercentage", Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxWeightLoss">Max Weight Loss (%)</Label>
            <Input
              id="maxWeightLoss"
              type="number"
              value={data.maxWeightLossPercentage || 25}
              onChange={(e) => handle("maxWeightLossPercentage", Number(e.target.value))}
              min={5}
              max={50}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="defaultWeightLoss">Default Weight Loss (%)</Label>
            <Input
              id="defaultWeightLoss"
              type="number"
              value={data.defaultWeightLossPercentage || 10}
              onChange={(e) => handle("defaultWeightLossPercentage", Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minTimeframe">Min Timeframe (weeks)</Label>
            <Input
              id="minTimeframe"
              type="number"
              value={data.minTimeframeWeeks || 4}
              onChange={(e) => handle("minTimeframeWeeks", Number(e.target.value))}
              min={1}
              max={52}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxTimeframe">Max Timeframe (weeks)</Label>
            <Input
              id="maxTimeframe"
              type="number"
              value={data.maxTimeframeWeeks || 24}
              onChange={(e) => handle("maxTimeframeWeeks", Number(e.target.value))}
              min={4}
              max={52}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Visual Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Visual Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chartType">Chart Type</Label>
            <Select 
              value={data.chartType || "area"}
              onValueChange={(value) => handle("chartType", value)}
            >
              <SelectTrigger id="chartType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              type="color"
              value={data.primaryColor || "#3B82F6"}
              onChange={(e) => handle("primaryColor", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="showHealthyPace">Show Healthy Pace Line</Label>
            <Select 
              value={data.showHealthyPace ? "true" : "false"}
              onValueChange={(value) => handle("showHealthyPace", value === "true")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="animateChart">Animate Chart</Label>
            <Select 
              value={data.animateChart !== false ? "true" : "false"}
              onValueChange={(value) => handle("animateChart", value === "true")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Labels Customization */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Labels & Text</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weightLabel">Weight Label</Label>
            <Input
              id="weightLabel"
              value={data.weightLabel || "Weight (lbs)"}
              onChange={(e) => handle("weightLabel", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="heightLabel">Height Label</Label>
            <Input
              id="heightLabel"
              value={data.heightLabel || "Height"}
              onChange={(e) => handle("heightLabel", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calculateButtonText">Calculate Button Text</Label>
            <Input
              id="calculateButtonText"
              value={data.calculateButtonText || "Calculate BMI"}
              onChange={(e) => handle("calculateButtonText", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resultsTitle">Results Title</Label>
            <Input
              id="resultsTitle"
              value={data.resultsTitle || "Your BMI Results"}
              onChange={(e) => handle("resultsTitle", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveBmiBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">{data.title || "BMI Calculator"}</h3>
      </div>
      {data.description && (
        <p className="text-sm text-muted-foreground">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-muted rounded">
          <span className="text-muted-foreground">Weight Loss:</span>
          <span className="ml-1 font-medium">{data.minWeightLossPercentage || 5}% - {data.maxWeightLossPercentage || 25}%</span>
        </div>
        <div className="p-2 bg-muted rounded">
          <span className="text-muted-foreground">Timeframe:</span>
          <span className="ml-1 font-medium">{data.minTimeframeWeeks || 4} - {data.maxTimeframeWeeks || 24} weeks</span>
        </div>
      </div>
      <div className="h-20 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
        Interactive BMI Calculator Preview
      </div>
    </Card>
  );
};

const InteractiveBmiBlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-4/5 border rounded-md p-2 text-xs text-muted-foreground bg-muted/30">
        BMI Calculator
      </div>
    </div>
  );
};

// ============================================================================
// RENDERER COMPONENT
// ============================================================================

const InteractiveBmiRenderer = forwardRef<HTMLDivElement, BlockRendererProps>(
  ({ block, value, onChange, onBlur, error, disabled, theme }, ref) => {
    const themeConfig = theme ?? themes.default;
    const { goToNextBlock } = useSurveyForm();
    
    // Parse stored value
    const parsed: InteractiveBmiValue = useMemo(() => {
      if (!value) return {
        weight: 0,
        heightFeet: 0,
        heightInches: 0,
        bmi: 0,
        targetWeightLossPercentage: block.defaultWeightLossPercentage || 10,
        timeframe: 12
      };
      try {
        if (typeof value === "string") return JSON.parse(value);
        return value as InteractiveBmiValue;
      } catch {
        return {
          weight: 0,
          heightFeet: 0,
          heightInches: 0,
          bmi: 0,
          targetWeightLossPercentage: block.defaultWeightLossPercentage || 10,
          timeframe: 12
        };
      }
    }, [value, block.defaultWeightLossPercentage]);

    // Local state
    const [currentStep, setCurrentStep] = useState(0);
    const [localWeight, setLocalWeight] = useState(parsed.weight || 0);
    const [localHeightFeet, setLocalHeightFeet] = useState(parsed.heightFeet || 0);
    const [localHeightInches, setLocalHeightInches] = useState(parsed.heightInches || 0);
    const [targetLossPercentage, setTargetLossPercentage] = useState(parsed.targetWeightLossPercentage);
    const [timeframe, setTimeframe] = useState(parsed.timeframe);
    
    // Calculate BMI in real-time
    const liveBmi = useMemo(() => {
      return calculateBMI(localWeight, localHeightFeet, localHeightInches);
    }, [localWeight, localHeightFeet, localHeightInches]);
    
    const bmiCategory = useMemo(() => {
      return getBMICategory(liveBmi);
    }, [liveBmi]);
    
    // Generate chart data
    const chartData = useMemo(() => {
      if (localWeight <= 0) return [];
      return generateWeightLossData(localWeight, targetLossPercentage, timeframe);
    }, [localWeight, targetLossPercentage, timeframe]);
    
    // Update parent value
    const updateValue = () => {
      const newValue: InteractiveBmiValue = {
        weight: localWeight,
        heightFeet: localHeightFeet,
        heightInches: localHeightInches,
        bmi: liveBmi,
        targetWeightLossPercentage: targetLossPercentage,
        timeframe: timeframe
      };
      onChange?.(newValue as any);
    };
    
    useEffect(() => {
      if (liveBmi > 0) {
        updateValue();
      }
    }, [liveBmi, targetLossPercentage, timeframe]);
    
    const handleCalculate = () => {
      if (localWeight > 0 && (localHeightFeet > 0 || localHeightInches > 0)) {
        updateValue();
        setCurrentStep(1);
      }
    };
    
    const ChartComponent = block.chartType === "line" ? LineChart : AreaChart;
    const DataComponent = block.chartType === "line" ? Line : Area;
    
    return (
      <div ref={ref} className="w-full min-w-0 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className={cn("text-2xl font-bold", themeConfig.field.label)} style={{ color: themeConfig.colors.primary }}>
            {block.title || "BMI Calculator & Weight Loss Planner"}
          </h2>
          {block.description && (
            <p className={cn("mt-2", themeConfig.field.description)}>{block.description}</p>
          )}
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-center gap-2">
          <div className={cn("w-12 h-1 rounded-full transition-colors", currentStep >= 0 ? "bg-primary" : "bg-gray-200")} 
               style={{ backgroundColor: currentStep >= 0 ? themeConfig.colors.primary : undefined }} />
          <div className={cn("w-12 h-1 rounded-full transition-colors", currentStep >= 1 ? "bg-primary" : "bg-gray-200")} 
               style={{ backgroundColor: currentStep >= 1 ? themeConfig.colors.primary : undefined }} />
        </div>
        
        {/* Step 1: Input */}
        {currentStep === 0 && (
          <Card className={cn("p-6 space-y-6", themeConfig.field.agreementContainer)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight" className={themeConfig.field.label}>
                  {block.weightLabel || "Weight (lbs)"}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={localWeight || ""}
                  onChange={(e) => setLocalWeight(Number(e.target.value))}
                  placeholder="Enter your weight"
                  disabled={disabled}
                  className={cn(themeConfig.field.input)}
                  min={0}
                  max={1000}
                />
              </div>
              
              {/* Height Input */}
              <div className="space-y-2">
                <Label className={themeConfig.field.label}>
                  {block.heightLabel || "Height"}
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={localHeightFeet || ""}
                      onChange={(e) => setLocalHeightFeet(Number(e.target.value))}
                      placeholder="Feet"
                      disabled={disabled}
                      className={cn(themeConfig.field.input)}
                      min={0}
                      max={8}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={localHeightInches || ""}
                      onChange={(e) => setLocalHeightInches(Number(e.target.value))}
                      placeholder="Inches"
                      disabled={disabled}
                      className={cn(themeConfig.field.input)}
                      min={0}
                      max={11}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Live BMI Display */}
            {liveBmi > 0 && (
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="text-sm text-muted-foreground">Current BMI</div>
                <div className="text-3xl font-bold" style={{ color: bmiCategory.color }}>
                  {liveBmi}
                </div>
                <Badge variant="outline" style={{ borderColor: bmiCategory.color, color: bmiCategory.color }}>
                  {bmiCategory.label}
                </Badge>
                <div className="text-xs text-muted-foreground">{bmiCategory.description}</div>
              </div>
            )}
            
            <Button 
              onClick={handleCalculate}
              disabled={!localWeight || (!localHeightFeet && !localHeightInches) || disabled}
              className="w-full"
              style={{ backgroundColor: themeConfig.colors.primary }}
            >
              {block.calculateButtonText || "Calculate BMI"} <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        )}
        
        {/* Step 2: Results & Chart */}
        {currentStep === 1 && (
          <Card className={cn("p-6 space-y-6", themeConfig.field.agreementContainer)}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{block.resultsTitle || "Your BMI Results"}</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentStep(0)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            </div>
            
            {/* BMI Result Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-sm text-muted-foreground">Your BMI</div>
                <div className="text-2xl font-bold mt-1" style={{ color: bmiCategory.color }}>
                  {liveBmi}
                </div>
                <Badge variant="outline" className="mt-2" style={{ borderColor: bmiCategory.color, color: bmiCategory.color }}>
                  {bmiCategory.label}
                </Badge>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-sm text-muted-foreground">Current Weight</div>
                <div className="text-2xl font-bold mt-1">{localWeight} lbs</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Height: {localHeightFeet}'{localHeightInches}"
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-sm text-muted-foreground">Target Weight</div>
                <div className="text-2xl font-bold mt-1">
                  {Math.round(localWeight * (1 - targetLossPercentage / 100))} lbs
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  -{targetLossPercentage}% loss
                </div>
              </Card>
            </div>
            
            {/* Weight Loss Controls */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Target Weight Loss</Label>
                  <span className="text-sm font-medium">{targetLossPercentage}%</span>
                </div>
                <Slider
                  value={[targetLossPercentage]}
                  onValueChange={(v) => setTargetLossPercentage(v[0])}
                  min={block.minWeightLossPercentage || 5}
                  max={block.maxWeightLossPercentage || 25}
                  step={1}
                  disabled={disabled}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{block.minWeightLossPercentage || 5}%</span>
                  <span>{Math.round(localWeight * (targetLossPercentage / 100))} lbs loss</span>
                  <span>{block.maxWeightLossPercentage || 25}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Timeframe</Label>
                  <span className="text-sm font-medium">{timeframe} weeks</span>
                </div>
                <Slider
                  value={[timeframe]}
                  onValueChange={(v) => setTimeframe(v[0])}
                  min={block.minTimeframeWeeks || 4}
                  max={block.maxTimeframeWeeks || 24}
                  step={1}
                  disabled={disabled}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{block.minTimeframeWeeks || 4} weeks</span>
                  <span>{Math.round((localWeight * (targetLossPercentage / 100)) / timeframe * 10) / 10} lbs/week</span>
                  <span>{block.maxTimeframeWeeks || 24} weeks</span>
                </div>
              </div>
            </div>
            
            {/* Weight Loss Chart */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Weight Loss Projection
              </h4>
              
              <ResponsiveContainer width="100%" height={300}>
                <ChartComponent data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.colors.border} />
                  <XAxis 
                    dataKey="week" 
                    stroke={themeConfig.colors.text}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={themeConfig.colors.text}
                    fontSize={12}
                    domain={[(dataMin: number) => Math.floor(dataMin * 0.9), 'dataMax']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: themeConfig.colors.background,
                      border: `1px solid ${themeConfig.colors.border}`,
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  
                  <ReferenceLine 
                    y={localWeight} 
                    stroke={themeConfig.colors.text} 
                    strokeDasharray="3 3" 
                    label={{ value: "Starting", fontSize: 10 }}
                  />
                  
                  {block.showHealthyPace !== false && (
                    <DataComponent
                      type="monotone"
                      dataKey="healthy"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Healthy Pace (2 lbs/week)"
                      animationDuration={block.animateChart !== false ? 1000 : 0}
                    />
                  )}
                  
                  <DataComponent
                    type="monotone"
                    dataKey="projected"
                    stroke={block.primaryColor || themeConfig.colors.primary}
                    fill={block.primaryColor || themeConfig.colors.primary}
                    fillOpacity={0.4}
                    strokeWidth={3}
                    name="Your Target"
                    animationDuration={block.animateChart !== false ? 1500 : 0}
                  />
                </ChartComponent>
              </ResponsiveContainer>
              
              {/* Weekly Loss Rate Warning */}
              {(localWeight * (targetLossPercentage / 100)) / timeframe > 2 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
                  <strong>Note:</strong> Losing more than 2 lbs per week may not be sustainable. Consider extending your timeframe for healthier results.
                </div>
              )}
            </div>
            
            {/* Continue Button */}
            <Button 
              onClick={goToNextBlock}
              className="w-full"
              style={{ backgroundColor: themeConfig.colors.primary }}
            >
              Continue <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        )}
        
        {/* Error Display */}
        {error && (
          <div className={cn("text-sm font-medium text-center", themeConfig.field.error)}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

InteractiveBmiRenderer.displayName = "InteractiveBmiRenderer";

// ============================================================================
// BLOCK DEFINITION
// ============================================================================

export const InteractiveBmiBlock: BlockDefinition = {
  type: "interactiveBmi",
  name: "Interactive BMI Calculator",
  description: "BMI calculator with weight loss visualization charts",
  icon: <Calculator className="w-4 h-4" />,
  defaultData: {
    type: "interactiveBmi",
    fieldName: "bmiCalculator",
    title: "BMI Calculator & Weight Loss Planner",
    description: "Calculate your BMI and visualize your weight loss journey",
    weightLabel: "Weight (lbs)",
    heightLabel: "Height",
    calculateButtonText: "Calculate BMI",
    resultsTitle: "Your BMI Results",
    minWeightLossPercentage: 5,
    maxWeightLossPercentage: 25,
    defaultWeightLossPercentage: 10,
    minTimeframeWeeks: 4,
    maxTimeframeWeeks: 24,
    chartType: "area",
    primaryColor: "#3B82F6",
    showHealthyPace: true,
    animateChart: true,
    required: false,
    isCustom: true,
  },
  renderItem: (props) => <InteractiveBmiBlockItem {...props} />,
  renderFormFields: (props) => <InteractiveBmiBlockForm {...props} />,
  renderPreview: () => <InteractiveBmiBlockPreview />,
  renderBlock: (props) => <InteractiveBmiRenderer {...props} />,
  validate: (data: BlockData) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.title) return "Title is required";
    if (data.minWeightLossPercentage >= data.maxWeightLossPercentage) {
      return "Max weight loss percentage must be greater than min";
    }
    if (data.minTimeframeWeeks >= data.maxTimeframeWeeks) {
      return "Max timeframe must be greater than min timeframe";
    }
    return null;
  },
  validateValue: (value: any, data: BlockData) => {
    if (data.required) {
      let v: InteractiveBmiValue;
      try { 
        v = typeof value === "string" ? JSON.parse(value) : (value || {});
      } catch {
        return "Invalid BMI data";
      }
      if (!v.weight || !v.bmi) return "Please complete the BMI calculation";
    }
    return null;
  },
};