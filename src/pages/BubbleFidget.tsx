import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wind, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  isActive: boolean;
}

const BUBBLES_PER_ROUND = 5;
const TOTAL_ROUNDS = 10;
const INITIAL_LIGHT_DURATION = 1500; // 1.5 seconds
const MIN_LIGHT_DURATION = 750; // 0.75 seconds
const DURATION_DECREASE_PER_ROUND = 75; // Decrease by 75ms each round

const BubbleFidget = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [bubblesPoppedInRound, setBubblesPoppedInRound] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Initialize bubbles
  useEffect(() => {
    console.log('Initializing bubbles...');
    const BUBBLE_SIZE = 80;
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        newBubbles.push({
          id: i * 6 + j,
          x: 0, // not used anymore
          y: 0, // not used anymore
          size: BUBBLE_SIZE,
          isActive: false,
        });
      }
    }
    setBubbles(newBubbles);
  }, []);

  const getLightDuration = () => {
    const duration = INITIAL_LIGHT_DURATION - (DURATION_DECREASE_PER_ROUND * (round - 1));
    return Math.max(duration, MIN_LIGHT_DURATION);
  };

  const activateRandomBubble = () => {
    console.log('Activating random bubble...');
    if (!isPlaying || gameOver) {
      console.log('Cannot activate bubble: isPlaying =', isPlaying, 'gameOver =', gameOver);
      return;
    }

    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Select a random bubble
    const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
    console.log('Selected bubble:', randomBubble.id);

    // Activate the bubble
    setBubbles(prev => {
      const newBubbles = prev.map(bubble =>
        bubble.id === randomBubble.id
          ? { ...bubble, isActive: true }
          : { ...bubble, isActive: false }
      );
      console.log('Updated bubbles:', newBubbles);
      return newBubbles;
    });

    // Set timeout for bubble deactivation
    const timeout = setTimeout(() => {
      console.log('Bubble timeout reached');
      if (isPlaying && !gameOver) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
        }
      }
    }, getLightDuration());

    setTimeoutId(timeout);
  };

  const startNewRound = () => {
    console.log('Starting new round:', round);
    if (round > TOTAL_ROUNDS) {
      console.log('Game completed');
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    setBubblesPoppedInRound(0);
    // Use setTimeout to ensure state updates are complete
    setTimeout(() => {
      activateRandomBubble();
    }, 100);
  };

  // Start the first round only after isPlaying is true and round is 1
  useEffect(() => {
    if (isPlaying && round === 1 && !gameOver && score === 0 && bubblesPoppedInRound === 0) {
      startNewRound();
    }
    // eslint-disable-next-line
  }, [isPlaying, round, gameOver, score, bubblesPoppedInRound]);

  const startGame = () => {
    console.log('Starting game...');
    // Reset all states
    setIsPlaying(true);
    setRound(1);
    setScore(0);
    setGameOver(false);
    setBubblesPoppedInRound(0);
    
    // Reset all bubbles to inactive
    setBubbles(prev => prev.map(bubble => ({
      ...bubble,
      isActive: false
    })));

    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Do NOT call startNewRound here; let useEffect handle it after state updates
  };

  const handleBubblePress = (id: number) => {
    console.log('Bubble pressed:', id);
    if (!isPlaying || gameOver) {
      console.log('Cannot handle press: isPlaying =', isPlaying, 'gameOver =', gameOver);
      return;
    }

    const pressedBubble = bubbles.find(b => b.id === id);
    if (!pressedBubble || !pressedBubble.isActive) {
      console.log('Invalid bubble press');
      return;
    }

    // Clear the timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Deactivate the bubble
    setBubbles(prev => prev.map(bubble =>
      bubble.id === id
        ? { ...bubble, isActive: false }
        : bubble
    ));

    // Update score and bubbles popped in round
    setScore(prev => prev + 1);
    setBubblesPoppedInRound(prev => prev + 1);

    // Check if round is complete
    if (bubblesPoppedInRound + 1 >= BUBBLES_PER_ROUND) {
      console.log('Round complete, moving to next round');
      setRound(prev => prev + 1);
      setTimeout(startNewRound, 500);
    } else {
      console.log('Activating next bubble');
      setTimeout(activateRandomBubble, 200);
    }
  };

  // Debug effect
  useEffect(() => {
    console.log('Game state:', {
      isPlaying,
      round,
      score,
      gameOver,
      bubblesPoppedInRound,
      activeBubbles: bubbles.filter(b => b.isActive).length
    });
  }, [isPlaying, round, score, gameOver, bubblesPoppedInRound, bubbles]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-purple-600 dark:text-purple-400" />
            Quick Pop Bubble Game
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Pop each bubble as it lights up! Complete 10 rounds of 5 bubbles each.
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            {!isPlaying ? (
              <Button
                onClick={startGame}
                className="flex items-center gap-2"
              >
                Start Game
              </Button>
            ) : (
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <Wind className="h-5 w-5" />
                <span>Round: {round}/{TOTAL_ROUNDS}</span>
                <span>•</span>
                <span>Score: {score}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  High Score: {highScore}
                </span>
              </div>
            )}
          </div>

          {gameOver && (
            <div className="flex flex-col items-center justify-center mb-4 gap-4">
              <div className="text-center text-red-500 font-bold">
                Game Over! Your score: {score}
              </div>
              <Button onClick={startGame} className="mt-2">Restart</Button>
            </div>
          )}

          {isPlaying && !gameOver && (
            <div className="text-center text-blue-500 font-bold mb-4">
              Pop the lit bubble quickly!
            </div>
          )}
        </Card>

        <div className="flex items-center justify-center min-h-[500px]">
          <div className="grid grid-cols-6 grid-rows-4 gap-8">
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className={`rounded-full cursor-pointer transition-all duration-200 bg-purple-500`}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  boxShadow: bubble.isActive ? '0 0 30px 15px rgba(168, 85, 247, 0.5)' : 'none',
                  opacity: bubble.isActive ? 1 : 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => handleBubblePress(bubble.id)}
                whileHover={{ scale: 1.1 }}
                animate={{
                  scale: bubble.isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleFidget; 