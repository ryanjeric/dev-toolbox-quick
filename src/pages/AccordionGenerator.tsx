import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccordionStyles {
  type: "accordion" | "toggle";
  width: number;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  fontSize: number;
  iconColor: string;
  iconSize: number;
  transitionSpeed: number;
  hoverColor: string;
  activeColor: string;
  contentBackground: string;
  contentPadding: number;
  contentBorderColor: string;
  contentBorderWidth: number;
  contentBorderRadius: number;
  contentMargin: number;
}

export default function AccordionGenerator() {
  const { toast } = useToast();
  const [styles, setStyles] = useState<AccordionStyles>({
    type: "accordion",
    width: 300,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    iconColor: "#64748b",
    iconSize: 16,
    transitionSpeed: 0.3,
    hoverColor: "#f8fafc",
    activeColor: "#f1f5f9",
    contentBackground: "#ffffff",
    contentPadding: 16,
    contentBorderColor: "#e2e8f0",
    contentBorderWidth: 1,
    contentBorderRadius: 4,
    contentMargin: 4
  });

  const generateAccordionCSS = () => {
    return `.accordion {
  width: ${styles.width}px;
  margin: 0 auto;
}

.accordion-item {
  margin-bottom: ${styles.contentMargin}px;
}

.accordion-input {
  display: none;
}

.accordion-label {
  display: block;
  padding: ${styles.padding}px;
  background-color: ${styles.backgroundColor};
  color: ${styles.textColor};
  font-size: ${styles.fontSize}px;
  border: ${styles.borderWidth}px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
  cursor: pointer;
  position: relative;
  transition: background-color ${styles.transitionSpeed}s ease;
}

.accordion-label:hover {
  background-color: ${styles.hoverColor};
}

.accordion-label::after {
  content: '+';
  position: absolute;
  right: ${styles.padding}px;
  top: 50%;
  transform: translateY(-50%);
  color: ${styles.iconColor};
  font-size: ${styles.iconSize}px;
  transition: transform ${styles.transitionSpeed}s ease;
}

.accordion-input:checked + .accordion-label {
  background-color: ${styles.activeColor};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.accordion-input:checked + .accordion-label::after {
  transform: translateY(-50%) rotate(45deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  background-color: ${styles.contentBackground};
  border: ${styles.contentBorderWidth}px solid ${styles.contentBorderColor};
  border-top: none;
  border-bottom-left-radius: ${styles.contentBorderRadius}px;
  border-bottom-right-radius: ${styles.contentBorderRadius}px;
  transition: max-height ${styles.transitionSpeed}s ease;
}

.accordion-input:checked + .accordion-label + .accordion-content {
  max-height: 500px;
  padding: ${styles.contentPadding}px;
}`;
  };

  const generateToggleCSS = () => {
    return `.toggle {
  width: ${styles.width}px;
  margin: 0 auto;
}

.toggle-input {
  display: none;
}

.toggle-label {
  display: block;
  padding: ${styles.padding}px;
  background-color: ${styles.backgroundColor};
  color: ${styles.textColor};
  font-size: ${styles.fontSize}px;
  border: ${styles.borderWidth}px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
  cursor: pointer;
  position: relative;
  transition: background-color ${styles.transitionSpeed}s ease;
}

.toggle-label:hover {
  background-color: ${styles.hoverColor};
}

.toggle-label::after {
  content: '▼';
  position: absolute;
  right: ${styles.padding}px;
  top: 50%;
  transform: translateY(-50%);
  color: ${styles.iconColor};
  font-size: ${styles.iconSize}px;
  transition: transform ${styles.transitionSpeed}s ease;
}

.toggle-input:checked + .toggle-label {
  background-color: ${styles.activeColor};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.toggle-input:checked + .toggle-label::after {
  transform: translateY(-50%) rotate(180deg);
}

.toggle-content {
  max-height: 0;
  overflow: hidden;
  background-color: ${styles.contentBackground};
  border: ${styles.contentBorderWidth}px solid ${styles.contentBorderColor};
  border-top: none;
  border-bottom-left-radius: ${styles.contentBorderRadius}px;
  border-bottom-right-radius: ${styles.contentBorderRadius}px;
  transition: max-height ${styles.transitionSpeed}s ease;
}

.toggle-input:checked + .toggle-label + .toggle-content {
  max-height: 500px;
  padding: ${styles.contentPadding}px;
}`;
  };

  const generateCSS = () => {
    return styles.type === "accordion" ? generateAccordionCSS() : generateToggleCSS();
  };

  const generateHTML = () => {
    const baseHTML = `<div class="${styles.type}">
  <div class="${styles.type}-item">
    <input type="checkbox" id="item1" class="${styles.type}-input">
    <label for="item1" class="${styles.type}-label">Section 1</label>
    <div class="${styles.type}-content">
      <p>Content for section 1 goes here.</p>
    </div>
  </div>
  
  <div class="${styles.type}-item">
    <input type="checkbox" id="item2" class="${styles.type}-input">
    <label for="item2" class="${styles.type}-label">Section 2</label>
    <div class="${styles.type}-content">
      <p>Content for section 2 goes here.</p>
    </div>
  </div>
  
  <div class="${styles.type}-item">
    <input type="checkbox" id="item3" class="${styles.type}-input">
    <label for="item3" class="${styles.type}-label">Section 3</label>
    <div class="${styles.type}-content">
      <p>Content for section 3 goes here.</p>
    </div>
  </div>
</div>`;

    return baseHTML;
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
        <h1 className="text-2xl font-bold">CSS-only Accordion/Toggle Generator</h1>
        <p className="text-muted-foreground">
          Create pure CSS accordions and toggles using the checkbox hack. No JavaScript required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={styles.type}
                onValueChange={(value: "accordion" | "toggle") => setStyles({ ...styles, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accordion">Accordion</SelectItem>
                  <SelectItem value="toggle">Toggle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Width (px)</Label>
              <Slider
                value={[styles.width]}
                onValueChange={([value]) => setStyles({ ...styles, width: value })}
                min={200}
                max={600}
                step={1}
              />
              <Input
                type="number"
                value={styles.width}
                onChange={(e) => setStyles({ ...styles, width: Number(e.target.value) })}
                min={200}
                max={600}
              />
            </div>

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
                max={5}
                step={1}
              />
              <Input
                type="number"
                value={styles.borderWidth}
                onChange={(e) => setStyles({ ...styles, borderWidth: Number(e.target.value) })}
                min={0}
                max={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Border Radius (px)</Label>
              <Slider
                value={[styles.borderRadius]}
                onValueChange={([value]) => setStyles({ ...styles, borderRadius: value })}
                min={0}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.borderRadius}
                onChange={(e) => setStyles({ ...styles, borderRadius: Number(e.target.value) })}
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>Padding (px)</Label>
              <Slider
                value={[styles.padding]}
                onValueChange={([value]) => setStyles({ ...styles, padding: value })}
                min={8}
                max={32}
                step={1}
              />
              <Input
                type="number"
                value={styles.padding}
                onChange={(e) => setStyles({ ...styles, padding: Number(e.target.value) })}
                min={8}
                max={32}
              />
            </div>

            <div className="space-y-2">
              <Label>Font Size (px)</Label>
              <Slider
                value={[styles.fontSize]}
                onValueChange={([value]) => setStyles({ ...styles, fontSize: value })}
                min={12}
                max={24}
                step={1}
              />
              <Input
                type="number"
                value={styles.fontSize}
                onChange={(e) => setStyles({ ...styles, fontSize: Number(e.target.value) })}
                min={12}
                max={24}
              />
            </div>

            <div className="space-y-2">
              <Label>Icon Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.iconColor}
                  onChange={(e) => setStyles({ ...styles, iconColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.iconColor}
                  onChange={(e) => setStyles({ ...styles, iconColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Icon Size (px)</Label>
              <Slider
                value={[styles.iconSize]}
                onValueChange={([value]) => setStyles({ ...styles, iconSize: value })}
                min={12}
                max={24}
                step={1}
              />
              <Input
                type="number"
                value={styles.iconSize}
                onChange={(e) => setStyles({ ...styles, iconSize: Number(e.target.value) })}
                min={12}
                max={24}
              />
            </div>

            <div className="space-y-2">
              <Label>Transition Speed (s)</Label>
              <Slider
                value={[styles.transitionSpeed]}
                onValueChange={([value]) => setStyles({ ...styles, transitionSpeed: value })}
                min={0.1}
                max={1}
                step={0.1}
              />
              <Input
                type="number"
                value={styles.transitionSpeed}
                onChange={(e) => setStyles({ ...styles, transitionSpeed: Number(e.target.value) })}
                min={0.1}
                max={1}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Hover Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.hoverColor}
                  onChange={(e) => setStyles({ ...styles, hoverColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.hoverColor}
                  onChange={(e) => setStyles({ ...styles, hoverColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Active Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.activeColor}
                  onChange={(e) => setStyles({ ...styles, activeColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.activeColor}
                  onChange={(e) => setStyles({ ...styles, activeColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content Background</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.contentBackground}
                  onChange={(e) => setStyles({ ...styles, contentBackground: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.contentBackground}
                  onChange={(e) => setStyles({ ...styles, contentBackground: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content Padding (px)</Label>
              <Slider
                value={[styles.contentPadding]}
                onValueChange={([value]) => setStyles({ ...styles, contentPadding: value })}
                min={8}
                max={32}
                step={1}
              />
              <Input
                type="number"
                value={styles.contentPadding}
                onChange={(e) => setStyles({ ...styles, contentPadding: Number(e.target.value) })}
                min={8}
                max={32}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Border Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.contentBorderColor}
                  onChange={(e) => setStyles({ ...styles, contentBorderColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.contentBorderColor}
                  onChange={(e) => setStyles({ ...styles, contentBorderColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content Border Width (px)</Label>
              <Slider
                value={[styles.contentBorderWidth]}
                onValueChange={([value]) => setStyles({ ...styles, contentBorderWidth: value })}
                min={0}
                max={5}
                step={1}
              />
              <Input
                type="number"
                value={styles.contentBorderWidth}
                onChange={(e) => setStyles({ ...styles, contentBorderWidth: Number(e.target.value) })}
                min={0}
                max={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Border Radius (px)</Label>
              <Slider
                value={[styles.contentBorderRadius]}
                onValueChange={([value]) => setStyles({ ...styles, contentBorderRadius: value })}
                min={0}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.contentBorderRadius}
                onChange={(e) => setStyles({ ...styles, contentBorderRadius: Number(e.target.value) })}
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Margin (px)</Label>
              <Slider
                value={[styles.contentMargin]}
                onValueChange={([value]) => setStyles({ ...styles, contentMargin: value })}
                min={0}
                max={20}
                step={1}
              />
              <Input
                type="number"
                value={styles.contentMargin}
                onChange={(e) => setStyles({ ...styles, contentMargin: Number(e.target.value) })}
                min={0}
                max={20}
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="flex items-center justify-center min-h-[200px]">
              <style>{generateCSS()}</style>
              <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
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