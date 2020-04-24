<script>
  export let section;
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { isMobile } from "../stores";
  import Project from "./Project.svelte";

  import emotion from "emotion/dist/emotion.umd.min.js";
  import { colors, rgb } from "../styles/shared";
  import styles from "../styles/section";

  const { css } = emotion;

  const xOrY = $isMobile ? "y" : "x";
</script>

<div
  class={css`
    ${styles.section};
    section_${section.name.toLowerCase()};`}
  in:fly={{ delay: 50, duration: 200, x: -20, opacity: 0, easing: quintOut }}
  out:fly={{ delay: 50, duration: 200, x: 20, opacity: 0, easing: quintOut }}>
  {#if section.name}
    <h2>{section.name}</h2>
  {/if}
  {#if section.link}
    <p class={styles.link}>
      <a href={section.link}>{section.link}</a>
    </p>
  {/if}
  {#if section.description}
    <p class={styles.description}>
      {@html section.description}
    </p>
  {/if}
  {#if section.technical}
    <p class={styles.description}>
      {@html section.technical}
    </p>
  {/if}
  {#if section.projects}
    {#each section.projects as project}
      <Project {project} />
    {/each}
  {/if}
</div>
