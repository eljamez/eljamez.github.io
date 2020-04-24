<script>
  import { sections, copy } from "./utils/constants.js";
  import { currentSection, isMobile } from "./stores.js";
  import { onMount, onDestroy } from "svelte";
  import { mobile } from "./styles/shared";
  import Container from "./components/Container.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Title from "./components/Title.svelte";
  import Button from "./components/Button.svelte";
  import Nav from "./components/Nav.svelte";
  import Links from "./components/Links.svelte";
  import About from "./components/About.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";

  const handleButtonClick = e => {
    currentSection.set(e.currentTarget.dataset.name);
  };

  const handleWindowResize = e => {
    isMobile.set(window.innerWidth < mobile.width.split("px")[0]);
  };

  onMount(() => {
    window.addEventListener("resize", handleWindowResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleWindowResize);
  });
</script>

<Container>
  <Title />
  <Sidebar>
    <Nav>
      {#each sections as section}
        <Button {section} {handleButtonClick} />
      {/each}
    </Nav>
    {#if !$isMobile}
      <Links />
    {/if}
  </Sidebar>
  <Content />
  {#if $isMobile}
    <Footer>
      <Links />
    </Footer>
  {/if}
</Container>
