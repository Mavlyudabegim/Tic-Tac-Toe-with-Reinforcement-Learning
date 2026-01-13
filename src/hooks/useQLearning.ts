import { useCallback, useRef, useState } from "react";
import { QLearningAgent } from "../agents/QLearningAgent";
import { Board, Player, TrainingStats } from "../utils/types";
import {
  applyMove,
  checkWinner,
  createEmptyBoard,
  getBoardKey,
} from "../utils/gameLogic";
import { OPPONENT, PLAYER, REWARDS } from "../utils/constants";

export function useQLearning() {
  const agentRef = useRef(new QLearningAgent());
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStats, setTrainingStats] = useState<TrainingStats>({
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const [trainingGames, setTrainingGames] = useState(0);

  const playTrainingGame = useCallback((epsilon: number) => {
    let board = createEmptyBoard();
    const players: Player[] = [OPPONENT, PLAYER];
    let currentIdx = Math.random() < 0.5 ? 0 : 1;

    const history: Array<{
      player: Player;
      state: string;
      action: number;
      board: Board;
    }> = [];

    while (true) {
      const currentPlayer = players[currentIdx];
      const state = getBoardKey(board, currentPlayer);
      const action = agentRef.current.chooseAction(
        board,
        currentPlayer,
        epsilon
      );
      if (action === null) break;

      if (action === null) break;
      history.push({
        player: currentPlayer,
        state,
        action,
        board: [...board] as Board,
      });
      board = applyMove(board, action, currentPlayer);
      const winner = checkWinner(board);

      if (winner !== null) {
        for (let i = history.length - 1; i >= 0; i--) {
          const record = history[i];
          let reward = 0;
          if (winner === "Draw") {
            reward = REWARDS.DRAW;
          } else if (winner === record.player) {
            reward = REWARDS.WIN;
          } else {
            reward = REWARDS.LOSS;
          }

          const nextBoard =
            i < history.length - 1
              ? applyMove(history[i].board, history[i].action, record.player)
              : null;
          const nextState = nextBoard
            ? getBoardKey(nextBoard, record.player)
            : null;

          agentRef.current.learn({
            state: record.state,
            action: record.action,
            reward,
            nextState,
            player: record.player,
          });
        }

        return winner;
      }

      currentIdx = 1 - currentIdx;
    }

    return "Draw" as const;
  }, []);

  const trainAgent = useCallback(
    async (gamesNum: number, epsilon: number) => {
      setIsTraining(true);
      let stats: TrainingStats = { wins: 0, losses: 0, draws: 0 };
      const batchSize = 100;

      for (let game = 0; game < gamesNum; game++) {
        const decayEpsilon = Math.max(epsilon * (1 - game / gamesNum), 0.05);

        const result = playTrainingGame(decayEpsilon);
        if (result === OPPONENT) stats.wins += 1;
        else if (result === PLAYER) stats.losses += 1;
        else stats.draws += 1;

        if ((game + 1) % batchSize === 0) {
          setTrainingGames(game + 1);
          setTrainingStats(stats);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }

      setTrainingGames(gamesNum);
      setTrainingStats(stats);
      setIsTraining(false);
    },
    [playTrainingGame]
  );

  const getOpponentMove = useCallback((board: Board): number | null => {
    return agentRef.current.chooseAction(board, OPPONENT, 0);
  }, []);

  const getQValueForMove = useCallback(
    (board: Board, position: number): number => {
      const state = getBoardKey(board, OPPONENT);
      return agentRef.current.getQValueForState(state, position);
    },
    []
  );

  return {
    isTraining,
    trainingStats,
    trainingGames,
    qTableSize: agentRef.current.getKnowledgeSize(),
    agent: agentRef.current,
    trainAgent,
    getOpponentMove,
    getQValueForMove,
  };
}
