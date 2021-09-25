<script>
  import styles from "../styles/about";

  // import styles
  const { container } = styles;

  const title = "About";
  const copy =
    "Welcome to JameScript.com, the internet code home of James Augustus Hall. I'm a Software Engineer and have had the pleasure of working on a diverse array of projects throughout the years. These are my personal projects. I hope you find something useful, fun, and or interesing. ";

  const copy2 = "I write JavaScript primarily, along with CSS and HTML.";
</script>

<div class={styles.about}>
  <h2>{title}</h2>
  <p>{copy}</p>
  <p>{copy2}</p>
</div>
