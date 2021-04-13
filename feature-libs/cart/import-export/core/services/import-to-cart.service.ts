import { Injectable, OnDestroy } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  MultiCartService,
  ProductReviewService,
  ProductService,
  UserIdService,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsData } from '../model';
import { ImportExportService } from './import-export.service';

@Injectable({
  providedIn: 'root',
})
export class ImportToCartService implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService,
    protected currentProductService: CurrentProductService,
    protected productService: ProductService,
    protected productReviewService: ProductReviewService,
    protected importExportService: ImportExportService
  ) {}

  csvToData(file: FileList): Observable<ProductsData | unknown> {
    return this.importExportService.csvToData(
      file,
      { sku: 'string', quantity: 'number' },
      true,
      {
        maxSize: 1,
        allowedExtensions: ['text/csv'],
        checkEmptyFile: true,
      }
    );
  }

  loadProductsToCart(productsToLoad: ProductsData): void {
    this.userIdService.invokeWithUserId((userId) => {
      const createdCart = this.multiCartService.createCart({
        userId,
        extraData: { active: false },
      });
      this.subscription.add(
        createdCart
          .pipe(filter((data) => data.value !== undefined))
          .subscribe((data) => {
            const cartId: string = data.value?.code as string;
            this.multiCartService.addEntries(userId, cartId, productsToLoad);
            this.savedCartService.saveCart({
              cartId,
              saveCartName: 'imported cart',
            });
            this.savedCartService.loadSavedCarts();
          })
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
