/**
 * To parse the results when the fetcher got two or more data.
 */

export interface ItemType {
  title: string | null;
  url: string | null;
}

const getItemTitle = (htmlCode: string): string | null => {
  const result = htmlCode.match(/\stitle="[\w\W]*?"/gi);

  if (result) {
    return result[0].replace(/\stitle="([\w\W]*?)"/, "$1");
  }

  return null;
};

const getItemUrl = (htmlCode: string): string | null => {
  const result = htmlCode.match(/ent:\$002f\$002fSD_ILS\$002f0\$002fSD_ILS:\d*/gi);

  if (result) {
    return `http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/detailnonmodal/${result[0]}/one`;
  }

  return null;
};

const getItem = (htmlCode: string): ItemType => {
  return {
    title: getItemTitle(htmlCode),
    url: getItemUrl(htmlCode),
  };
};

export const itemListParser = (htmlCode: string): ItemType[] | null => {
  // To split code from string into array by special tag
  const itemListWithCode = htmlCode.match(/<div class="displayDetailLink">[\w\W]*?<\/div>/gi);

  if (itemListWithCode) {
    // To build up data we want
    return itemListWithCode.map((value): ItemType => getItem(value));
  }

  return null;
};
