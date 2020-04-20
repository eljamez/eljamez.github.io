<script>
  import styles from "../styles/content";

  // import styles
  const { container } = styles;

  const sections = [
    {
      name: "Repos",
      links: [
        {
          name: "React Keyboard 🎹",
          description: "A piano keyboard React component w/ musical typing.",
          url: "https://www.jamescript.com/React-Keyboard/",
          iconClass: "fa-music"
        },
        {
          name: "Vanilla JS Library Boilerplate",
          description: "A starting place to create a JavaScript library",
          url: "http://www.jamescript.com/Vanilla-JS-Library-Boilerplate/"
        }
      ]
    },
    {
      name: "NPM",
      links: [
        {
          name: "React Keyboard 🎹",
          description: "A piano keyboard React component w/ musical typing.",
          url: "https://www.npmjs.com/package/react-keyboard-component"
        }
      ]
    },
    {
      name: "CodePen",
      links: [
        {
          id: 1,
          name: "Place those Buttons!",
          description: "Just a fun experiment to place dots on a screen",
          url: "https://codepen.io/eljamez/pen/OJPMQbV",
          penUrl: "https://codepen.io/eljamez/pen/OJPMQbV",
          slugHash: "OJPMQbV"
        }
      ]
    }
  ];
</script>

<main class={styles.content}>
  {#each sections as section}
    <h2>{section.name}</h2>
    <div class={`section_${section.name.toLowerCase()}`}>
      {#each section.links as link}
        <h3>{link.name}</h3>
        <p>{link.description}</p>
        {#if link.penUrl}
          <p
            class="codepen"
            data-height="265"
            data-theme-id="dark"
            data-default-tab="result"
            data-user="eljamez"
            data-slug-hash={link.slugHash}
            style="height: 265px; box-sizing: border-box; display: flex;
            align-items: center; justify-content: center; border: 2px solid;
            margin: 1em 0; padding: 1em;"
            data-pen-title={link.name}>
            <span>
              See the Pen
              <a href={link.penUrl}>{link.name}</a>
              by James Hall (
              <a href="https://codepen.io/eljamez">@eljamez</a>
              ) on
              <a href="https://codepen.io">CodePen</a>
              .
            </span>
          </p>
          <script async src="https://static.codepen.io/assets/embed/ei.js">

          </script>
        {:else}
          <a href={link.url}>{link.url}</a>
        {/if}
      {/each}
    </div>
  {/each}
</main>
