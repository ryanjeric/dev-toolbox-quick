import { useState } from "react";
import { Copy, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const TextCaseConverter = () => {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
        return word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string) => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  };

  const toKebabCase = (str: string) => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  const cases = [
    { label: "camelCase", value: toCamelCase(input) },
    { label: "PascalCase", value: toPascalCase(input) },
    { label: "snake_case", value: toSnakeCase(input) },
    { label: "kebab-case", value: toKebabCase(input) },
    { label: "UPPERCASE", value: input.toUpperCase() },
    { label: "lowercase", value: input.toLowerCase() },
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          <span className="text-lg">Text Case Converter</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="convert" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="convert">Convert</TabsTrigger>
          </TabsList>
          
          <TabsContent value="convert" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Input text:</label>
              <Textarea
                placeholder="Hello World Example"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono text-sm"
                rows={3}
              />
            </div>

            {input && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Converted formats:</label>
                {cases.map((caseItem, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-24 text-xs font-medium text-muted-foreground">
                      {caseItem.label}:
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <code className="flex-1 px-2 py-1 bg-muted rounded text-sm font-mono">
                        {caseItem.value}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(caseItem.value)}
                        className="h-7 px-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
          <strong>Use cases:</strong> Variable naming, API endpoints, file naming conventions
        </div>
      </CardContent>
    </Card>
  );
};

export default TextCaseConverter;
