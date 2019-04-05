# Unofficial Taipei Veterans General Hospital Medical Library Collection API

[![Travis-CI status](https://travis-ci.com/FlowerEatFish/tvgh-library-collection-api.svg?branch=master)](https://travis-ci.com/FlowerEatFish/tvgh-library-collection-api/builds)
[![AppVeyor status](https://ci.appveyor.com/api/projects/status/aeiv3t9fajpgiabc/branch/master?svg=true)](https://ci.appveyor.com/project/FlowerEatFish/tvgh-library-collection-api/history)
[![Codecov status](https://codecov.io/gh/FlowerEatFish/tvgh-library-collection-api/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatFish/tvgh-library-collection-api/commits)
[![Code style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

- [Unofficial Taipei Veterans General Hospital Medical Library Collection API](#unofficial-taipei-veterans-general-hospital-medical-library-collection-api)
  - [Requirements](#requirements)
  - [Demo](#demo)
  - [API documentation](#api-documentation)
    - [Input parameters you want to search for information](#input-parameters-you-want-to-search-for-information)
    - [Output results you get from input parameters](#output-results-you-get-from-input-parameters)

## Requirements

- This construct uses Async/Await methods, so you need to run [polyfill.js](https://polyfill.io/v2/docs/) first.

- This construct uses [Axios.js](https://github.com/axios/axios), so you need to care the Cross-Origin Requests (CORS).

## Demo

- Commands:

  ```shell
  # To download the files and install packages.
  $ git clone https://github.com/FlowerEatFish/tvgh-library-collection-api.git
  $ cd tvgh-library-collection-api
  $ npm install

  # To run a demo.
  $ npm start
  ```

- Results:

  ```shell
  >>> You search data using keyword "愛因斯坦的時空".
  >>> You search data using http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=%E6%84%9B%E5%9B%A0%E6%96%AF%E5%9D%A6%E7%9A%84%E6%99%82%E7%A9%BA&rw=0&lm=VGHTPE
  >>> The HTML code only contains one result.

  { title: '愛因斯坦的時空',
    author: '李家維',
    isbn: null,
    issn: null,
    edition: null,
    pub_year: '2017[民106]',
    pub_place: '臺北市 :',
    pub_info: '臺北市 : 遠流, 2017[民106]',
    shape: '159面 : 彩圖 ; 28公分',
    collection:
    [ { library: '北榮',
        data_type: '*圖書',
        special_number: '',
        barcode: '00000253432',
        call_number: '331/8466/2017',
        is_flow: true,
        status: '正在查詢...' } ],
    url: 'http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=%E6%84%9B%E5%9B%A0%E6%96%AF%E5%9D%A6%E7%9A%84%E6%99%82%E7%A9%BA&rw=0&lm=VGHTPE' }
  ```

  ```shell
  >>> You search data using keyword "Alzheimer disease".
  >>> You search data using http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=Alzheimer%20disease&rw=0&lm=VGHTPE
  >>> The HTML code contains two or more results.

  [ {...}, {...}, ... ] # Array.length <= 12
  ```

  ```shell
  >>> You search data using keyword "no-result-as-example".
  >>> You search data using http://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/results?qu=no%20result%20as%20example&rw=0&lm=VGHTPE
  >>> No result is got from the HTML code.

  null
  ```

## API documentation

### Input parameters you want to search for information

  ```js
  import TvghLibraryCollectionApi from 'tvgh-library-collection-api.development'; // Here uses development mode as an example

  const result = TvghLibraryCollectionApi(
    keyword, // string. Necessary.
             //If you configs it as null, it will get an error.
    page, // number. Positive integer. Default: 1.
          // Every page only shows maximum 12 results.
    libraryNumbering // number. Integer and the range from 0 to 7 are valid. Default: 0.
                     // Each number represents a different library, as follows:
                     // 0: VGHTPE 臺北總院
                     // 1: GANDAU 關渡分院
                     // 2: FLVH   鳳林分院
                     // 3: SAVH   蘇澳分院
                     // 4: TYVH   桃園分院
                     // 5: VHCT   新竹分院
                     // 6: VHTT   臺東分院
                     // 7: VHYL   玉里分院
                     // 9: YSVH   員山分院
  )
  ```

### Output results you get from input parameters

  ```js
  // If you get one result, it will return an "object".
  result = {
    title: string,
    author: string or null,
    isbn: string or null,
    issn: string or null,
    edition: string or null,
    pub_year: string or null,
    pub_place: string or null,
    pub_info: string or null,
    shape: string or null,
    collection: object[]
      [
        {
          library: string,
          data_type: string or null,
          special_number: string or null,
          barcode: string or null,
          call_number: string or null,
          is_flow: boolean,
          status: '正在查詢...' or null // You always get this result because the text is pre-rendering.
        },
        { ... }, { ... }, ...
      ],
    url: string
  };

  // If you get two or more results, it will return an "array".
  result = [
    {
      ... // This result is the same as above.
    },
    ...
  ];

  // If you have not got any result, it will return a "null".
  result = null;
  ```
