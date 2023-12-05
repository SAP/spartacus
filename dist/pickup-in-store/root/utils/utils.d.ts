import { Cart } from '@spartacus/cart/base/root';
import { CartWithIdAndUserId } from './type-utils';
export declare const getProperty: (o: Record<string, any> | undefined | null, property: string) => any | null;
/** Custom type guard to ensure we have a cart with the required ids for pickup in store */
export declare function cartWithIdAndUserId(cart: Cart | undefined): cart is CartWithIdAndUserId;
