import { Injectable } from '@angular/core';
import { Cart, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderEntry } from '../model/quick-order-entry.model';
import { QuickOrderAdapter } from './quick-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderConnector {
  constructor(protected adapter: QuickOrderAdapter) {}

  addToCart(
    userId: string,
    cartId: string,
    entries: QuickOrderEntry[]
  ): Observable<Cart[]> {
    return this.adapter.addToCart(userId, cartId, entries);
  }

  search(productCode: string): Observable<Product> {
    return this.adapter.search(productCode);
  }
}
