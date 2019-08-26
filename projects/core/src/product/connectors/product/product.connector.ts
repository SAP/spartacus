import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from './product.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  constructor(protected adapter: ProductAdapter) {}

  get(productCode: string): Observable<Product> {
    return this.adapter.load(productCode);
  }
}
