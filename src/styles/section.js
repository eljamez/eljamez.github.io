import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile, tablet, mixins } from "./shared";

const { css } = emotion;

const styles = {
  section: css`
    box-sizing: border-box;
    padding: ${spacing.mid};

    h2 {
      ${mixins.headerFont};
      ${mixins.textShadow};
      margin: 0;
      font-size: 1.6rem;
      text-align: center;
      padding-bottom: 0;
      text-transform: uppercase;
    }

    @media (min-width: ${mobile.width}) {
      padding: ${spacing.mid} ${spacing.large};
      position: absolute;
      justify-self: stretch;
      min-width: 100%;

      h2 {
        text-align: left;
        font-size: 1.8rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      h2 {
        display: none;
      }
    }
  `,

  description: css`
    text-indent: ${spacing.mid};
    margin: ${spacing.mid} 0;
    line-height: 1.6rem;

    &::first-letter {
      font-size: 2rem;
    }

    @media (min-width: ${mobile.width}) {
      width: 80%;
    }
  `,

  link: css`
    ${mixins.textShadow};
    font-size: 1.2rem;
    text-align: center;
    margin: 0;

    @media (min-width: ${mobile.width}) {
      text-align: left;
      padding-bottom: ${spacing.mid};
    }

    @media (min-width: ${tablet.width}) {
      margin-bottom: ${spacing.mid};
      font-size: 2rem;
    }
  `,
};

export default styles;
