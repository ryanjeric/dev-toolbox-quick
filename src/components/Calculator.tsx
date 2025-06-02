
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalculatorIcon } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-sm mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CalculatorIcon className="h-6 w-6" />
            Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-right text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 break-all">
              {display}
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <Button variant="outline" onClick={clear} className="col-span-2">
              AC
            </Button>
            <Button variant="outline" onClick={clearEntry}>
              CE
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => inputOperator('÷')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ÷
            </Button>

            {/* Row 2 */}
            <Button variant="outline" onClick={() => inputNumber('7')}>7</Button>
            <Button variant="outline" onClick={() => inputNumber('8')}>8</Button>
            <Button variant="outline" onClick={() => inputNumber('9')}>9</Button>
            <Button 
              variant="secondary" 
              onClick={() => inputOperator('×')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ×
            </Button>

            {/* Row 3 */}
            <Button variant="outline" onClick={() => inputNumber('4')}>4</Button>
            <Button variant="outline" onClick={() => inputNumber('5')}>5</Button>
            <Button variant="outline" onClick={() => inputNumber('6')}>6</Button>
            <Button 
              variant="secondary" 
              onClick={() => inputOperator('-')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              -
            </Button>

            {/* Row 4 */}
            <Button variant="outline" onClick={() => inputNumber('1')}>1</Button>
            <Button variant="outline" onClick={() => inputNumber('2')}>2</Button>
            <Button variant="outline" onClick={() => inputNumber('3')}>3</Button>
            <Button 
              variant="secondary" 
              onClick={() => inputOperator('+')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              +
            </Button>

            {/* Row 5 */}
            <Button variant="outline" onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button variant="outline" onClick={inputDecimal}>.</Button>
            <Button 
              onClick={performCalculation}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
