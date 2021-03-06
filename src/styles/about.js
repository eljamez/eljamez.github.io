import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mixins } from "./shared";

const { css } = emotion;

const styles = {
  about: css`
    padding: ${spacing.large};
    ${mixins.textShadow};
    h2 {
      font-size: 1.8rem;
      text-align: right;
      ${mixins.headerFont};
    }
    p {
      line-height: 1.2rem;
    }
  `,
};

export default styles;
