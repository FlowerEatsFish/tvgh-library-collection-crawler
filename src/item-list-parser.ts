interface itemType {
  title: string,
  url: string,
};

const getItemTitle = (htmlCode: string): string => {
  let result: string = htmlCode.match(/\stitle="[\w\W]*?"/gi)[0];
  result = result.replace(/\stitle="([\w\W]*?)"/, "$1");
  return result;
};

const getItemUrl = (htmlCode: string): string => {
  let result: string = htmlCode.match(/ent:\$002f\$002fSD_ILS\$002f0\$002fSD_ILS:\d*/gi)[0];
  result = `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/detailnonmodal/${result}/one`;
  return result;
}

const getItem = (htmlCode: string): itemType => ({
  title: getItemTitle(htmlCode),
  url: getItemUrl(htmlCode),
});

const splitHtmlCode = (htmlCode: string): string[] => {
  const result = htmlCode.match(/<div class="displayDetailLink">[\w\W]*?<\/div>/gi);
  console.log("splitHtmlCode");
  console.log(result);
  return result;
}

const buildItemList = async (htmlCode): Promise<itemType[]> => {
  // To split code from string into array by special tag
  const itemListWithCode: string[] = await splitHtmlCode(htmlCode);
  // To build up data we want
  const itemList: itemType[] = await Promise.all(itemListWithCode.map(value => getItem(value)));
  return itemList;
};

export default buildItemList;
