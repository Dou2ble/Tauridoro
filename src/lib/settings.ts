import type { Mode } from "./Mode";

interface ModeLengthSettings {
  [Mode.Pomodoro]: number;
  [Mode.ShortBreak]: number;
  [Mode.LongBreak]: number;
}

export interface Settings {
  longBreakInterval: number;
  modeLengths: ModeLengthSettings;
}
