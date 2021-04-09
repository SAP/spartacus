import { Injectable } from '@angular/core';
import { OrderEntry, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderAdapter } from './quick-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderConnector {
  constructor(protected adapter: QuickOrderAdapter) {}

  addToCart(
    userId: string,
    cartId: string,
    entries: OrderEntry[]
  ): Observable<void> {
    return this.adapter.addToCart(userId, cartId, entries);
  }

  search(productCode: string): Observable<Product> {
    return this.adapter.search(productCode);
  }
}
