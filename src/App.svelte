<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { headerContainer, header, subheader } from "./styles/styles.js";
  import { copy } from "./utils/constants.js";
  import Content from "./components/Content.svelte";

  let headerHovered = false;
  const handleHeaderMouseOver = e => {
    headerHovered = true;
  };

  const handleHeaderMouseOut = e => {
    headerHovered = false;
  };
</script>

<header
  class={headerContainer}
  on:mouseover={handleHeaderMouseOver}
  on:mouseout={handleHeaderMouseOut}>
  {#if headerHovered}
    <h3
      class={subheader}
      transition:fade={{ delay: 150, duration: 400, easing: quintOut }}>
      {copy.subheader}
    </h3>
  {/if}
  <h1 class={header}>{copy.header}</h1>
</header>
<Content />
<footer>
  <p>James Augustus Hall &copy;</p>
</footer>
