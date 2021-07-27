import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import {
  Cart,
  MultiCartService,
  UserIdService,
  StateUtils,
} from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { ProductsData } from '@spartacus/cart/import-export/core';

@Injectable()
export class ImportToCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService
  ) {}

  loadProductsToCart(
    productsData: string[][],
    savedCartInfo: { name: string; description?: string }
  ) {
    const products = this.csvDataToProduct(productsData);

    return this.userIdService.takeUserId().pipe(
      switchMap((userId) =>
        this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            filter(
              (cartData: StateUtils.ProcessesLoaderState<Cart>) =>
                cartData.value?.code !== undefined
            ),
            switchMap((cartData: StateUtils.ProcessesLoaderState<Cart>) => {
              const cartId: string = cartData.value.code;
              this.multiCartService.addEntries(userId, cartId, products);
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo.name,
                saveCartDescription: savedCartInfo.description,
              });
              this.savedCartService.loadSavedCarts();
              return this.getSummary(cartId);
            })
          )
      )
    );
  }

  protected csvDataToProduct(csvData: string[][]): ProductsData {
    return csvData.map((row: string[]) => ({
      productCode: row[0],
      quantity: Number(row[1]),
    }));
  }

  isDataParsable(data: string[][]): Boolean {
    const patternRegex = new RegExp(/(?<=\s|^)\d+(?=\s|$)/);
    return data.every((row) => patternRegex.test(row[1]));
  }

  getSummary(cartId: string) {
    return this.multiCartService.getCartEntity(cartId).pipe(
      map((cart: StateUtils.ProcessesLoaderState<Cart>) =>
        cart.errorDetails?.map((details) => details.message)
      ),
      distinctUntilChanged((prev, next) => prev.toString() === next.toString())
    );
  }
}
