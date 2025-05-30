import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Define supported units and their relative sizes (assuming a base of 16px for em/rem)
const units = ["px", "em", "rem", "%", "pt", "pc", "in", "cm", "mm"];

// Conversion factors relative to px (assuming base font size 16px, 1 inch = 96px)
// % conversion is relative to a base value, handled separately
const conversionFactors: { [key: string]: number } = {
  "px": 1,
  "em": 16, // Assuming 1em = 16px base
  "rem": 16, // Assuming 1rem = 16px base
  "pt": 16 / 12, // 1pt = 1/72 inch, 1 inch = 96px, so 1pt = 96/72 px = 4/3 px
  "pc": 16, // 1pc = 12pt = 16px
  "in": 96, // 1 inch = 96px
  "cm": 96 / 2.54, // 1cm = 1/2.54 inch
  "mm": 96 / 25.4, // 1mm = 1/10 cm
};

const CssUnitConverterPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<string>("px");
  const [basePx, setBasePx] = useState<string>("16"); // Base for em/rem/%

  const convertedValues = useMemo(() => {
    const value = parseFloat(inputValue);
    const base = parseFloat(basePx);

    if (isNaN(value) || isNaN(base) || base <= 0) {
      // Return empty object or null to indicate invalid input
      return null;
    }

    let valueInPx: number;

    if (inputUnit === "%") {
       // % is relative to the base value
       valueInPx = (value / 100) * base;
    } else if (conversionFactors[inputUnit]) {
      valueInPx = value * conversionFactors[inputUnit];
    } else {
      // Should not happen if inputUnit is in `units` array
      return null;
    }

    const results: { [key: string]: number | string } = {};

    units.forEach(unit => {
      if (unit === "%") {
         // Convert px back to % relative to base
         results[unit] = ((valueInPx / base) * 100);
      } else if (conversionFactors[unit]) {
         results[unit] = valueInPx / conversionFactors[unit];
      }
    });

    return results;

  }, [inputValue, inputUnit, basePx]);

  const handleClear = () => {
    setInputValue("");
    setInputUnit("px");
    setBasePx("16");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Value copied!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>CSS Unit Converter</CardTitle>
          <CardDescription>
            Convert values between different CSS units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input Value and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="inputValue">Value</Label>
                <Input
                  id="inputValue"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., 16"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inputUnit">Unit</Label>
                <Select value={inputUnit} onValueChange={setInputUnit}>
                  <SelectTrigger id="inputUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Base PX for em/rem/% */}
              <div className="space-y-2">
                <Label htmlFor="basePx">Base PX (for em/rem/%)</Label>
                <Input
                  id="basePx"
                  type="number"
                  value={basePx}
                  onChange={(e) => setBasePx(e.target.value)}
                  placeholder="e.g., 16"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Converted Values */}
            {convertedValues && (Object.keys(convertedValues).length > 0) && (
              <div className="space-y-4">
                 <h3 className="text-lg font-medium">Converted Values</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {units.map(unit => {
                       const value = convertedValues[unit];
                       // Hide the input unit from the results unless it's % and the input is not %
                       if (unit === inputUnit && inputUnit !== "%" || value === undefined) return null;

                       return (
                          <Card key={unit} className="bg-muted">
                             <CardContent className="p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                   <div className="text-sm text-muted-foreground">{unit.toUpperCase()}</div>
                                   <div className="font-mono font-medium">
                                      {typeof value === "number" ? value.toFixed(4) : value}
                                      {unit === "%" ? "%" : unit}
                                   </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`${typeof value === "number" ? value.toFixed(4) : value}${unit === "%" ? "%" : unit}`)}>
                                   Copy
                                </Button>
                             </CardContent>
                          </Card>
                       );
                    })}
                 </div>
              </div>
            )}

            {/* Clear Button */}
            <div>
              <Button variant="outline" onClick={handleClear} disabled={!inputValue && !basePx}>
                Clear
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CssUnitConverterPage; 