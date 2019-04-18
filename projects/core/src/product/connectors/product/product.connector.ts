import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIProduct } from '../../model/product';
import { ProductAdapter } from './product.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  constructor(private adapter: ProductAdapter) {}

  get(productCode: string): Observable<UIProduct> {
    return this.adapter.load(productCode);
  }
}
