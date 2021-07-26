import { Injectable } from '@angular/core';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import {
  Cart,
  MultiCartService,
  UserIdService,
  StateUtils,
} from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { ProductsData } from '@spartacus/cart/import-export/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ProcessesLoaderState } from '../../../../../projects/core/src/state/utils/processes-loader';

@Injectable()
export class ImportToCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService,
    protected launchDialogService: LaunchDialogService
  ) {}

  loadProductsToCart(
    productsData: string[][],
    savedCartInfo: { name: string; description?: string }
  ) {
    const products = this.csvDataToProduct(productsData);

    this.userIdService
      .takeUserId()
      .pipe(
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
              tap((cartData: StateUtils.ProcessesLoaderState<Cart>) => {
                const cartId: string = cartData.value.code;
                this.multiCartService.addEntries(userId, cartId, products);
                this.savedCartService.saveCart({
                  cartId,
                  saveCartName: savedCartInfo.name,
                  saveCartDescription: savedCartInfo.description,
                });
                this.savedCartService.loadSavedCarts();
                this.getSummary(cartId, products);
                // this.launchDialogService.closeDialog(
                //   'Close Import Products Dialog'
                // );
              })
            )
        ),
        take(1)
      )
      .subscribe();
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

  getSummary(cartId: string, products: ProductsData) {
    this.multiCartService
      .getCartEntity(cartId)
      .pipe(
        tap((cart: ProcessesLoaderState<Cart>) => {
          console.log(
            'getSummary',
            products,
            cart.errorDetails?.map((error) => error.message)
          );
        })
      )
      .subscribe();
  }
}
