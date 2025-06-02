import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Common timezones
const timeZones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Australia/Sydney',
  'Pacific/Auckland'
];

const TimeZoneConverterPage = () => {
  const [fromTimeZone, setFromTimeZone] = useState('');
  const [toTimeZone, setToTimeZone] = useState('UTC');
  const [dateTime, setDateTime] = useState('');
  const [convertedDateTime, setConvertedDateTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  // Set default from timezone to user's local timezone
  useEffect(() => {
    setFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const convertTimeZone = () => {
    setError(null);
    if (!dateTime || !fromTimeZone || !toTimeZone) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Create a date object from the input
      const date = new Date(dateTime);
      
      // Format the date in the target timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      const converted = formatter.format(date);
      
      // Add timezone abbreviation
      const timeZoneAbbr = new Intl.DateTimeFormat('en-US', {
        timeZone: toTimeZone,
        timeZoneName: 'short'
      }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value;

      setConvertedDateTime(`${converted} ${timeZoneAbbr}`);
    } catch (e: any) {
      setError('Error converting timezone: ' + e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedDateTime);
    toast({
      title: "Time Copied",
      description: "The converted time has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TimeZone Converter</h1>
      
      <Card>
        <CardHeader><CardTitle>Convert Time</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* From TimeZone Selection */}
          <div>
            <Label htmlFor="fromTimeZone">From TimeZone:</Label>
            <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map(tz => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DateTime Input */}
          <div>
            <Label htmlFor="dateTime">Date and Time:</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* To TimeZone Selection */}
          <div>
            <Label htmlFor="toTimeZone">To TimeZone:</Label>
            <Select value={toTimeZone} onValueChange={setToTimeZone}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map(tz => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button 
            onClick={convertTimeZone}
            className="w-full"
            disabled={!dateTime || !fromTimeZone || !toTimeZone}
          >
            Convert Time
          </Button>

          {/* Converted Time Display */}
          {error && <div className="text-red-500">{error}</div>}
          {convertedDateTime && (
            <div className="mt-4">
              <Label>Converted Time:</Label>
              <div className="relative mt-1">
                <Input
                  readOnly
                  value={convertedDateTime}
                  className="bg-muted pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute top-1 right-1" 
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeZoneConverterPage; 