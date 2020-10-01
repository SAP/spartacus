import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../model/cart.model';
import { CartBundleAdapter } from './cart-bundle.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartBundleConnector {
  constructor(protected adapter: CartBundleAdapter) {}

  public start(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    templateId: string
  ): Observable<CartModification> {
    return this.adapter.start(
      userId,
      cartId,
      productCode,
      quantity,
      templateId
    );
  }
}
