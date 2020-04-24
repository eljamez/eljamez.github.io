import emotion from "emotion/dist/emotion.umd.min.js";
import { height, tablet, mobile, spacing, mixins } from "./shared";

const { css } = emotion;

const styles = {
  content: css`
    ${mixins.transition};
    box-sizing: border-box;
    padding-top: ${spacing.small};

    @media (min-width: ${mobile.width}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      justify-self: stretch;
      padding-top: ${tablet.height.header};
      overflow-y: scroll;
      position: relative;
    }

    @media (min-width: ${tablet.width}) {
      padding-top: ${height.header};
    }
  `,
};

export default styles;
