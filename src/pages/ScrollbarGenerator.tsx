import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface ScrollbarStyles {
  width: number;
  thumbColor: string;
  trackColor: string;
  thumbBorderRadius: number;
  trackBorderRadius: number;
  thumbHoverColor: string;
  thumbActiveColor: string;
  thumbBorder: string;
  trackBorder: string;
}

export default function ScrollbarGenerator() {
  const { toast } = useToast();
  const [styles, setStyles] = useState<ScrollbarStyles>({
    width: 12,
    thumbColor: "#888",
    trackColor: "#f1f1f1",
    thumbBorderRadius: 6,
    trackBorderRadius: 0,
    thumbHoverColor: "#555",
    thumbActiveColor: "#333",
    thumbBorder: "none",
    trackBorder: "none"
  });

  const generateCSS = () => {
    return `/* WebKit (Chrome, Safari, newer Edge) */
::-webkit-scrollbar {
  width: ${styles.width}px;
}

::-webkit-scrollbar-track {
  background: ${styles.trackColor};
  border-radius: ${styles.trackBorderRadius}px;
  border: ${styles.trackBorder};
}

::-webkit-scrollbar-thumb {
  background: ${styles.thumbColor};
  border-radius: ${styles.thumbBorderRadius}px;
  border: ${styles.thumbBorder};
}

::-webkit-scrollbar-thumb:hover {
  background: ${styles.thumbHoverColor};
}

::-webkit-scrollbar-thumb:active {
  background: ${styles.thumbActiveColor};
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: ${styles.thumbColor} ${styles.trackColor};
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: "Copied to clipboard",
      description: "The CSS code has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Custom Scrollbar Generator</h1>
        <p className="text-muted-foreground">
          Customize your scrollbar appearance with this generator. Supports both WebKit (Chrome, Safari, Edge) and Firefox browsers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Controls</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Width (px)</Label>
              <Slider
                value={[styles.width]}
                onValueChange={([value]) => setStyles({ ...styles, width: value })}
                min={4}
                max={32}
                step={1}
              />
              <Input
                type="number"
                value={styles.width}
                onChange={(e) => setStyles({ ...styles, width: Number(e.target.value) })}
                min={4}
                max={32}
              />
            </div>

            <div className="space-y-2">
              <Label>Thumb Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.thumbColor}
                  onChange={(e) => setStyles({ ...styles, thumbColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.thumbColor}
                  onChange={(e) => setStyles({ ...styles, thumbColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Track Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.trackColor}
                  onChange={(e) => setStyles({ ...styles, trackColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.trackColor}
                  onChange={(e) => setStyles({ ...styles, trackColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thumb Border Radius (px)</Label>
              <Slider
                value={[styles.thumbBorderRadius]}
                onValueChange={([value]) => setStyles({ ...styles, thumbBorderRadius: value })}
                min={0}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.thumbBorderRadius}
                onChange={(e) => setStyles({ ...styles, thumbBorderRadius: Number(e.target.value) })}
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>Track Border Radius (px)</Label>
              <Slider
                value={[styles.trackBorderRadius]}
                onValueChange={([value]) => setStyles({ ...styles, trackBorderRadius: value })}
                min={0}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.trackBorderRadius}
                onChange={(e) => setStyles({ ...styles, trackBorderRadius: Number(e.target.value) })}
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>Thumb Hover Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.thumbHoverColor}
                  onChange={(e) => setStyles({ ...styles, thumbHoverColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.thumbHoverColor}
                  onChange={(e) => setStyles({ ...styles, thumbHoverColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thumb Active Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.thumbActiveColor}
                  onChange={(e) => setStyles({ ...styles, thumbActiveColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.thumbActiveColor}
                  onChange={(e) => setStyles({ ...styles, thumbActiveColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thumb Border</Label>
              <Input
                type="text"
                value={styles.thumbBorder}
                onChange={(e) => setStyles({ ...styles, thumbBorder: e.target.value })}
                placeholder="e.g., 1px solid #ccc"
              />
            </div>

            <div className="space-y-2">
              <Label>Track Border</Label>
              <Input
                type="text"
                value={styles.trackBorder}
                onChange={(e) => setStyles({ ...styles, trackBorder: e.target.value })}
                placeholder="e.g., 1px solid #ccc"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div 
              className="h-[400px] overflow-y-auto border rounded-lg p-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${styles.thumbColor} ${styles.trackColor}`,
              }}
            >
              <style>{generateCSS()}</style>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="mb-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Section {i + 1}</h3>
                  <p className="text-muted-foreground">
                    This is a sample section to demonstrate the custom scrollbar. Scroll up and down to see the changes.
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generated CSS</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{generateCSS()}</code>
            </pre>
            <Button onClick={copyToClipboard} className="mt-4">
              Copy CSS
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
} 