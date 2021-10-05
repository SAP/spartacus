import { Injectable, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { combineLatest, Observable, queueScheduler } from 'rxjs';
import {
  delayWhen,
  filter,
  map,
  observeOn,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  ActiveCartService,
  Cart,
  CartActions,
  MultiCartService,
  OrderEntry,
  RoutingService,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
  CartTypes,
} from '@spartacus/cart/import-export/core';

@Injectable()
export class ImportToCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade,
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService,
    protected actionsSubject: ActionsSubject
  ) {}

  loadProductsToCart(
    cartType: CartTypes,
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo> {
    return this.addEntries(cartType, products, savedCartInfo).pipe(
      switchMap((cartId: string) => this.getResults(cartType, cartId)),
      take(products.length)
    );
  }

  protected addEntries(
    cartType: CartTypes,
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<string> {
    switch (cartType) {
      case CartTypes.NEW_SAVED_CART: {
        return this.addEntriesToNewSavedCart(products, savedCartInfo);
      }
      case CartTypes.SAVED_CART: {
        return this.addEntriesToSavedCart(products);
      }
      case CartTypes.ACTIVE_CART:
      default: {
        return this.addEntriesToActiveCart(products);
      }
    }
  }

  protected addEntriesToNewSavedCart(
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

  protected addEntriesToSavedCart(products: ProductsData): Observable<string> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.savedCartDetailsService.getSavedCartId(),
    ]).pipe(
      tap(([userId, cartId]) =>
        this.multiCartService.addEntries(userId, cartId as string, products)
      ),
      map(([, cartId]) => cartId as string)
    );
  }

  protected addEntriesToActiveCart(products: ProductsData): Observable<string> {
    this.activeCartService.addEntries(this.mapProductsToOrderEntries(products));
    return this.activeCartService.getActiveCartId();
  }

  protected mapProductsToOrderEntries(products: ProductsData): OrderEntry[] {
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }

  csvDataToProduct(csvData: string[][]): ProductsData {
    return csvData.map((row: string[]) => ({
      productCode: row[0],
      quantity: Number(row[1]),
    }));
  }

  isDataParsableToProducts(data: string[][]): boolean {
    const patternRegex = new RegExp(/(?:\s|^)\d+(?=\s|$)/);
    return data.length > 0 && data.every((row) => patternRegex.test(row[1]));
  }

  /**
   * Emits `ProductImportInfo` on every added product success or failure
   */
  protected getResults(
    cartType: CartTypes,
    cartId: string
  ): Observable<ProductImportInfo> {
    switch (cartType) {
      case CartTypes.ACTIVE_CART:
      case CartTypes.NEW_SAVED_CART:
      case CartTypes.SAVED_CART:
      default: {
        return this.getCartResults(cartId);
      }
    }
  }

  protected getCartResults(cartId: string): Observable<ProductImportInfo> {
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
      if (
        statusCode === ProductImportStatus.SUCCESS ||
        statusCode === ProductImportStatus.NO_STOCK
      ) {
        return { productCode, statusCode, productName: entry?.product?.name };
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
