<script>
  import styles from "../styles/container";

  // import styles
  const { container } = styles;
</script>

<div class={container}>
  <slot>
    <em>Missing Content</em>
  </slot>
</div>
