import { Repo } from "./interfaces/index";

const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

const callApiService = (): Promise<Repo[]> => {
  return fetch(API_URL)
    .then((response) => response.json())
    .catch((error) => alert(error));
};

const filterRepoByStars = (starsNumber: number, repoList: Repo[]) => {
  if (repoList.length === 0) {
    return repoList;
  }
  return repoList.filter(({ stargazers_count }) => {
    return stargazers_count > starsNumber;
  });
};

const showRepoInfo = (repoList: Repo[]) => {
  const stars = document.getElementById("stars");
  repoList.map(({ name, stargazers_count, html_url }) => {
    const repoEl = document.createElement("li");
    repoEl.innerHTML = `
    <a href="${html_url}">
    ${name}
    </a>
    tiene ${stargazers_count} estrellas `;
    stars?.appendChild(repoEl);
  });
};

const filterRepoDates = (repos: Repo[] ) => {
  return repos
    .sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    })
    .slice(0, 5);
};

// hapistrano, dotenv, atomic, openssh, inflections
// twitter, atomic, dotenv, dbcleaner, openssh

const showLastReposUpdated = (repos: Repo[]) => {
  const updated = document.getElementById("updated");
  repos.map(({ name, updated_at, html_url }) => {
    const dateEl = document.createElement("li");
    dateEl.innerHTML = `
    <a href="${html_url}"> 
    ${name}  
    </a>
    fue actualizado el ${updated_at.toString().split("-")[1]} - ${
      updated_at.toString().split("-")[0]
    } `;
    updated?.appendChild(dateEl);
  });
};

const getRepoStarsCount = (repos: Repo[]) => {
  let starsCount = 0;
  repos.map((repo) => {
    starsCount += repo.stargazers_count;
  });
  return starsCount;
};

const showAllRepoStars = (starsCount: number) => {
  const allStars = document.getElementById("allStars");
  const totalStars = document.createElement("p");
  totalStars.innerHTML = `
  StackBuilders tiene un total de
  <h2>${starsCount}</h2>
  estrellas
  `;
  allStars?.appendChild(totalStars);
};

const getRepoStars = () => {
  callApiService().then((repos) => {
    showRepoInfo(filterRepoByStars(5, repos));
  });
};

const getRepoLastUpdated = () => {
  callApiService().then((repos) => {
    showLastReposUpdated(filterRepoDates(repos));
  });
};
const getAllStars = () => {
  callApiService().then((repos) => {
    showAllRepoStars(getRepoStarsCount(repos));
  });
};

getRepoStars();
getRepoLastUpdated();
getAllStars();

// module.exports = {
//   filterRepoByStars,
//   filterRepoDates,
//   getRepoStarsCount,
// };

