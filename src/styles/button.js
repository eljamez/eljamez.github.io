import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, spacing, colors, rgb } from "./shared";

const { css } = emotion;

const styles = {
  button: css`
    border: 0px;
    cursor: pointer;
    text-align: right;
    color: ${colors.yellow};
    width: 100%;
    padding: ${spacing.small} ${spacing.large};
    background: transparent;
    margin: 0;
    transition: all .2s ease;

    span {
      display: inline-block;
      font-size: 1.3rem;
      transform-origin: right;
      transform: scaleX(0);
      transition: all .4s ease;
      overflow: hidden;
      padding-right: ${spacing.xsmall};
      line-height: 2.1rem;
    }

    i {
      font-size: 2.5rem;
      transform-origin: center;
      transition: all .4s ease;
    }

    @media (min-width: ${mobile.width}) {
      font-size: 
      border: 0px;
    }
  `,

  unselected: css`
    &:hover {
      span {
        transform: scaleX(1);
      }
      i {
        transform: scale(0.8);
      }
    }
  `,

  selected: css`
     {
      color: white;
      transform: translateX(${spacing.large});
      text-shadow: 0 1px 1px ${colors.gray};
      span {
        transform: scaleX(1);
      }
      i {
        transform: scale(0.8);
      }
    }
  `,
};

export default styles;
