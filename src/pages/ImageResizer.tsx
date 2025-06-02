import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Download, Upload } from "lucide-react";

export default function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [targetSize, setTargetSize] = useState(500); // in KB
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setDimensions({
          width: img.width,
          height: img.height
        });
        setPreview(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    if (!image) return;

    if (maintainAspectRatio) {
      const aspectRatio = dimensions.width / dimensions.height;
      if (dimension === 'width') {
        setDimensions({
          width: value,
          height: Math.round(value / aspectRatio)
        });
      } else {
        setDimensions({
          width: Math.round(value * aspectRatio),
          height: value
        });
      }
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
    }
  };

  const handleResize = async () => {
    if (!image || !preview) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const img = new Image();
    img.src = preview;
    await new Promise(resolve => img.onload = resolve);

    ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

    // Convert to blob with quality adjustment
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', quality);
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Image Resizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {preview && (
              <>
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-[300px] object-contain"
                  />
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Width (px)</Label>
                    <Input
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => handleDimensionChange('width', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Height (px)</Label>
                    <Input
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => handleDimensionChange('height', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                    <Label>Maintain Aspect Ratio</Label>
                  </div>

                  <div className="grid gap-2">
                    <Label>Quality: {Math.round(quality * 100)}%</Label>
                    <Slider
                      value={[quality * 100]}
                      onValueChange={([value]) => setQuality(value / 100)}
                      min={1}
                      max={100}
                      step={1}
                    />
                  </div>

                  <Button onClick={handleResize} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resized Image
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 