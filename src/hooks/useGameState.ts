import { useCallback, useState } from "react";
import { applyMove, checkWinner, createEmptyBoard } from "../utils/gameLogic";
import { Board, GameState, GameStats, Player } from "../utils/types";
import { OPPONENT, PLAYER } from "../utils/constants";

export function useGameState(getOpponentMove: (board: Board) => number | null) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [gameState, setGameState] = useState<GameState>("ongoing");
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [gameStats, setGameStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const handleGameEnd = useCallback((winner: Player | "Draw") => {
    if (winner === PLAYER) {
      setGameState("won");
      setGameStats((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (winner === OPPONENT) {
      setGameState("lost");
      setGameStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setGameState("draw");
      setGameStats((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }, []);

  const handlePLayerMove = useCallback(
    (position: number) => {
      if (board[position] || gameState !== "ongoing" || !playerTurn) {
        return;
      }

      const newBoard = applyMove(board, position, PLAYER);
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        handleGameEnd(winner);
        return;
      }

      setPlayerTurn(false);

      setTimeout(() => {
        const opponentMove = getOpponentMove(newBoard);
        if (opponentMove !== null) {
          const updatedBoard = applyMove(newBoard, opponentMove, OPPONENT);
          setBoard(updatedBoard);

          const oppWinner = checkWinner(updatedBoard);
          if (oppWinner) {
            handleGameEnd(oppWinner);
          } else {
            setPlayerTurn(true);
          }
        }
      }, 300);
    },
    [board, gameState, playerTurn, getOpponentMove, handleGameEnd]
  );

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setGameState("ongoing");
    setPlayerTurn(true);
  }, []);

  return {
    board,
    gameState,
    playerTurn,
    gameStats,
    handlePLayerMove,
    resetGame,
  };
}
