import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet, Laptop, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScreenInfo {
  width: number;
  height: number;
  diagonal: number;
  dpi: number;
  ppi: number;
  aspectRatio: string;
  deviceType: string;
}

const deviceTypes = [
  { name: 'Desktop Monitor', icon: Monitor, minWidth: 1920, maxWidth: 3840 },
  { name: 'Laptop', icon: Laptop, minWidth: 1366, maxWidth: 1920 },
  { name: 'Tablet', icon: Tablet, minWidth: 768, maxWidth: 1366 },
  { name: 'Mobile', icon: Smartphone, minWidth: 320, maxWidth: 768 },
];

export function ScreenDpiCalculator() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [diagonal, setDiagonal] = useState<number>(24);
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string>('Desktop Monitor');

  const calculateScreenInfo = () => {
    // Calculate diagonal in pixels
    const diagonalPixels = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    
    // Calculate PPI (Pixels Per Inch)
    const ppi = diagonalPixels / diagonal;
    
    // Calculate DPI (Dots Per Inch) - typically same as PPI for digital displays
    const dpi = ppi;
    
    // Calculate aspect ratio
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const divisor = gcd(width, height);
    const aspectRatio = `${width / divisor}:${height / divisor}`;
    
    // Determine device type
    const deviceType = deviceTypes.find(device => 
      width >= device.minWidth && width <= device.maxWidth
    )?.name || 'Custom';

    setScreenInfo({
      width,
      height,
      diagonal,
      dpi,
      ppi,
      aspectRatio,
      deviceType
    });
  };

  const handleDeviceSelect = (deviceName: string) => {
    const device = deviceTypes.find(d => d.name === deviceName);
    if (device) {
      setWidth(device.minWidth);
      setHeight(Math.round(device.minWidth * 9 / 16)); // Assuming 16:9 aspect ratio
      setSelectedDevice(deviceName);
    }
  };

  useEffect(() => {
    calculateScreenInfo();
  }, [width, height, diagonal]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Screen DPI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Device Selection */}
        <div className="space-y-2">
          <Label>Select Device Type</Label>
          <Select value={selectedDevice} onValueChange={handleDeviceSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a device type" />
            </SelectTrigger>
            <SelectContent>
              {deviceTypes.map((device) => (
                <SelectItem key={device.name} value={device.name}>
                  <div className="flex items-center gap-2">
                    <device.icon className="h-4 w-4" />
                    {device.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Screen Width (px)</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Screen Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diagonal">Screen Diagonal (inches)</Label>
            <Input
              id="diagonal"
              type="number"
              value={diagonal}
              onChange={(e) => setDiagonal(Number(e.target.value))}
              min="1"
              step="0.1"
            />
          </div>
        </div>

        {/* Results */}
        {screenInfo && (
          <div className="space-y-4">
            <h3 className="font-medium">Screen Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Resolution</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total number of pixels on screen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold">{width} × {height}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">PPI/DPI</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pixels/Dots Per Inch</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold">{Math.round(screenInfo.ppi)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Aspect Ratio</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Width to height ratio</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold">{screenInfo.aspectRatio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Device Type</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Based on screen width</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold">{screenInfo.deviceType}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Physical Size</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Screen dimensions in inches</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold">{diagonal}"</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Information */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">About DPI/PPI</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>PPI (Pixels Per Inch) measures screen resolution density</li>
            <li>DPI (Dots Per Inch) is typically the same as PPI for digital displays</li>
            <li>Higher PPI means sharper, more detailed display</li>
            <li>Common PPI ranges: Mobile (300-500), Tablet (200-300), Desktop (100-200)</li>
            <li>Use this tool to optimize images and UI elements for different devices</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 