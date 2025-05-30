import React, { useState, useMemo } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOff } from "lucide-react";

// Helper functions for HEX to RGB and RGB to HEX conversion
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    // Ensure the color value is between 0 and 255 before converting to hex
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Color transformation matrices for different types of color blindness (simplified)
// These are based on research and approximate the visual effect.
const protanopiaMatrix = [
  [0.56667, 0.43333, 0],
  [0.55833, 0.44167, 0],
  [0, 0.24167, 0.75833]
];

const deuteranopiaMatrix = [
  [0.625, 0.375, 0],
  [0.7, 0.3, 0],
  [0, 0.3, 0.7]
];

const tritanopiaMatrix = [
  [0.95, 0.05, 0],
  [0, 0.43333, 0.56667],
  [0, 0.475, 0.525]
];

// Function to apply a color transformation matrix to an RGB color
const applyColorMatrix = (rgb: { r: number; g: number; b: number }, matrix: number[][]): { r: number; g: number; b: number } => {
  const r = rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2];
  const g = rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2];
  const b = rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2];
  
  // Clamp RGB values to be within the 0-255 range
  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b))
  };
};

// Color transformation functions using the matrices
const simulateProtanopia = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex; // Return original if invalid hex
  const simulatedRgb = applyColorMatrix(rgb, protanopiaMatrix);
  return rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
};

const simulateDeuteranopia = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex; // Return original if invalid hex
  const simulatedRgb = applyColorMatrix(rgb, deuteranopiaMatrix);
  return rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
};

const simulateTritanopia = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex; // Return original if invalid hex
  const simulatedRgb = applyColorMatrix(rgb, tritanopiaMatrix);
  return rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
};

// Add other simulation types here if needed

export function ColorBlindnessSimulator() {
  const [colorInput, setColorInput] = useState('#FF0000, #00FF00, #0000FF, #FFFF00');
  const [colors, setColors] = useState<string[]>([]);

  const handleProcessColors = () => {
    // Simple split by comma and trim whitespace, filter for valid hex codes
    const inputColorArray = colorInput.split(',').map(color => color.trim()).filter(color => /^#[0-9A-F]{6}$/i.test(color));
    setColors(inputColorArray);
  };

  const simulatedColors = useMemo(() => {
    return colors.map(hex => ({
      original: hex,
      protanopia: simulateProtanopia(hex),
      deuteranopia: simulateDeuteranopia(hex),
      tritanopia: simulateTritanopia(hex),
      // Add other simulated types here
    }));
  }, [colors]);

  const handleClear = () => {
    setColorInput('');
    setColors([]);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Color Blindness Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="colorInput" className="dark:text-slate-200">Input Color Palette (comma-separated HEX codes)</Label>
          <Textarea
            id="colorInput"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="e.g., #FF0000, #00FF00, #0000FF, #FFFF00"
            rows={4}
            className="mt-1 font-mono dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={handleProcessColors} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"><EyeOff className="mr-2 h-4 w-4" /> Simulate</Button>
          <Button onClick={handleClear} variant="outline" className="ml-4 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">Clear</Button>
        </div>

        {simulatedColors.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-slate-100">Simulations:</h3>
            
            {/* Display Original Colors */}
            <div>
              <h4 className="text-base font-medium dark:text-slate-200">Original:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {simulatedColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-md border border-gray-300 shadow-sm dark:border-slate-600"
                    style={{ backgroundColor: color.original }}
                    title={`Original: ${color.original}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Display Protanopia */}
            <div>
              <h4 className="text-base font-medium dark:text-slate-200">Protanopia (Red-Weak):</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {simulatedColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-md border border-gray-300 shadow-sm dark:border-slate-600"
                    style={{ backgroundColor: color.protanopia }}
                    title={`Protanopia: ${color.protanopia}`}
                  ></div>
                ))}
              </div>
            </div>

             {/* Display Deuteranopia */}
            <div>
              <h4 className="text-base font-medium dark:text-slate-200">Deuteranopia (Green-Weak):</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {simulatedColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-md border border-gray-300 shadow-sm dark:border-slate-600"
                    style={{ backgroundColor: color.deuteranopia }}
                    title={`Deuteranopia: ${color.deuteranopia}`}
                  ></div>
                ))}
              </div>
            </div>

             {/* Display Tritanopia */}
            <div>
              <h4 className="text-base font-medium dark:text-slate-200">Tritanopia (Blue-Weak):</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {simulatedColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-md border border-gray-300 shadow-sm dark:border-slate-600"
                    style={{ backgroundColor: color.tritanopia }}
                    title={`Tritanopia: ${color.tritanopia}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Add other simulation types here */}

          </div>
        )}

      </CardContent>
    </Card>
  );
} 