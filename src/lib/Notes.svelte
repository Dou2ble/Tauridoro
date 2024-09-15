<script lang="ts">
  import { readTextFile, writeTextFile, createDir } from "@tauri-apps/api/fs";
  import { notesPath } from "$lib/paths";
  import "@fontsource/shippori-antique-b1/400.css";

  // Notes system
  let notesContent: string;
  (async () => {
    readTextFile(await notesPath())
      .then((value: string) => {
        notesContent = value;
      })
      .catch(() => {
        notesContent = "";
      });
  })();

  function updateNotesFile() {
    (async () => {
      writeTextFile(await notesPath(), notesContent);
    })();
  }
</script>

<div id="notes">
  <div><strong>Notes</strong></div>
  <textarea bind:value={notesContent} on:input={updateNotesFile}></textarea>
</div>

<style lang="scss">
  #notes {
    width: 500px;

    textarea {
      box-sizing: border-box;

      border-style: dashed;
      border-width: 2px;
      border-radius: 12px;
      border-color: #ffffff50;

      height: 200px;

      background-color: #00000020;

      padding: 12px;

      color: #ffffff;

      width: 100%;
      resize: none;

      font-family: "Shippori Antique B1";

      &:focus {
        outline: unset;

        border-color: #ffffff80;
      }
    }
  }
</style>
