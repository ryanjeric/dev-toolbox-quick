import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { CheckedState } from '@radix-ui/react-checkbox'; // Assuming Checkbox uses radix-ui CheckedState

// Standard Lorem Ipsum text (can be expanded)
const standardLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsumGeneratorPage = () => {
  const [numParagraphs, setNumParagraphs] = useState(3);
  const [includeLists, setIncludeLists] = useState(false);
  const [includeBold, setIncludeBold] = useState(false);
  const [includeItalic, setIncludeItalic] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const { toast } = useToast();

  const generateLoremIpsum = () => {
    let text = '';
    const sentences = standardLorem.split('. ').map(s => s.trim()).filter(s => s.length > 0);

    for (let i = 0; i < numParagraphs; i++) {
      let paragraphSentences: string[] = [];
      // Simple logic: take a few sentences for each paragraph
      const start = Math.floor(Math.random() * (sentences.length - 3));
      const end = Math.min(start + 3 + Math.floor(Math.random() * 2), sentences.length);
      paragraphSentences = sentences.slice(start, end);

      let paragraphText = paragraphSentences.join('. ') + '.';

      // Apply tags within paragraph (basic implementation)
      if (includeBold) {
        const words = paragraphText.split(' ');
        if (words.length > 2) {
           const boldIndex = Math.floor(Math.random() * (words.length - 2));
           words[boldIndex] = `<strong>${words[boldIndex]}</strong>`;
           paragraphText = words.join(' ');
        }
      }
      if (includeItalic) {
         const words = paragraphText.split(' ');
         if (words.length > 2) {
            const italicIndex = Math.floor(Math.random() * (words.length - 2));
            words[italicIndex] = `<em>${words[italicIndex]}</em>`;
            paragraphText = words.join(' ');
         }
      }

      text += `<p>${paragraphText}</p>\n\n`;

      // Add a list after some paragraphs if enabled
      if (includeLists && i % 2 === 0 && i < numParagraphs - 1) { // Add list after even paragraphs, but not the last one
         text += '<ul>\n';
         const numItems = Math.max(2, Math.floor(Math.random() * 4)); // 2 to 5 items
         for(let j = 0; j < numItems; j++){
            const listItemSentences = sentences.slice(Math.floor(Math.random() * (sentences.length - 1)), Math.min(sentences.length, Math.floor(Math.random() * 2) + 1));
             let listItemText = listItemSentences.join('. ') + '.';
             // Apply tags within list item
             if (includeBold) {
               const words = listItemText.split(' ');
               if (words.length > 2) {
                 const boldIndex = Math.floor(Math.random() * (words.length - 2));
                 words[boldIndex] = `<strong>${words[boldIndex]}</strong>`;
                 listItemText = words.join(' ');
               }
             }
             if (includeItalic) {
                const words = listItemText.split(' ');
                if (words.length > 2) {
                   const italicIndex = Math.floor(Math.random() * (words.length - 2));
                   words[italicIndex] = `<em>${words[italicIndex]}</em>`;
                   listItemText = words.join(' ');
                }
             }

            text += `  <li>${listItemText}</li>\n`;
         }
         text += '</ul>\n\n';
      }

    }

    setGeneratedText(text.trim());
  };

  // Generate text whenever options change
  useMemo(() => {
    generateLoremIpsum();
  }, [numParagraphs, includeLists, includeBold, includeItalic]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Text Copied",
      description: "The generated Lorem Ipsum text has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lorem Ipsum Generator with Tags</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Card */}
        <Card>
          <CardHeader><CardTitle>Options</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Number of Paragraphs */}
            <div>
              <Label htmlFor="numParagraphs">Number of Paragraphs: {numParagraphs}</Label>
              <Slider
                id="numParagraphs"
                min={1}
                max={10}
                step={1}
                value={[numParagraphs]}
                onValueChange={(val) => setNumParagraphs(val[0])}
                className="mt-1"
              />
            </div>

            {/* Tag Options */}
            <div>
              <Label>Include Tags:</Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeLists" 
                    checked={includeLists} 
                    onCheckedChange={(checked: CheckedState) => { if (typeof checked === 'boolean') setIncludeLists(checked); }}
                   />
                  <Label htmlFor="includeLists">Lists (&lt;ul&gt;)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeBold" 
                    checked={includeBold} 
                    onCheckedChange={(checked: CheckedState) => { if (typeof checked === 'boolean') setIncludeBold(checked); }}
                  />
                  <Label htmlFor="includeBold">Bold (&lt;strong&gt;)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeItalic" 
                    checked={includeItalic} 
                    onCheckedChange={(checked: CheckedState) => { if (typeof checked === 'boolean') setIncludeItalic(checked); }}
                  />
                  <Label htmlFor="includeItalic">Italic (&lt;em&gt;)</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card>
          <CardHeader><CardTitle>Generated Text</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="generatedText">Generated HTML:</Label>
              <div className="relative mt-1">
                <Textarea
                  id="generatedText"
                  readOnly
                  value={generatedText}
                  rows={15}
                  className="font-mono text-sm bg-muted"
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2" 
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Text
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoremIpsumGeneratorPage; 