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
                  cartData.value !== undefined
              ),
              tap((cartData: StateUtils.ProcessesLoaderState<Cart>) => {
                const cartId: string = cartData.value?.code ?? '';
                if (cartId !== '')
                  this.multiCartService.addEntries(userId, cartId, products);
                // TODO: what will be name & description? Maybe we should display some modal and ask about it? What about filename?
                this.savedCartService.saveCart({
                  cartId,
                  saveCartName: savedCartInfo.name,
                  saveCartDescription: savedCartInfo.description,
                });
                this.savedCartService.loadSavedCarts();
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
}
