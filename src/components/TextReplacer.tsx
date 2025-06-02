import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Replace, RefreshCw, Copy, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TextReplacer() {
  const [inputText, setInputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [resultText, setResultText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [stats, setStats] = useState({ replacements: 0, matches: 0 });

  const handleReplace = () => {
    if (!inputText || !findText) {
      setResultText('');
      setStats({ replacements: 0, matches: 0 });
      return;
    }

    let searchText = inputText;
    let searchPattern = findText;

    // Handle case sensitivity
    if (!caseSensitive) {
      searchText = searchText.toLowerCase();
      searchPattern = searchPattern.toLowerCase();
    }

    // Handle whole word matching
    if (wholeWord) {
      searchPattern = `\\b${searchPattern}\\b`;
    }

    // Create regex pattern
    const regex = new RegExp(searchPattern, caseSensitive ? 'g' : 'gi');
    
    // Count matches
    const matches = (searchText.match(regex) || []).length;
    
    // Perform replacement
    const replaced = inputText.replace(regex, replaceText);
    
    setResultText(replaced);
    setStats({
      replacements: matches,
      matches: matches
    });
  };

  const handleClear = () => {
    setInputText('');
    setFindText('');
    setReplaceText('');
    setResultText('');
    setStats({ replacements: 0, matches: 0 });
  };

  const handleCopy = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Replace className="h-5 w-5" />
          Text Replacer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Text */}
        <div className="space-y-2">
          <Label htmlFor="inputText">Input Text</Label>
          <Textarea
            id="inputText"
            placeholder="Paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        {/* Find and Replace Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="findText">Find</Label>
            <Input
              id="findText"
              placeholder="Text to find..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="replaceText">Replace With</Label>
            <Input
              id="replaceText"
              placeholder="Replacement text..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="caseSensitive"
              checked={caseSensitive}
              onCheckedChange={setCaseSensitive}
            />
            <Label htmlFor="caseSensitive" className="flex items-center gap-2">
              Case Sensitive
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Match exact case when finding text</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="wholeWord"
              checked={wholeWord}
              onCheckedChange={setWholeWord}
            />
            <Label htmlFor="wholeWord" className="flex items-center gap-2">
              Whole Word
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Match complete words only</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleReplace} 
            className="flex-1"
            disabled={!inputText || !findText}
          >
            <Replace className="mr-2 h-4 w-4" />
            Replace All
          </Button>
          <Button 
            onClick={handleCopy} 
            variant="outline"
            disabled={!resultText}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button 
            onClick={handleClear} 
            variant="outline"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Results */}
        {resultText && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Results</h3>
              <div className="text-sm text-muted-foreground">
                {stats.replacements} replacements made
              </div>
            </div>
            <Textarea
              value={resultText}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted"
            />
          </div>
        )}

        {/* Features List */}
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Features</h3>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Bulk find and replace across large text</li>
            <li>Case-sensitive matching option</li>
            <li>Whole word matching option</li>
            <li>Real-time replacement count</li>
            <li>One-click copy results</li>
            <li>Clear all fields with a single click</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 