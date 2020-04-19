import emotion from "emotion/dist/emotion.umd.min.js";

const { css } = emotion;

const mobileWidth = "420px";
const headerHeightMobile = "40px";
const headerHeight = "104px";

// spacing
const spSmall = "8px";
const spMid = "16px";
const spLarge = "24px";
const spXLarge = "32px";

// colors
const yellowVals = "240, 219, 79";
const yellow = `rgb(${yellowVals})`;
const gray = "rgb(50, 51, 48)";

export const container = css`
  @media (min-width: ${mobileWidth}) {
    display: grid;
    grid-template-columns: 200px auto;
    grid-template-rows: ${headerHeight + spLarge} auto ${spLarge};
  }
`;

export const content = css`
  padding: ${spMid} ${spLarge};

  @media (min-width: ${mobileWidth}) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
`;

export const footer = css`
  padding: ${spSmall} ${spLarge};
  @media (min-width: ${mobileWidth}) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
  }
`;
