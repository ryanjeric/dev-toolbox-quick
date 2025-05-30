import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"; // Assuming a progress bar component

const PasswordStrengthCheckerPage = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0); // 0-100
  const [feedback, setFeedback] = useState<string[]>([]);

  // Basic strength evaluation logic
  const evaluateStrength = (pwd: string) => {
    let score = 0;
    const feedbackMessages: string[] = [];

    if (pwd.length > 7) {
      score += 20;
      feedbackMessages.push("✓ At least 8 characters long");
    } else {
      feedbackMessages.push("✗ At least 8 characters long");
    }

    if (pwd.match(/[a-z]/)) {
      score += 20;
      feedbackMessages.push("✓ Contains lowercase letters");
    } else {
       feedbackMessages.push("✗ Contains lowercase letters");
    }

    if (pwd.match(/[A-Z]/)) {
      score += 20;
       feedbackMessages.push("✓ Contains uppercase letters");
    } else {
      feedbackMessages.push("✗ Contains uppercase letters");
    }

    if (pwd.match(/[0-9]/)) {
      score += 20;
       feedbackMessages.push("✓ Contains numbers");
    } else {
      feedbackMessages.push("✗ Contains numbers");
    }

    if (pwd.match(/[^a-zA-Z0-9]/)) {
      score += 20;
       feedbackMessages.push("✓ Contains symbols");
    } else {
      feedbackMessages.push("✗ Contains symbols");
    }

    // Simple scoring - could be more sophisticated
    setStrength(Math.min(score, 100));
    setFeedback(feedbackMessages);
  };

  // Evaluate strength whenever the password changes
  useMemo(() => {
    evaluateStrength(password);
  }, [password]);

  const getStrengthColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = (score: number) => {
    if (score < 40) return 'Weak';
    if (score < 80) return 'Moderate';
    return 'Strong';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Password Strength Checker</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Input Card */}
        <Card>
          <CardHeader><CardTitle>Enter Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 font-mono text-sm"
              />
            </div>
            
            {password.length > 0 && (
              <div className="space-y-2">
                <Label>Strength: {getStrengthLabel(strength)}</Label>
                <Progress value={strength} className={`w-full ${getStrengthColor(strength)}`} />
                <ul className="text-sm text-slate-600 space-y-1">
                  {feedback.map((msg, index) => (
                    <li key={index} className={msg.startsWith('✓') ? 'text-green-600' : 'text-red-600'}>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

             {password.length === 0 && (
               <div className="text-center text-slate-500">
                 Enter a password to check its strength.
               </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordStrengthCheckerPage; 