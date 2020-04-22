<script>
  import { sections, copy } from "./utils/constants.js";
  import { currentSection } from "./stores.js";
  import Container from "./components/Container.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Title from "./components/Title.svelte";
  import Button from "./components/Button.svelte";
  import Nav from "./components/Nav.svelte";
  import About from "./components/About.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";

  const handleButtonClick = e => {
    currentSection.set(e.currentTarget.dataset.name);
  };
</script>

<Container>
  <Sidebar>
    <Title />
    <Nav>
      {#each sections as section}
        <Button {section} {handleButtonClick} />
      {/each}
    </Nav>
    <About />
  </Sidebar>
  <Content />
  <Footer />
</Container>
