import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Observable, of, queueScheduler } from 'rxjs';
import {
  delayWhen,
  filter,
  map,
  observeOn,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  Cart,
  MultiCartService,
  OrderEntry,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { CartTypes } from '../model/import-export.model';
import { ProductsData } from '../model/import-to-cart.model';
import { CartImportExportContext } from './cart-import-export.context';
import { ImportExportContext } from './import-export.context';

@Injectable({
  providedIn: 'root',
})
export class NewSavedCartImportExportContext
  extends CartImportExportContext
  implements ImportExportContext
{
  constructor(
    protected actionsSubject: ActionsSubject,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade
  ) {
    super(actionsSubject);
  }
  type = CartTypes.NEW_SAVED_CART;

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  protected add(
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) =>
        this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            filter((cartData: StateUtils.ProcessesLoaderState<Cart>) =>
              Boolean(cartData.value?.code)
            ),
            map(
              (cartData: StateUtils.ProcessesLoaderState<Cart>) =>
                cartData.value?.code as string
            ),
            tap((cartId: string) => {
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
              });
              this.savedCartService.loadSavedCarts();
            }),
            observeOn(queueScheduler),
            delayWhen(() =>
              this.savedCartService
                .getSaveCartProcessLoading()
                .pipe(filter((loading) => !loading))
            ),
            tap((cartId: string) =>
              this.multiCartService.addEntries(userId, cartId, products)
            )
          )
      )
    );
  }
}
