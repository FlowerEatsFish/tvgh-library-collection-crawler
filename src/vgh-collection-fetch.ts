/**
 * To fetch data via tghtpe.ent.sirsidynix.net.
 */

import axios from "axios";

export interface FetchResult {
  data: string | null;
  url: string | null;
}

const setKeywordToInsertUrl = (keyword: string): string => {
  // To remove special characters
  let temp: string = keyword.replace(/[~!@#$%^&*()_+\-=}{[\]|"':;?/.,<>}\\]/gi, " ");
  // To remove two or more consequent spaces
  temp = temp.replace(/\s+/, " ");
  // To remove the ending of spaces
  temp = temp.trimRight();

  return encodeURI(temp);
};

const setPageToInsertUrl = (page: number): number => (page - 1) * 12;

const setLibraryToInsertUrl = (library: string): string => {
  return library ? `&lm=${library}` : "";
};

const setUrl = (keyword: string, page: number, library: string): string => {
  const tempKeyword = setKeywordToInsertUrl(keyword);
  const tempPage = setPageToInsertUrl(page);
  const tempLibrary = setLibraryToInsertUrl(library);

  return `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=${tempKeyword}&rw=${tempPage}${tempLibrary}`;
};

const fetchFullHtmlCode = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get<string>(url);

    return response.data;
  } catch (error) {
    return null;
  }
};

const setUrlFollowParameter = (
  url: string | null,
  keyword: string | null,
  page: number | null,
  library: string | null,
): string | null => {
  if (url) {
    return url;
  }
  if (keyword && page && library) {
    return setUrl(keyword, page, library);
  }
  return null;
};

export const collectionFetch = async (
  url: string | null,
  keyword: string | null = null,
  page: number | null = null,
  library: string | null = null,
): Promise<FetchResult> => {
  const fullUrl = setUrlFollowParameter(url, keyword, page, library);

  return { data: fullUrl ? await fetchFullHtmlCode(fullUrl) : null, url: fullUrl };
};
