import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type CalculationMode = "percentage-of" | "what-percent" | "percent-of-what";

const PercentageCalculatorPage = () => {
  const [mode, setMode] = useState<CalculationMode>("percentage-of");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculateResult = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      toast.error("Please enter valid numbers");
      return;
    }

    let calculatedResult: number;

    switch (mode) {
      case "percentage-of":
        calculatedResult = (num1 / 100) * num2;
        break;
      case "what-percent":
        calculatedResult = (num1 / num2) * 100;
        break;
      case "percent-of-what":
        calculatedResult = (num1 * 100) / num2;
        break;
    }

    setResult(calculatedResult);
  };

  const handleClear = () => {
    setValue1("");
    setValue2("");
    setResult(null);
  };

  const getInputLabels = () => {
    switch (mode) {
      case "percentage-of":
        return {
          label1: "Percentage",
          label2: "Number",
          placeholder1: "Enter percentage",
          placeholder2: "Enter number",
          suffix1: "%",
          suffix2: "",
        };
      case "what-percent":
        return {
          label1: "Number",
          label2: "Total",
          placeholder1: "Enter number",
          placeholder2: "Enter total",
          suffix1: "",
          suffix2: "",
        };
      case "percent-of-what":
        return {
          label1: "Number",
          label2: "Percentage",
          placeholder1: "Enter number",
          placeholder2: "Enter percentage",
          suffix1: "",
          suffix2: "%",
        };
    }
  };

  const getResultText = () => {
    if (result === null) return "";
    
    switch (mode) {
      case "percentage-of":
        return `${value1}% of ${value2} = ${result}`;
      case "what-percent":
        return `${value1} is ${result.toFixed(2)}% of ${value2}`;
      case "percent-of-what":
        return `${value1} is ${value2}% of ${result.toFixed(2)}`;
    }
  };

  const labels = getInputLabels();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Basic Percentage Calculator</CardTitle>
          <CardDescription>
            Calculate percentages in three different ways
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RadioGroup
              value={mode}
              onValueChange={(value) => {
                setMode(value as CalculationMode);
                handleClear();
              }}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage-of" id="percentage-of" />
                <Label htmlFor="percentage-of">What is X% of Y?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="what-percent" id="what-percent" />
                <Label htmlFor="what-percent">X is what percent of Y?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percent-of-what" id="percent-of-what" />
                <Label htmlFor="percent-of-what">X is Y% of what?</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value1">{labels.label1}</Label>
                <div className="relative">
                  <Input
                    id="value1"
                    type="number"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder={labels.placeholder1}
                    className={labels.suffix1 ? "pr-7" : ""}
                    min="0"
                    step="0.01"
                  />
                  {labels.suffix1 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {labels.suffix1}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value2">{labels.label2}</Label>
                <div className="relative">
                  <Input
                    id="value2"
                    type="number"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder={labels.placeholder2}
                    className={labels.suffix2 ? "pr-7" : ""}
                    min="0"
                    step="0.01"
                  />
                  {labels.suffix2 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {labels.suffix2}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateResult} disabled={!value1 || !value2}>
                Calculate
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!value1 && !value2}>
                Clear
              </Button>
            </div>

            {result !== null && (
              <Card className="bg-muted">
                <CardContent className="p-6">
                  <div className="text-center text-lg font-medium">
                    {getResultText()}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentageCalculatorPage; 