import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming Select components are available

// Define available units and conversion factors (simplified for now)
const units = {
  length: [
    { value: 'meter', label: 'Meter', factor: 1 },
    { value: 'kilometer', label: 'Kilometer', factor: 1000 },
    { value: 'centimeter', label: 'Centimeter', factor: 0.01 },
    { value: 'millimeter', label: 'Millimeter', factor: 0.001 },
    { value: 'inch', label: 'Inch', factor: 0.0254 },
    { value: 'feet', label: 'Feet', factor: 0.3048 },
    { value: 'yard', label: 'Yard', factor: 0.9144 },
    { value: 'mile', label: 'Mile', factor: 1609.34 },
  ],
  temperature: [
    { value: 'celsius', label: 'Celsius' },
    { value: 'fahrenheit', label: 'Fahrenheit' },
    { value: 'kelvin', label: 'Kelvin' },
  ],
  weight: [
    { value: 'gram', label: 'Gram', factor: 1 },
    { value: 'kilogram', label: 'Kilogram', factor: 1000 },
    { value: 'milligram', label: 'Milligram', factor: 0.001 },
    { value: 'pound', label: 'Pound', factor: 453.592 },
    { value: 'ounce', label: 'Ounce', factor: 28.3495 },
    { value: 'ton', label: 'Ton (metric)', factor: 1000000 },
  ],
  volume: [
    { value: 'liter', label: 'Liter', factor: 1 },
    { value: 'milliliter', label: 'Milliliter', factor: 0.001 },
    { value: 'gallon', label: 'Gallon (US liquid)', factor: 3.78541 },
    { value: 'quart', label: 'Quart (US liquid)', factor: 0.946353 },
    { value: 'pint', label: 'Pint (US liquid)', factor: 0.473176 },
    { value: 'cup', label: 'Cup (US liquid)', factor: 0.236588 },
    { value: 'fluid-ounce', label: 'Fluid Ounce (US)', factor: 0.0295735 },
    { value: 'cubic-meter', label: 'Cubic Meter', factor: 1000 },
    { value: 'cubic-centimeter', label: 'Cubic Centimeter', factor: 0.001 },
  ]
};

// Define conversion logic for different types
const convertValue = (value: number, fromUnit: string, toUnit: string, unitType: 'length' | 'temperature' | 'weight' | 'volume'): number | null => {
  if (unitType === 'length') {
    const from = units.length.find(u => u.value === fromUnit);
    const to = units.length.find(u => u.value === toUnit);
    if (from && to) {
      // Convert to base unit (meter), then to target unit
      return (value * from.factor) / to.factor;
    }
  } else if (unitType === 'temperature') {
    // Temperature conversions require formulas, not just factors
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (value * 9/5) + 32;
    if (fromUnit === 'celsius' && toUnit === 'kelvin') return value + 273.15;
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (value - 32) * 5/9;
    if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((value - 32) * 5/9) + 273.15;
    if (fromUnit === 'kelvin' && toUnit === 'celsius') return value - 273.15;
    if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((value - 273.15) * 9/5) + 32;
    // Same unit conversion
    if (fromUnit === toUnit) return value;
  } else if (unitType === 'weight') {
     const from = units.weight.find(u => u.value === fromUnit);
    const to = units.weight.find(u => u.value === toUnit);
    if (from && to) {
      // Convert to base unit (gram), then to target unit
      return (value * from.factor) / to.factor;
    }
  } else if (unitType === 'volume') {
     const from = units.volume.find(u => u.value === fromUnit);
    const to = units.volume.find(u => u.value === toUnit);
    if (from && to) {
      // Convert to base unit (liter), then to target unit
      return (value * from.factor) / to.factor;
    }
  }

  // Return null if conversion is not possible or units not found
  return null;
};

const UnitConverterPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputUnit, setInputUnit] = useState('meter'); // Default input unit
  const [outputUnit, setOutputUnit] = useState('kilometer'); // Default output unit
  const [unitType, setUnitType] = useState<'length' | 'temperature' | 'weight' | 'volume'>('length'); // Default unit type

  const convertedValue = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return '';
    }
     // Reset units when unit type changes if the current units are not in the new type
    const availableUnits = units[unitType].map(u => u.value);
    if (!availableUnits.includes(inputUnit)) setInputUnit(units[unitType][0].value);
    if (!availableUnits.includes(outputUnit)) setOutputUnit(units[unitType][0].value);

    const result = convertValue(value, inputUnit, outputUnit, unitType);
    return result !== null ? result.toFixed(4) : 'Invalid conversion';
  }, [inputValue, inputUnit, outputUnit, unitType]);

   // Effect to reset units when unitType changes
   useEffect(() => {
    const availableUnits = units[unitType].map(u => u.value);
    if (!availableUnits.includes(inputUnit)) setInputUnit(units[unitType][0].value);
    if (!availableUnits.includes(outputUnit)) setOutputUnit(units[unitType][0].value);
  }, [unitType, inputUnit, outputUnit]); // Added dependencies for effect

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unit Converter</h1>
      
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader><CardTitle className="dark:text-slate-100">Convert Units</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* Unit Type Selection */}
           <div>
            <Label htmlFor="unitType" className="dark:text-slate-200">Unit Type:</Label>
            <Select value={unitType} onValueChange={setUnitType as any}>
              <SelectTrigger className="w-[180px] mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50">
                <SelectValue placeholder="Select a unit type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50">
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input */}
          <div>
            <Label htmlFor="inputValue" className="dark:text-slate-200">Input Value:</Label>
            <Input
              id="inputValue"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value..."
              className="mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inputUnit" className="dark:text-slate-200">From Unit:</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger className="w-full mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50">
                  {units[unitType].map(unit => (
                    <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="outputUnit" className="dark:text-slate-200">To Unit:</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger className="w-full mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50">
                   {units[unitType].map(unit => (
                    <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Output */}
          <div>
            <Label htmlFor="convertedValue" className="dark:text-slate-200">Converted Value:</Label>
            <Input
              id="convertedValue"
              readOnly
              value={convertedValue}
              placeholder="Result..."
              className="mt-1 bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverterPage; 