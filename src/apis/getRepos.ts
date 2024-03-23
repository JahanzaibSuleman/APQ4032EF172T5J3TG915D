import { request } from "./utils";

export const getRepos = async (
  query: string,
  orgName: string,
  page: number
) => {
  return await request(
    `/search/repositories?q=${encodeURIComponent(
      `${query} org:${orgName}`
    )}&page=${page}&per_page=10`
  );
};
