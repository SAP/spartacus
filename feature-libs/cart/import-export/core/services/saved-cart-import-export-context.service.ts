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
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { ProductsData } from '../model/import-to-cart.model';
import { CartTypes } from '../model/import-export.model';
import { ImportExportContext } from './import-export.context';
import { CartImportExportContext } from './cart-import-export.context';

@Injectable({
  providedIn: 'root',
})
export class SavedCartImportExportContext
  extends CartImportExportContext
  implements ImportExportContext
{
  constructor(
    protected actionsSubject: ActionsSubject,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade,
    protected routingService: RoutingService
  ) {
    super(actionsSubject);
  }
  type = CartTypes.SAVED_CART;

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

  protected add(products: ProductsData): Observable<string> {
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
