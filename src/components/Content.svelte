<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { afterUpdate } from "svelte";
  import { currentSection } from "../stores";

  import emotion from "emotion/dist/emotion.umd.min.js";
  import { colors, rgb } from "../styles/shared";
  import styles from "../styles/content";

  import Section from "./Section.svelte";

  import { sections } from "../utils/constants.js";

  const { css } = emotion;

  // import styles
  const { container } = styles;

  let isSelected;
  let currSection = sections[0];

  afterUpdate(() => {
    currSection = sections.find(section => section.name === $currentSection);
  });
</script>

<main
  class={css`
    ${styles.content};
    background: linear-gradient(90deg, rgba(${rgb[currSection.color]}, 1) 0%, rgba(${rgb[currSection.color]}, 0.5) 100%);`}>
  {#each sections as section}
    {#if section.name === $currentSection}
      <Section {section} />
    {/if}
  {/each}
</main>
