
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TextCaseConverter = () => {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState({
    camelCase: "",
    PascalCase: "",
    snake_case: "",
    "kebab-case": "",
    UPPER_CASE: "",
    lowercase: "",
    "Title Case": "",
  });
  const { toast } = useToast();

  const convertText = (text: string) => {
    if (!text.trim()) {
      setOutputs({
        camelCase: "",
        PascalCase: "",
        snake_case: "",
        "kebab-case": "",
        UPPER_CASE: "",
        lowercase: "",
        "Title Case": "",
      });
      return;
    }

    // Helper functions
    const toCamelCase = (str: string) => {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");
    };

    const toPascalCase = (str: string) => {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
          return word.toUpperCase();
        })
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");
    };

    const toSnakeCase = (str: string) => {
      return str
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_");
    };

    const toKebabCase = (str: string) => {
      return str
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("-");
    };

    const toTitleCase = (str: string) => {
      return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    setOutputs({
      camelCase: toCamelCase(text),
      PascalCase: toPascalCase(text),
      snake_case: toSnakeCase(text),
      "kebab-case": toKebabCase(text),
      UPPER_CASE: toSnakeCase(text).toUpperCase(),
      lowercase: text.toLowerCase(),
      "Title Case": toTitleCase(text),
    });
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  return (
    <Card className="h-fit lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">Text Case Converter</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input text:</label>
          <Textarea
            placeholder="Hello World Example Text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              convertText(e.target.value);
            }}
            className="font-mono text-sm"
            rows={2}
          />
        </div>

        {input.trim() && (
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(outputs).map(([format, output]) => (
              <div key={format} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{format}:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(output)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="font-mono text-sm bg-slate-50 p-2 rounded border min-h-[2.5rem] flex items-center">
                  {output}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
          <strong>Use cases:</strong> Variable naming, API endpoints, file naming, database columns
        </div>
      </CardContent>
    </Card>
  );
};

export default TextCaseConverter;
