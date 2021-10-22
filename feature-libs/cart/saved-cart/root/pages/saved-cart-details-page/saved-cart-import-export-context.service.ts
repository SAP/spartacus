import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  Cart,
  MultiCartService,
  OrderEntry,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  CartImportContext,
  CartTypes,
  ExportContext,
  ImportContext,
  ProductData,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { SavedCartFacade } from '../../facade/saved-cart.facade';

@Injectable({
  providedIn: 'root',
})
export class SavedCartImportExportContext
  extends CartImportContext
  implements ImportContext, ExportContext
{
  readonly type = CartTypes.SAVED_CART;

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

  protected add(products: ProductData[]): Observable<string> {
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
