import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Context for `ProductListItemComponent`.
 */
@Injectable()
export abstract class ProductListItemContext {
  readonly product$: Observable<Product>;
}
