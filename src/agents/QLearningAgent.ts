import { getAvailableMoves, getBoardKey } from "../utils/gameLogic";
import { AgentConfig, Experience } from "./base/types";
import { Agent } from "./base/Agent";
import { Board, Player } from "../utils/types";

interface QTable {
   [key: string]: number;
}

export class QLearningAgent  extends Agent  {
    private qTable: QTable;
    private readonly alpha: number;
    private readonly gamma: number;

    constructor(config: AgentConfig = {}) {
        super({
            name: 'Q-Learning',
            alpha: 0.3,
            gamma: 0.95,
            ...config,
        });
        this.qTable = {};
        this.alpha = config.alpha!;
        this.gamma = config.gamma!;
    }

    chooseAction(board: Board, player: Player, epsilon: number = 0): number | null {
        const moves = getAvailableMoves(board);
        if (moves.length === 0) {
            return null;
        }

        if (Math.random() < epsilon) {
            return moves[Math.floor(Math.random() * moves.length)];
        }

        const state = getBoardKey(board, player);
        let bestMove = moves[0];
        let bestValue = this.getQValue(state, bestMove);

        for (const move of moves) {
            const value = this.getQValue(state, move);
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
        }
        return bestMove;
    }

    private stateToBoard(state: string): Board {
        return state.split('').map(cell => {
            if (cell === '0') return null;
            if (cell === '1') return 'X';
            return 'O';
        }) as Board;
    }

    private setQValue(state: string, action: number, value: number): void {
        const key = `${state}:${action}`;
        this.qTable[key] = value;
    }

    private getQValue(state: string, action: number): number {
        const key = `${state}:${action}`;
        return this.qTable[key] || 0;
    }


    learn(experience: Experience): void {
        const { state, action, reward, nextState } = experience;

        const currentQ = this.getQValue(state, action);
        
        let maxNextQ = 0;
        if (nextState) {
            const nextMoves = getAvailableMoves(this.stateToBoard(nextState));
            if (nextMoves.length > 0) { 
            maxNextQ = Math.max(...nextMoves.map(a => this.getQValue(nextState, a))); 
            }
        }

        const newQ = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);
        this.setQValue(state, action, newQ);
    }

    getKnowledgeSize(): number {
        return Object.keys(this.qTable).length;
    }

    exportKnowledge(): string {
        return JSON.stringify({
            qTable: this.qTable,
            config: this.config,
            timestamp: new Date().toISOString(),
        });
    }

    importKnowledge(data: string): void {
        try {
            const parsed = JSON.parse(data);
            this.qTable = parsed.qTable;
            this.config = { ...this.config, ...parsed.config };
        } catch (error) {
            throw new Error(`Failed to import knowledge: ${error}`);
        }
    }

    resetKnowledge(): void {
        this.qTable = {};
    }

    getQValueForState(state: string, action:number):number {
        return this.getQValue(state, action);
    }
       
}