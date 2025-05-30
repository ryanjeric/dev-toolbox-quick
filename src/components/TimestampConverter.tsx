
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TimestampConverter = () => {
  const [unixInput, setUnixInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [humanOutput, setHumanOutput] = useState("");
  const [unixOutput, setUnixOutput] = useState("");
  const [currentTime, setCurrentTime] = useState({
    unix: Math.floor(Date.now() / 1000),
    human: new Date().toISOString()
  });
  const { toast } = useToast();

  const convertUnixToHuman = (unix: string) => {
    if (!unix.trim()) {
      setHumanOutput("");
      return;
    }

    try {
      const timestamp = parseInt(unix);
      const date = new Date(timestamp * 1000);
      setHumanOutput(date.toISOString());
    } catch (err) {
      setHumanOutput("Invalid timestamp");
    }
  };

  const convertHumanToUnix = (dateStr: string) => {
    if (!dateStr.trim()) {
      setUnixOutput("");
      return;
    }

    try {
      const date = new Date(dateStr);
      const unix = Math.floor(date.getTime() / 1000);
      setUnixOutput(unix.toString());
    } catch (err) {
      setUnixOutput("Invalid date format");
    }
  };

  const updateCurrentTime = () => {
    setCurrentTime({
      unix: Math.floor(Date.now() / 1000),
      human: new Date().toISOString()
    });
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  // Update current time every second
  useState(() => {
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">Timestamp Converter</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Time */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm font-medium mb-2">Current Time:</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-600 w-12">Unix:</span>
            <Input
              value={currentTime.unix}
              readOnly
              className="font-mono text-xs h-7"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(currentTime.unix.toString())}
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 w-12">ISO:</span>
            <Input
              value={currentTime.human}
              readOnly
              className="font-mono text-xs h-7"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(currentTime.human)}
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Unix to Human */}
        <div>
          <label className="text-sm font-medium mb-2 block">Unix timestamp:</label>
          <Input
            placeholder="1609459200"
            value={unixInput}
            onChange={(e) => {
              setUnixInput(e.target.value);
              convertUnixToHuman(e.target.value);
            }}
            className="font-mono text-sm"
          />
        </div>

        {humanOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Human readable:</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(humanOutput)}
                className="h-7 px-2"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Input
              value={humanOutput}
              readOnly
              className="font-mono text-sm bg-slate-50"
            />
          </div>
        )}

        {/* Human to Unix */}
        <div>
          <label className="text-sm font-medium mb-2 block">Date/time (ISO or any format):</label>
          <Input
            placeholder="2021-01-01T00:00:00Z"
            value={dateInput}
            onChange={(e) => {
              setDateInput(e.target.value);
              convertHumanToUnix(e.target.value);
            }}
            className="font-mono text-sm"
          />
        </div>

        {unixOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Unix timestamp:</label>
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
      </CardContent>
    </Card>
  );
};

export default TimestampConverter;
