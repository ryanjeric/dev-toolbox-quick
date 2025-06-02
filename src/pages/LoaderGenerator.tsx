import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoaderStyles {
  type: "spinner" | "dots" | "bars";
  size: number;
  color: string;
  speed: number;
  thickness: number;
  count: number;
  gap: number;
  background: string;
}

export default function LoaderGenerator() {
  const { toast } = useToast();
  const [styles, setStyles] = useState<LoaderStyles>({
    type: "spinner",
    size: 40,
    color: "#3b82f6",
    speed: 1,
    thickness: 4,
    count: 3,
    gap: 8,
    background: "transparent"
  });

  const generateSpinnerCSS = () => {
    return `.loader {
  width: ${styles.size}px;
  height: ${styles.size}px;
  border: ${styles.thickness}px solid ${styles.background};
  border-top: ${styles.thickness}px solid ${styles.color};
  border-radius: 50%;
  animation: spin ${styles.speed}s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
  };

  const generateDotsCSS = () => {
    return `.loader {
  display: flex;
  gap: ${styles.gap}px;
  align-items: center;
  justify-content: center;
}

.loader span {
  width: ${styles.size / 3}px;
  height: ${styles.size / 3}px;
  background-color: ${styles.color};
  border-radius: 50%;
  animation: bounce ${styles.speed}s ease-in-out infinite;
}

.loader span:nth-child(2) {
  animation-delay: ${styles.speed * 0.2}s;
}

.loader span:nth-child(3) {
  animation-delay: ${styles.speed * 0.4}s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-${styles.size / 4}px); }
}`;
  };

  const generateBarsCSS = () => {
    return `.loader {
  display: flex;
  gap: ${styles.gap}px;
  align-items: center;
  justify-content: center;
  height: ${styles.size}px;
}

.loader span {
  width: ${styles.thickness}px;
  height: ${styles.size}px;
  background-color: ${styles.color};
  animation: stretch ${styles.speed}s ease-in-out infinite;
}

.loader span:nth-child(2) {
  animation-delay: ${styles.speed * 0.2}s;
}

.loader span:nth-child(3) {
  animation-delay: ${styles.speed * 0.4}s;
}

@keyframes stretch {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}`;
  };

  const generateCSS = () => {
    switch (styles.type) {
      case "spinner":
        return generateSpinnerCSS();
      case "dots":
        return generateDotsCSS();
      case "bars":
        return generateBarsCSS();
      default:
        return generateSpinnerCSS();
    }
  };

  const generateHTML = () => {
    switch (styles.type) {
      case "spinner":
        return `<div class="loader"></div>`;
      case "dots":
        return `<div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>`;
      case "bars":
        return `<div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>`;
      default:
        return `<div class="loader"></div>`;
    }
  };

  const copyToClipboard = () => {
    const code = `/* CSS */
${generateCSS()}

/* HTML */
${generateHTML()}`;
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "The CSS and HTML code has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Pure CSS Loader Generator</h1>
        <p className="text-muted-foreground">
          Create custom CSS loaders with different styles and animations. No JavaScript required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Loader Type</Label>
              <Select
                value={styles.type}
                onValueChange={(value: "spinner" | "dots" | "bars") => setStyles({ ...styles, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select loader type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spinner">Spinner</SelectItem>
                  <SelectItem value="dots">Dots</SelectItem>
                  <SelectItem value="bars">Bars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size (px)</Label>
              <Slider
                value={[styles.size]}
                onValueChange={([value]) => setStyles({ ...styles, size: value })}
                min={20}
                max={100}
                step={1}
              />
              <Input
                type="number"
                value={styles.size}
                onChange={(e) => setStyles({ ...styles, size: Number(e.target.value) })}
                min={20}
                max={100}
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.color}
                  onChange={(e) => setStyles({ ...styles, color: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.color}
                  onChange={(e) => setStyles({ ...styles, color: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Animation Speed (s)</Label>
              <Slider
                value={[styles.speed]}
                onValueChange={([value]) => setStyles({ ...styles, speed: value })}
                min={0.5}
                max={3}
                step={0.1}
              />
              <Input
                type="number"
                value={styles.speed}
                onChange={(e) => setStyles({ ...styles, speed: Number(e.target.value) })}
                min={0.5}
                max={3}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Thickness (px)</Label>
              <Slider
                value={[styles.thickness]}
                onValueChange={([value]) => setStyles({ ...styles, thickness: value })}
                min={1}
                max={10}
                step={1}
              />
              <Input
                type="number"
                value={styles.thickness}
                onChange={(e) => setStyles({ ...styles, thickness: Number(e.target.value) })}
                min={1}
                max={10}
              />
            </div>

            <div className="space-y-2">
              <Label>Gap (px)</Label>
              <Slider
                value={[styles.gap]}
                onValueChange={([value]) => setStyles({ ...styles, gap: value })}
                min={2}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.gap}
                onChange={(e) => setStyles({ ...styles, gap: Number(e.target.value) })}
                min={2}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.background}
                  onChange={(e) => setStyles({ ...styles, background: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.background}
                  onChange={(e) => setStyles({ ...styles, background: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="flex items-center justify-center min-h-[200px]">
              <style>{generateCSS()}</style>
              {styles.type === "spinner" ? (
                <div className="loader"></div>
              ) : (
                <div className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Code</h2>
            <Tabs defaultValue="css" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="css">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{generateCSS()}</code>
                </pre>
              </TabsContent>
              <TabsContent value="html">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{generateHTML()}</code>
                </pre>
              </TabsContent>
            </Tabs>
            <Button onClick={copyToClipboard} className="mt-4">
              Copy Code
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
} 