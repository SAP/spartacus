type BrowserLocationSearchParameters = {
  latitude: number;
  longitude: number;
};

type FreeTextSearchParameters = {
  location: string;
};

export type LocationSearchParams =
  | BrowserLocationSearchParameters
  | FreeTextSearchParameters;

export type StockLocationSearchParams = {
  productCode: string;
} & LocationSearchParams;
