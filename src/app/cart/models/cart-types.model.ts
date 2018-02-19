export interface Cart {
  code: string;
  guid: string;
  total_items: number;
  total_price: {
    currency_iso: string;
    value: number;
  };
  total_price_with_tax: {
    currency_iso: string;
    value: number;
  };
}
