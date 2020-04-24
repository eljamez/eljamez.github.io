import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing } from "./shared";

const { css } = emotion;

const styles = {
  project: css`
    border-radius: 5px;
    padding: ${spacing.mid};
    background-color: rgba(0, 0, 0, 0.5);
    margin: ${spacing.large} 0 calc(${spacing.large} * 2);
    width: 100%;

    h3 {
      margin: 0;
      color: rgba(0, 0, 0, 0.5);
      font-size: 1.4rem;
      transform: translateY(-28px);
      line-height: 0;
      text-transform: uppercase;
      font-weight: bold;
    }

    p {
      i {
        margin-right: ${spacing.small};
      }

      a {
        font-size: 0.8rem;
        font-weight: bold;
      }
    }

    p:first-of-type {
      margin-top: 0px;
    }

    @media (min-width: ${mobile.width}) {
      h3 {
        font-size: 1.6rem;
        transform: translateY(-29px);
      }
    }

    @media (min-width: ${tablet.width}) {
      h3 {
        font-size: 1.8rem;
        transform: translateY(-30px);
      }
    }
  `,
};

export default styles;
