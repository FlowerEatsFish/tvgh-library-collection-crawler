/**
 * To parse the results when the fetcher got two or more data.
 */

export interface IItemType {
  title: string;
  url: string;
}

const getItemTitle: Function = (htmlCode: string): string => {
  let result: string = htmlCode.match(/\stitle="[\w\W]*?"/gi)[0];
  result = result.replace(/\stitle="([\w\W]*?)"/, '$1');

  return result;
};

const getItemUrl: Function = (htmlCode: string): string => {
  let result: string = htmlCode.match(/ent:\$002f\$002fSD_ILS\$002f0\$002fSD_ILS:\d*/gi)[0];
  result = `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/detailnonmodal/${result}/one`;

  return result;
};

const getItem: Function = (htmlCode: string): IItemType => ({
  title: getItemTitle(htmlCode),
  url: getItemUrl(htmlCode)
});

const splitHtmlCode: Function = (htmlCode: string): string[] => htmlCode.match(/<div class="displayDetailLink">[\w\W]*?<\/div>/gi);

export const itemListParser: Function = async (htmlCode: string): Promise<IItemType[]> => {
  // To split code from string into array by special tag
  const itemListWithCode: string[] = await splitHtmlCode(htmlCode);
  // To build up data we want
  // tslint:disable-next-line:no-unnecessary-local-variable
  const itemList: IItemType[] = await Promise.all(itemListWithCode.map((value: string) => getItem(value)));

  return itemList;
};
