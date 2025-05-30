import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ImageToBase64ConverterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setBase64String(""); // Clear previous results
    setFileName(selectedFile ? selectedFile.name : "");
    setPreviewUrl(null); // Clear previous preview

    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
         toast.error("Please select an image file.");
         setFile(null);
         setFileName("");
         setBase64String("");
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // The result contains the data URL "data:image/...;base64,..."
        const base64 = reader.result as string;
        setBase64String(base64);
        setPreviewUrl(base64);
      };
      reader.onerror = () => {
        toast.error("Error reading file.");
        setFile(null);
        setFileName("");
        setBase64String("");
        setPreviewUrl(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
    setBase64String("");
    setFileName("");
    setPreviewUrl(null);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Base64 string copied!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Image to Base64 Converter</CardTitle>
          <CardDescription>
            Convert image files into Base64 encoded strings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="imageInput">Select an image file:</Label>
              <Input id="imageInput" type="file" accept="image/*" onChange={handleFileChange} />
              {fileName && <div className="text-sm text-muted-foreground">Selected file: {fileName}</div>}
            </div>

             {/* Image Preview */}
            {previewUrl && (
              <div className="space-y-2">
                <Label>Preview:</Label>
                <div className="w-full h-48 border rounded-md flex items-center justify-center overflow-hidden bg-muted">
                   <img src={previewUrl} alt="Image Preview" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            )}

            {/* Base64 Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                 <Label htmlFor="base64Output">Base64 String:</Label>
                 {base64String && (
                    <Button variant="link" size="sm" onClick={() => copyToClipboard(base64String)}>
                       Copy
                    </Button>
                 )}
              </div>
              <Textarea
                id="base64Output"
                value={base64String}
                readOnly
                placeholder="Upload an image to see the Base64 string here..."
                className="min-h-[200px] font-mono text-sm bg-muted"
              />
            </div>

            {/* Clear Button */}
             <div>
               <Button variant="outline" onClick={handleClear} disabled={!file && !base64String}>
                 Clear
               </Button>
             </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageToBase64ConverterPage; 