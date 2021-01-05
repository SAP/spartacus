export interface BulkPrice {
  currencyIso?: string;
  formattedValue?: string;
  maxQuantity: number;
  minQuantity: number;
  priceType?: string;
  value: number;
}
