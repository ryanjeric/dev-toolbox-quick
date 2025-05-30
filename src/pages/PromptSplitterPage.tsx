import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DEFAULT_MAX_LENGTH = 15000;

const PromptSplitterPage = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [maxLength, setMaxLength] = useState<string>(DEFAULT_MAX_LENGTH.toString());
  const [chunks, setChunks] = useState<string[]>([]);

  const instructionText = `The total length of the content that I want to send you is too large to send in only one piece.\n\nFor sending you that content, I will follow this rule:\n\n[START PART 1/total_parts]\nthis is the content of the part 1 out of total_parts in total\n[END PART 1/total_parts]\n\nThen you just answer: "Received part 1/total_parts"\n\nAnd when I tell you "ALL PARTS SENT", then you can continue processing the data and answering my requests.`;

  const splitPrompt = () => {
    const maxLen = parseInt(maxLength);
    
    if (isNaN(maxLen) || maxLen <= 0) {
      toast.error("Please enter a valid maximum length");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt to split");
      return;
    }

    const words = prompt.split(/\s+/);
    const result: string[] = [];
    let currentChunk = "";

    for (const word of words) {
      if ((currentChunk + (currentChunk ? " " : "") + word).trim().length <= maxLen) {
        currentChunk += (currentChunk ? " " : "") + word;
      } else {
        if (currentChunk) {
          result.push(currentChunk.trim());
        }
        currentChunk = word;
      }
    }

    if (currentChunk) {
      result.push(currentChunk.trim());
    }

    setChunks(result);
  };

  const handleClear = () => {
    setPrompt("");
    setMaxLength(DEFAULT_MAX_LENGTH.toString());
    setChunks([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const formatChunk = (chunk: string, index: number, total: number): string => {
    return `[START PART ${index + 1}/${total}]\n${chunk}\n[END PART ${index + 1}/${total}]`;
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>ChatGPT Prompt Splitter</CardTitle>
          <CardDescription>
            Split long prompts into smaller chunks for ChatGPT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card className="bg-muted">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Instructions</h3>
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {instructionText.replace(/total_parts/g, chunks.length.toString())}
                </div>
                <Button onClick={() => copyToClipboard(instructionText.replace(/total_parts/g, chunks.length.toString()))}>
                  Copy Instructions (first message to send)
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="prompt">Enter the long prompt to be split</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="min-h-[200px]"
              />
              <div className="text-sm text-muted-foreground">
                {prompt.length} characters
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLength">Maximum characters per chunk</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="maxLength"
                  type="number"
                  value={maxLength}
                  onChange={(e) => setMaxLength(e.target.value)}
                  min="1"
                  className="w-32"
                />
                <Button
                  variant="outline"
                  onClick={() => setMaxLength(DEFAULT_MAX_LENGTH.toString())}
                >
                  Reset to Default
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={splitPrompt} disabled={!prompt.trim()}>
                Split Prompt
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!prompt && chunks.length === 0}>
                Clear
              </Button>
            </div>

            {chunks.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Split Results ({chunks.length} chunks)</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {chunks.map((chunk, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => copyToClipboard(formatChunk(chunk, index, chunks.length))}
                      className="flex flex-col items-center justify-center p-2 text-center h-auto"
                    >
                      <span className="text-sm">Copy</span>
                      <span className="text-sm">part {index + 1}/{chunks.length}</span>
                      <span className="text-sm">to</span>
                      <span className="text-sm">clipboard</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptSplitterPage; 