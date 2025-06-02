import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const simplifyRatio = (ratio: string): string | null => {
  const parts = ratio.split(':');
  if (parts.length !== 2) return null;

  const num1 = parseInt(parts[0].trim());
  const num2 = parseInt(parts[1].trim());

  if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) return null;
  if (num1 === 0 && num2 === 0) return "0:0";
  if (num1 === 0) return "0:1";
  if (num2 === 0) return "1:0";

  const commonDivisor = gcd(num1, num2);
  return `${num1 / commonDivisor}:${num2 / commonDivisor}`;
};

const compareRatios = (ratio1: string, ratio2: string): string | null => {
  const simplified1 = simplifyRatio(ratio1);
  const simplified2 = simplifyRatio(ratio2);

  if (!simplified1 || !simplified2) return null;

  const [n1, d1] = simplified1.split(':').map(Number);
  const [n2, d2] = simplified2.split(':').map(Number);

  // Handle 0 cases explicitly after simplification
   if (n1 === 0 && d1 === 1 && n2 === 0 && d2 === 1) return "The ratios are equal.";
   if (n1 === 1 && d1 === 0 && n2 === 1 && d2 === 0) return "The ratios are equal.";
   if (n1 === 0 && d1 === 1) return "The first ratio is smaller than the second.";
   if (n2 === 0 && d2 === 1) return "The first ratio is larger than the second.";
   if (n1 === 1 && d1 === 0) return "The first ratio is larger than the second.";
   if (n2 === 1 && d2 === 0) return "The first ratio is smaller than the second.";

  // Compare cross-multiplied values
  if (n1 * d2 === n2 * d1) return "The ratios are equal.";
  if (n1 * d2 > n2 * d1) return "The first ratio is larger than the second.";
  return "The first ratio is smaller than the second.";
};

const RatioCalculator = () => {
  const [ratioInput1, setRatioInput1] = useState('');
  const [ratioInput2, setRatioInput2] = useState('');
  const [simplifiedRatio1, setSimplifiedRatio1] = useState<string | null>(null);
  const [simplifiedRatio2, setSimplifiedRatio2] = useState<string | null>(null);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = () => {
    setError(null);
    setSimplifiedRatio1(null);
    setSimplifiedRatio2(null);
    setComparisonResult(null);

    const simplified1 = simplifyRatio(ratioInput1);
    setSimplifiedRatio1(simplified1);

    if (!simplified1) {
      setError('Invalid format for Ratio 1. Use X:Y format with non-negative numbers.');
    }

    if (ratioInput2) {
       const simplified2 = simplifyRatio(ratioInput2);
       setSimplifiedRatio2(simplified2);
       if (!simplified2) {
         setError('Invalid format for Ratio 2. Use X:Y format with non-negative numbers.');
       }
       if (simplified1 && simplified2) {
         setComparisonResult(compareRatios(ratioInput1, ratioInput2));
       }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ratio Calculator</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Simplify or Compare Ratios</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ratio1">Ratio 1 (X:Y):</Label>
            <Input 
              id="ratio1"
              type="text" 
              value={ratioInput1} 
              onChange={(e) => setRatioInput1(e.target.value)}
              placeholder="e.g., 10:5"
            />
          </div>
          <div>
             <Label htmlFor="ratio2">Ratio 2 (Optional, for comparison):</Label>
            <Input 
              id="ratio2"
              type="text" 
              value={ratioInput2} 
              onChange={(e) => setRatioInput2(e.target.value)}
              placeholder="e.g., 2:1"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSimplify}>Calculate</Button>

      {error && (
        <p className="text-red-500 mt-4">Error: {error}</p>
      )}

      {(simplifiedRatio1 !== null || simplifiedRatio2 !== null || comparisonResult !== null) && !error && (
        <div className="mt-4 space-y-2">
          {simplifiedRatio1 !== null && (
            <p className="text-lg font-semibold">Simplified Ratio 1: {simplifiedRatio1}</p>
          )}
           {simplifiedRatio2 !== null && (
            <p className="text-lg font-semibold">Simplified Ratio 2: {simplifiedRatio2}</p>
          )}
          {comparisonResult !== null && (
            <p className="text-lg font-semibold">Comparison: {comparisonResult}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RatioCalculator; 