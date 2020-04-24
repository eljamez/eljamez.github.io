import emotion from "emotion/dist/emotion.umd.min.js";
import { spacing, mobile, tablet, mixins } from "./shared";

const { css } = emotion;

const styles = {
  section: css`
    box-sizing: border-box;
    padding: ${spacing.mid};

    h2 {
      margin: 0;
      font-size: 2rem;
      text-align: center;
      padding-bottom: 0;
      text-shadow: 0 1px 1px black;
    }

    @media (min-width: ${mobile.width}) {
      position: absolute;
      justify-self: stretch;
      min-width: calc(100% - ${spacing.mid} * 2);

      h2 {
        display: none;
      }
    }

    @media (min-width: ${tablet.width}) {
      padding: ${spacing.mid} ${spacing.large};
      h2 {
        font-size: 2rem;
        padding-bottom: ${spacing.mid};
      }
    }
  `,

  description: css`
    text-indent: ${spacing.mid};
    margin: ${spacing.mid} 0 ${spacing.small};
    line-height: 1.6rem;

    &::first-letter {
      font-size: 2rem;
    }

    @media (min-width: ${mobile.width}) {
      width: 80%;
    }
  `,

  link: css`
    ${mixins.headerFont};
    ${mixins.textShadow};
    font-size: 1.2rem;
    text-align: center;
    margin: 0;

    @media (min-width: ${mobile.width}) {
      margin-bottom: ${spacing.mid};
      text-align: left;
      font-size: 2rem;
    }

    @media (min-width: ${tablet.width}) {
      font-size: 2rem;
    }
  `,
};

export default styles;
