import { Injectable } from '@angular/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { Cart, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SavedCartDetailsService {
  protected savedCartId$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.savedCartId),
    distinctUntilChanged()
  );

  protected savedCart$ = this.savedCartId$.pipe(
    filter((cartId) => Boolean(cartId)),
    tap((savedCartId: string) =>
      this.savedCartService.loadSavedCart(savedCartId)
    ),
    switchMap((savedCartId: string) => this.savedCartService.get(savedCartId)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected routingService: RoutingService,
    protected savedCartService: SavedCartFacade
  ) {}

  getSavedCartId(): Observable<string> {
    return this.savedCartId$;
  }

  getCartDetails(): Observable<Cart | undefined> {
    return this.savedCart$;
  }
}
