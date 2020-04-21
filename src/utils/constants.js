export const sections = [
  {
    id: 0,
    name: "Home",
    iconClass: "fas fa-home",
    color: "yellow",
  },
  {
    id: 1,
    name: "Repos",
    iconClass: "fab fa-github",
    color: "blue",
    projects: [
      {
        name: "React Keyboard 🎹",
        description: "A piano keyboard React component w/ musical typing.",
        url: "https://www.jamescript.com/React-Keyboard/",
        iconClass: "fa-music",
      },
      {
        name: "Vanilla JS Library Boilerplate",
        description: "A starting place to create a JavaScript library",
        url: "http://www.jamescript.com/Vanilla-JS-Library-Boilerplate/",
      },
    ],
  },
  {
    id: 2,
    name: "NPM",
    iconClass: "fab fa-npm",
    color: "red",
    projects: [
      {
        name: "React Keyboard 🎹",
        description: "A piano keyboard React component w/ musical typing.",
        url: "https://www.npmjs.com/package/react-keyboard-component",
      },
    ],
  },
  {
    id: 3,
    name: "CodePen",
    iconClass: "fab fa-codepen",
    color: "purple",
    projects: [
      {
        id: 1,
        name: "Place those Buttons!",
        description: "Just a fun experiment to place dots on a screen",
        url: "https://codepen.io/eljamez/pen/OJPMQbV",
        penUrl: "https://codepen.io/eljamez/pen/OJPMQbV",
        embed: `<iframe height="265" style="width: 100%;" scrolling="no" title="Place those Buttons!" src="https://codepen.io/eljamez/embed/OJPMQbV?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
        See the Pen <a href='https://codepen.io/eljamez/pen/OJPMQbV'>Place those Buttons!</a> by James Hall
        (<a href='https://codepen.io/eljamez'>@eljamez</a>) on <a href='https://codepen.io'>CodePen</a>.
      </iframe>`,
      },
      {
        id: 2,
        embed: `<iframe height="265" style="width: 100%;" scrolling="no" title="Bendo" src="https://codepen.io/eljamez/embed/byVojv?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
        See the Pen <a href='https://codepen.io/eljamez/pen/byVojv'>Bendo</a> by James Hall
        (<a href='https://codepen.io/eljamez'>@eljamez</a>) on <a href='https://codepen.io'>CodePen</a>.
      </iframe>`,
      },
    ],
  },
];

export const copy = {
  header: "JameScript.com",
  subheader: "JavaScript / CSS and more by James Augustus Hall",
};

export const cssConstants = {
  mobileWidth: "420px",
  headerHeightMobile: "40px",
  headerHeight: "80px",
  spSmall: "8px",
  spMid: "16px",
  spLarge: "24px",
  spXLarge: "32px",
  yellowVals: "240, 219, 79",
  yellow: `rgb(240, 219, 79)`,
  gray: "rgb(50, 51, 48)",
};
