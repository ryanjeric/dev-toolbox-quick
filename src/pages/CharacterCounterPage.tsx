import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number;
}

const CharacterCounterPage = () => {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
  });

  const calculateStats = (input: string): TextStats => {
    // Remove carriage returns and normalize line endings
    const normalizedText = input.replace(/\r\n/g, '\n');
    
    // Calculate basic stats
    const characters = normalizedText.length;
    const charactersNoSpaces = normalizedText.replace(/\s/g, '').length;
    const words = normalizedText.trim() ? normalizedText.trim().split(/\s+/).length : 0;
    const sentences = normalizedText.trim() ? normalizedText.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = normalizedText.trim() ? normalizedText.split(/\n\s*\n/).filter(Boolean).length : 0;
    const lines = normalizedText.split('\n').length;

    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
    };
  };

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
    }
  };

  const handleClear = () => {
    setText("");
    toast.info("Text cleared");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Character Counter</CardTitle>
          <CardDescription>
            Analyze your text with detailed statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Your Text</Label>
              <Textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Type or paste your text here..."
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy} disabled={!text}>
                Copy Text
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!text}>
                Clear Text
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Characters</p>
                  <p className="text-2xl font-bold">{stats.characters}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Characters (no spaces)</p>
                  <p className="text-2xl font-bold">{stats.charactersNoSpaces}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Words</p>
                  <p className="text-2xl font-bold">{stats.words}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Sentences</p>
                  <p className="text-2xl font-bold">{stats.sentences}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Paragraphs</p>
                  <p className="text-2xl font-bold">{stats.paragraphs}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Lines</p>
                  <p className="text-2xl font-bold">{stats.lines}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">Reading Time</p>
                  <p className="text-2xl font-bold">{stats.readingTime} min</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCounterPage; 