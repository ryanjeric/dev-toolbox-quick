import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface BorderRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export default function BorderRadiusGenerator() {
  const [radius, setRadius] = useState<BorderRadius>({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  });
  const [usePixels, setUsePixels] = useState(true);
  const [syncCorners, setSyncCorners] = useState(false);

  const handleRadiusChange = (corner: keyof BorderRadius, value: number) => {
    if (syncCorners) {
      setRadius({
        topLeft: value,
        topRight: value,
        bottomRight: value,
        bottomLeft: value,
      });
    } else {
      setRadius(prev => ({
        ...prev,
        [corner]: value,
      }));
    }
  };

  const generateCSS = () => {
    const unit = usePixels ? 'px' : '%';
    return `.border-radius {
  border-radius: ${radius.topLeft}${unit} ${radius.topRight}${unit} ${radius.bottomRight}${unit} ${radius.bottomLeft}${unit};
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    toast.success('CSS copied to clipboard!');
  };

  const previewStyle = {
    borderRadius: `${radius.topLeft}${usePixels ? 'px' : '%'} ${radius.topRight}${usePixels ? 'px' : '%'} ${radius.bottomRight}${usePixels ? 'px' : '%'} ${radius.bottomLeft}${usePixels ? 'px' : '%'}`,
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Border Radius Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={syncCorners}
                  onCheckedChange={setSyncCorners}
                />
                <Label>Sync All Corners</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={usePixels}
                  onCheckedChange={setUsePixels}
                />
                <Label>Use Pixels (instead of %)</Label>
              </div>

              {syncCorners ? (
                <div className="space-y-2">
                  <Label>Border Radius ({usePixels ? 'px' : '%'})</Label>
                  <Input
                    type="number"
                    min="0"
                    max={usePixels ? "1000" : "100"}
                    value={radius.topLeft}
                    onChange={(e) => handleRadiusChange('topLeft', parseInt(e.target.value))}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Top Left ({usePixels ? 'px' : '%'})</Label>
                    <Input
                      type="number"
                      min="0"
                      max={usePixels ? "1000" : "100"}
                      value={radius.topLeft}
                      onChange={(e) => handleRadiusChange('topLeft', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Top Right ({usePixels ? 'px' : '%'})</Label>
                    <Input
                      type="number"
                      min="0"
                      max={usePixels ? "1000" : "100"}
                      value={radius.topRight}
                      onChange={(e) => handleRadiusChange('topRight', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bottom Right ({usePixels ? 'px' : '%'})</Label>
                    <Input
                      type="number"
                      min="0"
                      max={usePixels ? "1000" : "100"}
                      value={radius.bottomRight}
                      onChange={(e) => handleRadiusChange('bottomRight', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bottom Left ({usePixels ? 'px' : '%'})</Label>
                    <Input
                      type="number"
                      min="0"
                      max={usePixels ? "1000" : "100"}
                      value={radius.bottomLeft}
                      onChange={(e) => handleRadiusChange('bottomLeft', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <Button onClick={copyToClipboard} className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                Copy CSS
              </Button>
            </div>

            {/* Preview and CSS Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border rounded-lg p-4">
                  <div
                    className="w-full h-[300px] bg-primary/10 border-2 border-primary/20"
                    style={previewStyle}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Generated CSS</Label>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{generateCSS()}</code>
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 