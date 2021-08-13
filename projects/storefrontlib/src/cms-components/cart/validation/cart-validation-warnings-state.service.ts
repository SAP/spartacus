import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { RoutingService, CartModification } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationWarningsStateService {
  constructor(protected routingService: RoutingService) {}
  NAVIGATION_SKIPS = 2;
  navigationIdCount: number;

  cartValidationResult$ = new Subject<CartModification[]>();
  checkoutRouteActivated$ = new BehaviorSubject<boolean>(false);

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    skip(this.NAVIGATION_SKIPS),
    tap((routerState) => {
      console.log(routerState.navigationId);

      if (
        this.navigationIdCount + this.NAVIGATION_SKIPS <=
        routerState.navigationId
      ) {
        this.cartValidationResult$.next([]);
      }
    })
  );
}
