import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CartItemComponentOptions,
  OrderEntry,
  PromotionLocation,
} from '../models/cart.model';

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
