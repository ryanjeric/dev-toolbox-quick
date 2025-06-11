import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popcorn, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Bubble {
  id: number;
  row: number;
  col: number;
  isPopped: boolean;
}

const BubbleWrap = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [pops, setPops] = useState(0);

  // Initialize bubble grid
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      const rows = 8;
      const cols = 12;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newBubbles.push({
            id: row * cols + col,
            row,
            col,
            isPopped: false,
          });
        }
      }
      
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      timer = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1;
          if (newTime % 30 === 0) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);

  const toggleActivity = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeSpent(0);
      setPops(0);
      setBubbles(bubbles.map(bubble => ({ ...bubble, isPopped: false })));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBubblePop = (id: number) => {
    if (!isActive) return;
    
    setBubbles(prevBubbles =>
      prevBubbles.map(bubble =>
        bubble.id === id ? { ...bubble, isPopped: true } : bubble
      )
    );
    setPops(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <Popcorn className="text-purple-600 dark:text-purple-400" />
            Bubble Wrap
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Pop some virtual bubbles to relieve stress! Click or tap the bubbles to pop them.
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={toggleActivity}
              variant={isActive ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isActive ? "Stop" : "Start"} Session
            </Button>
          </div>

          {isActive && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 text-slate-600 dark:text-slate-400">
                <Wind className="h-5 w-5" />
                <span>Time spent: {formatTime(timeSpent)}</span>
                <span>•</span>
                <span>Pops: {pops}</span>
              </div>
              <Progress value={(timeSpent % 30) * (100 / 30)} className="h-2" />
            </div>
          )}
        </Card>

        <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
          <div className="grid grid-cols-12 gap-2">
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className={`aspect-square rounded-full cursor-pointer ${
                  bubble.isPopped
                    ? 'bg-slate-200 dark:bg-slate-700'
                    : 'bg-purple-400 dark:bg-purple-500 hover:bg-purple-500 dark:hover:bg-purple-600'
                }`}
                onClick={() => handleBubblePop(bubble.id)}
                whileHover={!bubble.isPopped ? { scale: 1.1 } : {}}
                animate={bubble.isPopped ? { scale: 0.8 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {/* Encouraging messages */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 px-6 py-3 rounded-full shadow-lg"
              >
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Great job! Remember to take real breaks too! 🫧
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BubbleWrap; 