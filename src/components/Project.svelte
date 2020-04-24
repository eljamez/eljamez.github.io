<script>
  export let project;

  import styles from "../styles/project";
</script>

<div class={styles.project}>
  {#if project.name}
    <h3>
      <i class={project.iconClass} />
      {project.name}
    </h3>
  {/if}
  {#if project.url}
    <p>
      <a href={project.url}>{project.url}</a>
    </p>
  {/if}
  {#if project.description}
    <p>
      <i class={project.iconClass} />
      {project.description}
    </p>
  {/if}
  {#if project.embed}
    {@html project.embed}
  {/if}
</div>
