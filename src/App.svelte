<script>
  import { quintOut } from "svelte/easing";
  import { container, footer } from "./styles/styles.js";
  import { sections, copy } from "./utils/constants.js";
  import Container from "./components/Container.svelte";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Nav from "./components/Nav.svelte";
  import About from "./components/About.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Container>
  <Header />
  <Sidebar>
    <Nav>
      <button>
        <i class="fab fa-github" />
        Repos
      </button>
      <button>
        <i class="fab fa-github" />
        NPM
      </button>
      <button>
        <i class="fab fa-github" />
        CodePen
      </button>
    </Nav>
    <About />
  </Sidebar>
  <Content />
  <Footer />
</Container>
