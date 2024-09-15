<script lang="ts">
  import { Mode } from "$lib/Mode";
  import "@fontsource/fredoka/600.css";
  import "@fontsource/shippori-antique-b1/400.css";
  import type { Settings } from "./settings";

  export let settings: Settings;
  let paused = true;
  let clock = 60 * settings.modeLengths[Mode.Pomodoro];

  export let session = 1;
  export let activeMode: Mode = Mode.Pomodoro;

  let interval: number;
  function togglePause() {
    paused = !paused;
    if (!paused) {
      start();
    } else {
      clearInterval(interval);
    }
  }

  function start() {
    if (paused) {
      return;
    }

    interval = setInterval(() => {
      if (!paused) {
        if (clock <= 1) {
          nextMode();
          togglePause();
        } else {
          clock -= 1;
        }
      }
    }, 1000);
  }

  function skip() {
    nextMode();
    if (!paused) {
      togglePause();
    }
  }

  $: {
    clock = 60 * settings.modeLengths[activeMode];
  }

  function nextMode() {
    if (activeMode == Mode.Pomodoro) {
      if (session % settings.longBreakInterval == 0) {
        activeMode = Mode.LongBreak;
      } else {
        activeMode = Mode.ShortBreak;
      }
    } else {
      activeMode = Mode.Pomodoro;
      session++;
    }
  }
</script>

<div id="pomodoro">
  <div id="controls">
    {#each Object.values(Mode) as mode}
      <button
        class:active={activeMode == mode}
        on:click={() => {
          activeMode = mode;
        }}>{mode}</button
      >
    {/each}
  </div>
  <div id="time">
    {`${Math.floor(clock / 60)
      .toString()
      .padStart(2, "0")}:${(clock % 60).toString().padStart(2, "0")}`}
  </div>
  <div id="pause-container">
    <button class="pause" on:click={togglePause}>
      {#if paused}
        Start
      {:else}
        Pause
      {/if}
    </button>
  </div>
  <button id="skip" on:click={skip}>skip</button>
</div>

<style lang="scss">
  button {
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-family: "Shippori Antique B1";

    &:active {
      transform: translateY(2px); /* Move text down */
    }
  }

  #pomodoro {
    width: 500px;
    background-color: #ffffff20;
    text-align: center;

    border-radius: 12px;

    margin-top: 1.2em;
    padding-top: 12px;
    padding-bottom: 8px;

    #controls {
      button {
        margin: 0 25px;
        background-color: transparent;
      }

      .active {
        background-color: #00000025 !important;
      }
    }

    #time {
      font-size: 600%;
    }

    #pause-container {
      padding-bottom: 8px;
      .pause {
        width: 180px;
        height: 60px;

        text-transform: uppercase;
        font-size: 0.8em;
        font-family: "Fredoka";
        font-weight: 600;

        background-color: #ffffff;
        color: var(--bg);
      }
    }

    #skip {
      background-color: #ffffff20;
    }
  }
</style>
