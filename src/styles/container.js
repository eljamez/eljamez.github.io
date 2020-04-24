import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, width } from "./shared";

const { css } = emotion;

const styles = {
  container: css`
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;

    @media (min-width: ${mobile.width}) {
      display: grid;
      grid-template-columns: ${tablet.sidebar} auto;
      grid-template-rows: 100vh;
      justify-items: stretch;
    }

    @media (min-width: ${tablet.width}) {
      grid-template-columns: ${width.sidebar} auto;
    }
  `,
};

export default styles;
