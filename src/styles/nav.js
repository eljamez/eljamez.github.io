import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing, colors } from "./shared";

const { css } = emotion;

const styles = {
  nav: css`
    padding-top: ${spacing.mid};
    button {
      border: 0px;
      font-size: 2rem;
      text-align: right;
      color: ${colors.yellow};
      width: 100%;
      padding: ${spacing.small} ${spacing.large};
      background: transparent;
      margin: 0;
    }
  `,
};

export default styles;
