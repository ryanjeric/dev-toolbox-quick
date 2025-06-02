
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download } from "lucide-react";

const ImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number>(0.9);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setConvertedImageUrl(""); // Clear previous results

    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      toast.error("Please select an image file.");
      setFile(null);
      return;
    }
  };

  const convertImage = () => {
    if (!file) {
      toast.error("Please select an image first.");
      return;
    }

    setIsConverting(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        const mimeType = `image/${outputFormat}`;
        const dataUrl = canvas.toDataURL(mimeType, quality);
        setConvertedImageUrl(dataUrl);
        setIsConverting(false);
        toast.success("Image converted successfully!");
      }
    };

    img.onerror = () => {
      setIsConverting(false);
      toast.error("Error loading image.");
    };

    img.src = URL.createObjectURL(file);
  };

  const downloadImage = () => {
    if (!convertedImageUrl) return;

    const link = document.createElement('a');
    link.download = `converted-image.${outputFormat}`;
    link.href = convertedImageUrl;
    link.click();
    toast.success("Image downloaded!");
  };

  const handleClear = () => {
    setFile(null);
    setConvertedImageUrl("");
    setOutputFormat("png");
    setQuality(0.9);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image Converter</CardTitle>
          <CardDescription>
            Convert images between different formats (JPEG, PNG, WebP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="imageInput">Select an image file:</Label>
              <Input 
                id="imageInput" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              {file && (
                <div className="text-sm text-muted-foreground">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>

            {/* Conversion Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">Output Format:</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality: {Math.round(quality * 100)}%</Label>
                  <Input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                  />
                </div>
              )}
            </div>

            {/* Convert Button */}
            <Button 
              onClick={convertImage} 
              disabled={!file || isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : "Convert Image"}
            </Button>

            {/* Preview and Download */}
            {convertedImageUrl && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Converted Image Preview:</Label>
                  <div className="border rounded-lg p-4 bg-muted">
                    <img 
                      src={convertedImageUrl} 
                      alt="Converted" 
                      className="max-w-full max-h-96 mx-auto object-contain"
                    />
                  </div>
                </div>

                <Button onClick={downloadImage} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Converted Image
                </Button>
              </div>
            )}

            {/* Clear Button */}
            <Button 
              variant="outline" 
              onClick={handleClear} 
              disabled={!file && !convertedImageUrl}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageConverter;
