import { Injectable } from '@angular/core';
import { Cart } from '../../occ-models/index';

export const ANONYMOUS_USERID = 'anonymous';

@Injectable()
export class CartDataService {
  private _userId = ANONYMOUS_USERID;
  private _cart: Cart;
  private _getDetails = false;

  constructor() {}

  get hasCart(): boolean {
    return !!this._cart;
  }

  set userId(val) {
    this._userId = val;
  }

  set cart(val) {
    this._cart = val;
  }

  set getDetails(val) {
    this._getDetails = val;
  }

  get userId(): string {
    return this._userId;
  }

  get cart(): Cart {
    return this._cart;
  }

  get getDetails() {
    return this._getDetails;
  }

  get cartId(): string {
    if (this.hasCart) {
      return this.userId === ANONYMOUS_USERID ? this.cart.guid : this.cart.code;
    }
  }
}
