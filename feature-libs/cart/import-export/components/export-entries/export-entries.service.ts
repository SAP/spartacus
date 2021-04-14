import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  RoutingService,
} from '@spartacus/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.routingService.getRouterState().pipe(
      switchMap((route) => {
        switch (route.state?.semanticRoute) {
          case 'savedCartsDetails':
            return this.savedCartDetailsService
              .getCartDetails()
              .pipe(
                map(
                  (cart: Cart | undefined) =>
                    cart?.entries ?? ([] as OrderEntry[])
                )
              );
          case 'cart':
            return this.activeCartService.getEntries();
          default:
            return this.activeCartService.getEntries();
        }
      }),
      filter((entries) => entries?.length > 0)
    );
  }
}
