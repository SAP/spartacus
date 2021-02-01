import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
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
 * `CartItemContext` should be used in child components instead.
 */
@Injectable()
export class CartItemContextSource implements CartItemContext {
  readonly _compact$ = new ReplaySubject<boolean>(1);
  readonly compact$ = this._compact$.pipe(distinctUntilChanged());

  readonly _readonly$ = new ReplaySubject<boolean>(1);
  readonly readonly$ = this._readonly$.pipe(distinctUntilChanged());

  readonly _item$ = new ReplaySubject<OrderEntry>(1);
  readonly item$ = this._item$.pipe(distinctUntilChanged());

  readonly _quantityControl$ = new ReplaySubject<FormControl>(1);
  readonly quantityControl$ = this._quantityControl$.pipe(
    distinctUntilChanged()
  );

  readonly _promotionLocation$ = new ReplaySubject<PromotionLocation>(1);
  readonly promotionLocation$ = this._promotionLocation$.pipe(
    distinctUntilChanged()
  );

  readonly _options$ = new ReplaySubject<CartItemComponentOptions>(1);
  readonly options$ = this._options$.pipe(distinctUntilChanged());
}
