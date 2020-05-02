/**
 * Main control for this library.
 */

import { TvghLibraryCollectionFunction, DetailType } from "../index";
import { itemListParser } from "./item-list-parser";
import { itemParser } from "./item-parser";
import { collectionFetch } from "./vgh-collection-fetch";

const libraryList = [
  "VGHTPE", // 臺北總院
  "GANDAU", // 關渡分院
  "FLVH", // 鳳林分院
  "SAVH", // 蘇澳分院
  "TYVH", // 桃園分院
  "VHCT", // 新竹分院
  "VHTT", // 臺東分院
  "VHYL", // 玉里分院
  "YSVH", // 員山分院
];

const isItemListResult = (htmlCode: string): boolean => {
  return htmlCode.includes('class="displayDetailLink"');
};

const isItemResult = (htmlCode: string): boolean => {
  return htmlCode.includes('class="detail_main_wrapper"');
};

const getItemDetail = async (url: string | null): Promise<DetailType> => {
  const htmlCodeAfterFetch = await collectionFetch(url);
  const itemDetail = itemParser(htmlCodeAfterFetch.data || "", url);

  return itemDetail;
};

const tvghLibraryCollection: TvghLibraryCollectionFunction = async (
  keyword: string,
  page: number = 1,
  libraryNumbering: number = 0,
): Promise<DetailType | DetailType[] | null> => {
  const htmlCodeAfterFetch = await collectionFetch(
    null,
    keyword,
    page,
    libraryList[libraryNumbering],
  );
  if (!htmlCodeAfterFetch || !htmlCodeAfterFetch.data) {
    return null;
  }

  // To check where the HTML code is from and do next step
  if (isItemListResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code contains two or more results
    const itemList = itemListParser(htmlCodeAfterFetch.data) || [];
    const itemListWithDetail = await Promise.all(
      itemList.map((value): Promise<DetailType> => getItemDetail(value.url)),
    );

    return itemListWithDetail;
  }
  if (isItemResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code only contains one result
    const itemWithDetail = itemParser(htmlCodeAfterFetch.data, htmlCodeAfterFetch.url);

    return itemWithDetail;
  }

  // To do here if no result is got from the HTML code
  return null;
};

export default tvghLibraryCollection;
