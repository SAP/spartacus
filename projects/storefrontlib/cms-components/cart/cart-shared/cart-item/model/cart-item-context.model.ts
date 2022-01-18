import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartItemComponentOptions } from '../cart-item.component';

/**
 * Context for `CartItemComponent`.
 */
@Injectable()
export abstract class CartItemContext {
  readonly compact$: Observable<boolean>;

  readonly readonly$: Observable<boolean>;

  readonly item$: Observable<OrderEntry>;

  readonly quantityControl$: Observable<FormControl>;

  readonly location$: Observable<PromotionLocation>;

  readonly options$: Observable<CartItemComponentOptions>;
}
