import { Cart } from '../../model/cart.model';

export class CartUtilService {
  constructor() {}

  static isCreated(cart: Cart): boolean {
    return (
      cart &&
      !!Object.keys(cart).length &&
      (typeof cart.guid !== 'undefined' || typeof cart.code !== 'undefined')
    );
  }

  static isLoaded(cart: Cart): boolean {
    // totalItems are checked to be sure we have loaded cart (if they are undefined, we loaded guid and code from localStorage, but didn't fetched cart from backend)
    return (
      cart && Object.keys(cart).length && typeof cart.totalItems !== 'undefined'
    );
  }

  static isEmpty(cart: Cart): boolean {
    return cart && !cart.totalItems;
  }
}
