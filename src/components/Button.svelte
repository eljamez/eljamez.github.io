<script>
  export let section;
  export let handleButtonClick;

  import { afterUpdate } from "svelte";
  import { currentSection } from "../stores.js";
  import styles from "../styles/button";
  import { colors } from "../styles/shared";
  import emotion from "emotion/dist/emotion.umd.min.js";

  const { css } = emotion;

  // import styles
  const { container } = styles;

  let isSelected;

  afterUpdate(() => {
    isSelected = section.name === $currentSection;
  });
</script>

<button
  class={css`
    ${styles.button};
    ${isSelected && styles.selected};
    background-color: ${isSelected && colors[section.color]};
    color: ${colors[section.color]};`}
  data-name={section.name}
  on:click={handleButtonClick}>
  <span>{section.name}</span>
  <i class="fab {section.iconClass}" />
</button>
