import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface GridSettings {
  columns: number;
  rows: number;
  gap: number;
  columnGap: number;
  rowGap: number;
  autoFlow: 'row' | 'column' | 'dense';
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
  justifyContent: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  useCustomGaps: boolean;
}

export default function LayoutGridGenerator() {
  const [settings, setSettings] = useState<GridSettings>({
    columns: 3,
    rows: 3,
    gap: 16,
    columnGap: 16,
    rowGap: 16,
    autoFlow: 'row',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
    useCustomGaps: false,
  });

  const [showPreview, setShowPreview] = useState(true);

  const generateGridCSS = () => {
    const gapProperty = settings.useCustomGaps
      ? `column-gap: ${settings.columnGap}px;\n  row-gap: ${settings.rowGap}px;`
      : `gap: ${settings.gap}px;`;

    return `.grid-container {
  display: grid;
  grid-template-columns: repeat(${settings.columns}, 1fr);
  grid-template-rows: repeat(${settings.rows}, 1fr);
  ${gapProperty}
  grid-auto-flow: ${settings.autoFlow};
  justify-items: ${settings.justifyItems};
  align-items: ${settings.alignItems};
  justify-content: ${settings.justifyContent};
  align-content: ${settings.alignContent};
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateGridCSS());
    toast.success('CSS copied to clipboard!');
  };

  const generatePreviewItems = () => {
    const items = [];
    const totalItems = settings.columns * settings.rows;
    for (let i = 0; i < totalItems; i++) {
      items.push(
        <div
          key={i}
          className="bg-primary/10 border border-primary/20 rounded p-4 flex items-center justify-center"
        >
          Item {i + 1}
        </div>
      );
    }
    return items;
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Layout Grid Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Columns</Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={settings.columns}
                    onChange={(e) => setSettings({ ...settings, columns: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rows</Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={settings.rows}
                    onChange={(e) => setSettings({ ...settings, rows: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.useCustomGaps}
                    onCheckedChange={(checked) => setSettings({ ...settings, useCustomGaps: checked })}
                  />
                  <Label>Use Custom Gaps</Label>
                </div>
              </div>

              {settings.useCustomGaps ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Column Gap (px)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={settings.columnGap}
                      onChange={(e) => setSettings({ ...settings, columnGap: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Row Gap (px)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={settings.rowGap}
                      onChange={(e) => setSettings({ ...settings, rowGap: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Gap (px)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={settings.gap}
                    onChange={(e) => setSettings({ ...settings, gap: parseInt(e.target.value) })}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Auto Flow</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={settings.autoFlow}
                    onChange={(e) => setSettings({ ...settings, autoFlow: e.target.value as GridSettings['autoFlow'] })}
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                    <option value="dense">Dense</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Justify Items</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={settings.justifyItems}
                    onChange={(e) => setSettings({ ...settings, justifyItems: e.target.value as GridSettings['justifyItems'] })}
                  >
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="center">Center</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Align Items</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={settings.alignItems}
                    onChange={(e) => setSettings({ ...settings, alignItems: e.target.value as GridSettings['alignItems'] })}
                  >
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="center">Center</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Justify Content</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={settings.justifyContent}
                    onChange={(e) => setSettings({ ...settings, justifyContent: e.target.value as GridSettings['justifyContent'] })}
                  >
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="center">Center</option>
                    <option value="stretch">Stretch</option>
                    <option value="space-around">Space Around</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-evenly">Space Evenly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Align Content</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.alignContent}
                  onChange={(e) => setSettings({ ...settings, alignContent: e.target.value as GridSettings['alignContent'] })}
                >
                  <option value="start">Start</option>
                  <option value="end">End</option>
                  <option value="center">Center</option>
                  <option value="stretch">Stretch</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyToClipboard} className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy CSS
                </Button>
              </div>
            </div>

            {/* Preview and CSS Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={showPreview}
                    onCheckedChange={setShowPreview}
                  />
                  <Label>Show Preview</Label>
                </div>

                {showPreview && (
                  <div
                    className="border rounded-lg p-4"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
                      gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
                      gap: settings.useCustomGaps ? undefined : `${settings.gap}px`,
                      columnGap: settings.useCustomGaps ? `${settings.columnGap}px` : undefined,
                      rowGap: settings.useCustomGaps ? `${settings.rowGap}px` : undefined,
                      gridAutoFlow: settings.autoFlow,
                      justifyItems: settings.justifyItems,
                      alignItems: settings.alignItems,
                      justifyContent: settings.justifyContent,
                      alignContent: settings.alignContent,
                      minHeight: '300px',
                    }}
                  >
                    {generatePreviewItems()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Generated CSS</Label>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{generateGridCSS()}</code>
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 