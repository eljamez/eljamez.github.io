import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing, colors } from "./shared";

const { css } = emotion;

const styles = {
  nav: css`
    padding-top: ${spacing.mid};
  `,
};

export default styles;
