import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile } from "./shared";

const { css } = emotion;

const styles = {
  content: css`
    @media (min-width: ${mobile.width}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      justify-self: stretch;
    }
  `,
};

export default styles;
