import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorConverter = () => {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const updateFromHex = (newHex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      setHex(newHex);
      const rgbResult = hexToRgb(newHex);
      if (rgbResult) {
        setRgb(rgbResult);
        setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
      }
    }
  };

  const updateFromRgb = (newRgb: { r: number, g: number, b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHsl = (newHsl: { h: number, s: number, l: number }) => {
    setHsl(newHsl);
    const rgbResult = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(rgbResult);
    setHex(rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b));
  };

  const copyValue = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast({ description: `${format} value copied to clipboard!` });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Preview */}
          <div className="flex items-center gap-4">
            <div 
              className="w-24 h-24 rounded-lg border border-gray-300 shadow-sm"
              style={{ backgroundColor: hex }}
            />
            <div>
              <h3 className="font-medium text-lg">Color Preview</h3>
              <p className="text-sm text-gray-600">Current color: {hex}</p>
            </div>
          </div>

          {/* HEX */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HEX</label>
            <div className="flex gap-2">
              <Input
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="font-mono"
                placeholder="#000000"
              />
              <Button
                variant="outline"
                onClick={() => copyValue(hex, "HEX")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* RGB */}
          <div className="space-y-2">
            <label className="text-sm font-medium">RGB</label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                placeholder="R"
              />
              <Input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                placeholder="G"
              />
              <Input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                placeholder="B"
              />
              <Button
                variant="outline"
                onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HSL</label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })}
                placeholder="H"
              />
              <Input
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })}
                placeholder="S"
              />
              <Input
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })}
                placeholder="L"
              />
              <Button
                variant="outline"
                onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Format Examples */}
          <div className="bg-muted p-4 rounded-md space-y-2">
            <h4 className="font-medium text-sm">Format Examples:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-mono">
              <div>HEX: {hex}</div>
              <div>RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
              <div>HSL: hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorConverter;
