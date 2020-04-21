<script>
  export let section;
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Project from "./Project.svelte";

  import styles from "../styles/section";
</script>

<div
  class={`${styles.section} section_${section.name.toLowerCase()}`}
  transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
  <h2>{section.name || 'Welcome'}</h2>
  {#if section.projects}
    {#each section.projects as project}
      <Project {project} />
    {/each}
  {/if}
</div>
