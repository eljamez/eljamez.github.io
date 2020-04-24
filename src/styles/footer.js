import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing, tablet } from "./shared";

const { css } = emotion;

const styles = {
  footer: css`
    box-sizing: border-box;
    padding: ${spacing.mid};
    text-align: center;

    @media (min-width: ${mobile.width}) {
      text-align: right;
      padding-bottom: 0;

      p {
        font-size: 1.1rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      p {
        font-size: 0.8rem;
      }
    }
  `,
};

export default styles;
