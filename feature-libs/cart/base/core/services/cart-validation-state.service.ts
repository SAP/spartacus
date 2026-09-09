/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { FeatureToggles, RoutingService } from '@spartacus/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { CartModification } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class CartValidationStateService implements OnDestroy {
  protected NAVIGATION_SKIPS = 2;
  protected navigationIdCount = 0;
  private featureToggles = inject(FeatureToggles);

  protected subscription = new Subscription();
  cartValidationResult$: Observable<CartModification[]> = new ReplaySubject<
    CartModification[]
  >(1) as Observable<CartModification[]>;

  constructor(protected routingService: RoutingService) {
    this.setInitialState();
  }

  protected checkForValidationResultClear$ = this.routingService
    .getRouterState()
    .pipe(
      withLatestFrom(this.cartValidationResult$),
      tap(([routerState, cartModifications]) => {
        if (
          this.navigationIdCount + this.NAVIGATION_SKIPS <=
            routerState.navigationId &&
          cartModifications.length &&
          // With backend min/max messages enabled, do not clear while the user is
          // on the cart page: the results are actively displayed (row highlight,
          // quantity hints) and any checkout attempt immediately re-validates, so
          // clearing here only causes a visible flicker.
          !(
            !!this.featureToggles.cartValidationDisplayBackendMessages &&
            routerState.state?.semanticRoute === 'cart'
          )
        ) {
          (
            this.cartValidationResult$ as ReplaySubject<CartModification[]>
          ).next([]);
          this.navigationIdCount = routerState.navigationId;
        }
      })
    );

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected setInitialState() {
    this.setNavigationIdStep();
    this.subscription.add(this.checkForValidationResultClear$.subscribe());
  }

  updateValidationResultAndRoutingId(cartModification: CartModification[]) {
    (this.cartValidationResult$ as ReplaySubject<CartModification[]>).next(
      cartModification
    );
    this.setNavigationIdStep();
  }

  protected setNavigationIdStep() {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe(
        (routerState) => (this.navigationIdCount = routerState.navigationId)
      );
  }
}
