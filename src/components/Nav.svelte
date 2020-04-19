<script>
  import styles from "../styles/nav";

  // import styles
  const { container } = styles;
</script>

<nav class={styles.nav}>
  <slot>
    <em>missing content</em>
  </slot>
</nav>
