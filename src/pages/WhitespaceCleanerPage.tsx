import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface CleaningOptions {
  removeExtraSpaces: boolean;
  removeTabs: boolean;
  removeEmptyLines: boolean;
  trimLines: boolean;
  normalizeLineEndings: boolean;
}

const WhitespaceCleanerPage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [options, setOptions] = useState<CleaningOptions>({
    removeExtraSpaces: true,
    removeTabs: true,
    removeEmptyLines: false,
    trimLines: true,
    normalizeLineEndings: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleOptionChange = (option: keyof CleaningOptions) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const cleanText = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    let cleanedText = inputText;

    // Normalize line endings first
    if (options.normalizeLineEndings) {
      cleanedText = cleanedText.replace(/\r\n/g, '\n');
    }

    // Split into lines for line-by-line processing
    let lines = cleanedText.split('\n');

    // Process each line
    lines = lines.map(line => {
      // Remove tabs
      if (options.removeTabs) {
        line = line.replace(/\t/g, ' ');
      }

      // Remove extra spaces
      if (options.removeExtraSpaces) {
        line = line.replace(/\s+/g, ' ');
      }

      // Trim lines
      if (options.trimLines) {
        line = line.trim();
      }

      return line;
    });

    // Remove empty lines if option is enabled
    if (options.removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }

    // Join lines back together
    cleanedText = lines.join('\n');

    setOutputText(cleanedText);
    toast.success("Text cleaned successfully");
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      toast.success("Cleaned text copied to clipboard");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    toast.info("Text cleared");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Whitespace Cleaner</CardTitle>
          <CardDescription>
            Clean up your text by removing extra spaces, tabs, and empty lines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">Input Text</Label>
              <Textarea
                id="input"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Paste your text here..."
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="removeExtraSpaces">Remove Extra Spaces</Label>
                <Switch
                  id="removeExtraSpaces"
                  checked={options.removeExtraSpaces}
                  onCheckedChange={() => handleOptionChange('removeExtraSpaces')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="removeTabs">Remove Tabs</Label>
                <Switch
                  id="removeTabs"
                  checked={options.removeTabs}
                  onCheckedChange={() => handleOptionChange('removeTabs')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="removeEmptyLines">Remove Empty Lines</Label>
                <Switch
                  id="removeEmptyLines"
                  checked={options.removeEmptyLines}
                  onCheckedChange={() => handleOptionChange('removeEmptyLines')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="trimLines">Trim Lines</Label>
                <Switch
                  id="trimLines"
                  checked={options.trimLines}
                  onCheckedChange={() => handleOptionChange('trimLines')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="normalizeLineEndings">Normalize Line Endings</Label>
                <Switch
                  id="normalizeLineEndings"
                  checked={options.normalizeLineEndings}
                  onCheckedChange={() => handleOptionChange('normalizeLineEndings')}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={cleanText} disabled={!inputText}>
                Clean Text
              </Button>
              <Button variant="outline" onClick={handleCopy} disabled={!outputText}>
                Copy Result
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!inputText && !outputText}>
                Clear All
              </Button>
            </div>

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output">Cleaned Text</Label>
                </div>
                <Textarea
                  id="output"
                  value={outputText}
                  readOnly
                  className="min-h-[200px] font-mono bg-muted"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhitespaceCleanerPage; 