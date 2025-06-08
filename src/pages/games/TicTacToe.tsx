import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Player = 'X' | 'O' | null;
type Board = Player[];

const initialBoard: Board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares: Board): Player => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore(prev => ({
        ...prev,
        [gameWinner]: prev[gameWinner] + 1
      }));
      toast.success(`Player ${gameWinner} wins!`);
    } else if (!newBoard.includes(null)) {
      toast.info("It's a draw!");
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    resetGame();
  };

  const getStatus = () => {
    if (winner) return `Winner: Player ${winner}`;
    if (!board.includes(null)) return "It's a draw!";
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Tic Tac Toe</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Player X</h2>
          <p className="text-2xl font-bold">{score.X}</p>
        </Card>
        <Card className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Player O</h2>
          <p className="text-2xl font-bold">{score.O}</p>
        </Card>
      </div>

      <div className="mb-4 text-center text-lg font-medium">
        {getStatus()}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-24 text-4xl font-bold"
            onClick={() => handleClick(index)}
          >
            {cell}
          </Button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={resetGame} variant="outline">
          New Game
        </Button>
        <Button onClick={resetScore} variant="destructive">
          Reset Score
        </Button>
      </div>
    </div>
  );
} 