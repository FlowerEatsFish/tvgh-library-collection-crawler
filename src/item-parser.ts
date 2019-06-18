/**
 * To parse the results when the fetcher got one data.
 */

export interface DetailType {
  title: string;
  author: string | null;
  isbn: string | null;
  edition: string | null;
  pub_year: string | null;
  pub_place: string | null;
  pub_info: string | null;
  issn: string | null;
  shape: string | null;
  collection: CollectionType[] | null;
}

interface CollectionType {
  library: string | null;
  data_type: string | null;
  special_number: string | null;
  barcode: string | null;
  call_number: string | null;
  is_flow: boolean;
  status: string | null;
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

const getCollection: Function = (htmlCode: string): CollectionType => {
  const result: string[] | null = htmlCode.match(/<td>[\w\W]*?<\/td>/gi);

  if (result != null) {
    if (result.length === 6) {
      return ({
        library: removeHtmlTag(result[0]),
        data_type: removeHtmlTag(result[1]),
        special_number: removeHtmlTag(result[2]),
        barcode: removeHtmlTag(result[3]),
        call_number: removeHtmlTag(result[4]),
        is_flow: true,
        status: removeHtmlTag(result[5])
      });
    } else if (result.length === 4) {
      return ({
        library: removeHtmlTag(result[0]),
        data_type: null,
        special_number: null,
        barcode: null,
        call_number: removeHtmlTag(result[2]),
        is_flow: false,
        status: removeHtmlTag(result[1])
      });
    }
  }

  return ({
    library: null,
    data_type: null,
    special_number: null,
    barcode: null,
    call_number: null,
    is_flow: false,
    status: null
  });
};

const getAllCollection: Function = async (htmlCode: string): Promise<CollectionType[]|null> => {
  const result: string[] | null = htmlCode.match(/<tr class="detailItemsTableRow ">[\w\W]*?<\/tr>/gi);
  if (result != null) {
    const statusList: CollectionType[] = await Promise.all(result.map((value: string): CollectionType => getCollection(value)));

    return statusList;
  }

  return null;
};

const getInfoByTag: Function = (htmlCode: string, tag: string): string|null => {
  const newRegExp: RegExp = new RegExp(`<div class="displayElementText ${tag}">([\\w\\W]*?)</div>`, 'gi');
  const result: string[] | null = htmlCode.match(newRegExp);
  if (result != null) {
    return result[0].replace(newRegExp, '$1');
  }

  return null;
};

export const itemParser: Function = async (htmlCode: string): Promise<DetailType> => ({
  title: getInfoByTag(htmlCode, 'INITIAL_TITLE_SRCH'),
  author: getInfoByTag(htmlCode, 'INITIAL_AUTHOR_SRCH'),
  isbn: getInfoByTag(htmlCode, 'ISBN'),
  issn: getInfoByTag(htmlCode, 'ISSN'),
  edition: getInfoByTag(htmlCode, 'EDITION'),
  pub_year: getInfoByTag(htmlCode, 'PUBDATE_YEAR'),
  pub_place: getInfoByTag(htmlCode, 'PUBPLACE'),
  pub_info: getInfoByTag(htmlCode, 'PUBLICATION_INFO'),
  shape: getInfoByTag(htmlCode, 'PHYSICAL_DESC'),
  collection: await getAllCollection(htmlCode)
});
