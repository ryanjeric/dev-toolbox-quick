import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, PlusCircle, MinusCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ColorStop {
  id: number;
  color: string;
  position: number; // Percentage
}

const CssGradientGeneratorPage = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [linearAngle, setLinearAngle] = useState<string>('90'); // degrees
  // For simplicity, radial type options (like shape/size/position) can be added later
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: 1, color: '#ff0000', position: 0 },
    { id: 2, color: '#0000ff', position: 100 },
  ]);

  const { toast } = useToast();

  const addColorStop = () => {
    const newId = Math.max(...colorStops.map(stop => stop.id), 0) + 1;
    // Add a new stop in the middle, adjust position later if needed
    const newPosition = colorStops.length > 0 ? (colorStops[colorStops.length - 1].position + 100) / 2 : 50;
    setColorStops([...colorStops, { id: newId, color: '#00ff00', position: newPosition }]);
  };

  const removeColorStop = (id: number) => {
    setColorStops(colorStops.filter(stop => stop.id !== id));
  };

  const updateColorStop = (id: number, field: 'color' | 'position', value: string | number) => {
    setColorStops(colorStops.map(stop =>
      stop.id === id ? { ...stop, [field]: field === 'position' ? parseFloat(value as string) : value } : stop
    ).sort((a, b) => a.position - b.position)); // Keep stops sorted by position
  };

  const generateCssGradient = useMemo(() => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${linearAngle}deg, ${stopString})`;
    } else if (gradientType === 'radial') {
      // Basic radial gradient for now
      return `radial-gradient(${stopString})`;
    }
    return '';
  }, [gradientType, linearAngle, colorStops]);

  const cssCode = `background-image: ${generateCssGradient};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast({
      title: "CSS Copied",
      description: "The generated CSS has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CSS Gradient Generator</h1>
      
      <Card>
        <CardHeader><CardTitle>Configure Gradient</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {/* Gradient Type */}
          <div>
            <Label htmlFor="gradientType">Gradient Type:</Label>
            <Select value={gradientType} onValueChange={setGradientType as any}>
              <SelectTrigger className="w-[180px] mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Linear Angle */}
          {gradientType === 'linear' && (
            <div>
              <Label htmlFor="linearAngle">Angle (degrees):</Label>
              <Input
                id="linearAngle"
                type="number"
                value={linearAngle}
                onChange={(e) => setLinearAngle(e.target.value)}
                className="w-[180px] mt-1"
                min="0"
                max="360"
              />
            </div>
          )}

          {/* Color Stops */}
          <div>
            <Label>Color Stops:</Label>
            <div className="space-y-2 mt-1">
              {colorStops.map(stop => (
                <div key={stop.id} className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    type="number"
                    value={stop.position}
                    onChange={(e) => updateColorStop(stop.id, 'position', e.target.value)}
                    placeholder="Position (%)"
                    className="w-[100px]"
                    min="0"
                    max="100"
                  /> %
                  {colorStops.length > 1 && (
                    <Button variant="destructive" size="icon" onClick={() => removeColorStop(stop.id)}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addColorStop}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Color Stop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="mt-6">
        <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
        <CardContent>
          <div
            className="w-full h-40 rounded-md"
            style={{ backgroundImage: generateCssGradient }}
          ></div>
        </CardContent>
      </Card>

      {/* Generated CSS */}
      <Card className="mt-6">
        <CardHeader><CardTitle>Generated CSS</CardTitle></CardHeader>
        <CardContent>
          <Label htmlFor="cssCode">CSS Code:</Label>
          <div className="relative mt-1">
            <Textarea
              id="cssCode"
              readOnly
              value={cssCode}
              rows={5}
              className="font-mono text-sm bg-muted pr-12"
            />
             <Button 
                size="sm" 
                className="absolute top-2 right-2" 
                onClick={handleCopy}
                disabled={!cssCode}
              >
                <Copy className="h-4 w-4 mr-2" /> Copy CSS
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CssGradientGeneratorPage; 