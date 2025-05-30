import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CalculationResult {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

const PercentOffCalculatorPage = () => {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateDiscount = () => {
    // Validate inputs
    const price = parseFloat(originalPrice);
    const percentage = parseFloat(discountPercentage);

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast.error("Please enter a valid percentage between 0 and 100");
      return;
    }

    // Calculate discount amount
    const discountAmount = price * (percentage / 100);
    const finalPrice = price - discountAmount;

    setResult({
      originalPrice: price,
      discountPercentage: percentage,
      discountAmount,
      finalPrice,
      savings: discountAmount,
    });
  };

  const handleClear = () => {
    setOriginalPrice("");
    setDiscountPercentage("");
    setResult(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Percent-off Calculator</CardTitle>
          <CardDescription>
            Calculate the final price after applying a percentage discount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercentage">Discount Percentage</Label>
                <div className="relative">
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    placeholder="0"
                    className="pr-7"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateDiscount} disabled={!originalPrice || !discountPercentage}>
                Calculate
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!originalPrice && !discountPercentage}>
                Clear
              </Button>
            </div>

            {result && (
              <Card className="bg-muted">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Original Price:</span>
                      <span className="font-bold">{formatCurrency(result.originalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Discount Amount:</span>
                      <span className="font-bold text-red-500">-{formatCurrency(result.discountAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium">Final Price:</span>
                      <span className="font-bold text-green-500">{formatCurrency(result.finalPrice)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Calculation Steps:</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Step 1 – Calculate Discount Amount:</span><br />
                        {formatCurrency(result.originalPrice)} × ({result.discountPercentage}% ÷ 100) = {formatCurrency(result.discountAmount)}
                      </p>
                      <p>
                        <span className="font-medium">Step 2 – Calculate Final Price:</span><br />
                        {formatCurrency(result.originalPrice)} − {formatCurrency(result.discountAmount)} = {formatCurrency(result.finalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">You Save:</span>
                      <span className="font-bold text-green-500">{formatCurrency(result.savings)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentOffCalculatorPage; 