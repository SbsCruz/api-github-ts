const API_URL = "https://api.github.com/orgs/stackbuilders/repos";
const callApiService = () => {
    return fetch(API_URL)
        .then((response) => response.json())
        .catch((error) => alert(error));
};
const filterRepoByStars = (starsNumber, repoList) => {
    if (repoList.length === 0) {
        return repoList;
    }
    return repoList.filter(({ stargazers_count }) => {
        return stargazers_count > starsNumber;
    });
};
const showRepoInfo = (repoList) => {
    const stars = document.getElementById("stars");
    repoList.map(({ name, stargazers_count, html_url }) => {
        const repoEl = document.createElement("li");
        repoEl.innerHTML = `
    <a href="${html_url}">
    ${name}
    </a>
    tiene ${stargazers_count} estrellas `;
        stars === null || stars === void 0 ? void 0 : stars.appendChild(repoEl);
    });
};
const filterRepoDates = (repos) => {
    return repos
        .sort((a, b) => {
        return (new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime());
    })
        .slice(0, 5);
};
// hapistrano, dotenv, atomic, openssh, inflections
// twitter, atomic, dotenv, dbcleaner, openssh
const showLastReposUpdated = (repos) => {
    const updated = document.getElementById("updated");
    repos.map(({ name, updated_at, html_url }) => {
        const dateEl = document.createElement("li");
        dateEl.innerHTML = `
    <a href="${html_url}"> 
    ${name}  
    </a>
    fue actualizado el ${updated_at.toString().split("-")[1]} - ${updated_at.toString().split("-")[0]} `;
        updated === null || updated === void 0 ? void 0 : updated.appendChild(dateEl);
    });
};
const getRepoStarsCount = (repos) => {
    let starsCount = 0;
    repos.map((repo) => {
        starsCount += repo.stargazers_count;
    });
    return starsCount;
};
const showAllRepoStars = (starsCount) => {
    const allStars = document.getElementById("allStars");
    const totalStars = document.createElement("p");
    totalStars.innerHTML = `
  StackBuilders tiene un total de
  <h2>${starsCount}</h2>
  estrellas
  `;
    allStars === null || allStars === void 0 ? void 0 : allStars.appendChild(totalStars);
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
export {};
// module.exports = {
//   filterRepoByStars,
//   filterRepoDates,
//   getRepoStarsCount,
// };
