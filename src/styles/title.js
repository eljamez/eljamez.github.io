import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, colors } from "./shared";

const { css } = emotion;

const styles = {
  title: css`
    padding: ${spacing.large};
    h1 {
      color: ${colors.yellow};
    }
  `,
};

export default styles;
