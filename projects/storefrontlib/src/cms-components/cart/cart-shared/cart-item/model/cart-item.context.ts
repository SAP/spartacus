import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';
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
  readonly promotionLocation$: Observable<PromotionLocation>;
  readonly options$: Observable<CartItemComponentOptions>;
}

/**
 * Context source for `CartItemComponent`.
 *
 * `CartItemContext` should be injected instead in child components.
 */
@Injectable()
export class CartItemContextSource implements CartItemContext {
  readonly compact$ = new ReplaySubject<boolean>(1);
  readonly readonly$ = new ReplaySubject<boolean>(1);
  readonly item$ = new ReplaySubject<OrderEntry>(1);
  readonly quantityControl$ = new ReplaySubject<FormControl>(1);
  readonly promotionLocation$ = new ReplaySubject<PromotionLocation>(1);
  readonly options$ = new ReplaySubject<CartItemComponentOptions>(1);
}
