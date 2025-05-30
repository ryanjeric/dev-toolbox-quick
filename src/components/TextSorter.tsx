import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Shuffle, Hash } from "lucide-react";

export function TextSorter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const getLines = (text: string) => text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const joinLines = (lines: string[]) => lines.join('\n');

  const handleAlphabeticalSort = () => {
    const lines = getLines(inputText);
    const sortedLines = lines.sort((a, b) => a.localeCompare(b));
    setOutputText(joinLines(sortedLines));
  };

  const handleReverseAlphabeticalSort = () => {
    const lines = getLines(inputText);
    const sortedLines = lines.sort((a, b) => b.localeCompare(a));
    setOutputText(joinLines(sortedLines));
  };

  const handleRandomSort = () => {
    const lines = getLines(inputText);
    // Fisher-Yates (aka Knuth) Shuffle
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutputText(joinLines(lines));
  };

   const handleNumericalSort = () => {
    const lines = getLines(inputText);
    // Filter out non-numeric lines for numerical sort, or handle them?
    // For simplicity, let's filter them for now.
    const numericLines = lines.filter(line => !isNaN(parseFloat(line)));
    const nonNumericLines = lines.filter(line => isNaN(parseFloat(line)));

    const sortedNumericLines = numericLines.sort((a, b) => parseFloat(a) - parseFloat(b));

    // Optionally, decide where to put non-numeric lines. Appending them at the end.
    setOutputText(joinLines(sortedNumericLines.concat(nonNumericLines)));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Text Sorter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="inputText" className="dark:text-slate-200">Input Text (one item per line)</Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your list of text items here..."
            rows={10}
            className="mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleAlphabeticalSort} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"><ArrowUpWideNarrow className="mr-2 h-4 w-4" /> Alphabetical (A-Z)</Button>
          <Button onClick={handleReverseAlphabeticalSort} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"><ArrowDownWideNarrow className="mr-2 h-4 w-4" /> Alphabetical (Z-A)</Button>
          <Button onClick={handleRandomSort} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"><Shuffle className="mr-2 h-4 w-4" /> Random</Button>
          <Button onClick={handleNumericalSort} className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"><Hash className="mr-2 h-4 w-4" /> Numerical</Button>
           <Button onClick={handleClear} variant="outline" className="dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">Clear</Button>
        </div>
        <div>
          <Label htmlFor="outputText" className="dark:text-slate-200">Output Text</Label>
          <Textarea
            id="outputText"
            value={outputText}
            readOnly
            rows={10}
            placeholder="Sorted text will appear here..."
            className="mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
      </CardContent>
    </Card>
  );
} 