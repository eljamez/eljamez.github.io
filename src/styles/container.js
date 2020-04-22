import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile, height, width } from "./shared";

const { css } = emotion;

const styles = {
  container: css`
    box-sizing: border-box;
    @media (min-width: ${mobile.width}) {
      display: grid;
      grid-template-columns: ${width.sidebar} auto;
      grid-template-rows: auto;
      justify-items: stretch;
    }
  `,
};

export default styles;
