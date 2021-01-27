import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export abstract class ProductListItemContext {
  readonly product$: Observable<Product>;
}

@Injectable()
export class ProductListItemContextOwner extends ProductListItemContext {
  readonly product$ = new ReplaySubject<Product>(1);

  setProduct(product: Product) {
    this.product$.next(product);
  }
}
