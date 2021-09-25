<script>
  export let project;

  import styles from "../styles/project";

  const defaultImage = "avatar.png";

  const avatar = project.image ? project.image : "public/avatar.png";
</script>

<div class={styles.project} style={`background-image: url(${avatar})`}>
  <div class={styles.imageHolder} style={`background-image: url(${avatar})`} />
  <div class={styles.contentHolder}>
    {#if project.name}
      <h3>{project.name}</h3>
    {/if}
    {#if project.url}
      <p>
        <a href={project.url}>{project.url}</a>
      </p>
    {/if}
    {#if project.description}
      <p>{project.description}</p>
    {/if}
  </div>
</div>
