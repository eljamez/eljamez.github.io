import emotion from "emotion/dist/emotion.umd.min.js";
import { mobile, tablet, height, mixins } from "./shared";

const { css } = emotion;

const styles = {
  sidebar: css`
    ${mixins.transition};
    box-sizing: border-box;
    background-image: url("../../public/bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;
    padding-top: ${mobile.height.header};

    @media (min-width: ${mobile.width}) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      padding-top: ${tablet.height.header};
    }

    @media (min-width: ${tablet.width}) {
      padding-top: ${height.header};
    }
  `,
};

export default styles;
