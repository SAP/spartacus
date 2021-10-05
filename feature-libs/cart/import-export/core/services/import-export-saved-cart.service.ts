import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
  Cart,
  MultiCartService,
  OrderEntry,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ProductsData } from '@spartacus/cart/import-export/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { AbstractImportExportCartService } from './abstract-import-export-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ImportExportSavedCartService extends AbstractImportExportCartService {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade,
    protected routingService: RoutingService
  ) {
    super(actionsSubject);
  }

  protected savedCartId$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.savedCartId),
    distinctUntilChanged()
  );

  getEntries(): Observable<OrderEntry[]> {
    return this.savedCartId$.pipe(
      switchMap((cartId) => this.savedCartService.get(cartId)),
      map((cart: Cart | undefined) => cart?.entries ?? ([] as OrderEntry[]))
    );
  }

  addEntries(products: ProductsData, _savedCartInfo: any): Observable<string> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.savedCartId$,
    ]).pipe(
      tap(([userId, cartId]) =>
        this.multiCartService.addEntries(userId, cartId, products)
      ),
      map(([_userId, cartId]) => cartId)
    );
  }
}
