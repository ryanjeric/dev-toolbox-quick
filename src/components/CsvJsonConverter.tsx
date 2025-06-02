import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const CsvJsonConverter = () => {
  const [csvInput, setCsvInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const { toast } = useToast();

  const csvToJson = (csv: string) => {
    if (!csv.trim()) {
      setJsonOutput("");
      return;
    }
    
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      result.push(obj);
    }
    
    setJsonOutput(JSON.stringify(result, null, 2));
  };

  const jsonToCsv = (json: string) => {
    if (!json.trim()) {
      setCsvOutput("");
      return;
    }
    
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) {
        setCsvOutput("Input must be an array of objects");
        return;
      }
      
      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(',')];
      
      data.forEach(row => {
        const values = headers.map(header => row[header] || '');
        csvRows.push(values.join(','));
      });
      
      setCsvOutput(csvRows.join('\n'));
    } catch (err) {
      setCsvOutput("Invalid JSON");
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">CSV ⇄ JSON</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="csv-to-json" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="csv-to-json">CSV → JSON</TabsTrigger>
            <TabsTrigger value="json-to-csv">JSON → CSV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="csv-to-json" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">CSV input:</label>
              <Textarea
                placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA"
                value={csvInput}
                onChange={(e) => {
                  setCsvInput(e.target.value);
                  csvToJson(e.target.value);
                }}
                className="font-mono text-sm"
                rows={4}
              />
            </div>

            {jsonOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">JSON output:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(jsonOutput)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  value={jsonOutput}
                  readOnly
                  className="font-mono text-sm bg-muted"
                  rows={6}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="json-to-csv" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON input (array of objects):</label>
              <Textarea
                placeholder='[{"name":"John","age":30,"city":"NYC"},{"name":"Jane","age":25,"city":"LA"}]'
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  jsonToCsv(e.target.value);
                }}
                className="font-mono text-sm"
                rows={4}
              />
            </div>

            {csvOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">CSV output:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(csvOutput)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  value={csvOutput}
                  readOnly
                  className="font-mono text-sm bg-slate-50"
                  rows={4}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CsvJsonConverter;
