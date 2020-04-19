import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing } from "./shared";

const { css } = emotion;

const styles = {
  about: css`
    padding: ${spacing.large};
    p {
    }
  `,
};

export default styles;
