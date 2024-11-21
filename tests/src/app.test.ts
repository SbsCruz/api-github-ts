import { getNoHRepos, getTopRepos } from "../../src/app";

const {
  repoMock,
  repoMockNoH,
  repoMockOrderdedByStars,
  repoMockWithH
} = require("../mocks/repoMock");

describe("getNoHRepos function...", () => {
  it("should not return the repo that starts with h", () => {
    expect(getNoHRepos(repoMock)).toStrictEqual(repoMockNoH);
  });

  it("should should return an empty array when all repos starts with h or H", () => {
    expect(getNoHRepos(repoMockWithH)).toStrictEqual([]);
  });
  it("should return an empty array when an empty array is passed", () => {
    expect(getNoHRepos([])).toStrictEqual([]);
  });
});

describe("getTopRepos function...", () => {
  it("should return an ordered array based on the stargazers_count", () => {
    expect(getTopRepos(repoMock)).toStrictEqual(repoMockOrderdedByStars);
  });
  it('should return an empty array when an empty array is passed', () => {
    expect(getTopRepos([])).toStrictEqual([]);
  });
});
