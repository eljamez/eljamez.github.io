<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { afterUpdate } from "svelte";
  import { currentSection, isMobile } from "../stores";

  import emotion from "emotion/dist/emotion.umd.min.js";
  import { colors, rgb } from "../styles/shared";
  import styles from "../styles/content";

  import Section from "./Section.svelte";

  import { sections } from "../utils/constants.js";

  const { css } = emotion;

  let currSection = sections[0];
  let gradientDeg = $isMobile ? 180 : 90;

  afterUpdate(() => {
    currSection = sections.find(section => section.name === $currentSection);
    gradientDeg = $isMobile ? 180 : 90;
  });
</script>

<main
  class={css`
    ${styles.content};
    background: linear-gradient(${gradientDeg}deg, rgba(${rgb[currSection.color]}, 1) 0%, rgba(${rgb[currSection.color]}, 0.5) 100%);`}>
  {#each sections as section}
    {#if section.name === $currentSection}
      <Section {section} />
    {/if}
  {/each}
</main>
