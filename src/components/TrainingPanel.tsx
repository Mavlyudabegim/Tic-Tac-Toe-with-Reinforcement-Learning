import { TrainingStats } from "../utils/types";
import { Zap, TrendingUp } from "lucide-react";

interface TrainingPanelProps {
  epsilon: number;
  setEpsilon: (value: number) => void;
  isTraining: boolean;
  trainingGames: number;
  trainingStats: TrainingStats;
  qTableSize: number;
  onTrain: (gameNum: number) => void;
}

export function TrainingPanelComponent({
  epsilon,
  setEpsilon,
  isTraining,
  trainingGames,
  trainingStats,
  qTableSize,
  onTrain,
}: TrainingPanelProps) {
  const getWinRate = () => {
    const totalGames =
      trainingStats.wins + trainingStats.losses + trainingStats.draws;
    if (totalGames === 0) return 0;
    return (
      ((trainingStats.wins + trainingStats.draws * 0.5) / totalGames) *
      100
    ).toFixed(1);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Zap className="text-yellow-400" />
        Training Panel
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-white block mb-2">
            Starting Exploration (ε): {epsilon.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={epsilon}
            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
            className="w-full"
            disabled={isTraining}
          />
          <p className="text-xs text-purple-200 mt-1">
            Decays during training to 0.05
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[1000, 5000, 10000, 25000].map((num) => (
            <button
              key={num}
              onClick={() => onTrain(num)}
              disabled={isTraining}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 
                                  rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 
                                  disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
            >
              {isTraining && trainingGames > 0
                ? `${trainingGames}...`
                : `Train ${num >= 1000 ? num / 1000 + "K" : num}`}
            </button>
          ))}
        </div>

        <div className="bg-white/10 rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-white">
            <span className="font-semibold">Games Trained:</span>
            <span>{trainingGames.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white">
            <span className="font-semibold">Q-Table Size:</span>
            <span>{qTableSize}</span>
          </div>
          <div className="flex justify-between text-white">
            <span className="font-semibold">Win Rate:</span>
            <span className="flex items-center gap-1">
              {getWinRate()}%
              <TrendingUp size={16} className="text-green-400" />
            </span>
          </div>

          {trainingStats.wins + trainingStats.losses + trainingStats.draws >
            0 && (
            <div className="pt-3 border-t border-white/20">
              <div className="text-sm text-purple-200 mb-2">Last Training:</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-500/20 rounded p-2 text-center">
                  <div className="font-bold text-white">AI Wins</div>
                  <div className="text-green-300">{trainingStats.wins}</div>
                </div>
                <div className="bg-yellow-500/20 rounded p-2 text-center">
                  <div className="font-bold text-white">Draws</div>
                  <div className="text-yellow-300">{trainingStats.draws}</div>
                </div>
                <div className="bg-red-500/20 rounded p-2 text-center">
                  <div className="font-bold text-white">Losses</div>
                  <div className="text-red-300">{trainingStats.losses}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-500/20 rounded-lg p-4 text-white text-sm space-y-2">
          <p className="font-semibold">Q-Learning Features:</p>
          <ul className="space-y-1 text-xs">
            <li>✓ Off-policy TD learning</li>
            <li>✓ Epsilon-greedy exploration</li>
            <li>✓ Learns optimal strategy</li>
            <li>✓ Fast convergence</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
