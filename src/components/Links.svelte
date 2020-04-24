<script>
  import styles from "../styles/links";
  import { links } from "../utils/constants";

  // import styles
  const { container } = styles;

  const title = "Links";
</script>

<div class={styles.links}>
  <h2>{title}</h2>
  <ul>
    {#each links as link}
      <li>
        <a href={link.url}>
          {link.name}
          <i class={link.iconClass} />
        </a>

      </li>
    {/each}
  </ul>
</div>
