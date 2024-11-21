const API_URL = "https://api.github.com/orgs/stackbuilders/repos";
// API CALL
const callApiService = () => {
    return fetch(API_URL)
        .then((response) => response.json())
        .catch((error) => alert(error));
};
// MORE THAN 5 STARS
const filterRepoByStars = (starsNumber, repoList) => {
    if (repoList.length === 0) {
        return repoList;
    }
    return repoList.filter(({ stargazers_count }) => {
        return stargazers_count > starsNumber;
    });
};
const showRepoFiveStars = (repoList, htmlEl) => {
    const ele = document.getElementById(htmlEl);
    repoList.map(({ name, stargazers_count, html_url }) => {
        const repoEl = document.createElement("li");
        repoEl.innerHTML = `
    <a href="${html_url}">
    ${name}
    </a> - ${stargazers_count}`;
        ele === null || ele === void 0 ? void 0 : ele.appendChild(repoEl);
    });
};
// MOST RECENT UPDATED REPOS
const filterRepoByDates = (repos) => {
    return repos
        .sort((a, b) => {
        return (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    })
        .slice(0, 5);
};
const showLastUpdatedRepos = (repos) => {
    const updated = document.getElementById("updated");
    repos.map(({ name, updated_at, html_url }) => {
        const dateEl = document.createElement("li");
        dateEl.innerHTML = `
    <a href="${html_url}"> 
    ${name}  
    </a>
    <br/> ${updated_at.toString().split("-")[1]} - ${updated_at.toString().split("-")[0]} `;
        updated === null || updated === void 0 ? void 0 : updated.appendChild(dateEl);
    });
};
// ALL STARS COUNT
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
// TOP STARS REPO
const getTopRepos = (repoList) => {
    const topRepo = filterRepoByStars(1, repoList);
    return topRepo
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);
};
// for displaying in HTML we use the showRepoFiveStar function
// NO-H REPOS
const getNoHRepos = (repoList) => {
    const regH = new RegExp('^[Hh]');
    return repoList.filter(({ name }) => {
        return !regH.test(name[0]);
    });
};
const showNoHRepos = (repoList) => {
    const htmlEl = document.getElementById("noH");
    repoList.map(({ name }) => {
        const repoName = document.createElement("li");
        repoName.innerHTML = name;
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.appendChild(repoName);
    });
};
// GENERAL FUNCTIONS
const getRepoStars = () => {
    callApiService().then((repos) => {
        showRepoFiveStars(filterRepoByStars(5, repos), "stars");
    });
};
const getRepoLastUpdated = () => {
    callApiService().then((repos) => {
        showLastUpdatedRepos(filterRepoByDates(repos));
    });
};
const getAllStars = () => {
    callApiService().then((repos) => {
        showAllRepoStars(getRepoStarsCount(repos));
    });
};
const getTopFiveRepo = () => {
    callApiService().then((repos) => {
        showRepoFiveStars(getTopRepos(repos), "topFive");
    });
};
const getReposWithoutH = () => {
    callApiService().then((repos) => {
        showNoHRepos(getNoHRepos(repos));
    });
};
// FUNCTION CALLS
getRepoStars();
getRepoLastUpdated();
getAllStars();
getTopFiveRepo();
getReposWithoutH();
export { getNoHRepos, getTopRepos };
