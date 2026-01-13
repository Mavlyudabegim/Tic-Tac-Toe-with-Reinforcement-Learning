import { useState } from "react";
import { Board, GameState, GameStats } from "../utils/types";
import { CellComponent } from "./Cell";
import { Play, RotateCcw } from "lucide-react";

interface GameBoardProps {
  board: Board;
  gameState: GameState;
  playerTurn: boolean;
  gameStats: GameStats;
  onCellClick: (position: number) => void;
  onReset: () => void;
  getQValueForMove: (board: Board, position: number) => number;
  isTraining: boolean;
}

export function GameBoardComponent({
  board,
  gameState,
  playerTurn,
  gameStats,
  onCellClick,
  onReset,
  getQValueForMove,
  isTraining,
}: GameBoardProps) {
  const [showQValues, setShowQValues] = useState(false);

  const getStatusMessage = (): string => {
    switch (gameState) {
      case "ongoing":
        return playerTurn ? "Your turn" : "AI's turn";
      case "won":
        return "You won!";
      case "lost":
        return "You lost!";
      case "draw":
        return "It's a draw!";
      default:
        return "Ongoing...";
    }
  };

  const getStatusColor = (): string => {
    switch (gameState) {
      case "won":
        return "text-green-400";
      case "lost":
        return "text-red-400";
      case "draw":
        return "text-gray-400";
      default:
        return "text-white";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Play className="text-green-400" />
        Play Against AI
      </h2>

      <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-green-500/20 rounded p-2 text-center">
          <div className="text-green-300 font-bold">{gameStats.wins}</div>
          <div className="text-white">You Win</div>
        </div>
        <div className="bg-yellow-500/20 rounded p-2 text-center">
          <div className="text-yellow-300 font-bold">{gameStats.draws}</div>
          <div className="text-white">Draws</div>
        </div>
        <div className="bg-red-500/20 rounded p-2 text-center">
          <div className="text-red-300 font-bold">{gameStats.losses}</div>
          <div className="text-white">AI Wins</div>
        </div>
      </div>

      <div className="mb-4">
        <p className={`text-center text-xl font-bold ${getStatusColor()}`}>
          {getStatusMessage()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {board.map((cell, idx) => (
          <CellComponent
            key={idx}
            value={cell}
            onClick={() => onCellClick(idx)}
            disabled={
              !playerTurn ||
              cell !== null ||
              gameState !== "ongoing" ||
              isTraining
            }
            qValue={
              showQValues && cell === null ? getQValueForMove(board, idx) : null
            }
            showQValue={showQValues}
          />
        ))}
      </div>

      <div className="space-y-2">
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                     px-6 py-3 rounded-lg font-semibold hover:from-green-600 
                     hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          New Game
        </button>

        <button
          onClick={() => setShowQValues(!showQValues)}
          className="w-full bg-white/20 text-white px-6 py-2 rounded-lg font-semibold 
                     hover:bg-white/30 transition-all"
        >
          {showQValues ? "Hide" : "Show"} Q-Values
        </button>
      </div>

      <div className="mt-4 bg-purple-500/20 rounded-lg p-4 text-white text-sm">
        <p className="font-semibold mb-2">Tips:</p>
        <ul className="space-y-1 text-xs">
          <li>• Train 10K+ games for strong play</li>
          <li>• Show Q-values to see AI's thinking</li>
          <li>• Higher values = better moves for AI</li>
        </ul>
      </div>
    </div>
  );
}
