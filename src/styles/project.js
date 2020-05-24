import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing } from "./shared";

const { css } = emotion;

const styles = {
  project: css`
    display: grid;
    grid-template-columns: 50px 1fr;
    box-sizing: border-box;
    border-radius: 5px;
    margin: ${spacing.large} 0;
    width: 100%;
    overflow: hidden;
    background-position: center;
    background-size: cover;

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
      background-image: none !important;
      background-color: rgba(0, 0, 0, 0.5);
      grid-template-columns: 100px 1fr;
      gap: ${spacing.mid};
      padding: ${spacing.mid};
      margin: 0 0 ${spacing.large};

      h3 {
        margin-top: 0;
        font-size: 1.6rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      p {
        i {
          display: inline-block;
          margin-right: ${spacing.xSmall};
        }
      }
    }
  `,

  imageHolder: css`
    display: none;
    border-radius: 5px;
    background-size: cover;
    background-position: 50%;
    height: 50px;
    width: 0px;
    grid-column: 1 / span 0;

    @media (min-width: ${mobile.width}) {
      display: block;
      height: 100px;
      width: 100px;
      grid-column: 1 / span 1;
    }
  `,

  contentHolder: css`
    grid-column: 1 / -1;
    background-color: rgba(0, 0, 0, 0.5);
    padding: ${spacing.small};

    @media (min-width: ${mobile.width}) {
      grid-column: 2 / -1;
      background-color: transparent;
      padding: 0;
    }
  `,
};

export default styles;
