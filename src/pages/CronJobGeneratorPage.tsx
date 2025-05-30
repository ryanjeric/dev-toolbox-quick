import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ScheduleOption = "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "custom";

const CronJobGeneratorPage = () => {
  const [scheduleOption, setScheduleOption] = useState<ScheduleOption>("hourly");
  const [command, setCommand] = useState<string>("");
  const [minute, setMinute] = useState<string>("0");
  const [hour, setHour] = useState<string>("0");
  const [dayOfMonth, setDayOfMonth] = useState<string>("*");
  const [month, setMonth] = useState<string>("*");
  const [dayOfWeek, setDayOfWeek] = useState<string>("*");

  const generatedCron = useMemo(() => {
    if (!command.trim()) return "";

    let cronExpression = "";

    switch (scheduleOption) {
      case "hourly":
        cronExpression = `${minute} * * * *`;
        break;
      case "daily":
        cronExpression = `${minute} ${hour} * * *`;
        break;
      case "weekly":
        // Assuming Sunday is 0 or 7, Monday is 1
        cronExpression = `${minute} ${hour} * * ${dayOfWeek}`;
        break;
      case "monthly":
        cronExpression = `${minute} ${hour} ${dayOfMonth} * *`;
        break;
      case "yearly":
        // Assuming January is 1, December is 12
        cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} *`;
        break;
      case "custom":
        cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        break;
    }

    return `${cronExpression} ${command.trim()}`;

  }, [scheduleOption, minute, hour, dayOfMonth, month, dayOfWeek, command]);

  const handleClear = () => {
    setScheduleOption("hourly");
    setCommand("");
    setMinute("0");
    setHour("0");
    setDayOfMonth("*");
    setMonth("*");
    setDayOfWeek("*");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Cron expression copied!");
  };

  // Helper to render time inputs based on selected schedule option
  const renderTimeInputs = () => {
    switch (scheduleOption) {
      case "hourly":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="minute">Minute (0-59)</Label>
                <Input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" placeholder="0" />
             </div>
          </div>
        );
      case "daily":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minute">Minute (0-59)</Label>
              <Input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hour">Hour (0-23)</Label>
              <Input type="number" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} min="0" max="23" placeholder="0" />
            </div>
          </div>
        );
      case "weekly":
         return (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label htmlFor="minute">Minute (0-59)</Label>
               <Input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" placeholder="0" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="hour">Hour (0-23)</Label>
               <Input type="number" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} min="0" max="23" placeholder="0" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="dayOfWeek">Day of Week (0-7, Sun=0 or 7)</Label>
               <Input type="number" id="dayOfWeek" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} min="0" max="7" placeholder="*" />
             </div>
           </div>
         );
      case "monthly":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minute">Minute (0-59)</Label>
              <Input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hour">Hour (0-23)</Label>
              <Input type="number" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} min="0" max="23" placeholder="0" />
            </div>
             <div className="space-y-2">
               <Label htmlFor="dayOfMonth">Day of Month (1-31)</Label>
               <Input type="number" id="dayOfMonth" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} min="1" max="31" placeholder="*" />
             </div>
          </div>
        );
      case "yearly":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minute">Minute (0-59)</Label>
              <Input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hour">Hour (0-23)</Label>
              <Input type="number" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} min="0" max="23" placeholder="0" />
            </div>
             <div className="space-y-2">
               <Label htmlFor="dayOfMonth">Day of Month (1-31)</Label>
               <Input type="number" id="dayOfMonth" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} min="1" max="31" placeholder="*" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="month">Month (1-12)</Label>
               <Input type="number" id="month" value={month} onChange={(e) => setMonth(e.target.value)} min="1" max="12" placeholder="*" />
             </div>
          </div>
        );
      case "custom":
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minute">Minute</Label>
              <Input type="text" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hour">Hour</Label>
              <Input type="text" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} placeholder="*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dayOfMonth">Day of Month</Label>
              <Input type="text" id="dayOfMonth" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} placeholder="*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Input type="text" id="month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dayOfWeek">Day of Week</Label>
              <Input type="text" id="dayOfWeek" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} placeholder="*" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Cron Job Generator</CardTitle>
          <CardDescription>
            Generate cron expressions for scheduling tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Schedule Option */}
            <div className="space-y-2">
              <Label htmlFor="scheduleOption">Schedule:</Label>
              <Select value={scheduleOption} onValueChange={(value: ScheduleOption) => setScheduleOption(value)}>
                <SelectTrigger id="scheduleOption">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Inputs based on Schedule */}
            {renderTimeInputs()}

            {/* Command Input */}
            <div className="space-y-2">
              <Label htmlFor="command">Command:</Label>
              <Input
                id="command"
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="e.g., /usr/bin/backup.sh"
              />
            </div>

            {/* Generated Cron Expression */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cronOutput">Generated Cron Expression:</Label>
                <Button variant="link" size="sm" onClick={() => copyToClipboard(generatedCron)} disabled={!generatedCron}>
                  Copy
                </Button>
              </div>
              <Textarea
                id="cronOutput"
                value={generatedCron}
                readOnly
                placeholder="Cron expression will appear here..."
                className="min-h-[60px] font-mono text-sm"
              />
            </div>

            {/* Clear Button */}
             <div>
               <Button variant="outline" onClick={handleClear} disabled={!command}>
                 Clear
               </Button>
             </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CronJobGeneratorPage;