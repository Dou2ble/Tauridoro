<script lang="ts">
  import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
  import { settingsPath } from "$lib/paths";
  import "@fontsource/shippori-antique-b1/400.css";
  import "@fontsource/fredoka/400.css";
  import "@fontsource/fredoka/600.css";
  import TOML from "smol-toml";
  import Modal from "$lib/Modal.svelte";
  import Pomodoro from "$lib/Pomodoro.svelte";
  import { Mode } from "$lib/Mode";
  import type { Settings } from "$lib/settings";
  import { defaultSettings } from "$lib/settings";
  import Notes from "$lib/Notes.svelte";

  let settings: Settings = defaultSettings;

  async function loadSettings() {
    readTextFile(await settingsPath())
      .then((value: string) => {
        try {
          settings = TOML.parse(value) as unknown as Settings;
        } catch {
          settings = defaultSettings;
        }
      })
      .catch(() => {
        settings = defaultSettings;
      });
  }
  loadSettings();

  let activeMode: Mode;

  $: {
    let bg = "";

    switch (activeMode) {
      case Mode.Pomodoro:
        bg = "#ba4949";
        break;
      case Mode.ShortBreak:
        bg = "#38858a";
        break;
      case Mode.LongBreak:
        bg = "#397097";
        break;
    }

    document.documentElement.style.setProperty("--bg", bg);
  }
  document.documentElement.style.setProperty("--bg", "#ba4949");

  async function saveSettings(settings: Settings) {
    await writeTextFile(await settingsPath(), TOML.stringify(settings) + "\n");
  }
  $: {
    saveSettings(settings);
  }

  // pomodoro
  let pomodoroSession: number;
  let showSettings = false;
</script>

<!-- Settings -->
<Modal bind:visible={showSettings} title="Settings">
  <h1>Clock</h1>
  <div style="display: flex;">
    {#each Object.values(Mode) as mode}
      <div>
        <strong>{mode}</strong>
        <br />
        <input type="number" min="1" bind:value={settings.modeLengths[mode]} />
      </div>
    {/each}
  </div>
</Modal>

<div id="root">
  <div id="container">
    <div id="header">
      <strong>
        <img id="logo" src="tauridoro-white.png" alt="Logo" />
        Tauridoro</strong
      >
      <button
        on:click={() => {
          showSettings = true;
        }}>Settings</button
      >
    </div>
    <hr />
    <div id="body">
      <Pomodoro bind:settings bind:activeMode bind:session={pomodoroSession} />
      <div id="counter">#{pomodoroSession}</div>
      <div id="message">
        {#if activeMode == Mode.Pomodoro}
          Time for deep work!
        {:else}
          Time for a break!
        {/if}
      </div>
      <Notes />
    </div>
  </div>
</div>

<style lang="scss">
  $bg: var(--bg);
  $bg1: #ffffff20;
  $font-header: "Fredoka", sans-serif;
  $font-secondary: "Shippori Antique B1", sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    margin: 0;
    background-color: var(--bg);
    color: #ffffff;

    transition: background-color 0.5s ease;
  }

  button {
    font-size: 1rem;
    border: none;
    font-family: $font-secondary;
    cursor: pointer;

    background-color: $bg1;
    color: #ffffff;
    border-radius: 4px;

    &:active {
      transform: translateY(2px); /* Move text down */
    }
  }

  #root {
    display: flex;
    justify-content: center;
    font-family: $font-header;

    font-size: 150%;

    #container {
      width: 800px;

      #header {
        display: flex;
        justify-content: space-between;

        padding-left: 1em;
        padding-right: 1em;
        padding-top: 0.6em;
        padding-bottom: 0.2em;

        #logo {
          transform: translateY(3px);
          width: 1em;
          height: 1em;
        }
      }

      hr {
        border: none;
        height: 1px;

        background-color: $bg1;
      }

      #body {
        display: flex;
        flex-direction: column;
        align-items: center;

        #counter {
          padding-top: 20px;
          color: #dfdede;
          font-size: 1.2rem;
        }

        #message {
          padding-bottom: 20px;
          font-size: 1rem;
          font-family: $font-secondary;
        }
      }
    }
  }
</style>
