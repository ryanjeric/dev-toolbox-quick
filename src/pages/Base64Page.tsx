import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Base64Page = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [base64Input, setBase64Input] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [base64Output, setBase64Output] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Convert text to base64
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextInput(value);
    setBase64Input(""); // Clear base64 input when text changes
    setError(null);

    try {
      const base64 = btoa(value);
      setBase64Output(base64);
    } catch (e) {
      setBase64Output("");
      if (value.trim() !== "") setError("Error encoding to Base64");
    }
  };

  // Convert base64 to text
  const handleBase64InputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64Input(value);
    setTextInput(""); // Clear text input when base64 changes
    setError(null);

    try {
      const text = atob(value);
      setTextOutput(text);
    } catch (e) {
      setTextOutput("");
      if (value.trim() !== "") setError("Invalid Base64 string");
    }
  };

  const handleClear = () => {
    setTextInput("");
    setBase64Input("");
    setTextOutput("");
    setBase64Output("");
    setError(null);
  };

  const copyToClipboard = (text: string, message: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Base64 String Converter</CardTitle>
          <CardDescription>
            Convert between text and Base64 encoded strings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Text to Base64 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="textInput">Enter Text:</Label>
                <Textarea
                  id="textInput"
                  value={textInput}
                  onChange={handleTextInputChange}
                  placeholder="Enter text to convert to Base64..."
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="base64Output">Base64 Output:</Label>
                  <Button variant="link" size="sm" onClick={() => copyToClipboard(base64Output, "Base64 copied!")} disabled={!base64Output}>
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="base64Output"
                  value={base64Output}
                  readOnly
                  placeholder="Base64 output will appear here..."
                  className="min-h-[100px] font-mono text-sm bg-muted"
                />
              </div>
            </div>

            {/* Base64 to Text */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base64Input">Enter Base64:</Label>
                <Textarea
                  id="base64Input"
                  value={base64Input}
                  onChange={handleBase64InputChange}
                  placeholder="Enter Base64 string to convert to text..."
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="textOutput">Text Output:</Label>
                  <Button variant="link" size="sm" onClick={() => copyToClipboard(textOutput, "Text copied!")} disabled={!textOutput}>
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="textOutput"
                  value={textOutput}
                  readOnly
                  placeholder="Decoded text will appear here..."
                  className="min-h-[100px] font-mono text-sm bg-muted"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Clear Button */}
            <div>
              <Button variant="outline" onClick={handleClear} disabled={!textInput && !base64Input}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Base64Page;
