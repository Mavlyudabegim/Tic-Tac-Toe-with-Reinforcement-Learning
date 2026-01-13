import { GRID_SIZE, WINNING_COMBINATIONS } from "./constants";
import { Board, Player, Winner } from "./types";


export function getAvailableMoves(board: Board): number[] {
    return board
        .map((cell, index) => cell === null ? index : null)
        .filter((index): index is number => index !== null);
}

export function getBoardKey(board: Board, perspective: Player): string {
    return board
        .map(cell => cell === null ? '0' : cell===perspective?'1':'2')
        .join('');
}

export function checkWinner(board:Board): Winner {
    for (const [vertical, horizontal, dioganal] of WINNING_COMBINATIONS) {
        if (board[vertical] !== null && board[vertical] === board[horizontal] && board[vertical] === board[dioganal]) {
            return board[vertical] as Player;
        }
    }
    return board.includes(null) ? null : 'Draw';
}

export function applyMove(board: Board, position: number, player: Player): Board {
    const newBoard = board.slice() as Board;
    newBoard[position] = player;
    return newBoard;
}

export function createEmptyBoard(): Board {
    return Array(GRID_SIZE).fill(null) as Board;
}