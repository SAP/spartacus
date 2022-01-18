import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { ProductListItemContext } from './product-list-item-context.model';

/**
 * Context source for `ProductListItemComponent`.
 *
 * `ProductListItemContext` should be injected instead in child components.
 */
@Injectable()
export class ProductListItemContextSource extends ProductListItemContext {
  readonly product$ = new ReplaySubject<Product>(1);
}
