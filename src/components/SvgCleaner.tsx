import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";

export function SvgCleaner() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const cleanSvg = (svgCode: string): string => {
    let cleaned = svgCode;

    // Remove XML comments
    cleaned = cleaned.replace(/<!--.*?-->/gs, '');

    // Remove Doctype declaration
    cleaned = cleaned.replace(/<\?xml.*?\?>/gs, '');

    // Remove excess whitespace (including newlines)
    cleaned = cleaned.replace(/>\s+</g, '><');
    cleaned = cleaned.replace(/\s\s+/g, ' ');
    cleaned = cleaned.trim();

    // Basic removal of some common unnecessary attributes (can be expanded)
    cleaned = cleaned.replace(/ xmlns:.*?="http:\/\/www.w3.org\/2000\/svg"/g, ''); // Remove duplicate xmlns:svg
    cleaned = cleaned.replace(/ xmlns:xlink=".*?"/g, '');
    cleaned = cleaned.replace(/ xml:space=".*?"/g, '');
    cleaned = cleaned.replace(/ enable-background=".*?"/g, '');
    // Add more attribute removals here as needed

    // Note: More advanced cleaning (like removing unreferenced IDs, empty groups,
    // optimizing paths) typically requires a proper SVG parsing library.
    // This implementation provides basic text-based cleaning.

    return cleaned;
  };

  const handleCleanSvg = () => {
    const cleaned = cleanSvg(inputText);
    setOutputText(cleaned);
  };

   const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">SVG Cleaner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="inputText" className="dark:text-slate-200">Input SVG Code</Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your SVG code here..."
            rows={10}
            className="mt-1 font-mono dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={handleCleanSvg} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"><Wand2 className="mr-2 h-4 w-4" /> Clean SVG</Button>
           <Button onClick={handleClear} variant="outline" className="ml-4 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">Clear</Button>
        </div>
        <div>
          <Label htmlFor="outputText" className="dark:text-slate-200">Output SVG Code (Cleaned)</Label>
          <Textarea
            id="outputText"
            value={outputText}
            readOnly
            rows={10}
            placeholder="Cleaned SVG code will appear here..."
            className="mt-1 font-mono dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
      </CardContent>
    </Card>
  );
} 