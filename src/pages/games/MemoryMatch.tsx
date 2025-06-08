import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Timer, Trophy, RefreshCw } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎫', '🎬', '🎵', '🎹', '🎸', '🎺'];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('memoryMatchBestScore');
    return saved ? parseInt(saved) : Infinity;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...emojis, ...emojis]
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5); // Shuffle cards

    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCardClick = (clickedId: number) => {
    if (
      flippedCards.length === 2 || // Don't allow more than 2 cards to be flipped
      flippedCards.includes(clickedId) || // Don't allow clicking the same card
      cards[clickedId].isMatched // Don't allow clicking matched cards
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedId];
    setFlippedCards(newFlippedCards);

    // Update the flipped state of the clicked card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedId ? { ...card, isFlipped: true } : card
      )
    );

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.value === secondCard.value) {
        // Match found
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);

        // Check if all cards are matched
        const allMatched = cards.every(card => card.isMatched);
        if (allMatched) {
          setIsPlaying(false);
          if (moves + 1 < bestScore) {
            setBestScore(moves + 1);
            localStorage.setItem('memoryMatchBestScore', (moves + 1).toString());
            toast.success('New best score! 🎉');
          } else {
            toast.success('Congratulations! You won! 🎉');
          }
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Memory Match</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="text-xl font-semibold">{formatTime(time)}</span>
          </div>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5" />
            <span className="text-xl font-semibold">Moves: {moves}</span>
          </div>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5" />
            <span className="text-xl font-semibold">
              Best: {bestScore === Infinity ? '-' : bestScore}
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {cards.map(card => (
          <Button
            key={card.id}
            variant="outline"
            className={`h-24 text-4xl transition-all duration-300 transform ${
              card.isFlipped ? 'rotate-y-180' : ''
            } ${card.isMatched ? 'opacity-50' : ''}`}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched}
          >
            {card.isFlipped ? card.value : '❓'}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={initializeGame} variant="outline" size="lg">
          New Game
        </Button>
      </div>
    </div>
  );
} 