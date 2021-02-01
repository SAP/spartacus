import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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
 * `ProductListItemContext` should be used in child components instead.
 */
@Injectable()
export class ProductListItemContextSource extends ProductListItemContext {
  readonly _product$ = new ReplaySubject<Product>(1);
  readonly product$ = this._product$.pipe(distinctUntilChanged());
}
