import { Injectable, OnDestroy } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { MultiCartService, UserIdService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsData } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ImportToCartService implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService
  ) {}

  addProductsToCart(csvData: ProductsData) {
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
            this.multiCartService.addEntries(userId, cartId, csvData);
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
