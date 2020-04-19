<script>
  import emotion from "emotion/dist/emotion.umd.min.js";
  import { cssConstants } from "../utils/constants";

  const { css } = emotion;

  const aside = css`
    background-image: url("../../bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;

    @media (min-width: ${cssConstants.mobileWidth}) {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
  `;

  const nav = css`
    padding-top: ${cssConstants.spMid};
    button {
      border: 0px;
      font-size: 2rem;
      text-align: right;
      color: ${cssConstants.yellow};
      width: 100%;
      padding: ${cssConstants.spSmall} ${cssConstants.spLarge};
      background: transparent;
      margin: 0;
    }
  `;

  //fix this
  const selected = css`
    background-color: black;
  `;

  const about = css`
    padding: ${cssConstants.spLarge};
    p {
    }
  `;

  const title = "About";

  const copy =
    'Welcome to JameScript.com, the Code Home, or "chome" as it were of me, James Augustus Hall. I\'m a Front End Engineer and have had the pleasure of working on a diverse array of projects throughout the years. These are my personal projects. I hope you find something useful, fun, and or interesing. ';
</script>

<aside class={aside}>
  <nav class={nav}>
    <button>Repos</button>
    <button>NPM</button>
    <button>CodePen</button>
  </nav>
  <div class={about}>
    <h2>{title}</h2>
    <p>{copy}</p>
  </div>
</aside>
