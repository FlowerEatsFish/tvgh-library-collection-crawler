/**
 * To parse the results when the fetcher got one data.
 */

import { CollectionType, DetailType } from "../index";

const removeHtmlTag = (htmlCode: string): string => {
  // To remove HTML tag
  let result = htmlCode.replace(/<[^>]*>/gi, "");
  // To remove newline tag
  result = result.replace(/\n/gi, "");
  // To remove two or more consequent spaces
  result = result.replace(/\s+/gi, " ");
  // To remove the ending of spaces
  result = result.trimRight();

  return result;
};

const getCollection = (htmlCode: string): CollectionType => {
  const result = htmlCode.match(/<td>[\w\W]*?<\/td>/gi);

  if (result) {
    if (result.length === 6) {
      return {
        library: removeHtmlTag(result[0]),
        data_type: removeHtmlTag(result[1]),
        special_number: removeHtmlTag(result[2]),
        barcode: removeHtmlTag(result[3]),
        call_number: removeHtmlTag(result[4]),
        is_flow: true,
        status: removeHtmlTag(result[5]),
      };
    }
    if (result.length === 4) {
      return {
        library: removeHtmlTag(result[0]),
        data_type: null,
        special_number: null,
        barcode: null,
        call_number: removeHtmlTag(result[2]),
        is_flow: false,
        status: removeHtmlTag(result[1]),
      };
    }
  }

  return {
    library: null,
    data_type: null,
    special_number: null,
    barcode: null,
    call_number: null,
    is_flow: false,
    status: null,
  };
};

const getAllCollection = (htmlCode: string): CollectionType[] | null => {
  const result = htmlCode.match(/<tr class="detailItemsTableRow ">[\w\W]*?<\/tr>/gi);

  if (result) {
    return result.map((value): CollectionType => getCollection(value));
  }

  return null;
};

const getInfoByTag = (htmlCode: string, tag: string): string | null => {
  const newRegExp = new RegExp(`<div class="displayElementText ${tag}">([\\w\\W]*?)</div>`, "gi");
  const result = htmlCode.match(newRegExp);

  return result ? result[0].replace(newRegExp, "$1") : null;
};

export const itemParser = (htmlCode: string, url: string | null): DetailType => {
  return {
    title: getInfoByTag(htmlCode, "INITIAL_TITLE_SRCH"),
    author: getInfoByTag(htmlCode, "INITIAL_AUTHOR_SRCH"),
    isbn: getInfoByTag(htmlCode, "ISBN"),
    issn: getInfoByTag(htmlCode, "ISSN"),
    edition: getInfoByTag(htmlCode, "EDITION"),
    pub_year: getInfoByTag(htmlCode, "PUBDATE_YEAR"),
    pub_place: getInfoByTag(htmlCode, "PUBPLACE"),
    pub_info: getInfoByTag(htmlCode, "PUBLICATION_INFO"),
    shape: getInfoByTag(htmlCode, "PHYSICAL_DESC"),
    collection: getAllCollection(htmlCode),
    url,
  };
};
