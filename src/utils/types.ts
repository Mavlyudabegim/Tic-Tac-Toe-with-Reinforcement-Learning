export type Cell = 'X' | 'O' | null;

export type Board = [
    Cell, Cell, Cell, 
    Cell, Cell, Cell, 
    Cell, Cell, Cell
];

export type Player = 'X' | 'O';

export type Winner = Player | 'Draw' | null;

export type GameState = 'ongoing' | 'won' | 'draw' | 'lost';

export interface GameStats{
    wins: number;
    losses: number;
    draws: number;
}

export interface TrainingStats {
    wins: number;
    losses: number;
    draws: number;
}