import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type QuoteType = "single" | "double";

const SvgUrlEncoderPage = () => {
  const [svgInput, setSvgInput] = useState<string>("");
  const [encodedSvg, setEncodedSvg] = useState<string>("");
  const [cssReadySvg, setCssReadySvg] = useState<string>("");
  const [quoteType, setQuoteType] = useState<QuoteType>("double");
  const [previewBackground, setPreviewBackground] = useState<string>("white");

  // Add xmlns if missing
  const cleanSvg = useMemo(() => {
    if (!svgInput.trim()) return "";
    let cleaned = svgInput.trim();
    if (!cleaned.includes('xmlns=')) {
      cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return cleaned;
  }, [svgInput]);

  // Encode SVG
  useEffect(() => {
    if (!cleanSvg) {
      setEncodedSvg("");
      setCssReadySvg("");
      return;
    }

    try {
      // Basic encoding based on the linked tool's description (encodeURIComponent)
      let encoded = encodeURIComponent(cleanSvg)
        .replace(/'/g, '%27') // Encode single quotes
        .replace(/\(/g, '%28') // Encode opening brackets
        .replace(/\)/g, '%29'); // Encode closing brackets

      setEncodedSvg(encoded);

      // Format for CSS data URI
      const quote = quoteType === "single" ? "'" : '"';
      const css = `url(${quote}data:image/svg+xml,${encoded}${quote})`;
      setCssReadySvg(css);

    } catch (error) {
      console.error("SVG Encoding Error:", error);
      toast.error("Failed to encode SVG. Please check your input.");
      setEncodedSvg("");
      setCssReadySvg("");
    }
  }, [cleanSvg, quoteType]);

  // Decode SVG (by pasting into encoded output)
  const handleEncodedSvgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEncodedSvg(value);

    if (!value.trim()) {
      setSvgInput("");
      setCssReadySvg("");
      return;
    }

    try {
      // Attempt to decode the pasted string
      // Remove data URI parts if present
      const dataUriMatch = value.match(/^url\(["\']?data:image\/svg\+xml,(.*)["\']?\)$/);
      const stringToDecode = dataUriMatch ? dataUriMatch[1] : value;

      let decoded = decodeURIComponent(stringToDecode)
        .replace(/%27/g, "'"); // Decode single quotes back

      setSvgInput(decoded);
      // Re-run encoding based on decoded input to update CSS Ready field
      // useEffect will handle this because svgInput changed

    } catch (error) {
       console.error("SVG Decoding Error:", error);
       // Don't show toast for decoding errors on every input change
       // Keep previous svgInput if decoding fails
       // setSvgInput(""); // Or handle error state more gracefully
    }
  };

  const handleClear = () => {
    setSvgInput("");
    setEncodedSvg("");
    setCssReadySvg("");
    setQuoteType("double");
    setPreviewBackground("white");
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const previewStyle = useMemo(() => ({
    backgroundImage: cssReadySvg || 'none',
    backgroundColor: previewBackground,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '200px',
    border: '1px dashed #ccc'
  }), [cssReadySvg, previewBackground]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>SVG URL Encoder</CardTitle>
          <CardDescription>
            Encode SVG for CSS data URIs and preview the result
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* External Quotes Option */}
            <div className="flex items-center space-x-4">
              <Label>External quotes:</Label>
              <RadioGroup
                value={quoteType}
                onValueChange={(value: QuoteType) => setQuoteType(value)}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single-quotes" />
                  <Label htmlFor="single-quotes">single</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="double" id="double-quotes" />
                  <Label htmlFor="double-quotes">double</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Input and Encoded Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="svgInput">Insert SVG:</Label>
                {/* Add Example Link if needed */}
                <Textarea
                  id="svgInput"
                  value={svgInput}
                  onChange={(e) => setSvgInput(e.target.value)}
                  placeholder="<svg>...</svg>"
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="encodedSvg">Take encoded:</Label>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => copyToClipboard(encodedSvg, "Encoded SVG copied!")}
                    disabled={!encodedSvg}
                  >
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="encodedSvg"
                  value={encodedSvg}
                  onChange={handleEncodedSvgChange} // Allow decoding by pasting
                  placeholder="Encoded SVG will appear here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>

            {/* CSS Ready and Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cssReadySvg">Ready for CSS:</Label>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => copyToClipboard(cssReadySvg, "CSS ready SVG copied!")}
                    disabled={!cssReadySvg}
                  >
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="cssReadySvg"
                  value={cssReadySvg}
                  readOnly // This field is output only
                  placeholder="CSS ready SVG will appear here..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Preview:</Label>
                <div className="flex items-center space-x-2">
                   <Label>Background:</Label>
                   <RadioGroup
                    value={previewBackground}
                    onValueChange={(value: string) => setPreviewBackground(value)}
                    className="flex items-center space-x-2"
                   >
                     <RadioGroupItem value="white" id="bg-white" />
                     <Label htmlFor="bg-white">White</Label>
                     <RadioGroupItem value="silver" id="bg-silver" />
                     <Label htmlFor="bg-silver">Silver</Label>
                     <RadioGroupItem value="black" id="bg-black" />
                     <Label htmlFor="bg-black">Black</Label>
                   </RadioGroup>
                </div>
                <div style={previewStyle}></div>
              </div>
            </div>

            {/* Clear Button */}
             <div>
               <Button variant="outline" onClick={handleClear} disabled={!svgInput && !encodedSvg}>
                 Clear
               </Button>
             </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SvgUrlEncoderPage; 