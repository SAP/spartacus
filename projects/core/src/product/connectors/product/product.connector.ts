import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductAdapter } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  constructor(private adapter: ProductAdapter) {}

  get(productCode: string): Observable<Product> {
    return this.adapter.load(productCode);
  }
}
