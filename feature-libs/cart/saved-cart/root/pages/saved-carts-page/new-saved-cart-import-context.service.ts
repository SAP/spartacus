import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  MultiCartService,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import {
  ImportContext,
  ProductData,
  ProductImportInfo,
} from '@spartacus/storefront';
import { Observable, queueScheduler } from 'rxjs';
import {
  delayWhen,
  filter,
  map,
  observeOn,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CartImportContext } from '../../../../../../projects/storefrontlib/cms-components/cart/order-entries-context/cart-import.context';
import { CartTypes } from '../../../../../../projects/storefrontlib/cms-components/cart/order-entries-context/import-export.model';

@Injectable({
  providedIn: 'root',
})
export class NewSavedCartImportContext
  extends CartImportContext
  implements ImportContext {
  readonly type = CartTypes.NEW_SAVED_CART;

  constructor(
    protected actionsSubject: ActionsSubject,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade
  ) {
    super(actionsSubject);
  }

  addEntries(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo> {
    return this.add(products, savedCartInfo).pipe(
      switchMap((cartId: string) => this.getResults(cartId)),
      take(products.length)
    );
  }

  protected add(
    products: ProductData[],
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
