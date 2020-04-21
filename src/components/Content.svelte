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
  let section = sections[0];

  afterUpdate(() => {
    section = sections.find(section => section.name === $currentSection);
  });
</script>

<main
  class={css`
    ${styles.content};
    border-left: 5px solid ${colors[section.color]};
    background: linear-gradient(90deg, rgba(${rgb[section.color]}, 1) 0%, rgba(${rgb[section.color]}, 0.5) 100%);`}>
  <Section {section} />
</main>
