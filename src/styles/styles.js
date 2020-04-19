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

export const headerContainer = css`
  box-shadow: 0 0 5px 0 ${gray};
  background: linear-gradient(
    0deg,
    rgba(${yellowVals}, 0.8) 0%,
    ${yellow} 100%
  );
  padding: ${spLarge};

  @media (min-width: ${mobileWidth}) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    height: ${headerHeight};
    padding: ${spLarge} ${spLarge} 0 ${spLarge};
  }
`;

export const header = css`
  display: inline-block;
  color: ${gray};
  font-size: 2rem;
  margin: 0;
  padding: 0;
  text-shadow: 0px 0px 1px ${yellow};

  @media (min-width: ${mobileWidth}) {
    font-size: 6rem;
    transition: all 0.2s ease;
    transform: translateY(-${spLarge});
    z-index: 2;

    &:hover {
      transform: translateY(0px);
    }
  }
`;

export const subheader = css`
  position: absolute;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${gray};
  z-index: 1;
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
