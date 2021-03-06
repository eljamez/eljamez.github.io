export const mobile = {
  width: "620px",
  height: {
    header: "36px",
  },
};

export const tablet = {
  width: "870px",
  sidebar: "140px",
  height: {
    header: "58px",
  },
};

export const height = {
  header: "80px",
  footer: "100px",
};

export const width = {
  sidebar: "200px",
};

// spacing
export const spacing = {
  xSmall: "6px",
  small: "10px",
  mid: "20px",
  large: "30px",
  xLarge: "40px",
};

// rgb
export const rgb = {
  yellow: "240, 219, 79",
  gray: "50, 51, 48",
  blue: "3, 102, 214",
  red: "196, 11, 10",
  green: "71, 139, 66",
  purple: "174, 99, 228",
};

// colors
export const colors = {
  yellow: `rgb(${rgb.yellow})`,
  gray: `rgb(${rgb.gray})`,
  blue: `rgb(${rgb.blue})`,
  red: `rgb(${rgb.red})`,
  green: `rgb(${rgb.green})`,
  purple: `rgb(${rgb.purple})`,
};

export const mixins = {
  textShadow: `text-shadow: 0 1px 1px ${colors.gray}`,
  headerFont: `font-family: 'Staatliches', cursive`,
  transition: "transition: all .2s ease",
};
