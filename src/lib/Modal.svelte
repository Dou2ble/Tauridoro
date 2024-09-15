<script lang="ts">
  import "@fontsource/fredoka/600.css";
  import "@fontsource/shippori-antique-b1/400.css";

  export let visible: boolean;
  export let title: string;
</script>

{#if visible}
  <div id="backdrop">
    <div id="modal">
      <div id="header">
        <strong>{title}</strong>
        <button
          on:click={() => {
            visible = false;
          }}>X</button
        >
      </div>
      <slot></slot>
    </div>
  </div>
{/if}

<style lang="scss">
  #backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    #modal {
      background-color: #ffffff;
      max-width: 80%;
      padding: 1em;
      border-radius: 14px;
      color: #5e5454;

      #header {
        display: flex;
        justify-content: space-between;

        button {
          background-color: transparent;
          border: none;
        }
      }
    }
  }

  #modal :global(*) {
    font-family: "Shippori Antique B1";
    font-weight: 400;
  }

  #modal :global(strong) {
    font-family: "Fredoka";
    font-weight: 600;
  }
  #modal :global(h1) {
    color: inherit;
    font-family: "Fredoka";
    font-weight: 600;
    margin: 0;
  }
</style>
