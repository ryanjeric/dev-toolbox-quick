import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorInfo {
  name: string;
  rgb: string;
}

const ColorNamePage = () => {
  const [hexColor, setHexColor] = useState<string>("#");
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);

  const hexToRgb = (hex: string): string | null => {
    // Remove the # if present
    hex = hex.replace("#", "");

    // Handle both 3 and 6 character hex codes
    if (hex.length === 3) {
      hex = hex.split("").map(char => char + char).join("");
    }

    // Check if it's a valid 6 character hex code
    if (hex.length !== 6) return null;

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

    return `rgb(${r}, ${g}, ${b})`;
  };

  const getColorName = async (hex: string): Promise<string> => {
    try {
      const response = await fetch(`https://api.color.pizza/v1/${hex.replace("#", "")}`);
      const data = await response.json();
      return data.colors[0].name;
    } catch (error) {
      console.error("Error fetching color name:", error);
      return "Unknown Color";
    }
  };

  useEffect(() => {
    const updateColorInfo = async () => {
      if (hexColor.length === 7) { // Only process when we have a complete hex code
        const rgb = hexToRgb(hexColor);
        if (rgb) {
          try {
            const name = await getColorName(hexColor);
            setColorInfo({ name, rgb });
          } catch (error) {
            toast.error("Failed to fetch color name");
          }
        } else {
          setColorInfo(null);
        }
      }
    };

    updateColorInfo();
  }, [hexColor]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid hex characters
    if (/^#[0-9A-Fa-f]*$/.test(value)) {
      setHexColor(value);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexColor(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Name that Color</CardTitle>
          <CardDescription>
            Enter a hex color code or use the color picker to see its name and RGB values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hexColor">Hex Color Code</Label>
              <div className="flex gap-2">
                <Input
                  id="hexColor"
                  value={hexColor}
                  onChange={handleHexChange}
                  placeholder="#000000"
                  maxLength={7}
                  className="font-mono"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[60px] h-10 p-0"
                      style={{ backgroundColor: hexColor }}
                    >
                      <span className="sr-only">Pick a color</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <input
                      type="color"
                      value={hexColor}
                      onChange={handleColorPickerChange}
                      className="w-[200px] h-[200px] cursor-pointer"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {colorInfo && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: hexColor }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Color Name</p>
                    <p className="text-lg">{colorInfo.name}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">RGB Value</p>
                  <p className="font-mono">{colorInfo.rgb}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorNamePage; 