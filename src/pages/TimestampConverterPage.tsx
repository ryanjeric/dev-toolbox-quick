import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TimestampConverterPage = () => {
  const [timestampInput, setTimestampInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [timestampOutput, setTimestampOutput] = useState<string>("");
  const [dateOutput, setDateOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleTimestampInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimestampInput(value);
    setDateInput(""); // Clear date input when timestamp changes
    setError(null);

    const timestamp = parseInt(value, 10);

    if (isNaN(timestamp)) {
      setDateOutput("");
      if (value.trim() !== "") setError("Invalid timestamp");
      return;
    }

    // Assuming input is in seconds, convert to milliseconds for JavaScript Date
    const date = new Date(timestamp * 1000);

    if (isNaN(date.getTime())) {
       setDateOutput("");
       setError("Invalid timestamp");
    } else {
       setDateOutput(date.toISOString()); // Using ISO string for simplicity, can format differently
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInput(value);
    setTimestampInput(""); // Clear timestamp input when date changes
    setError(null);

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
         setTimestampOutput("");
         if (value.trim() !== "") setError("Invalid date format");
      } else {
         // Get timestamp in seconds
         setTimestampOutput(Math.floor(date.getTime() / 1000).toString());
      }
    } catch (e) {
       setTimestampOutput("");
       if (value.trim() !== "") setError("Invalid date format");
    }
  };

  const handleClear = () => {
    setTimestampInput("");
    setDateInput("");
    setTimestampOutput("");
    setDateOutput("");
    setError(null);
  };

  const copyToClipboard = (text: string, message: string) => {
    if (!text) return; // Don't copy empty values
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

   // Auto-update outputs if inputs are valid
   useMemo(() => {
    // This memo is just to trigger updates when inputs change,
    // actual conversion is handled in input change handlers.
    // This might be redundant given the input change handlers directly set outputs.
   }, [timestampInput, dateInput]);


  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Timestamp Converter</CardTitle>
          <CardDescription>
            Convert between Unix timestamps and human-readable dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timestamp Input and Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timestampInput">Unix Timestamp (seconds):</Label>
                <Input
                  id="timestampInput"
                  type="number"
                  value={timestampInput}
                  onChange={handleTimestampInputChange}
                  placeholder="e.g., 1678886400"
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="dateOutput">Human Readable Date (UTC):</Label>
                     <Button variant="link" size="sm" onClick={() => copyToClipboard(dateOutput, "Date copied!")} disabled={!dateOutput}>
                       Copy
                     </Button>
                 </div>
                <Input
                  id="dateOutput"
                  type="text"
                  value={dateOutput}
                  readOnly
                  placeholder="Converted date will appear here..."
                />
              </div>
            </div>

            {/* Date Input and Timestamp Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label htmlFor="dateInput">Enter Date (e.g., YYYY-MM-DD HH:MM:SS):</Label>
                <Input
                  id="dateInput"
                  type="datetime-local" // Using datetime-local for potential browser pickers
                  value={dateInput}
                  onChange={handleDateInputChange}
                />
              </div>
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <Label htmlFor="timestampOutput">Unix Timestamp (seconds):</Label>
                    <Button variant="link" size="sm" onClick={() => copyToClipboard(timestampOutput, "Timestamp copied!")} disabled={!timestampOutput}>
                      Copy
                    </Button>
                 </div>
                <Input
                  id="timestampOutput"
                  type="text"
                  value={timestampOutput}
                  readOnly
                  placeholder="Converted timestamp will appear here..."
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Clear Button */}
             <div>
               <Button variant="outline" onClick={handleClear} disabled={!timestampInput && !dateInput}>
                 Clear
               </Button>
             </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimestampConverterPage; 