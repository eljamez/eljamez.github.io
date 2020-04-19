import emotion from "emotion/dist/emotion.umd.min.js";
import { rgb, colors, spacing, mobile, height } from "./shared";

const { css } = emotion;

const styles = {
  headerContainer: css`
    box-shadow: 0 0 5px 0 ${colors.gray};
    background: linear-gradient(
      0deg,
      rgba(${rgb.yellow}, 0.8) 0%,
      ${colors.yellow} 100%
    );
    padding: ${spacing.large};

    @media (min-width: ${mobile.width}) {
      grid-column: 1 / span 2;
      grid-row: 1 / span 1;
      height: ${height.header};
      padding: ${spacing.large} ${spacing.large} 0 ${spacing.large};
    }
  `,
  header: css`
    display: inline-block;
    color: ${colors.gray};
    font-size: 2rem;
    margin: 0;
    padding: 0;
    text-shadow: 0px 0px 1px ${colors.yellow};

    @media (min-width: ${mobile.width}) {
      font-size: 6rem;
      transition: all 0.2s ease;
      transform: translateY(-${spacing.large});
      z-index: 2;

      &:hover {
        transform: translateY(0px);
      }
    }
  `,
  subheader: css`
    position: absolute;
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${colors.gray};
    z-index: 1;
  `,
};

export default styles;
