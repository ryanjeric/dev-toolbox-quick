import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TabSpaceConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [spaceCount, setSpaceCount] = useState(2);

  const handleTabToSpace = () => {
    const spaces = ' '.repeat(spaceCount);
    const convertedText = inputText.replace(/\t/g, spaces);
    setOutputText(convertedText);
  };

  const handleSpaceToTab = () => {
    // This conversion is more complex as we need to match groups of spaces
    // based on the spaceCount. A simple regex might not cover all cases
    // (e.g., mixed tabs and spaces, irregular spacing). For simplicity,
    // this initial implementation assumes consistent spacing based on spaceCount.
    const spaceRegex = new RegExp(` {${spaceCount}}`, 'g');
    const convertedText = inputText.replace(spaceRegex, '\t');
    setOutputText(convertedText);
  };

  const handleSpaceCountChange = (value: string) => {
    setSpaceCount(parseInt(value, 10));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Tab to Space Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="inputText" className="dark:text-slate-200">Input Text</Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here..."
            rows={10}
            className="mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="spaceCount" className="dark:text-slate-200">Spaces per Tab:</Label>
           <Select onValueChange={handleSpaceCountChange} defaultValue={spaceCount.toString()}>
            <SelectTrigger className="w-[80px] dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="8">8</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={handleTabToSpace} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">Convert Tabs to Spaces</Button>
          <Button onClick={handleSpaceToTab} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">Convert Spaces to Tabs</Button>
           <Button onClick={handleClear} variant="outline" className="dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">Clear</Button>
        </div>
        <div>
          <Label htmlFor="outputText" className="dark:text-slate-200">Output Text</Label>
          <Textarea
            id="outputText"
            value={outputText}
            readOnly
            rows={10}
            placeholder="Converted text will appear here..."
            className="mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50"
          />
        </div>
      </CardContent>
    </Card>
  );
} 