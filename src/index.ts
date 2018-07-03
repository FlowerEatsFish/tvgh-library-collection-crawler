import fetchSearchResult from "./fetch";
import parserItemList from "./item-list-parser";
import parserItem from "./item-parser";

interface itemType {
  title: string,
  url: string,
};

interface fetchDataType {
  data: string,
  url: string,
};

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

const isItemListResult = (htmlCode: string): boolean => htmlCode.includes('class="displayDetailLink"');

const isItemResult = (htmlCode: string): boolean => htmlCode.includes('class="detail_main_wrapper"');

const getItemDetail = async (url: string): Promise<object> => {
  const htmlCodeAfterFetch: fetchDataType = await fetchSearchResult(url);
  const itemDetail: object = await parserItem(htmlCodeAfterFetch.data);
  return { ...itemDetail, url: url };
};

const buildData = async (keyword, page: number = 1, library_numbering: number = 0): Promise<object> => {
  const htmlCodeAfterFetch: fetchDataType = await fetchSearchResult(null, keyword, page, libraryList[library_numbering]);
  console.log(htmlCodeAfterFetch.url);
  if (isItemListResult(htmlCodeAfterFetch.data)) {
    console.log("isItemListResult");
    const itemList: itemType[] = await parserItemList(htmlCodeAfterFetch.data);
    const itemListWithDetail: object[] = await Promise.all(itemList.map(value => getItemDetail(value.url)));
    console.log(itemListWithDetail);
    return itemListWithDetail;
  } else if (isItemResult(htmlCodeAfterFetch.data)) {
    console.log("isItemResult");
    const itemWithDetail: object = await parserItem(htmlCodeAfterFetch.data);
    console.log({ ...itemWithDetail, url: htmlCodeAfterFetch.url });
    return { ...itemWithDetail, url: htmlCodeAfterFetch.url };
  } else {
    console.log("noResult");
    return null;
  }
}

export default buildData;
