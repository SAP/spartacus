import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationWarningsStateService implements OnInit, OnDestroy {
  constructor(protected routingService: RoutingService) {}
  NAVIGATION_SKIPS = 2;
  navigationIdCount = 0;

  private subscription = new Subscription();
  cartValidationResult$ = new ReplaySubject<CartModification[]>(1);

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe(
        (routerState) => (this.navigationIdCount = routerState.navigationId)
      );
    this.subscription.add(this.checkForValidationResultClear$.subscribe());
  }

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    withLatestFrom(this.cartValidationResult$),
    tap(([routerState, cartModifications]) => {
      if (
        this.navigationIdCount + this.NAVIGATION_SKIPS <=
          routerState.navigationId &&
        cartModifications.length
      ) {
        this.cartValidationResult$.next([]);
        this.navigationIdCount = routerState.navigationId;
      }
    })
  );

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
