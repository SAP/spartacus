import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationWarningsStateService implements OnDestroy {
  constructor(protected routingService: RoutingService) {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe(
        (routerState) => (this.navigationIdCount = routerState.navigationId)
      );
    this.subscription.add(this.checkForValidationResultClear$.subscribe());
  }
  NAVIGATION_SKIPS = 2;
  navigationIdCount = 0;

  subscription = new Subscription();
  shouldCloseStream$ = new Subject<boolean>();
  cartValidationResult$ = new ReplaySubject<CartModification[]>(1);

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    withLatestFrom(this.cartValidationResult$),
    takeUntil(this.shouldCloseStream$),
    tap(([routerState, cartModifications]) => {
      if (
        this.navigationIdCount + this.NAVIGATION_SKIPS <=
          routerState.navigationId &&
        cartModifications.length
      ) {
        this.cartValidationResult$.next([]);
        this.navigationIdCount = routerState.navigationId;
        this.shouldCloseStream$.next(true);
      }
    })
  );

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
