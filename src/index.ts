import fetchSearchResult from "./fetch";
import parserItemList from "./item-list-parser";
import parserItem from "./item-parser";

interface itemType {
  title: string,
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
  const htmlCodeAfterFetch: string = await fetchSearchResult(url);
  const itemDetail: object = await parserItem(htmlCodeAfterFetch);
  return itemDetail;
};

const buildData = async (keyword, page: number = 1, library_numbering: number = 0): Promise<object> => {
  const htmlCodeAfterFetch: string = await fetchSearchResult(null, keyword, page, libraryList[library_numbering]);
  if (isItemListResult(htmlCodeAfterFetch)) {
    console.log("isItemListResult");
    const itemList: itemType[] = await parserItemList(htmlCodeAfterFetch);
    const itemListWithDetail: object[] = await Promise.all(itemList.map(value => getItemDetail(value.url)));
    console.log(itemListWithDetail);
    return itemListWithDetail;
  } else if (isItemResult(htmlCodeAfterFetch)) {
    console.log("isItemResult");
    const itemWithDetail: object = await parserItem(htmlCodeAfterFetch);
    console.log(itemWithDetail);
    return itemWithDetail;
  } else {
    console.log("noResult");
    return null;
  }
}

const keywords = ["哈利波特", "長恨歌密碼", "我沒有資料"];
keywords.map((value: string) => {
  buildData(value);
});
