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
  author: string | null;
  isbn: string | null;
  edition: string | null;
  pub_year: string | null;
  pub_place: string | null;
  pub_info: string | null;
  issn: string | null;
  shape: string | null;
  collection: CollectionType[] | null;
  url: string;
}

export type TvghLibraryCollectionFunction = (
  keyword: string,
  page?: number,
  libraryNumbering?: number,
) => Promise<DetailType | DetailType[] | null>;

declare const tvghLibraryCollectionApi: TvghLibraryCollectionFunction;

export default tvghLibraryCollectionApi;
