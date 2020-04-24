<script>
  import styles from "../styles/footer";

  // import styles
  const { container } = styles;
</script>

<footer class={styles.footer}>
  <slot>
    <em>Missing Content</em>
  </slot>
  <p>James Augustus Hall &copy;</p>
</footer>
