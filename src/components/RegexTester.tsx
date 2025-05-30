
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const testRegex = () => {
    try {
      setError("");
      if (!pattern || !testString) {
        setMatches([]);
        return;
      }

      const regex = new RegExp(pattern, flags);
      const allMatches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) {
            break;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
    }
  };

  const copyMatch = (match: string) => {
    navigator.clipboard.writeText(match);
    toast({ description: "Match copied to clipboard!" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Regex Tester
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Regex Pattern</label>
              <Input
                placeholder="Enter regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Flags</label>
              <Input
                placeholder="g, i, m, s, u, y"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Test String</label>
            <Textarea
              placeholder="Enter text to test against the regex..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[120px] font-mono"
            />
          </div>

          <Button onClick={testRegex} className="w-full">
            Test Regex
          </Button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {matches.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Matches ({matches.length})</h3>
              {matches.map((match, index) => (
                <div key={index} className="border rounded-md p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Match {index + 1}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyMatch(match[0])}
                      className="h-7"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="font-mono text-sm bg-white p-2 rounded border">
                    {match[0]}
                  </div>
                  {match.length > 1 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Groups:</p>
                      {match.slice(1).map((group, groupIndex) => (
                        <div key={groupIndex} className="text-sm text-gray-600">
                          Group {groupIndex + 1}: {group || "(empty)"}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Index: {match.index}
                  </div>
                </div>
              ))}
            </div>
          )}

          {pattern && testString && matches.length === 0 && !error && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-700 text-sm">No matches found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegexTester;
