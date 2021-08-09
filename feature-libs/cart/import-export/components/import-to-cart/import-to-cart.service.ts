import { Injectable, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  CartActions,
  MultiCartService,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
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

@Injectable()
export class ImportToCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService,
    protected actionsSubject: ActionsSubject
  ) {}

  loadProductsToCart(
    products: ProductsData,
    savedCartInfo: { name: string; description?: string }
  ) {
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
              // TODO: #13393
              // for active cart use: getCartIdByUserId(cartData, userId)
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo.name,
                saveCartDescription: savedCartInfo.description,
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
            ),
            switchMap((cartId: string) => this.getResults(cartId)),
            take(products.length)
          )
      )
    );
  }

  csvDataToProduct(csvData: string[][]): ProductsData {
    return csvData.map((row: string[]) => ({
      productCode: row[0],
      quantity: Number(row[1]),
    }));
  }

  isDataParsableToProducts(data: string[][]): Boolean {
    const patternRegex = new RegExp(/(?<=\s|^)\d+(?=\s|$)/);
    return data.every((row) => patternRegex.test(row[1]));
  }

  /**
   * Emits `ProductImportInfo` on every added product success or failure
   */
  protected getResults(cartId: string): Observable<ProductImportInfo> {
    return this.actionsSubject.pipe(
      ofType(
        CartActions.CART_ADD_ENTRY_SUCCESS,
        CartActions.CART_ADD_ENTRY_FAIL
      ),
      filter(
        (
          action: CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail
        ) => action.payload.cartId === cartId
      ),
      map((action) => this.mapMessages(action))
    );
  }

  protected mapMessages(
    action: CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail
  ): ProductImportInfo {
    const { productCode } = action.payload;
    if (action instanceof CartActions.CartAddEntrySuccess) {
      const { quantity, quantityAdded, entry, statusCode } = action.payload;
      if (statusCode === ProductImportStatus.LOW_STOCK) {
        return {
          productCode,
          statusCode,
          productName: entry?.product?.name,
          quantity,
          quantityAdded,
        };
      }
      if (statusCode === ProductImportStatus.SUCCESS) {
        return { productCode, statusCode };
      }
    } else if (action instanceof CartActions.CartAddEntryFail) {
      const { error } = action.payload;
      if (error?.details[0]?.type === 'UnknownIdentifierError') {
        return {
          productCode,
          statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
        };
      }
    }
    if (isDevMode()) {
      console.warn(
        'Unrecognized cart add entry action type while mapping messages',
        action
      );
    }
    return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
  }
}
