import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing, height } from "./shared";

const { css } = emotion;

const styles = {
  footer: css`
    display: none;
    box-sizing: border-box;
    height: ${height.footer};
    padding: ${spacing.small} ${spacing.large};
    @media (min-width: ${mobile.width}) {
      display: none;
    }
  `,
};

export default styles;
