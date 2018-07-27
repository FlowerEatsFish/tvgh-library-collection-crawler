/**
 * Demo
 */

// tslint:disable-next-line:import-name
import tvghLibraryCollection from './index';

const keywordList: string[] = [
  '愛因斯坦的時空', // It will get one result as expected.
  'Alzheimer disease', // It will get more results on 12 ones per page as expected.
  'no-result-as-example' // It will be no result.
];

const demo: Function = async (value: string[]): Promise<void> => {
  for (const keyword of keywordList) {
    await console.log(`>>> You search data using keyword "${keyword}".`);
    await tvghLibraryCollection(keyword);
  }
};

demo(keywordList);
