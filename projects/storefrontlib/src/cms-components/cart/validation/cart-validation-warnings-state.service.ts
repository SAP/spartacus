import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationWarningsStateService {
  constructor(protected routingService: RoutingService) {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe(
        (routerState) => (this.navigationIdCount = routerState.navigationId)
      );
  }
  NAVIGATION_SKIPS = 2;
  navigationIdCount: number;

  cartValidationResult$ = new ReplaySubject<CartModification[]>(1);

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    withLatestFrom(this.cartValidationResult$),
    take(this.NAVIGATION_SKIPS),
    tap(([routerState, cartModifications]) => {
      if (
        this.navigationIdCount + this.NAVIGATION_SKIPS <=
          routerState.navigationId &&
        cartModifications.length
      ) {
        console.log('clearing results');
        this.cartValidationResult$.next([]);
        this.navigationIdCount = routerState.navigationId;
      }
    })
  );
}
