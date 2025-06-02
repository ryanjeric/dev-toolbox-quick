import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// Assuming you have a utility to convert color formats, otherwise you might need to implement it
// import { toHex } from "@/lib/utils";

// Simple helper function for hex to RGB conversion if toHex utility is not available or different
const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const BoxShadowGeneratorPage = () => {
  const [horizontalOffset, setHorizontalOffset] = useState(4);
  const [verticalOffset, setVerticalOffset] = useState(4);
  const [blurRadius, setBlurRadius] = useState(8);
  const [spreadRadius, setSpreadRadius] = useState(2);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.25);
  const [inset, setInset] = useState(false);

  const boxShadowCss = useMemo(() => {
    const rgb = hexToRgb(color);
    if (!rgb) return ""; // Handle invalid color input

    const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity.toFixed(2)})`;

    const shadow = `${inset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
    return shadow;
  }, [horizontalOffset, verticalOffset, blurRadius, spreadRadius, color, opacity, inset]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0]);
  };

  const handleHorizontalOffsetChange = (value: number[]) => {
    setHorizontalOffset(value[0]);
  };

  const handleVerticalOffsetChange = (value: number[]) => {
    setVerticalOffset(value[0]);
  };

  const handleBlurRadiusChange = (value: number[]) => {
    setBlurRadius(value[0]);
  };

  const handleSpreadRadiusChange = (value: number[]) => {
    setSpreadRadius(value[0]);
  };

  const handleClear = () => {
    setHorizontalOffset(0);
    setVerticalOffset(0);
    setBlurRadius(0);
    setSpreadRadius(0);
    setColor("#000000");
    setOpacity(1);
    setInset(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`box-shadow: ${text};`);
    toast.success("Box shadow CSS copied!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Box Shadow CSS Generator</CardTitle>
          <CardDescription>
            Generate CSS code for box shadows with live preview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Horizontal Offset */}
                <div className="space-y-2">
                  <Label htmlFor="horizontal-offset">Horizontal Offset ({horizontalOffset}px)</Label>
                  <Slider
                    id="horizontal-offset"
                    min={-50}
                    max={50}
                    step={1}
                    value={[horizontalOffset]}
                    onValueChange={handleHorizontalOffsetChange}
                  />
                </div>

                {/* Vertical Offset */}
                <div className="space-y-2">
                  <Label htmlFor="vertical-offset">Vertical Offset ({verticalOffset}px)</Label>
                  <Slider
                    id="vertical-offset"
                    min={-50}
                    max={50}
                    step={1}
                    value={[verticalOffset]}
                    onValueChange={handleVerticalOffsetChange}
                  />
                </div>

                {/* Blur Radius */}
                <div className="space-y-2">
                  <Label htmlFor="blur-radius">Blur Radius ({blurRadius}px)</Label>
                  <Slider
                    id="blur-radius"
                    min={0}
                    max={100}
                    step={1}
                    value={[blurRadius]}
                    onValueChange={handleBlurRadiusChange}
                  />
                </div>

                {/* Spread Radius */}
                <div className="space-y-2">
                  <Label htmlFor="spread-radius">Spread Radius ({spreadRadius}px)</Label>
                  <Slider
                    id="spread-radius"
                    min={-50}
                    max={50}
                    step={1}
                    value={[spreadRadius]}
                    onValueChange={handleSpreadRadiusChange}
                  />
                </div>

                {/* Color and Opacity */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input id="color" type="color" value={color} onChange={handleColorChange} className="h-10" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="opacity">Opacity ({opacity.toFixed(2)})</Label>
                     <Slider
                        id="opacity"
                        min={0}
                        max={1}
                        step={0.01}
                        value={[opacity]}
                        onValueChange={handleOpacityChange}
                     />
                   </div>
                </div>

                {/* Inset Checkbox */}
                 <div className="flex items-center space-x-2">
                   <Checkbox id="inset" checked={inset} onCheckedChange={(checked) => setInset(!!checked)} />
                   <Label htmlFor="inset">Inset</Label>
                 </div>
              </div>

              {/* Preview and Output */}
              <div className="space-y-4">
                 {/* Preview */}
                 <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center p-4">
                       <div
                         className="w-32 h-32 bg-blue-500 rounded-md"
                         style={{ boxShadow: boxShadowCss }}
                       ></div>
                    </div>
                 </div>

                 {/* CSS Output */}
                 <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <Label htmlFor="css-output">CSS Code</Label>
                       <Button variant="link" size="sm" onClick={() => copyToClipboard(boxShadowCss)}>
                         Copy
                       </Button>
                    </div>
                    <Textarea
                       id="css-output"
                       value={`box-shadow: ${boxShadowCss};`}
                       readOnly
                       className="min-h-[100px] font-mono text-sm bg-muted"
                    />
                 </div>
              </div>
            </div>

            {/* Clear Button */}
             <div>
               <Button variant="outline" onClick={handleClear}>
                 Reset to Defaults
               </Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoxShadowGeneratorPage; 