import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../model/cart.model';
import { CartBundleAdapter } from './cart-bundle.adapter';
import { Product } from 'projects/core/src/model/product.model';

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

  public getAll(userId: string, cartId: string): Observable<CartModification> {
    return this.adapter.getAll(userId, cartId);
  }

  public update(
    userId: string,
    cartId: string,
    entryGroupId: string,
    product: Product,
    quantity: number
  ): Observable<CartModification> {
    return this.adapter.update(userId, cartId, entryGroupId, product, quantity);
  }

  public remove(
    userId: string,
    cartId: string,
    entryGroupId: string
  ): Observable<CartModification> {
    return this.adapter.remove(userId, cartId, entryGroupId);
  }
}
