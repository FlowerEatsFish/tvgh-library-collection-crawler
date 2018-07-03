/**
 * To parse the results when the fetcher got one data.
 */

export interface IDetailType {
  title: string;
  author: string;
  isbn: string;
  edition: string;
  pub_year: string;
  pub_place: string;
  pub_info: string;
  shape: string;
  collection: object[]|null;
}

interface ICollectionType {
  library: string;
  data_type: string;
  special_number: string;
  barcode: string;
  call_number: string;
  status: string;
}

const removeHtmlTag: Function = (htmlCode: string): string => {
  // To remove HTML tag
  let result: string = htmlCode.replace(/<[^>]*>/gi, '');
  // To remove newline tag
  result = result.replace(/\n/gi, '');
  // To remove two or more consequent spaces
  result = result.replace(/\s+/gi, ' ');
  // To remove last space
  result = result.replace(/\s+$/, '');

  return result;
};

const getCollection: Function = (htmlCode: string): ICollectionType => {
  const result: string[] = htmlCode.match(/<td>[\w\W]*?<\/td>/gi);

  return ({
    library: removeHtmlTag(result[0]),
    data_type: removeHtmlTag(result[1]),
    special_number: removeHtmlTag(result[2]),
    barcode: removeHtmlTag(result[3]),
    call_number: removeHtmlTag(result[4]),
    status: removeHtmlTag(result[5])
  });
};

const getAllCollection: Function = async (htmlCode: string) : Promise<object[]|null> => {
  const result: string[] = htmlCode.match(/<tr class="detailItemsTableRow ">[\w\W]*?<\/tr>/gi);
  if (result !== null) {
    // tslint:disable-next-line:no-unnecessary-local-variable
    const statusList: object[] = await Promise.all(result.map((value: string): object => getCollection(value)));

    return statusList;
  }

  return null;
};

const getInfoByTag: Function = (htmlCode: string, tag: string): string|null => {
  const newRegExp: RegExp = new RegExp(`<div class="displayElementText ${tag}">([\\w\\W]*?)</div>`, 'gi');
  const result: string[] = htmlCode.match(newRegExp);
  if (result !== null) {

    return result[0].replace(newRegExp, '$1');
  }

  return null;
};

export const itemParser: Function = async (htmlCode: string): Promise<IDetailType> => ({
  title: getInfoByTag(htmlCode, 'INITIAL_TITLE_SRCH'),
  author: getInfoByTag(htmlCode, 'INITIAL_AUTHOR_SRCH'),
  isbn: getInfoByTag(htmlCode, 'ISBN'),
  edition: getInfoByTag(htmlCode, 'EDITION'),
  pub_year: getInfoByTag(htmlCode, 'PUBDATE_YEAR'),
  pub_place: getInfoByTag(htmlCode, 'PUBPLACE'),
  pub_info: getInfoByTag(htmlCode, 'PUBLICATION_INFO'),
  shape: getInfoByTag(htmlCode, 'PHYSICAL_DESC'),
  collection: await getAllCollection(htmlCode)
});
