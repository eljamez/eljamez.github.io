<script>
  export let section;
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Project from "./Project.svelte";

  import emotion from "emotion/dist/emotion.umd.min.js";
  import { colors, rgb } from "../styles/shared";
  import styles from "../styles/section";

  const { css } = emotion;
</script>

<div
  class={css`
    ${styles.section};
    section_${section.name.toLowerCase()};`}
  in:fly={{ delay: 50, duration: 200, x: -20, opacity: 0, easing: quintOut }}
  out:fly={{ delay: 50, duration: 200, x: 20, opacity: 0, easing: quintOut }}>
  <h2>{section.name || 'Welcome'}</h2>
  {#if section.projects}
    {#each section.projects as project}
      <Project {project} />
    {/each}
  {/if}
</div>
