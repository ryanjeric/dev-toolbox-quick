import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DuplicateLineRemoverPage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [stats, setStats] = useState<{ total: number; unique: number; removed: number }>({
    total: 0,
    unique: 0,
    removed: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    // Split the input into lines and remove empty lines
    const lines = inputText.split("\n").filter(line => line.trim() !== "");
    
    // Get unique lines while preserving order
    const uniqueLines = Array.from(new Set(lines));
    
    // Calculate statistics
    const totalLines = lines.length;
    const uniqueLinesCount = uniqueLines.length;
    const removedLines = totalLines - uniqueLinesCount;

    // Update stats
    setStats({
      total: totalLines,
      unique: uniqueLinesCount,
      removed: removedLines,
    });

    // Set output text
    setOutputText(uniqueLines.join("\n"));

    // Show toast notification
    if (removedLines > 0) {
      toast.success(`Removed ${removedLines} duplicate line${removedLines === 1 ? "" : "s"}`);
    } else {
      toast.info("No duplicate lines found");
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      toast.success("Copied to clipboard");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStats({ total: 0, unique: 0, removed: 0 });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Duplicate Line Remover</CardTitle>
          <CardDescription>
            Remove repeated lines from your text while preserving the order
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

            <div className="flex gap-2">
              <Button onClick={removeDuplicates}>Remove Duplicates</Button>
              <Button variant="outline" onClick={handleClear}>Clear All</Button>
            </div>

            {stats.total > 0 && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium">Total Lines</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Unique Lines</p>
                  <p className="text-2xl font-bold">{stats.unique}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Removed</p>
                  <p className="text-2xl font-bold text-red-500">{stats.removed}</p>
                </div>
              </div>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output">Result</Label>
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    Copy to Clipboard
                  </Button>
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

export default DuplicateLineRemoverPage; 