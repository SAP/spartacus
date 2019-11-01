import { Cart as OldModel } from '../model/cart.model';

export interface Cart extends OldModel {
  /** The unique cart ID that we use inside Spartacus.  */
  cartId: string;

  /** The cart in only concerned with the user ID and doens't need more use data */
  userId?: any;

  lines?: CartLine[];

  subTotal?: CartPrice;
  totalPrice?: CartPrice;
}

export interface CartLine {
  /** The line number, typically start with a zero-index */
  number: number;
  /** the quantity for the CartLine */
  quantity: number;

  /** the product ID used in the cart entry */
  itemId?: string;

  basePrice?: CartPrice;
  totalPrice?: CartPrice;
}

export interface OldCartPrice {
  currencyIso?: string;
  formattedValue?: string;
  value?: number;
}
export interface CartPrice extends OldCartPrice {
  value?: number;
  currency?: CurrencyIsoCode;
  formatted?: string;
}

// tslint:disable-next-line: no-empty-interface
interface CurrencyIsoCode extends String {}
