<script>
  export let project;

  import styles from "../styles/project";
</script>

<div class={styles.project}>
  {#if project.image}
    <img src={project.image} alt={project.name} />
  {:else}
    {#if project.iconClass}
      <i class={project.iconClass} />
    {/if}
  {/if}
  {#if project.name}
    <h3>
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
</div>
