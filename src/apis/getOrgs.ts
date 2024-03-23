import { request } from "./utils";

export const getOrgs = async (query: string) => {
  return await request(
    `/search/users?q=${encodeURIComponent(`${query} type:org`)}`
  );
};
