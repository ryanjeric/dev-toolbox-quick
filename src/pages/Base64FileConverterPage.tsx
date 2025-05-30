import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Base64FileConverterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setBase64String(""); // Clear previous results
    setFileName(selectedFile ? selectedFile.name : "");

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result contains the data URL "data:;base64,..."
        const base64 = reader.result as string;
        // Extract just the base64 string part after the comma
        setBase64String(base64.split(',')[1]);
      };
      reader.onerror = () => {
        toast.error("Error reading file.");
        setFile(null);
        setFileName("");
        setBase64String("");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleBase64StringChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64String(event.target.value);
    setFile(null); // Clear previous file selection
    setFileName(""); // Clear previous file name
  };

  const decodeAndDownload = () => {
    if (!base64String) {
      toast.error("Please enter a Base64 string to decode.");
      return;
    }

    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Attempt to infer MIME type or use a default
      // This is a basic attempt, more robust MIME detection might be needed
      const mimeType = "application/octet-stream"; // Default MIME type

      const blob = new Blob([byteArray], { type: mimeType });

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      // Use a default filename or prompt user if fileName is empty
      link.download = fileName || "decoded_file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("File decoded and download started!");

    } catch (error) {
      console.error("Base64 Decoding Error:", error);
      toast.error("Invalid Base64 string.");
    }
  };

  const handleClear = () => {
    setFile(null);
    setBase64String("");
    setFileName("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Base64 string copied!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Base64 File Encoder/Decoder</CardTitle>
          <CardDescription>
            Encode and decode files to and from Base64 strings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="fileInput">Select a file to encode:</Label>
              <Input id="fileInput" type="file" onChange={handleFileChange} />
              {fileName && <div className="text-sm text-muted-foreground">Selected file: {fileName}</div>}
            </div>

            {/* Base64 Output/Input */}
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
                onChange={handleBase64StringChange} // Allows pasting to decode
                placeholder="Upload a file to encode, or paste a Base64 string to decode..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            {/* Decode and Download Button */}
            <div className="flex items-center space-x-2">
               <Button onClick={decodeAndDownload} disabled={!base64String}>
                  Decode and Download File
               </Button>
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

export default Base64FileConverterPage; 