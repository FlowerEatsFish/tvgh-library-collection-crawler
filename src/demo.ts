/**
 * Demo
 */

import tvghLibraryCollection from './index';

const demoKeywordList: string[] = [
  '愛因斯坦的時空', // It will get one result as expected.
  'Alzheimer disease', // It will get more results on 12 ones per page as expected.
  'no-result-as-example' // It will be no result.
];

const demo: Function = async (keywordList: string[]): Promise<void> => {
  for (const keyword of keywordList) {
    await console.log(`>>> You search data using keyword "${keyword}".`);
    const result = await tvghLibraryCollection(keyword);
    console.log(result);
  }
};

demo(demoKeywordList);
