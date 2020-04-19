import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile } from "./shared";

const { css } = emotion;

const styles = {
  content: css`
    padding: ${spacing.mid} ${spacing.large};

    @media (min-width: ${mobile.width}) {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }
  `,
};

export default styles;
