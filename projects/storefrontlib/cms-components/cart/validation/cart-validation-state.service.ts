import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationStateService implements OnDestroy {
  protected NAVIGATION_SKIPS = 2;
  protected navigationIdCount = 0;

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
          cartModifications.length
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
