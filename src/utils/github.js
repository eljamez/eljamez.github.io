const github_api_url = `https://api.github.com/users/eljamez/repos`;

const github = async () => {
  let response = await fetch(github_api_url);
  let data = await response.json();
  return data.reduce((acc, curr) => {
    if (!curr.private) {
      acc = [
        ...acc,
        {
          name: curr.name,
          description: curr.description,
          url: curr.homepage || curr.html_url,
          image: curr.owner.avatar_url,
        },
      ];
      return acc;
    }
  }, []);
};

export default github;
