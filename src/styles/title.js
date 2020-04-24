import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing, colors, rgb, mixins } from "./shared";

const { css } = emotion;

const styles = {
  title: css`
    box-sizing: border-box;
    position: absolute;
    padding: ${spacing.small} ${spacing.large};
    z-index: 11;
    width: 100vw;

    h1 {
      ${mixins.headerFont};
      ${mixins.textShadow};
      ${mixins.transition};
      text-transform: uppercase;
      font-size: 2rem;
      margin: 0;
      text-align: center;
      color: ${colors.yellow};
    }

    @media (min-width: ${mobile.width}) {
      h1 {
        text-align: left;
        font-size: 3rem;
      }
    }
    @media (min-width: ${tablet.width}) {
      h1 {
        font-size: 4rem;
      }
    }
  `,
};

export default styles;
