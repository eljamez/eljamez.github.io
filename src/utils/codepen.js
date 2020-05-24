const RSS_URL = `https://codepen.io/collection/XEovPJ/feed/`;

let codepen = [];

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    items.forEach((el) => {
      const pen = {
        name: el.querySelector("title").innerHTML,
        url: el.querySelector("link").innerHTML,
        image: `${el.querySelector("link").innerHTML}/image/thumb.png`,
      };
      codepen.push(pen);
    });
  });

export default codepen;
