import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define some common screen widths (in pixels)
const screenWidthOptions = [
  { label: 'Mobile (375px)', value: '375px' },
  { label: 'Tablet (768px)', value: '768px' },
  { label: 'Laptop (1024px)', value: '1024px' },
  { label: 'Desktop (1440px)', value: '1440px' },
  { label: 'Full Width', value: '100%' },
];

const ResponsiveImageTesterPage = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [selectedWidth, setSelectedWidth] = useState<string>('100%'); // Default to full width

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Responsive Image Tester</h1>
      
      <Card>
        <CardHeader><CardTitle>Upload Image</CardTitle></CardHeader>
        <CardContent>
          <Label htmlFor="imageUpload">Choose an image file:</Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1"
          />
        </CardContent>
      </Card>

      {imageDataUrl && (
        <Card className="mt-6">
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Width Selector */}
            <div>
              <Label htmlFor="screenWidth">Preview Width:</Label>
              <Select value={selectedWidth} onValueChange={setSelectedWidth}>
                <SelectTrigger className="w-[180px] mt-1">
                  <SelectValue placeholder="Select width" />
                </SelectTrigger>
                <SelectContent>
                  {screenWidthOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Preview Area */}
            <div className="flex justify-center p-4 border rounded-md bg-slate-50 overflow-auto">
              <div 
                style={{
                  width: selectedWidth,
                  maxWidth: '100%', // Ensure it doesn't exceed the container width
                  border: selectedWidth !== '100%' ? '1px dashed #ccc' : 'none', // Add a border for fixed widths
                  boxShadow: selectedWidth !== '100%' ? '0 0 10px rgba(0,0,0,0.1)' : 'none' // Add shadow for fixed widths
                }}
                className="flex justify-center items-center"
              >
                <img 
                  src={imageDataUrl}
                  alt="Uploaded image preview"
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResponsiveImageTesterPage; 