import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing, mixins } from "./shared";

const { css } = emotion;

const styles = {
  links: css`
    ${mixins.textShadow};
    padding: ${spacing.small} 0 ${spacing.small};
    text-align: center;

    h2 {
      ${mixins.headerFont};
      font-size: 1.8rem;
      margin: 0;
    }

    ul {
      list-style: none;
      padding: ${spacing.xSmall} 0 0;

      li {
        font-size: 0.9rem;
        a {
          ${mixins.transition};
          display: block;
          padding: ${spacing.xSmall} 0 0;
          line-height: 1.4rem;
        }
        a:hover {
          color: white;
          transform: translateX(-${spacing.xSmall});
        }
        i {
          margin-left: 0.6rem;
        }
      }
    }
    p {
      line-height: 1.2rem;
    }

    @media (min-width: ${mobile.width}) {
      padding: ${spacing.mid};
      text-align: right;
      ul {
        li {
          font-size: 0.8rem;
          i {
            margin-left: 0.2rem;
            font-size: 0.6rem;
          }
        }
      }
    }

    @media (min-width: ${tablet.width}) {
      padding: ${spacing.large};
    }
  `,
};

export default styles;
