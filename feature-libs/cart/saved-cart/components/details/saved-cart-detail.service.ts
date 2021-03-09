import { Injectable } from '@angular/core';
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
import { SavedCartService } from '../../core/services/saved-cart.service';

@Injectable({
  providedIn: 'root',
})
export class SavedCartDetailService {
  protected savedCartId$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.savedCartId),
    distinctUntilChanged()
  );

  protected savedCart$ = this.savedCartId$.pipe(
    filter(Boolean),
    tap((savedCartId: string) =>
      this.savedCartService.loadSavedCart(savedCartId)
    ),
    switchMap((savedCartId: string) => this.savedCartService.get(savedCartId)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected routingService: RoutingService,
    protected savedCartService: SavedCartService
  ) {}

  getSavedCartId(): Observable<string> {
    return this.savedCartId$;
  }

  getCartDetails(): Observable<Cart> {
    return this.savedCart$;
  }
}
