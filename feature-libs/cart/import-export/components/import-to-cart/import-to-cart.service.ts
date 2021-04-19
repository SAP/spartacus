import { Injectable } from '@angular/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
  Cart,
  MultiCartService,
  UserIdService,
  StateUtils,
} from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  ProductsData,
  ImportService,
} from '@spartacus/cart/import-export/core';

@Injectable({
  providedIn: 'root',
})
export class ImportToCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService,
    protected importService: ImportService
  ) {}

  loadProductsToCart(file: FileList) {
    this.importService
      .loadFile(file)
      .pipe(
        map((productsData: string[][]) => this.csvDataToProduct(productsData)),
        switchMap((products: ProductsData) =>
          this.userIdService.takeUserId().pipe(
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
                    const cartId = cartData.value?.code;
                    if (cartId !== undefined)
                      this.multiCartService.addEntries(
                        userId,
                        cartId,
                        products
                      );
                    // TODO: what will be name & description? Maybe we should display some modal and ask about it? What about filename?
                    this.savedCartService.saveCart({
                      cartId,
                      saveCartName: 'imported cart',
                      saveCartDescription: 'imported cart',
                    });
                    this.savedCartService.loadSavedCarts();
                  })
                )
            )
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
