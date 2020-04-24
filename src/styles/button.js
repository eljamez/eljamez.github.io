import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, spacing, colors, mixins } from "./shared";

const { css } = emotion;

const styles = {
  button: css`
    border: 0px;
    cursor: pointer;
    text-align: center;
    color: ${colors.yellow};
    width: 25%;
    padding: ${spacing.small} ${spacing.large};
    background: transparent;
    margin: 0;
    transition: all 0.2s ease;

    span {
      display: none;
    }

    i {
      font-size: 1.5rem;
      transform-origin: center;
      transition: all 0.4s ease;
    }

    @media (min-width: ${mobile.width}) {
      width: 100%;
      i {
        font-size: 2.5rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      text-align: right;
      span {
        display: inline-block;
        font-size: 1.3rem;
        transform-origin: right;
        transform: scaleX(0);
        transition: all 0.4s ease;
        overflow: hidden;
        padding-right: ${spacing.xsmall};
        line-height: 2.1rem;
      }
    }
  `,

  unselected: css`
    &:hover {
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${mobile.width}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }

      @media (min-width: ${tablet.width}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `,

  selected: css`
     {
      ${mixins.textShadow};
      color: white;
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${mobile.width}) {
        transform: translateX(${spacing.xLarge});
        width: 80%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
      @media (min-width: ${tablet.width}) {
        transform: translateX(${spacing.large});
        width: 100%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `,
};

export default styles;
