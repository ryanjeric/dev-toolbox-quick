import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Dice6 } from 'lucide-react'; // Assuming Dice6 icon is available
import { useToast } from "@/components/ui/use-toast";

const developerExcuses = [
  "It works on my machine.",
  "But it was working yesterday!",
  "That's a feature, not a bug.",
  "It must be a cache issue.",
  "I think the database is down.",
  "The third-party API is acting up.",
  "It's a networking problem.",
  "The client must have changed something.",
  "I'm not sure, I didn't touch that part of the code.",
  "It's a race condition.",
  "The universe must have been hit by a cosmic ray.",
  "I'm not a full-stack developer, I only handle the backend/frontend.",
  "It's a documentation issue.",
  "That's a known issue.",
  "We're waiting on the design team.",
  "It's an environmental issue.",
  "The moon phase is wrong.",
  "The compiler is acting weird.",
  "There's a weird character in the data.",
];

const DeveloperExcuseGeneratorPage = () => {
  const [currentExcuse, setCurrentExcuse] = useState('Click the button to generate an excuse!');
  const { toast } = useToast();

  const generateExcuse = () => {
    const randomIndex = Math.floor(Math.random() * developerExcuses.length);
    setCurrentExcuse(developerExcuses[randomIndex]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExcuse);
    toast({
      title: "Excuse Copied",
      description: "The excuse has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Developer Excuse Generator</h1>
      
      <Card>
        <CardHeader><CardTitle>Get Your Excuse</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-xl italic text-slate-700 min-h-[3em] flex items-center justify-center">
            {currentExcuse}
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={generateExcuse} size="lg">
              <Dice6 className="h-5 w-5 mr-2" /> Generate Excuse
            </Button>
            {currentExcuse !== 'Click the button to generate an excuse!' && (
              <Button onClick={handleCopy} size="lg" variant="outline">
                <Copy className="h-5 w-5 mr-2" /> Copy Excuse
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperExcuseGeneratorPage; 