
import { useState } from "react";
import { Copy, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [humanDate, setHumanDate] = useState("");
  const [unixOutput, setUnixOutput] = useState("");
  const { toast } = useToast();

  const convertToHuman = (ts: string) => {
    if (!ts.trim()) {
      setHumanDate("");
      return;
    }
    
    try {
      const timestamp = parseInt(ts);
      if (isNaN(timestamp)) {
        setHumanDate("Invalid timestamp");
        return;
      }
      
      // Handle both seconds and milliseconds
      const date = new Date(timestamp > 9999999999 ? timestamp : timestamp * 1000);
      setHumanDate(date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    } catch (err) {
      setHumanDate("Invalid timestamp");
    }
  };

  const convertToUnix = (dateStr: string) => {
    if (!dateStr.trim()) {
      setUnixOutput("");
      return;
    }
    
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        setUnixOutput("Invalid date format");
        return;
      }
      
      setUnixOutput(Math.floor(date.getTime() / 1000).toString());
    } catch (err) {
      setUnixOutput("Invalid date format");
    }
  };

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    convertToHuman(now.toString());
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
          <Clock className="h-5 w-5" />
          <span className="text-lg">Timestamp Converter</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unix-to-human" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unix-to-human">UNIX → Human</TabsTrigger>
            <TabsTrigger value="human-to-unix">Human → UNIX</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unix-to-human" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">UNIX timestamp:</label>
              <div className="flex gap-2">
                <Input
                  placeholder="1234567890"
                  value={timestamp}
                  onChange={(e) => {
                    setTimestamp(e.target.value);
                    convertToHuman(e.target.value);
                  }}
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={getCurrentTimestamp}
                  className="px-3 whitespace-nowrap"
                >
                  Now
                </Button>
              </div>
            </div>

            {humanDate && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Human readable:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(humanDate)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  value={humanDate}
                  readOnly
                  className="font-mono text-sm bg-slate-50"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="human-to-unix" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date (ISO format or readable):</label>
              <Input
                placeholder="2024-01-01 12:00:00 or Jan 1, 2024"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value);
                  convertToUnix(e.target.value);
                }}
                className="font-mono text-sm"
              />
            </div>

            {unixOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">UNIX timestamp:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(unixOutput)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  value={unixOutput}
                  readOnly
                  className="font-mono text-sm bg-slate-50"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded mt-4">
          <strong>Formats:</strong> UNIX timestamps, ISO 8601, or human readable dates like "Jan 1, 2024"
        </div>
      </CardContent>
    </Card>
  );
};

export default TimestampConverter;
