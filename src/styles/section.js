import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing } from "./shared";

const { css } = emotion;

const styles = {
  section: css`
    padding-top: 0;

    h2 {
      margin: 0;
      font-size: 2rem;
      padding-bottom: ${spacing.mid};
      text-shadow: 0 1px 1px black;
    }
  `,
};

export default styles;
