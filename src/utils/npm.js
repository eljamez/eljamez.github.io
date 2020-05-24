const npmjs_api_url = `https://api.npms.io/v2/search?q=author:eljamez`;

const npm = async () => {
  let response = await fetch(npmjs_api_url);
  let data = await response.json();
  return data.results.reduce((acc, curr) => {
    acc = [
      ...acc,
      {
        name: curr.package.name,
        description: curr.package.description,
        url: curr.package.links.npm,
      },
    ];
    return acc;
  }, []);
};

export default npm;
