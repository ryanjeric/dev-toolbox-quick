import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Download, ArrowRight, Circle as CircleIcon, Square as SquareIcon, Type, Pencil, Trash2, Delete } from 'lucide-react';

interface Tool {
  name: string;
  icon: JSX.Element;
  action: () => void;
}

const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<fabric.Image | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });

      // Add keyboard event listener for delete
      document.addEventListener('keydown', (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && fabricCanvas) {
          const activeObject = fabricCanvas.getActiveObject();
          if (activeObject && activeObject !== backgroundImage) {
            fabricCanvas.remove(activeObject);
            fabricCanvas.renderAll();
          }
        }
      });

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
        document.removeEventListener('keydown', () => {});
      };
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.src = event.target?.result as string;
        imgObj.onload = () => {
          // Remove existing background image if any
          if (backgroundImage) {
            canvas.remove(backgroundImage);
          }

          const image = new fabric.Image(imgObj);
          image.scaleToWidth(canvas.width!);
          
          // Lock the image in place
          image.set({
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            hasControls: false,
            hasBorders: false,
          });

          canvas.add(image);
          canvas.setActiveObject(image);
          canvas.moveObjectTo(image, 0);
          setBackgroundImage(image);
          canvas.renderAll();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrow = () => {
    if (!canvas) return;
    const arrow = new fabric.Path('M 0 0 L 100 0 L 90 -10 M 100 0 L 90 10', {
      left: 100,
      top: 100,
      stroke: selectedColor,
      strokeWidth: 2,
      fill: 'transparent',
    });
    canvas.add(arrow);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: 'transparent',
      stroke: selectedColor,
      strokeWidth: 2,
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  const addSquare = () => {
    if (!canvas) return;
    const square = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: 'transparent',
      stroke: selectedColor,
      strokeWidth: 2,
    });
    canvas.add(square);
    canvas.renderAll();
  };

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fill: selectedColor,
      fontSize: 20,
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const startDrawing = () => {
    if (!canvas) return;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = selectedColor;
    canvas.freeDrawingBrush.width = 2;
  };

  const stopDrawing = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
  };

  const clearCanvas = () => {
    if (!canvas) return;
    // Keep the background image if it exists
    const objects = canvas.getObjects();
    objects.forEach(obj => {
      if (obj !== backgroundImage) {
        canvas.remove(obj);
      }
    });
    canvas.renderAll();
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject !== backgroundImage) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    link.click();
  };

  const tools: Tool[] = [
    {
      name: 'select',
      icon: <Pencil className="h-4 w-4" />,
      action: () => {
        if (canvas) {
          canvas.isDrawingMode = false;
          setSelectedTool('select');
        }
      },
    },
    {
      name: 'arrow',
      icon: <ArrowRight className="h-4 w-4" />,
      action: () => {
        addArrow();
        setSelectedTool('arrow');
      },
    },
    {
      name: 'circle',
      icon: <CircleIcon className="h-4 w-4" />,
      action: () => {
        addCircle();
        setSelectedTool('circle');
      },
    },
    {
      name: 'square',
      icon: <SquareIcon className="h-4 w-4" />,
      action: () => {
        addSquare();
        setSelectedTool('square');
      },
    },
    {
      name: 'text',
      icon: <Type className="h-4 w-4" />,
      action: () => {
        addText();
        setSelectedTool('text');
      },
    },
    {
      name: 'draw',
      icon: <Pencil className="h-4 w-4" />,
      action: () => {
        startDrawing();
        setSelectedTool('draw');
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-[200px]"
        />
        <div className="flex items-center gap-2">
          <Label>Color:</Label>
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-[50px] h-[30px] p-1"
          />
        </div>
        <Button variant="outline" onClick={clearCanvas}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button variant="outline" onClick={deleteSelected}>
          <Delete className="h-4 w-4 mr-2" />
          Delete Selected
        </Button>
        <Button onClick={downloadImage}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <div className="flex gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant={selectedTool === tool.name ? 'default' : 'outline'}
            onClick={tool.action}
            className="w-[40px] h-[40px] p-0"
          >
            {tool.icon}
          </Button>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default ImageEditor; 