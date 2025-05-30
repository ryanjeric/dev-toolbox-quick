import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { format, addMinutes, addHours, addDays, addMonths, setHours, setMinutes } from "date-fns";

const CronExpressionVisualizer = () => {
  const [cronExpression, setCronExpression] = useState("");
  const [readableFormat, setReadableFormat] = useState("");
  const [upcomingExecutions, setUpcomingExecutions] = useState<Date[]>([]);
  const [error, setError] = useState("");

  const getReadableFormat = (cron: string) => {
    const parts = cron.split(" ");
    if (parts.length !== 5) return "Invalid cron expression";

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    let description = "";

    // Handle special cases
    if (cron === "0 0 * * *") return "Every day at midnight";
    if (cron === "0 0 * * 0") return "Every Sunday at midnight";
    if (cron === "0 0 1 * *") return "Every first day of the month at midnight";

    // Build description
    if (minute === "0" && hour === "0") {
      description += "At midnight";
    } else {
      description += `At ${hour}:${minute.padStart(2, "0")}`;
    }

    if (dayOfMonth !== "*" && month === "*") {
      description += ` on day ${dayOfMonth} of every month`;
    } else if (dayOfMonth === "*" && month !== "*") {
      description += ` every day in ${month}`;
    } else if (dayOfMonth !== "*" && month !== "*") {
      description += ` on day ${dayOfMonth} of ${month}`;
    } else if (dayOfWeek !== "*") {
      const days = dayOfWeek.split(",").map(d => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[parseInt(d)];
      });
      description += ` every ${days.join(", ")}`;
    } else {
      description += " every day";
    }

    return description;
  };

  const getNextExecutions = (cron: string): Date[] => {
    const parts = cron.split(" ");
    if (parts.length !== 5) return [];

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    const now = new Date();
    const executions: Date[] = [];

    // Set initial time
    let nextDate = setMinutes(setHours(now, parseInt(hour)), parseInt(minute));
    if (nextDate < now) {
      nextDate = addDays(nextDate, 1);
    }

    // Generate next 5 executions
    for (let i = 0; i < 5; i++) {
      executions.push(new Date(nextDate));
      nextDate = addDays(nextDate, 1);
    }

    return executions;
  };

  const handleVisualize = () => {
    try {
      setError("");
      const nextExecutions = getNextExecutions(cronExpression);
      
      if (nextExecutions.length === 0) {
        throw new Error("Invalid cron expression");
      }

      setReadableFormat(getReadableFormat(cronExpression));
      setUpcomingExecutions(nextExecutions);
    } catch (err) {
      setError("Invalid cron expression. Please check the format.");
      setReadableFormat("");
      setUpcomingExecutions([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cron Expression Visualizer</CardTitle>
        <CardDescription>
          Enter a cron expression to see its readable format and upcoming execution times
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cron">Cron Expression</Label>
            <div className="flex gap-2">
              <Input
                id="cron"
                placeholder="0 0 * * *"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
              />
              <Button onClick={handleVisualize}>Visualize</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Format: minute hour day-of-month month day-of-week
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {readableFormat && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Readable Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{readableFormat}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Executions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {upcomingExecutions.map((date, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-muted-foreground">Next {index + 1}:</span>
                        <span className="font-medium">{format(date, "PPpp")}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CronExpressionVisualizer; 