import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const PlaceholderImageGeneratorPage = () => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [bgColor, setBgColor] = useState('#cccccc'); // Default light grey
  const [textColor, setTextColor] = useState('#333333'); // Default dark grey
  const [customText, setCustomText] = useState('');

  const { toast } = useToast();

  const imageUrl = useMemo(() => {
    const baseUrl = "https://via.placeholder.com/";
    const size = `${width}x${height}`;
    const colors = `${bgColor.replace('#', '')}/${textColor.replace('#', '')}`;
    const textParam = customText ? `?text=${encodeURIComponent(customText)}` : '';

    return `${baseUrl}${size}/${colors}${textParam}`;
  }, [width, height, bgColor, textColor, customText]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "URL Copied",
      description: "The image URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Placeholder Image Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Card */}
        <Card>
          <CardHeader><CardTitle>Customize Options</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px):</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                  min="1"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px):</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  min="1"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bgColor">Background Color:</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <Label htmlFor="textColor">Text Color:</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
            </div>

            {/* Custom Text */}
            <div>
              <Label htmlFor="customText">Custom Text:</Label>
              <Input
                id="customText"
                type="text"
                placeholder="Optional text..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview and URL Card */}
        <Card>
          <CardHeader><CardTitle>Preview and URL</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Preview */}
            <div>
              <Label>Preview:</Label>
              <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-white" style={{ minHeight: '100px' }}>
                {width > 0 && height > 0 ? (
                  <img src={imageUrl} alt="Placeholder" className="max-w-full max-h-40 h-auto" />
                ) : ((
                  <p className="text-slate-500">Enter dimensions to see preview.</p>
                ))}
              </div>
            </div>

            {/* Generated URL */}
            <div>
              <Label htmlFor="imageUrl">Generated URL:</Label>
              <div className="relative mt-1">
                <Textarea
                  id="imageUrl"
                  readOnly
                  value={imageUrl}
                  rows={3}
                  className="font-mono text-sm bg-slate-100 pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2" 
                  onClick={handleCopyUrl}
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

export default PlaceholderImageGeneratorPage; 