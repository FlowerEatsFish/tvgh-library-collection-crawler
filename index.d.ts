export interface CollectionType {
  library: string | null;
  data_type: string | null;
  special_number: string | null;
  barcode: string | null;
  call_number: string | null;
  is_flow: boolean;
  status: string | null;
}

export interface DetailType {
  title: string;
  author: string;
  isbn: string;
  edition: string;
  pub_year: string;
  pub_place: string;
  pub_info: string;
  issn: string;
  shape: string;
  collection: CollectionType[] | null;
}

export type TvghLibraryCollectionFunction =
  (keyword: string, page?: number, libraryNumbering?: number) => DetailType;

declare const tvghLibraryCollectionApi: TvghLibraryCollectionFunction;

export default tvghLibraryCollectionApi;
