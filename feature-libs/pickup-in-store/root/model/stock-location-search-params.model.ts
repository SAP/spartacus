export type StockLocationSearchParams = {
  productCode: string;
  latitude?: number;
  longitude?: number;
  location?: string;
};

export type LocationSearchParams = Omit<
  StockLocationSearchParams,
  'productCode'
>;
