import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing } from "./shared";

const { css } = emotion;

const styles = {
  project: css`
    box-sizing: border-box;
    border-radius: 5px;
    padding: ${spacing.mid};
    background-color: rgba(0, 0, 0, 0.5);
    margin: ${spacing.large} 0;
    width: 100%;

    h3 {
      margin: 0 0 ${spacing.xSmall};
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: bold;
      i {
        margin-right: ${spacing.xSmall};
      }
    }

    p {
      a {
        font-size: 0.8rem;
        font-weight: bold;
      }

      i {
        display: none;
      }
    }

    p:first-of-type {
      margin-top: 0px;
    }

    p:last-of-type {
      margin-bottom: 0px;
    }

    @media (min-width: ${mobile.width}) {
      margin: 0 0 ${spacing.large};
      h3 {
        font-size: 1.6rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      margin: ${spacing.large} 0 calc(${spacing.large} * 2);
      h3 {
        font-size: 1.8rem;
        transform: translateY(-30px);
        color: rgba(0, 0, 0, 0.5);
        line-height: 0;

        i {
          display: none;
        }
      }

      p {
        i {
          display: inline-block;
          margin-right: ${spacing.xSmall};
        }
      }
    }
  `,
};

export default styles;
