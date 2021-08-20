import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationWarningsStateService {
  constructor(protected routingService: RoutingService) {}

  NAVIGATION_SKIPS = 2;
  navigationIdCount: number;

  cartValidationResult$ = new Subject<CartModification[]>();

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    withLatestFrom(this.cartValidationResult$),
    take(this.NAVIGATION_SKIPS),
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
}
