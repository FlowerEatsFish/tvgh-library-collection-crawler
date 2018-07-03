/**
 * TO fetch data via tghtpe.ent.sirsidynix.net.
 */

import axios, { AxiosError, AxiosResponse } from 'axios';

export interface IFetchResult {
  data: string;
  url: string;
}

const setKeywordToInsertUrl: Function = (keyword: string): string => {
  // To remove special characters
  let temp: string = keyword.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\}\{\[\]\|\"\'\:\;\?\/\.\,\<\>\}\\]/gi, ' ');
  // To remove two or more consequent spaces
  temp = temp.replace(/\s+/, ' ');
  // To remove last space
  temp = temp.replace(/\s+$/, '');

  return encodeURI(temp);
};

const setPageToInsertUrl: Function = (page: number): number => (page - 1) * 12;

const setLibraryToInserUrl: Function = (library: string): string => {
  if (library !== null) {

    return `&lm=${library}`;
  }

  return '';
};

const setUrl: Function = (keyword: string, page: number, library: string): string => {
  const tempKeyword: string = setKeywordToInsertUrl(keyword);
  const tempPage: number = setPageToInsertUrl(page);
  const tempLibrary: string = setLibraryToInserUrl(library);

  return `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=${tempKeyword}&rw=${tempPage}${tempLibrary}`;
};

const fetchFullHtmlCode: Function = (url: string): Promise<string> => {
  return new Promise((resolve: (data: string) => void, reject: (error: AxiosError) => void): void => {
    axios.get(url)
      .then((response: AxiosResponse) => resolve(response.data))
      .catch((error: AxiosError) => reject(error));
  });
};

const setUrlFollowParameter: Function = async (url: string, keyword: string, page: number, library: string): Promise<string> => {
  if (url) {
    return url;
  }
  // tslint:disable-next-line:no-unnecessary-local-variable
  const combineUrl: string = await setUrl(keyword, page, library);

  return combineUrl;
};

export const collectionFetch: Function = async (url: string, keyword: string = null, page: number = null, library: string = null): Promise<IFetchResult> => {
  const fullUrl: string = await setUrlFollowParameter(url, keyword, page, library);
  const data: string = await fetchFullHtmlCode(fullUrl);

  return { data: data, url: fullUrl };
};
