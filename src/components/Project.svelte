<script>
  export let project;

  import styles from "../styles/project";
</script>

<div class={styles.project}>
  {#if project.image}
    <div
      class={styles.imageHolder}
      style={`background-image: url(${project.image})`}
    >
    </div>
  {:else}
    {#if project.iconClass}
      <i class={project.iconClass} />
    {/if}
  {/if}
  <div class={styles.contentHolder}>
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
        {project.description}
      </p>
    {/if}
  </div>
</div>
