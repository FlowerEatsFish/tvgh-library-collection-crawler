/**
 * Demo
 */

import tvghLibraryCollection from "./index";

const demoKeywordList = [
  "橡皮擦計畫", // It will get one result as expected.
  "Alzheimer disease", // It will get more results on 12 ones per page as expected.
  "no-result-as-example", // It will be no result.
];

const demo = async (keywordList: string[]): Promise<void> => {
  for (const keyword of keywordList) {
    console.log(`>>> You search data using keyword "${keyword}".`);

    const result = await tvghLibraryCollection(keyword);
    console.log(result);
  }
};

demo(demoKeywordList);
