import Axios from "axios";

interface dataType {
  data: string,
  url: string,
};

const setKeywordToInsertUrl = (keyword: string): string => {
  // To remove special characters
  let temp: string = keyword.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\}\{\[\]\|\"\'\:\;\?\/\.\,\<\>\}\\]/gi, " ");
  // To remove two or more consequent spaces
  temp = temp.replace(/\s+/, " ");
  // To remove last space
  temp = temp.replace(/\s+$/, "");
  return encodeURI(temp);
};

const setPageToInsertUrl = (page: number): number => (page - 1) * 12;

const setLibraryToInserUrl = (library: string): string => {
  if (library !== null) {
    return `&lm=${library}`;
  }
  return "";
};

const setUrl = (keyword: string, page: number, library: string): string => {
  const tempKeyword: string = setKeywordToInsertUrl(keyword);
  const tempPage: number = setPageToInsertUrl(page);
  const tempLibrary: string = setLibraryToInserUrl(library);
  const url: string = `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=${tempKeyword}&rw=${tempPage}${tempLibrary}`;
  return url;
};

const fetchFullHtmlCode = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    Axios.get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  })
}

const buildData = async (url: string, keyword: string = null, page: number = null, library: string = null): Promise<dataType> => {
  let tempUrl = "";
  if (url) {
    tempUrl = url;
  } else {
    tempUrl = await setUrl(keyword, page, library);
  }
  const data: string = await fetchFullHtmlCode(tempUrl);
  return { data: data, url: tempUrl };
};

export default buildData;
