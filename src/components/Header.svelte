<script>
  import { fly, fade } from "svelte/transition";
  import styles from "../styles/header.js";
  import { copy } from "../utils/constants.js";

  // import styles
  const { headerContainer, header, subheader } = styles;

  let headerHovered = false;

  const handleHeaderMouseOver = e => {
    headerHovered = true;
  };

  const handleHeaderMouseOut = e => {
    headerHovered = false;
  };
</script>

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
