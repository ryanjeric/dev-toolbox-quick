import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Radio } from 'lucide-react'; // Assuming Radio icon is available

const CheckboxRadioGeneratorPage = () => {
  const [elementType, setElementType] = useState('checkbox'); // 'checkbox' or 'radio'
  const [color, setColor] = useState('#007bff'); // Background color
  const [checkedColor, setCheckedColor] = useState('#ffffff'); // Color of the checkmark/dot
  const [size, setSize] = useState(20);
  const [borderSize, setBorderSize] = useState(2);
  const [borderColor, setBorderColor] = useState('#007bff');
  const [borderRadius, setBorderRadius] = useState(4); // for checkboxes
  const [checkType, setCheckType] = useState('checkmark'); // 'checkmark' or 'dot' (for radio)

  const { toast } = useToast();

  // Function to generate CSS
  const generateCode = () => {
    let code = '';
    const baseStyles = `
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  border: ${borderSize}px solid ${borderColor};
  background-color: ${color};
  cursor: pointer;
`;

    if (elementType === 'checkbox') {
      code = `
.custom-checkbox {
${baseStyles.trim()}
  border-radius: ${borderRadius}px;
  position: relative;
}

.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: ${size}px;
  width: ${size}px;
  background-color: transparent;
  border-radius: ${borderRadius}px;
  
}

.custom-checkbox input[type="checkbox"]:checked ~ .checkmark {
  background-color: ${color};
}

.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: ${size / 3}px;
  top: ${size / 7}px;
  width: ${size / 5}px;
  height: ${size / 2.5}px;
  border: solid ${checkedColor};
  border-width: 0 ${borderSize + 1}px ${borderSize + 1}px 0;
  transform: rotate(45deg);
}
`;
    } else {
      // Radio button CSS
       code = `
.custom-radio {
${baseStyles.trim()}
  border-radius: 50%;
  position: relative;
}

.custom-radio input[type="radio"] {
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-radio .radiodot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${size / 2}px;
  width: ${size / 2}px;
  background-color: ${checkedColor};
  border-radius: 50%;
  display: none;
}

.custom-radio input[type="radio"]:checked ~ .radiodot {
  display: block;
}
`;
    }
    return code.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    toast({
      title: "Code Copied",
      description: "The generated code has been copied to your clipboard.",
    });
  };

   // Render the custom styled element for preview
   const renderPreview = () => {
    const elementStyle: React.CSSProperties = {
      display: 'inline-block',
      width: size + 'px',
      height: size + 'px',
      border: `${borderSize}px solid ${borderColor}`,
      backgroundColor: color,
      cursor: 'pointer',
      position: 'relative',
      flexShrink: 0,
    };

    if (elementType === 'checkbox') {
      elementStyle.borderRadius = borderRadius + 'px';
      const checkmarkStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: size + 'px',
        width: size + 'px',
        backgroundColor: 'transparent',
        borderRadius: borderRadius + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
       const checkmarkInnerStyle: React.CSSProperties = {
         width: size / 5 + 'px',
         height: size / 2.5 + 'px',
         border: `solid ${checkedColor}`,
         borderWidth: `0 ${borderSize + 1}px ${borderSize + 1}px 0`,
         transform: 'rotate(45deg)',
       };

      return (
        <label className="custom-checkbox" style={elementStyle}>
          <input type="checkbox" className="absolute opacity-0 w-0 h-0" />
          <span className="checkmark" style={checkmarkStyle}>
             {/* Checkmark icon will be handled by CSS pseudo-element or a separate icon component */}
             <div style={checkmarkInnerStyle}></div>
          </span>
        </label>
      );
    } else {
      // Radio button preview
       elementStyle.borderRadius = '50%';
       const dotStyle: React.CSSProperties = {
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         height: size / 2 + 'px',
         width: size / 2 + 'px',
         backgroundColor: checkedColor,
         borderRadius: '50%',
       };
      return (
         <label className="custom-radio" style={elementStyle}>
           <input type="radio" name="radio-preview" className="absolute opacity-0 w-0 h-0" />
           <span className="radiodot" style={dotStyle}></span>
         </label>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkbox / Radio Button Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Card */}
        <Card>
          <CardHeader><CardTitle>Customize Options</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Element Type */}
            <div>
              <Label htmlFor="elementType">Element Type</Label>
              <RadioGroup value={elementType} onValueChange={setElementType} className="flex space-x-4 mt-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="checkbox" id="checkbox" />
                  <Label htmlFor="checkbox">Checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="radio" id="radio" />
                  <Label htmlFor="radio">Radio Button</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Size */}
            <div>
              <Label htmlFor="size">Size ({size}px)</Label>
              <Slider
                id="size"
                min={10}
                max={50}
                step={1}
                value={[size]}
                onValueChange={(val) => setSize(val[0])}
                className="mt-1"
              />
            </div>

            {/* Border Size */}
            <div>
              <Label htmlFor="borderSize">Border Size ({borderSize}px)</Label>
              <Slider
                id="borderSize"
                min={0}
                max={10}
                step={1}
                value={[borderSize]}
                onValueChange={(val) => setBorderSize(val[0])}
                className="mt-1"
              />
            </div>

            {/* Border Color */}
            <div>
              <Label htmlFor="borderColor">Border Color</Label>
              <Input
                id="borderColor"
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="mt-1 w-20"
              />
            </div>

            {/* Background Color */}
             <div>
              <Label htmlFor="color">Background Color</Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 w-20"
              />
            </div>

             {/* Checked Color */}
             <div>
              <Label htmlFor="checkedColor">Check/Dot Color</Label>
              <Input
                id="checkedColor"
                type="color"
                value={checkedColor}
                onChange={(e) => setCheckedColor(e.target.value)}
                className="mt-1 w-20"
              />
            </div>

            {/* Border Radius (for Checkbox only) */}
            {elementType === 'checkbox' && (
              <div>
                <Label htmlFor="borderRadius">Border Radius ({borderRadius}px)</Label>
                <Slider
                  id="borderRadius"
                  min={0}
                  max={20}
                  step={1}
                  value={[borderRadius]}
                  onValueChange={(val) => setBorderRadius(val[0])}
                  className="mt-1"
                />
              </div>
            )}

             {/* Check Type (for Radio only) - Note: CSS will handle dot */}
            {/* elementType === 'radio' && (
               <div>
                <Label htmlFor="checkType">Check Type</Label>
                <RadioGroup value={checkType} onValueChange={setCheckType} className="flex space-x-4 mt-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dot" id="dot" />
                    <Label htmlFor="dot">Dot</Label>
                  </div>
                </RadioGroup>
              </div>
            )*/}

          </CardContent>
        </Card>

        {/* Preview and Code Card */}
        <Card>
          <CardHeader><CardTitle>Preview and Code</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Preview */}
            <div>
              <Label>Preview</Label>
              <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-white" style={{ minHeight: '80px' }}>
                 {renderPreview()}
              </div>
            </div>

            {/* Generated Code */}
            <div>
              <Label htmlFor="generatedCode">Generated CSS</Label>
              <div className="relative mt-1">
                <textarea
                  id="generatedCode"
                  readOnly
                  value={generateCode()}
                  className="w-full p-2 border rounded-md font-mono text-sm bg-slate-100"
                  rows={10}
                />
                <Button 
                  size="sm" 
                  className="absolute top-2 right-2" 
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckboxRadioGeneratorPage; 