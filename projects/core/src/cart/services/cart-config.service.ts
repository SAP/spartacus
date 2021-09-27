import { Injectable } from '@angular/core';
import { CartConfig } from '../config/cart-config';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@Injectable({
  providedIn: 'root',
})
export class CartConfigService {
  constructor(protected config: CartConfig) {}

  isSelectiveCartEnabled(): boolean {
    return Boolean(this.config?.cart?.selectiveCart?.enabled);
  }
}
