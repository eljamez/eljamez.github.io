import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing } from "./shared";

const { css } = emotion;

const styles = {
  project: css`
    border-radius: 5px;
    padding: ${spacing.mid};
    background-color: rgba(0, 0, 0, 0.5);
  `,
};

export default styles;
