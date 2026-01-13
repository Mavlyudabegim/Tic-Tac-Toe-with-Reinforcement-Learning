import { Player } from "../../utils/types";

export interface Experience {
    state: string;
    action: number;
    reward: number;
    nextState: string | null;
    player: Player;
}

export interface AgentConfig {
    name?: string;
    alpha?: number;
    gamma?: number;
}
