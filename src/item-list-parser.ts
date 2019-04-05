/**
 * To parse the results when the fetcher got two or more data.
 */

export interface ItemType {
  title: string;
  url: string;
}

const getItemTitle: Function = (htmlCode: string): string | null => {
  let result: string[] | null = htmlCode.match(/\stitle="[\w\W]*?"/gi);
  if (result != null) {
    return result[0].replace(/\stitle="([\w\W]*?)"/, '$1');
  }

  return null;
};

const getItemUrl: Function = (htmlCode: string): string | null => {
  const result: string[] | null = htmlCode.match(/ent:\$002f\$002fSD_ILS\$002f0\$002fSD_ILS:\d*/gi);
  if (result != null) {
    return `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/detailnonmodal/${result[0]}/one`;
  }

  return null;
};

const getItem: Function = (htmlCode: string): ItemType => ({
  title: getItemTitle(htmlCode),
  url: getItemUrl(htmlCode)
});

const splitHtmlCode: Function = (htmlCode: string): string[] | null => htmlCode.match(/<div class="displayDetailLink">[\w\W]*?<\/div>/gi);

export const itemListParser: Function = async (htmlCode: string): Promise<ItemType[]> => {
  // To split code from string into array by special tag
  const itemListWithCode: string[] = await splitHtmlCode(htmlCode);
  // To build up data we want
  const itemList: ItemType[] = await Promise.all(itemListWithCode.map((value: string): ItemType => getItem(value)));

  return itemList;
};
