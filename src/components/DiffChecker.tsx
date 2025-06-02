import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GitCompare, RefreshCw } from "lucide-react";

const DiffChecker = () => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diff, setDiff] = useState<{ left: string[], right: string[], changes: boolean[] }>({ left: [], right: [], changes: [] });

  const generateDiff = () => {
    const leftLines = leftText.split('\n');
    const rightLines = rightText.split('\n');
    const maxLines = Math.max(leftLines.length, rightLines.length);
    
    const leftResult = [];
    const rightResult = [];
    const changes = [];

    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] || '';
      const rightLine = rightLines[i] || '';
      const hasChange = leftLine !== rightLine;
      
      leftResult.push(leftLine);
      rightResult.push(rightLine);
      changes.push(hasChange);
    }

    setDiff({ left: leftResult, right: rightResult, changes });
  };

  const clearAll = () => {
    setLeftText("");
    setRightText("");
    setDiff({ left: [], right: [], changes: [] });
  };

  const renderDiffLine = (line: string, index: number, hasChange: boolean, side: 'left' | 'right') => {
    const bgColor = hasChange 
      ? (side === 'left' ? 'bg-red-950/50 border-l-2 border-red-500' : 'bg-green-950/50 border-l-2 border-green-500')
      : 'bg-muted';
    
    return (
      <div
        key={index}
        className={`px-3 py-1 font-mono text-sm ${bgColor} min-h-[1.5rem] flex items-center`}
      >
        <span className="text-muted-foreground w-8 text-xs mr-3 select-none">{index + 1}</span>
        <span className="whitespace-pre-wrap break-all">{line || ' '}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Diff Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Original Text</label>
              <Textarea
                placeholder="Paste original text here..."
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Modified Text</label>
              <Textarea
                placeholder="Paste modified text here..."
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button onClick={generateDiff} className="flex-1">
              <GitCompare className="mr-2 h-4 w-4" />
              Compare
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          {/* Diff Results */}
          {diff.left.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Comparison Results</h3>
              
              {/* Legend */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-950/50 border-l-2 border-red-500"></div>
                  <span>Removed/Changed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-950/50 border-l-2 border-green-500"></div>
                  <span>Added/Changed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted"></div>
                  <span>Unchanged</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border rounded-lg overflow-hidden">
                {/* Left Side */}
                <div className="border-r">
                  <div className="bg-muted px-3 py-2 text-sm font-medium border-b">
                    Original
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {diff.left.map((line, index) => 
                      renderDiffLine(line, index, diff.changes[index], 'left')
                    )}
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  <div className="bg-muted px-3 py-2 text-sm font-medium border-b">
                    Modified
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {diff.right.map((line, index) => 
                      renderDiffLine(line, index, diff.changes[index], 'right')
                    )}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-muted p-3 rounded-md">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Total lines: </span>
                    {Math.max(diff.left.length, diff.right.length)}
                  </div>
                  <div>
                    <span className="font-medium">Changed lines: </span>
                    {diff.changes.filter(Boolean).length}
                  </div>
                  <div>
                    <span className="font-medium">Unchanged lines: </span>
                    {diff.changes.filter(c => !c).length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiffChecker;
