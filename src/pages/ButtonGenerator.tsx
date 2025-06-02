import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ButtonStyles {
  // Basic styles
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  fontWeight: string;
  textTransform: string;
  letterSpacing: number;
  width: string;
  height: string;
  
  // Hover state
  hoverBackgroundColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  hoverScale: number;
  
  // Active state
  activeBackgroundColor: string;
  activeTextColor: string;
  activeBorderColor: string;
  activeScale: number;
  
  // Disabled state
  disabledBackgroundColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledOpacity: number;
  
  // Shadow
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowSpread: number;
  
  // Transition
  transitionDuration: number;
  transitionTiming: string;
}

export default function ButtonGenerator() {
  const { toast } = useToast();
  const [styles, setStyles] = useState<ButtonStyles>({
    // Basic styles
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    borderColor: "#2563eb",
    borderWidth: 1,
    borderRadius: 6,
    paddingX: 16,
    paddingY: 8,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "none",
    letterSpacing: 0,
    width: "auto",
    height: "auto",
    
    // Hover state
    hoverBackgroundColor: "#2563eb",
    hoverTextColor: "#ffffff",
    hoverBorderColor: "#1d4ed8",
    hoverScale: 1.05,
    
    // Active state
    activeBackgroundColor: "#1d4ed8",
    activeTextColor: "#ffffff",
    activeBorderColor: "#1e40af",
    activeScale: 0.95,
    
    // Disabled state
    disabledBackgroundColor: "#94a3b8",
    disabledTextColor: "#ffffff",
    disabledBorderColor: "#64748b",
    disabledOpacity: 0.7,
    
    // Shadow
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowBlur: 4,
    shadowOffsetX: 0,
    shadowOffsetY: 2,
    shadowSpread: 0,
    
    // Transition
    transitionDuration: 200,
    transitionTiming: "ease-in-out"
  });

  const generateCSS = () => {
    return `.custom-button {
  /* Basic styles */
  background-color: ${styles.backgroundColor};
  color: ${styles.textColor};
  border: ${styles.borderWidth}px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
  padding: ${styles.paddingY}px ${styles.paddingX}px;
  font-size: ${styles.fontSize}px;
  font-weight: ${styles.fontWeight};
  text-transform: ${styles.textTransform};
  letter-spacing: ${styles.letterSpacing}px;
  width: ${styles.width};
  height: ${styles.height};
  
  /* Shadow */
  box-shadow: ${styles.shadowOffsetX}px ${styles.shadowOffsetY}px ${styles.shadowBlur}px ${styles.shadowSpread}px ${styles.shadowColor};
  
  /* Transition */
  transition: all ${styles.transitionDuration}ms ${styles.transitionTiming};
}

.custom-button:hover {
  background-color: ${styles.hoverBackgroundColor};
  color: ${styles.hoverTextColor};
  border-color: ${styles.hoverBorderColor};
  transform: scale(${styles.hoverScale});
}

.custom-button:active {
  background-color: ${styles.activeBackgroundColor};
  color: ${styles.activeTextColor};
  border-color: ${styles.activeBorderColor};
  transform: scale(${styles.activeScale});
}

.custom-button:disabled {
  background-color: ${styles.disabledBackgroundColor};
  color: ${styles.disabledTextColor};
  border-color: ${styles.disabledBorderColor};
  opacity: ${styles.disabledOpacity};
  cursor: not-allowed;
  transform: none;
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
        <h1 className="text-2xl font-bold">CSS Button Generator</h1>
        <p className="text-muted-foreground">
          Create custom button styles with hover, active, and disabled states. Preview your changes in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="hover">Hover</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled">Disabled</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.backgroundColor}
                    onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.backgroundColor}
                    onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.textColor}
                    onChange={(e) => setStyles({ ...styles, textColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.textColor}
                    onChange={(e) => setStyles({ ...styles, textColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.borderColor}
                    onChange={(e) => setStyles({ ...styles, borderColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.borderColor}
                    onChange={(e) => setStyles({ ...styles, borderColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Border Width (px)</Label>
                <Slider
                  value={[styles.borderWidth]}
                  onValueChange={([value]) => setStyles({ ...styles, borderWidth: value })}
                  min={0}
                  max={8}
                  step={1}
                />
                <Input
                  type="number"
                  value={styles.borderWidth}
                  onChange={(e) => setStyles({ ...styles, borderWidth: Number(e.target.value) })}
                  min={0}
                  max={8}
                />
              </div>

              <div className="space-y-2">
                <Label>Border Radius (px)</Label>
                <Slider
                  value={[styles.borderRadius]}
                  onValueChange={([value]) => setStyles({ ...styles, borderRadius: value })}
                  min={0}
                  max={50}
                  step={1}
                />
                <Input
                  type="number"
                  value={styles.borderRadius}
                  onChange={(e) => setStyles({ ...styles, borderRadius: Number(e.target.value) })}
                  min={0}
                  max={50}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size (px)</Label>
                <Slider
                  value={[styles.fontSize]}
                  onValueChange={([value]) => setStyles({ ...styles, fontSize: value })}
                  min={12}
                  max={32}
                  step={1}
                />
                <Input
                  type="number"
                  value={styles.fontSize}
                  onChange={(e) => setStyles({ ...styles, fontSize: Number(e.target.value) })}
                  min={12}
                  max={32}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Weight</Label>
                <Select
                  value={styles.fontWeight}
                  onValueChange={(value) => setStyles({ ...styles, fontWeight: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Normal (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Text Transform</Label>
                <Select
                  value={styles.textTransform}
                  onValueChange={(value) => setStyles({ ...styles, textTransform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select text transform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="uppercase">Uppercase</SelectItem>
                    <SelectItem value="lowercase">Lowercase</SelectItem>
                    <SelectItem value="capitalize">Capitalize</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Letter Spacing (px)</Label>
                <Slider
                  value={[styles.letterSpacing]}
                  onValueChange={([value]) => setStyles({ ...styles, letterSpacing: value })}
                  min={-2}
                  max={10}
                  step={0.5}
                />
                <Input
                  type="number"
                  value={styles.letterSpacing}
                  onChange={(e) => setStyles({ ...styles, letterSpacing: Number(e.target.value) })}
                  min={-2}
                  max={10}
                  step={0.5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Padding X (px)</Label>
                  <Input
                    type="number"
                    value={styles.paddingX}
                    onChange={(e) => setStyles({ ...styles, paddingX: Number(e.target.value) })}
                    min={0}
                    max={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Padding Y (px)</Label>
                  <Input
                    type="number"
                    value={styles.paddingY}
                    onChange={(e) => setStyles({ ...styles, paddingY: Number(e.target.value) })}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hover" className="space-y-4">
              <div className="space-y-2">
                <Label>Hover Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.hoverBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, hoverBackgroundColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.hoverBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, hoverBackgroundColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hover Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.hoverTextColor}
                    onChange={(e) => setStyles({ ...styles, hoverTextColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.hoverTextColor}
                    onChange={(e) => setStyles({ ...styles, hoverTextColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hover Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.hoverBorderColor}
                    onChange={(e) => setStyles({ ...styles, hoverBorderColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.hoverBorderColor}
                    onChange={(e) => setStyles({ ...styles, hoverBorderColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hover Scale</Label>
                <Slider
                  value={[styles.hoverScale]}
                  onValueChange={([value]) => setStyles({ ...styles, hoverScale: value })}
                  min={1}
                  max={1.2}
                  step={0.01}
                />
                <Input
                  type="number"
                  value={styles.hoverScale}
                  onChange={(e) => setStyles({ ...styles, hoverScale: Number(e.target.value) })}
                  min={1}
                  max={1.2}
                  step={0.01}
                />
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="space-y-2">
                <Label>Active Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.activeBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, activeBackgroundColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.activeBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, activeBackgroundColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.activeTextColor}
                    onChange={(e) => setStyles({ ...styles, activeTextColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.activeTextColor}
                    onChange={(e) => setStyles({ ...styles, activeTextColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.activeBorderColor}
                    onChange={(e) => setStyles({ ...styles, activeBorderColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.activeBorderColor}
                    onChange={(e) => setStyles({ ...styles, activeBorderColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Scale</Label>
                <Slider
                  value={[styles.activeScale]}
                  onValueChange={([value]) => setStyles({ ...styles, activeScale: value })}
                  min={0.8}
                  max={1}
                  step={0.01}
                />
                <Input
                  type="number"
                  value={styles.activeScale}
                  onChange={(e) => setStyles({ ...styles, activeScale: Number(e.target.value) })}
                  min={0.8}
                  max={1}
                  step={0.01}
                />
              </div>
            </TabsContent>

            <TabsContent value="disabled" className="space-y-4">
              <div className="space-y-2">
                <Label>Disabled Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.disabledBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, disabledBackgroundColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.disabledBackgroundColor}
                    onChange={(e) => setStyles({ ...styles, disabledBackgroundColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Disabled Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.disabledTextColor}
                    onChange={(e) => setStyles({ ...styles, disabledTextColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.disabledTextColor}
                    onChange={(e) => setStyles({ ...styles, disabledTextColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Disabled Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles.disabledBorderColor}
                    onChange={(e) => setStyles({ ...styles, disabledBorderColor: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={styles.disabledBorderColor}
                    onChange={(e) => setStyles({ ...styles, disabledBorderColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Disabled Opacity</Label>
                <Slider
                  value={[styles.disabledOpacity]}
                  onValueChange={([value]) => setStyles({ ...styles, disabledOpacity: value })}
                  min={0}
                  max={1}
                  step={0.1}
                />
                <Input
                  type="number"
                  value={styles.disabledOpacity}
                  onChange={(e) => setStyles({ ...styles, disabledOpacity: Number(e.target.value) })}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="space-y-4">
              <style>{generateCSS()}</style>
              <button className="custom-button">
                Normal Button
              </button>
              <button className="custom-button" disabled>
                Disabled Button
              </button>
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