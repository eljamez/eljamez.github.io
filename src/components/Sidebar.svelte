<script>
  import styles from "../styles/sidebar";

  // import styles
  const { container } = styles;
</script>

<aside class={styles.sidebar}>
  <slot>
    <em>missing content</em>
  </slot>
</aside>
