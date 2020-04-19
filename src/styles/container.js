import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile, height } from "./shared";

const { css } = emotion;

const styles = {
  container: css`
    @media (min-width: ${mobile.width}) {
      display: grid;
      grid-template-columns: 200px auto;
      grid-template-rows: ${height.header + spacing.large} auto ${spacing.large};
    }
  `,
};

export default styles;
