import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

interface SkeletonConfig {
  type: 'card' | 'list' | 'text' | 'avatar';
  width: number;
  height: number;
  borderRadius: number;
  animation: 'pulse' | 'wave' | 'none';
  count: number;
}

export default function SkeletonLoaderGeneratorPage() {
  const [config, setConfig] = useState<SkeletonConfig>({
    type: 'card',
    width: 300,
    height: 200,
    borderRadius: 8,
    animation: 'pulse',
    count: 1,
  });

  const generateSkeletonCSS = () => {
    const baseStyles = `
.skeleton {
  background: #e2e8f0;
  border-radius: ${config.borderRadius}px;
  position: relative;
  overflow: hidden;
}
    `;

    const animationStyles = {
      pulse: `
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
.skeleton {
  animation: pulse 1.5s ease-in-out infinite;
}
      `,
      wave: `
@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: wave 1.5s infinite;
}
      `,
      none: '',
    };

    return `${baseStyles}${animationStyles[config.animation]}`;
  };

  const generateSkeletonHTML = () => {
    const items = Array(config.count).fill(null);
    
    switch (config.type) {
      case 'card':
        return items.map((_, i) => `
<div class="skeleton" style="width: ${config.width}px; height: ${config.height}px;"></div>
        `).join('\n');
      
      case 'list':
        return items.map((_, i) => `
<div class="skeleton" style="width: ${config.width}px; height: 20px; margin-bottom: 10px;"></div>
        `).join('\n');
      
      case 'text':
        return items.map((_, i) => `
<div class="skeleton" style="width: ${config.width}px; height: 16px; margin-bottom: 8px;"></div>
        `).join('\n');
      
      case 'avatar':
        return items.map((_, i) => `
<div class="skeleton" style="width: ${config.width}px; height: ${config.width}px; border-radius: 50%;"></div>
        `).join('\n');
      
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Skeleton Loader Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <Select
                value={config.type}
                onValueChange={(value: 'card' | 'list' | 'text' | 'avatar') =>
                  setConfig({ ...config, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="avatar">Avatar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Width (px)</Label>
              <Input
                type="number"
                value={config.width}
                onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>Height (px)</Label>
              <Input
                type="number"
                value={config.height}
                onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>Border Radius (px)</Label>
              <Slider
                value={[config.borderRadius]}
                onValueChange={([value]) => setConfig({ ...config, borderRadius: value })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div>
              <Label>Animation</Label>
              <Select
                value={config.animation}
                onValueChange={(value: 'pulse' | 'wave' | 'none') =>
                  setConfig({ ...config, animation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pulse">Pulse</SelectItem>
                  <SelectItem value="wave">Wave</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Count</Label>
              <Input
                type="number"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: Number(e.target.value) })}
                min={1}
                max={10}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <style>{generateSkeletonCSS()}</style>
              <div dangerouslySetInnerHTML={{ __html: generateSkeletonHTML() }} />
            </div>

            <Tabs defaultValue="css">
              <TabsList>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="css">
                <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
                  <code>{generateSkeletonCSS()}</code>
                </pre>
              </TabsContent>
              <TabsContent value="html">
                <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
                  <code>{generateSkeletonHTML()}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
} 