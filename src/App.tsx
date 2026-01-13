import "./App.css";

import { useState } from "react";
import { useQLearning } from "./hooks/useQLearning";
import { useGameState } from "./hooks/useGameState";
import { TrainingPanelComponent } from "./components/TrainingPanel";
import { Brain } from "lucide-react";
import { GameBoardComponent } from "./components/GameBoard";

function App() {
  const [epsilon, setEpsilon] = useState(0.3);

  const {
    isTraining,
    trainingStats,
    trainingGames,
    qTableSize,
    trainAgent,
    getOpponentMove,
    getQValueForMove,
  } = useQLearning();

  const {
    board,
    gameState,
    playerTurn,
    gameStats,
    handlePLayerMove,
    resetGame,
  } = useGameState(getOpponentMove);

  const handleTrain = (gamesNum: number) => {
    trainAgent(gamesNum, epsilon);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Brain className="text-purple-400" size={48} />
            Q-Learning Tic-Tac-Toe
          </h1>
          <p className="text-purple-200">
            Train an AI agent using Q-Learning Reinforcement Learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <TrainingPanelComponent
            epsilon={epsilon}
            setEpsilon={setEpsilon}
            isTraining={isTraining}
            trainingGames={trainingGames}
            trainingStats={trainingStats}
            qTableSize={qTableSize}
            onTrain={handleTrain}
          />

          <GameBoardComponent
            board={board}
            gameState={gameState}
            playerTurn={playerTurn}
            gameStats={gameStats}
            onCellClick={handlePLayerMove}
            onReset={resetGame}
            getQValueForMove={getQValueForMove}
            isTraining={isTraining}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
