import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing } from "./shared";

const { css } = emotion;

const styles = {
  project: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    box-sizing: border-box;
    border-radius: 5px;
    padding: ${spacing.mid};
    background-color: rgba(0, 0, 0, 0.5);
    margin: ${spacing.large} 0;
    width: 100%;

    img {
      grid-column: 1 / -1;
      width: 100%;
    }

    h3 {
      grid-column: 1 / -1;
      margin: ${spacing.mid} 0 ${spacing.xSmall};
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: bold;
      i {
        margin-right: ${spacing.xSmall};
      }
    }

    p {
      grid-column: 1 / -1;
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
      gap: ${spacing.mid};
      grid-template-rows: 1fr 1fr 1fr;
      margin: 0 0 ${spacing.large};

      img {
        max-width: 270px;
        width: auto;
        grid-column: 1 / span 1;
        grid-row: 1 / -1;
      }

      h3 {
        margin-top: 0;
        font-size: 1.6rem;
        grid-column: 2 / -1;
      }

      p {
        grid-column: 2 / -1;
      }
    }

    @media (min-width: ${tablet.width}) {
      margin: ${spacing.large} 0 calc(${spacing.large} * 2);

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
