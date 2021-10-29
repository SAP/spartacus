import { Injectable } from '@angular/core';
import { CartConfig } from '../config/cart-config';

@Injectable({
  providedIn: 'root',
})
export class CartConfigService {
  constructor(protected config: CartConfig) {}

  isSelectiveCartEnabled(): boolean {
    return Boolean(this.config?.cart?.selectiveCart?.enabled);
  }

  isCartValidationEnabled(): boolean {
    return Boolean(this.config?.cart?.validation?.enabled);
  }
}
