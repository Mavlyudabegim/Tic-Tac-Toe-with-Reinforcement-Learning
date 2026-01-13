import { Board, Player } from "../../utils/types";
import { AgentConfig, Experience } from "./types";

export abstract class Agent {
  protected config: AgentConfig;
  public readonly name: string;

  constructor(config: AgentConfig = {}) {
    this.config = config;
    this.name = config.name || "Agent";
  }

  abstract chooseAction(
    board: Board,
    player: Player,
    epsilon?: number
  ): number | null;

  learn(experience: Experience): void {
    throw new Error("Method 'learn' not implemented.");
  }

  abstract getKnowledgeSize(): number;

  abstract exportKnowledge(): string;

  abstract importKnowledge(data: string): void;

  abstract resetKnowledge(): void;
}
