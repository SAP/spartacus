export interface Cart {
  code: string;
  guid: string;
  totalItems: number;
  totalPrice: {
    currencyIso: string;
    value: number;
  };
  totalPriceWithTax: {
    currencyIso: string;
    value: number;
  };
}
