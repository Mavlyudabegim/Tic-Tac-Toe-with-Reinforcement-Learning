export type Cell = 'X' | 'O' | null;

export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type Player = 'X' | 'O';

export type Winner = Player | 'Draw' | null;

export interface Experience {
    state: string;
    action: number;
    reward: number;
    nextState: string | null;
    nextAction?: number | null;
    player: Player;
}

export interface Episode {
    trajectory: Array<{
    state: string;
    action: number;
    reward: number;
    player: Player;
    }>;
    finalReward: number;
}

export interface AgentConfig {
    name?: string;
    alpha?: number;
    gamma?: number;
    [key: string]: any;
}

export interface AgentMetadata {
    name: string;
    algorithm: string;
    config: AgentConfig;
}