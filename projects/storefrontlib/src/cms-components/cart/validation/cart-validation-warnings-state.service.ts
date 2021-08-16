import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, take, tap } from 'rxjs/operators';
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

  cartValidationResult$ = new Subject<CartModification[]>();
  checkoutRouteActivated$ = new BehaviorSubject<boolean>(false);

  checkForValidationResultClear$ = this.routingService.getRouterState().pipe(
    skip(this.NAVIGATION_SKIPS),
    tap((routerState) => {
      if (
        this.navigationIdCount + this.NAVIGATION_SKIPS <=
        routerState.navigationId
      ) {
        this.cartValidationResult$.next([]);
        this.navigationIdCount = routerState.navigationId;
      }
    })
  );
}
