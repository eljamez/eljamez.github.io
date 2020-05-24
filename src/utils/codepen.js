const RSS_URL = `https://codepen.io/collection/XEovPJ/feed/`;

let codepen = [];

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    items.forEach((el) => {
      const description = el
        .querySelector("description")
        .innerHTML.split("<p>")[3]
        .split("</p>")[0]
        .trim();
      const pen = {
        name: el.querySelector("title").innerHTML,
        url: el.querySelector("link").innerHTML,
        image: `${el.querySelector("link").innerHTML}/image/thumb.png`,
        description: description.length
          ? description
          : "A Cool JameScript™ CodePen",
      };
      codepen.push(pen);
    });
  });

export default codepen;
