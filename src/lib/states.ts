import { Category } from "./yacht";

export interface GameState {
  playerCount: number;
  players: PlayerState[];
  dice: DiceState;
}

export namespace GameState {
  export function create(playerCount: number): GameState {
    const players: PlayerState[] = new Array(playerCount);
    for (let i = 0; i < playerCount; i += 1) {
      players[i] = PlayerState.create();
    }

    return {
      playerCount,
      players,
      dice: {
        phase: DicePhase.READY,
        keeps: [],
        hands: [],
      },
    };
  }
}


type PlayerCategoryType = number | null;
type PlayerStateKeys = { [key in Category]: PlayerCategoryType };

export interface PlayerState extends PlayerStateKeys {
}

export namespace PlayerState {
  export function create(): PlayerState {
    return {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      choice: null,
      full_house: null,
      four_of_a_kind: null,
      small_straight: null,
      large_straight: null,
      yacht: null,
    };
  }
}

export interface DiceState {
  phase: DicePhase;
  keeps: number[];
  hands: number[];
}

export enum DicePhase {
  READY = 'ready',
  ROLLING = 'rolling',
  PICK = 'pick',
}