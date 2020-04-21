<script>
  export let project;

  import styles from "../styles/project";
</script>

<div class={styles.project}>
  {#if project.name}
    <h3>{project.name}</h3>
  {/if}
  {#if project.description}
    <p>{project.description}</p>
  {/if}
  {#if project.url}
    <a href={project.url}>{project.url}</a>
  {/if}
  {#if project.embed}
    {@html project.embed}
  {/if}
</div>
