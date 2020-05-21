import codepen from "./codepen.js";

export const title = "JameScript.com";

export const sections = [
  {
    id: 0,
    name: "Home",
    iconClass: "fas fa-home",
    color: "green",
    description: `Welcome to JameScript.com, the Code Home, or "Chome" as it were, of me, <a href="https://eljamez.com">James Augustus Hall</a>. I\'m primarily a Front End Engineer and these are my personal projects. I hope you find something useful, fun, and / or interesing.`,
    technical: `The site you are now vi
    ewing is hosted via <a href="https://pages.github.com/">GitHub Pages</a> and build using <a href="https://emotion.sh/">Emotion</a> and <a href="https://svelte.dev/">Svelte</a>, with help from <a href="https://fontawesome.com/">Font Awesome</a> and <a href="https://fonts.google.com/">Google Fonts</a>`,
  },
  {
    id: 1,
    name: "Repos",
    iconClass: "fab fa-github",
    color: "blue",
    link: "https://github.com/eljamez/",
    projects: [
      {
        name: "js-package-generator",
        description:
          "Generate a (vanilla) JS package with this easy-to-use command line tool. Just run `npx js-package-generator`",
        url: "https://www.jamescript.com/js-package-generator/",
        iconClass: "fas fa-tools",
      },
      {
        name: "React Keyboard",
        description: "A piano keyboard React component w/ musical typing.",
        url: "https://www.jamescript.com/React-Keyboard/",
        iconClass: "fas fa-music",
      },
      {
        name: "Vanilla JS Library Boilerplate",
        description: "A starting place to create a JavaScript library",
        url: "http://www.jamescript.com/Vanilla-JS-Library-Boilerplate/",
        iconClass: "fab fa-js",
      },
    ],
  },
  {
    id: 2,
    name: "NPM",
    iconClass: "fab fa-npm",
    color: "red",
    link: "https://www.npmjs.com/~eljamez",
    projects: [
      {
        name: "js-package-generator",
        description:
          "Generate a (vanilla) JS package with this easy-to-use command line tool. Just run `npx js-package-generator`",
        url: "https://www.npmjs.com/package/js-package-generator/",
        iconClass: "fas fa-tools",
      },
      {
        name: "React Keyboard",
        description: "A piano keyboard React component w/ musical typing.",
        url: "https://www.npmjs.com/package/react-keyboard-component",
        iconClass: "fas fa-music",
      },
    ],
  },
  {
    id: 3,
    name: "CodePen",
    iconClass: "fab fa-codepen",
    color: "purple",
    link: "https://codepen.io/eljamez",
    projects: codepen,
  },
];

export const copy = {
  header: "JameScript.com",
  subheader: "JavaScript / CSS and more by James Augustus Hall",
};

export const links = [
  {
    name: "eljamez",
    url: "https://eljamez.com",
    iconClass: "fas fa-laptop-house",
  },
  {
    name: "twitter",
    url: "https://twitter.com/eljamez",
    iconClass: "fab fa-twitter",
  },
  {
    name: "ensly mogul",
    url: "https://enslymogul.com",
    iconClass: "fas fa-music",
  },
  {
    name: "soundcloud",
    url: "https://soundcloud.com/eljamez",
    iconClass: "fab fa-soundcloud",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/eljamez/",
    iconClass: "fab fa-linkedin-in",
  },
  {
    name: "spotify",
    url:
      "https://open.spotify.com/playlist/4yQ0U5YrMbK2IKqFYT0O0n?si=O3f7zQ1gR5-99SbRLrwNXQ",
    iconClass: "fab fa-spotify",
  },
];
