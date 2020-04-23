import { Injectable } from '@angular/core';
import { CartConfig } from '../config/cart-config';

@Injectable({
  providedIn: 'root',
})
export class CartConfigService {
  constructor(protected config: CartConfig) {}

  isSelectiveCartEnabled(): boolean {
    return this.config.cart.selectiveCart.enabled;
  }
}
