import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ColorPickerPage = () => {
  const [hexColor, setHexColor] = useState('#007bff');

  const { toast } = useToast();

  // Function to convert HEX to RGB (placeholder)
  const hexToRgb = (hex: string): string | null => {
    // Remove # if it exists
    const cleanHex = hex.replace('#', '');

    // Check for valid hex length (3 or 6)
    if (cleanHex.length !== 3 && cleanHex.length !== 6) {
      return null;
    }

    // Expand shorthand hex (e.g., #abc to #aabbcc)
    const fullHex = cleanHex.length === 3
      ? cleanHex.split('').map(char => char + char).join('')
      : cleanHex;

    // Parse hex to RGB
    const bigint = parseInt(fullHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Function to convert HEX to HSL (placeholder - requires HEX to RGB first)
  const hexToHsl = (hex: string): string | null => {
     const rgb = hexToRgb(hex);
     if (!rgb) return null;

     // Simple regex to extract RGB values
     const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
     if (!rgbMatch) return null;

     let r = parseInt(rgbMatch[1]) / 255;
     let g = parseInt(rgbMatch[2]) / 255;
     let b = parseInt(rgbMatch[3]) / 255;

     const max = Math.max(r, g, b);
     const min = Math.min(r, g, b);
     let h = 0;
     let s = 0;
     let l = (max + min) / 2;

     if (max === min) {
       h = 0; // achromatic
     } else {
       const d = max - min;
       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
       switch (max) {
         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
         case g: h = (b - r) / d + 2; break;
         case b: h = (r - g) / d + 4; break;
       }
       h /= 6;
     }

     return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const rgbColor = useMemo(() => hexToRgb(hexColor), [hexColor]);
  const hslColor = useMemo(() => hexToHsl(hexColor), [hexColor]);

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${format} Copied`,
      description: `${format} value has been copied to your clipboard.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Color Picker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Color Input and Preview Card */}
        <Card>
          <CardHeader><CardTitle>Select Color</CardTitle></CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <Label htmlFor="colorPicker">Choose a color:</Label>
            <Input
              id="colorPicker"
              type="color"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-32 h-32 p-1 border-none"
              style={{ backgroundColor: hexColor }}
            />
            <div 
              className="mt-4 w-full h-20 rounded-md"
              style={{ backgroundColor: hexColor }}
            ></div>
          </CardContent>
        </Card>

        {/* Color Formats Card */}
        <Card>
          <CardHeader><CardTitle>Color Formats</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* HEX Format */}
            <div>
              <Label htmlFor="hexInput">HEX:</Label>
              <div className="relative mt-1">
                <Input
                  id="hexInput"
                  readOnly
                  value={hexColor}
                  className="font-mono text-sm bg-muted pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2" 
                  onClick={() => handleCopy(hexColor, 'HEX')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* RGB Format */}
            <div>
              <Label htmlFor="rgbInput">RGB:</Label>
              <div className="relative mt-1">
                <Input
                  id="rgbInput"
                  readOnly
                  value={rgbColor || 'Invalid HEX'}
                  className="font-mono text-sm bg-muted pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2" 
                  onClick={() => rgbColor && handleCopy(rgbColor, 'RGB')}
                  disabled={!rgbColor}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* HSL Format */}
            <div>
              <Label htmlFor="hslInput">HSL:</Label>
              <div className="relative mt-1">
                <Input
                  id="hslInput"
                  readOnly
                  value={hslColor || 'Invalid HEX'}
                  className="font-mono text-sm bg-muted pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2" 
                  onClick={() => hslColor && handleCopy(hslColor, 'HSL')}
                  disabled={!hslColor}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPickerPage; 