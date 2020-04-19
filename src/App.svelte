<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {
    container,
    headerContainer,
    header,
    subheader,
    footer
  } from "./styles/styles.js";
  import { copy } from "./utils/constants.js";
  import Content from "./components/Content.svelte";
  import Sidebar from "./components/Sidebar.svelte";

  let headerHovered = false;
  const handleHeaderMouseOver = e => {
    headerHovered = true;
  };

  const handleHeaderMouseOut = e => {
    headerHovered = false;
  };
</script>

<div class={container}>
  <header class={headerContainer} on:mouseout={handleHeaderMouseOut}>
    {#if headerHovered}
      <h3
        class={subheader}
        transition:fade={{ delay: 150, duration: 400, easing: quintOut }}>
        {copy.subheader}
      </h3>
    {/if}
    <h1 class={header} on:mouseover={handleHeaderMouseOver}>{copy.header}</h1>
  </header>
  <Sidebar />
  <Content />
  <footer class={footer}>
    <p>James Augustus Hall &copy;</p>
  </footer>
</div>
