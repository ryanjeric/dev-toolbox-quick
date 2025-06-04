
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Cloud, RefreshCw, Play, Pause } from "lucide-react";
import { toast } from "sonner";

interface CloudShape {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  path: string;
  color: string;
}

const CloudShapeGeneratorPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [clouds, setClouds] = useState<CloudShape[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [cloudCount, setCloudCount] = useState([8]);
  const [windSpeed, setWindSpeed] = useState([1]);

  const cloudColors = [
    "rgba(255, 255, 255, 0.9)",
    "rgba(248, 250, 252, 0.8)",
    "rgba(241, 245, 249, 0.85)",
    "rgba(226, 232, 240, 0.7)",
    "rgba(203, 213, 225, 0.75)"
  ];

  const generateCloudPath = (size: number): string => {
    const variations = Math.random() * 0.3 + 0.8; // 0.8 to 1.1
    const bumps = Math.floor(Math.random() * 4) + 6; // 6 to 9 bumps
    let path = `M ${size * 0.2} ${size * 0.6}`;
    
    for (let i = 0; i <= bumps; i++) {
      const angle = (i / bumps) * Math.PI * 2;
      const radiusVariation = (Math.random() * 0.4 + 0.6) * variations;
      const x = Math.cos(angle) * size * 0.4 * radiusVariation + size * 0.5;
      const y = Math.sin(angle) * size * 0.3 * radiusVariation + size * 0.5;
      
      if (i === 0) {
        path += `L ${x} ${y}`;
      } else {
        const prevAngle = ((i - 1) / bumps) * Math.PI * 2;
        const prevX = Math.cos(prevAngle) * size * 0.4 * radiusVariation + size * 0.5;
        const prevY = Math.sin(prevAngle) * size * 0.3 * radiusVariation + size * 0.5;
        
        const cp1x = prevX + (Math.random() - 0.5) * size * 0.2;
        const cp1y = prevY + (Math.random() - 0.5) * size * 0.2;
        const cp2x = x + (Math.random() - 0.5) * size * 0.2;
        const cp2y = y + (Math.random() - 0.5) * size * 0.2;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
      }
    }
    
    path += " Z";
    return path;
  };

  const generateCloud = (id: number, canvasWidth: number, canvasHeight: number): CloudShape => {
    const size = Math.random() * 120 + 80; // 80 to 200
    return {
      id,
      x: -size - Math.random() * 200,
      y: Math.random() * (canvasHeight - size * 0.8),
      size,
      speed: (Math.random() * 0.5 + 0.3) * windSpeed[0],
      opacity: Math.random() * 0.4 + 0.6,
      path: generateCloudPath(size),
      color: cloudColors[Math.floor(Math.random() * cloudColors.length)]
    };
  };

  const initializeClouds = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newClouds: CloudShape[] = [];
    for (let i = 0; i < cloudCount[0]; i++) {
      newClouds.push(generateCloud(i, canvas.width, canvas.height));
      // Spread initial positions across the screen
      newClouds[i].x = (i / cloudCount[0]) * (canvas.width + 200) - 200;
    }
    setClouds(newClouds);
  };

  const drawCloud = (ctx: CanvasRenderingContext2D, cloud: CloudShape) => {
    ctx.save();
    ctx.globalAlpha = cloud.opacity;
    ctx.fillStyle = cloud.color;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    
    // Add subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    const path = new Path2D(cloud.path);
    ctx.translate(cloud.x, cloud.y);
    ctx.fill(path);
    ctx.stroke(path);
    
    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB"); // Sky blue
    gradient.addColorStop(1, "#E0F6FF"); // Light blue
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setClouds(prevClouds => 
      prevClouds.map(cloud => {
        const newX = cloud.x + cloud.speed;
        
        // Reset cloud when it goes off screen
        if (newX > canvas.width + cloud.size) {
          return generateCloud(cloud.id, canvas.width, canvas.height);
        }
        
        return { ...cloud, x: newX };
      })
    );

    clouds.forEach(cloud => drawCloud(ctx, cloud));

    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 500;
    
    initializeClouds();
    toast("Welcome to your Cloud Shape Generator. Relax and let your imagination wander!");
  }, []);

  useEffect(() => {
    initializeClouds();
  }, [cloudCount]);

  useEffect(() => {
    setClouds(prevClouds => 
      prevClouds.map(cloud => ({
        ...cloud,
        speed: (Math.random() * 0.5 + 0.3) * windSpeed[0]
      }))
    );
  }, [windSpeed]);

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, clouds]);

  const generateNewClouds = () => {
    initializeClouds();
    toast("New cloud shapes generated! What do you see?");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    toast(isAnimating ? "Animation paused" : "Animation resumed");
  };

  const handleCanvasClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Add a new cloud at a random position
    const newCloud = generateCloud(
      Date.now(), 
      canvas.width, 
      canvas.height
    );
    newCloud.x = Math.random() * (canvas.width - newCloud.size);
    
    setClouds(prev => [...prev, newCloud]);
    toast("New cloud appeared! ☁️");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Cloud Shape Generator
        </h1>
        <p className="text-muted-foreground">
          Watch peaceful clouds drift by. Click anywhere to add new clouds. What shapes do you see?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Cloud Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Cloud Count</label>
                <Slider
                  value={cloudCount}
                  onValueChange={setCloudCount}
                  max={15}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{cloudCount[0]} clouds</span>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Wind Speed</label>
                <Slider
                  value={windSpeed}
                  onValueChange={setWindSpeed}
                  max={3}
                  min={0.2}
                  step={0.2}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{windSpeed[0]}x speed</span>
              </div>

              <div className="flex gap-2">
                <Button onClick={toggleAnimation} variant="outline" className="flex-1">
                  {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isAnimating ? "Pause" : "Play"}
                </Button>
                <Button onClick={generateNewClouds} variant="outline" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Clouds
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cloud Gazing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Let your mind wander and relax</p>
              <p>• Look for familiar shapes and objects</p>
              <p>• Take deep breaths as you watch</p>
              <p>• Click anywhere to add new clouds</p>
              <p>• Try different wind speeds for variety</p>
              <p>• Remember there's no right or wrong way to see clouds</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="border rounded-lg shadow-lg cursor-pointer w-full max-w-full h-auto bg-gradient-to-b from-sky-200 to-sky-50"
                style={{ aspectRatio: "8/5" }}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click anywhere on the canvas to add a new cloud
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CloudShapeGeneratorPage;
