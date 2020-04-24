import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mixins } from "./shared";

const { css } = emotion;

const styles = {
  links: css`
    padding: ${spacing.large};
    ${mixins.textShadow};
    text-align: right;
    h2 {
      font-size: 1.8rem;
      ${mixins.headerFont};
    }
    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 0.8rem;
        padding: ${spacing.xSmall} 0;
      }
    }
    p {
      line-height: 1.2rem;
    }
  `,
};

export default styles;
