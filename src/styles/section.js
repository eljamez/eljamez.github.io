import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile, width, height } from "./shared";

const { css } = emotion;

const styles = {
  section: css`
    box-sizing: border-box;
    padding: ${spacing.mid} ${spacing.large};

    h2 {
      margin: 0;
      font-size: 2rem;
      padding-bottom: ${spacing.mid};
      text-shadow: 0 1px 1px black;
    }

    @media (min-width: ${mobile.width}) {
      position: absolute;
      justify-self: stretch;
      min-width: calc(100% - ${width.sidebar});
    }
  `,
};

export default styles;
