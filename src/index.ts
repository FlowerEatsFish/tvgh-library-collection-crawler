/**
 * Main control for this library.
 */

import { IItemType, itemListParser } from './item-list-parser';
import { IDetailType, itemParser } from './item-parser';
import { collectionFetch, IFetchResult } from './vgh-collection-fetch';

interface IDetailTypeWithUrl extends IDetailType {
  url: string;
}

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

const getItemDetail: Function = async (url: string): Promise<IDetailTypeWithUrl> => {
  const htmlCodeAfterFetch: IFetchResult = await collectionFetch(url);
  const itemDetail: IDetailType = await itemParser(htmlCodeAfterFetch.data);

  return { ...itemDetail, url: url };
};

const tvghLibraryCollection: Function = async (keyword: string, page: number = 1, libraryNumbering: number = 0): Promise<object | null> => {
  const htmlCodeAfterFetch: IFetchResult = await collectionFetch(null, keyword, page, libraryList[libraryNumbering]);
  console.log(`>>> You search data using ${htmlCodeAfterFetch.url}`);
  // To check where the HTML code is from and do next step
  if (isItemListResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code contains two or more results
    console.log('>>> The HTML code contains two or more results.');
    const itemList: IItemType[] = await itemListParser(htmlCodeAfterFetch.data);
    const itemListWithDetail: IDetailTypeWithUrl[] = await Promise.all(itemList.map((value: IItemType): IDetailTypeWithUrl => getItemDetail(value.url)));
    console.log(itemListWithDetail);

    return itemListWithDetail;
  } else if (isItemResult(htmlCodeAfterFetch.data)) {
    // To do here if the HTML code only contains one result
    console.log('>>> The HTML code only contains one result.');
    const itemWithDetail: IDetailType = await itemParser(htmlCodeAfterFetch.data);
    console.log({ ...itemWithDetail, url: htmlCodeAfterFetch.url });

    return { ...itemWithDetail, url: htmlCodeAfterFetch.url };
  } else {
    // To do here if no result is got from the HTML code
    console.log('>>> No result is got from the HTML code.');

    return null;
  }
};

// tslint:disable-next-line:no-default-export
export default tvghLibraryCollection;
