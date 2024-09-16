import { Mode } from "./Mode";

interface ModeLengthSettings {
  [Mode.Pomodoro]: number;
  [Mode.ShortBreak]: number;
  [Mode.LongBreak]: number;
}

export interface Settings {
  longBreakInterval: number;
  modeLengths: ModeLengthSettings;
}

export let defaultSettings: Settings = {
  longBreakInterval: 4,
  modeLengths: {
    [Mode.Pomodoro]: 25,
    [Mode.ShortBreak]: 5,
    [Mode.LongBreak]: 15,
  },
};
