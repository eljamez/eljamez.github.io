import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile } from "./shared";

const { css } = emotion;

const styles = {
  sidebar: css`
    box-sizing: border-box;
    background-image: url("../../bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;

    @media (min-width: ${mobile.width}) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
  `,
};

export default styles;
