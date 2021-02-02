import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * Context for `ProductListItemComponent`.
 */
@Injectable()
export abstract class ProductListItemContext {
  readonly product$: Observable<Product>;
}

/**
 * Context source for `ProductListItemComponent`.
 *
 * `ProductListItemContext` should be injected instead in child components.
 */
@Injectable()
export class ProductListItemContextSource extends ProductListItemContext {
  readonly product$ = new ReplaySubject<Product>(1);
}
