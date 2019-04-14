import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAdapter } from './product.adapter';
import { Product } from '../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  constructor(private adapter: ProductAdapter) {}

  get(productCode: string): Observable<Product> {
    return this.adapter.load(productCode);
  }
}
