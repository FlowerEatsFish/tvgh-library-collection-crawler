/**
 * Main control for this library.
 */

import { TvghLibraryCollectionFunction, DetailType } from '../index';
import { ItemType, itemListParser } from './item-list-parser';
import { itemParser } from './item-parser';
import { collectionFetch, FetchResult } from './vgh-collection-fetch';

const libraryList: string[] = [
  'VGHTPE', // 臺北總院
  'GANDAU', // 關渡分院
  'FLVH', // 鳳林分院
  'SAVH', // 蘇澳分院
  'TYVH', // 桃園分院
  'VHCT', // 新竹分院
  'VHTT', // 臺東分院
  'VHYL', // 玉里分院
  'YSVH' // 員山分院
];

const isItemListResult: Function = (htmlCode: string): boolean => htmlCode.includes('class="displayDetailLink"');

const isItemResult: Function = (htmlCode: string): boolean => htmlCode.includes('class="detail_main_wrapper"');

const getItemDetail: Function = async (url: string): Promise<DetailType> => {
  const htmlCodeAfterFetch: FetchResult = await collectionFetch(url);
  const itemDetail: DetailType = await itemParser(htmlCodeAfterFetch.data, url);

  return { ...itemDetail };
};

const tvghLibraryCollection: TvghLibraryCollectionFunction = async (keyword: string, page: number = 1, libraryNumbering: number = 0): Promise<DetailType | DetailType[] | null> => {
  const htmlCodeAfterFetch: FetchResult = await collectionFetch(null, keyword, page, libraryList[libraryNumbering]);
  // To check where the HTML code is from and do next step
  if (isItemListResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code contains two or more results
    const itemList: ItemType[] = await itemListParser(htmlCodeAfterFetch.data);
    const itemListWithDetail: DetailType[] = await Promise.all(itemList.map((value: ItemType): DetailType => getItemDetail(value.url)));

    return itemListWithDetail;
  } else if (isItemResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code only contains one result
    const itemWithDetail: DetailType = await itemParser(htmlCodeAfterFetch.data, htmlCodeAfterFetch.url);

    return { ...itemWithDetail };
  } else {
    // To do here if no result is got from the HTML code

    return null;
  }
};

export default tvghLibraryCollection;
