
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, Palette, Brush } from "lucide-react";
import { toast } from "sonner";

const DigitalZenGardenPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState([20]);
  const [sandColor, setSandColor] = useState("#F4E4BC");
  const [rakeColor, setRakeColor] = useState("#8B4513");
  const [pattern, setPattern] = useState("circular");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Initialize with sand texture
    initializeSand(ctx, canvas.width, canvas.height);
    
    toast("Welcome to your Digital Zen Garden. Click and drag to rake patterns in the sand.");
  }, [sandColor]);

  const initializeSand = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Fill with sand color
    ctx.fillStyle = sandColor;
    ctx.fillRect(0, 0, width, height);

    // Add sand texture
    ctx.fillStyle = adjustBrightness(sandColor, -10);
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Add some rocks
    addRocks(ctx, width, height);
  };

  const addRocks = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const rocks = [
      { x: width * 0.2, y: height * 0.3, size: 40 },
      { x: width * 0.7, y: height * 0.6, size: 35 },
      { x: width * 0.8, y: height * 0.2, size: 25 },
      { x: width * 0.3, y: height * 0.8, size: 30 },
    ];

    rocks.forEach(rock => {
      // Rock shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.ellipse(rock.x + 3, rock.y + 3, rock.size, rock.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rock
      const gradient = ctx.createRadialGradient(
        rock.x - rock.size * 0.3, rock.y - rock.size * 0.3, 0,
        rock.x, rock.y, rock.size
      );
      gradient.addColorStop(0, "#A0A0A0");
      gradient.addColorStop(1, "#606060");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(rock.x, rock.y, rock.size, rock.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const adjustBrightness = (color: string, amount: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = (num >> 8 & 0x00FF) + amt;
    const G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
      (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + 
      (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
  };

  const drawRakePattern = (ctx: CanvasRenderingContext2D, x: number, y: number, prevX: number, prevY: number) => {
    const size = brushSize[0];
    
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = rakeColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    if (pattern === "circular") {
      // Circular rake pattern
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        const offsetX = Math.cos(angle) * (size / 4);
        const offsetY = Math.sin(angle) * (size / 4);
        
        ctx.beginPath();
        ctx.moveTo(prevX + offsetX, prevY + offsetY);
        ctx.lineTo(x + offsetX, y + offsetY);
        ctx.stroke();
      }
    } else if (pattern === "parallel") {
      // Parallel lines
      for (let i = -2; i <= 2; i++) {
        const offset = i * (size / 8);
        ctx.beginPath();
        ctx.moveTo(prevX + offset, prevY);
        ctx.lineTo(x + offset, y);
        ctx.stroke();
      }
    } else if (pattern === "spiral") {
      // Spiral pattern
      const distance = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);
      const steps = Math.max(1, Math.floor(distance / 2));
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const currentX = prevX + (x - prevX) * t;
        const currentY = prevY + (y - prevY) * t;
        const spiralRadius = (size / 4) * (1 - t * 0.5);
        const angle = t * Math.PI * 4;
        
        ctx.beginPath();
        ctx.arc(currentX + Math.cos(angle) * spiralRadius, currentY + Math.sin(angle) * spiralRadius, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Add sand displacement effect
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = adjustBrightness(sandColor, -20);
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalCompositeOperation = "source-over";
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      drawRakePattern(ctx, x, y, x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const prevX = x - e.movementX;
      const prevY = y - e.movementY;
      drawRakePattern(ctx, x, y, prevX, prevY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearGarden = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    
    initializeSand(ctx, canvas.width, canvas.height);
    toast("Zen garden cleared. Start fresh with your meditation.");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Digital Zen Garden
        </h1>
        <p className="text-muted-foreground">
          Create peaceful patterns in the sand. Click and drag to rake. Find your inner calm.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brush className="h-5 w-5" />
                Rake Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Brush Size</label>
                <Slider
                  value={brushSize}
                  onValueChange={setBrushSize}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{brushSize[0]}px</span>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rake Pattern</label>
                <Select value={pattern} onValueChange={setPattern}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circular">Circular</SelectItem>
                    <SelectItem value="parallel">Parallel Lines</SelectItem>
                    <SelectItem value="spiral">Spiral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sand Color</label>
                <div className="flex gap-2 flex-wrap">
                  {["#F4E4BC", "#E6D7B8", "#D4C5A9", "#C9B79C", "#B8A082"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSandColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        sandColor === color ? "border-primary" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rake Color</label>
                <div className="flex gap-2 flex-wrap">
                  {["#8B4513", "#654321", "#4A4A4A", "#2F4F4F", "#556B2F"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setRakeColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        rakeColor === color ? "border-primary" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Button onClick={clearGarden} variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Garden
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Meditation Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Focus on your breathing while raking</p>
              <p>• Create repetitive, flowing patterns</p>
              <p>• Let go of perfectionism</p>
              <p>• Embrace the present moment</p>
              <p>• Clear the garden when ready to start fresh</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="border rounded-lg shadow-lg cursor-crosshair w-full max-w-full h-auto"
                style={{ aspectRatio: "4/3" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalZenGardenPage;
