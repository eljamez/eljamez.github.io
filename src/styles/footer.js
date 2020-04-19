import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing } from "./shared";

const { css } = emotion;

const styles = {
  footer: css`
    padding: ${spacing.small} ${spacing.large};
    @media (min-width: ${mobile.width}) {
      grid-column: 1 / span 2;
      grid-row: 3 / span 1;
    }
  `,
};

export default styles;
