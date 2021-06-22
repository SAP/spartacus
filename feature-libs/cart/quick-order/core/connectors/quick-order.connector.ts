import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderAdapter } from './quick-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderConnector {
  constructor(protected adapter: QuickOrderAdapter) {}

  search(productCode: string): Observable<Product> {
    return this.adapter.search(productCode);
  }
}
