import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export abstract class ProductListItemContext {
  protected product$$ = new BehaviorSubject<Product>(undefined);

  readonly product$ = this.product$$.asObservable();
}

@Injectable()
export class ProductListItemContextOwner extends ProductListItemContext {
  setProduct(product: Product) {
    this.product$$.next(product);
  }
}
