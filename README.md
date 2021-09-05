# Taipei Veterans General Hospital Medical Library Collection Crawler

[![NPM version](https://img.shields.io/npm/v/tvgh-library-collection-crawler.svg)](https://www.npmjs.com/package/tvgh-library-collection-crawler)
[![Actions status](https://github.com/FlowerEatsFish/tvgh-library-collection-crawler/workflows/build/badge.svg?branch=master)](https://github.com/FlowerEatsFish/tvgh-library-collection-crawler/actions)
[![Codecov status](https://codecov.io/gh/FlowerEatsFish/tvgh-library-collection-crawler/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatsFish/tvgh-library-collection-crawler/commits)
[![Scheduled status](https://travis-ci.com/FlowerEatsFish/tvgh-library-collection-crawler.svg?branch=master)](https://travis-ci.com/FlowerEatsFish/tvgh-library-collection-crawler/builds)
[![Dependencies status](https://github.com/FlowerEatsFish/tvgh-library-collection-crawler/workflows/dependencies-status/badge.svg?branch=master)](https://github.com/FlowerEatsFish/tvgh-library-collection-crawler/actions)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

臺北榮民總醫院醫學圖書館館藏資料爬蟲

- [Taipei Veterans General Hospital Medical Library Collection Crawler](#taipei-veterans-general-hospital-medical-library-collection-crawler)
  - [Requirements](#requirements)
  - [Installations](#installations)
  - [Usage](#usage)
    - [Node.js version 8 or higher (with full Async/Await support)](#nodejs-version-8-or-higher-with-full-asyncawait-support)
    - [Others](#others)
  - [Demo](#demo)
    - [Commands](#commands)
    - [Results](#results)
  - [API documentation](#api-documentation)
    - [Input parameters](#input-parameters)
    - [Output results](#output-results)

## Requirements

- This construct uses XHR such as [Axios.js](https://github.com/axios/axios), so you need to care about the Cross-Origin Requests (CORS) if you use this construct in web browsers rather than Node.js.

## Installations

- NPM

```shell
npm install tvgh-library-collection-crawler --save
```

- Yarn

```shell
yarn add tvgh-library-collection-crawler
```

## Usage

### Node.js version 8 or higher (with full Async/Await support)

```javascript
const tvghLibraryCollectionCrawler = require('tvgh-library-collection-crawler');

const run = async () => {
  const results = await tvghLibraryCollectionCrawler('橡皮擦計畫');
  console.log(results);
};

run();
```

### Others

```javascript
const tvghLibraryCollectionCrawler = require('tvgh-library-collection-crawler');

tvghLibraryCollectionCrawler('橡皮擦計畫')
  .then(results => console.log(results));
```

## Demo

### Commands

```shell
# To download the files and install packages.
$ git clone https://github.com/FlowerEatsFish/tvgh-library-collection-crawler.git
$ cd tvgh-library-collection-crawler
$ yarn install # npm install

# To run a demo.
$ yarn start # npm start
```

### Results

```shell
>>> You search data using keyword "愛因斯坦的時空".

{
  title: '愛因斯坦的時空',
  author: '李家維',
  isbn: null,
  issn: null,
  edition: null,
  pub_year: '2017[民106]',
  pub_place: '臺北市 :',
  pub_info: '臺北市 : 遠流, 2017[民106]',
  shape: '159面 : 彩圖 ; 28公分',
  collection: [
    {
      library: '北榮',
      data_type: '*圖書',
      special_number: '',
      barcode: '00000253432',
      call_number: '331/8466/2017',
      is_flow: true,
      status: '正在查詢...'
    }
  ],
  url: 'http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=%E6%84%9B%E5%9B%A0%E6%96%AF%E5%9D%A6%E7%9A%84%E6%99%82%E7%A9%BA&rw=0&lm=VGHTPE'
}
```

```shell
>>> You search data using keyword "Alzheimer disease".

[ {...}, {...}, ... ] # Array.prototype.length <= 12
```

```shell
>>> You search data using keyword "no-result-as-example".

null
```

## API documentation

### Input parameters

```javascript
import tvghLibraryCollectionCrawler from 'tvgh-library-collection-crawler';

const result = tvghLibraryCollectionCrawler(
  keyword, // string. Necessary.
           // If you set it as null, it will get an error.
  page, // number. Positive integer. Default: 1.
        // Every page only shows maximum 12 results.
  libraryNumbering, // number. Integer and the range from 0 to 7 are valid. Default: 0.
                    // Each number represents a different library, as follows:
                    // 0: VGHTPE 臺北總院
                    // 1: GANDAU 關渡分院
                    // 2: FLVH   鳳林分院
                    // 3: SAVH   蘇澳分院
                    // 4: TYVH   桃園分院
                    // 5: VHCT   新竹分院
                    // 6: VHTT   臺東分院
                    // 7: VHYL   玉里分院
                    // 8: YSVH   員山分院
)
```

### Output results

```javascript
// If you get one result, it will return an "object".
result = {
  title: string | null,
  author: string | null,
  isbn: string | null,
  issn: string | null,
  edition: string | null,
  pub_year: string | null,
  pub_place: string | null,
  pub_info: string | null,
  shape: string | null,
  collection: object[]
    [
      {
        library: string | null,
        data_type: string | null,
        special_number: string | null,
        barcode: string | null,
        call_number: string | null,
        is_flow: boolean,
        status: '正在查詢...' | null // You always get this result because the text is pre-rendering.
      },
      { ... }, { ... }, ...
    ],
  url: string | null,
};

// If you get two or more results, it will return an "array".
result = [
  {
    ... // This result is the same as above.
  },
  { ... }, { ... }, ...
];

// If you have not got any result, it will return a "null".
result = null;
```
