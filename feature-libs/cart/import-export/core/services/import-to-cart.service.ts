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

  addProductsToCart(data: string) {
    const productsToAdd = this.processCsvData(data);
    this.userIdService.invokeWithUserId((userId) => {
      const createdCart = this.multiCartService.createCart({
        userId,
        extraData: { active: false },
      });
      this.subscription.add(
        createdCart
          .pipe(filter((data) => data.value !== undefined))
          .subscribe((data) => {
            let cartId: string;
            cartId = data.value?.code as string;
            this.multiCartService.addEntries(userId, cartId, productsToAdd);
            this.savedCartService.saveCart({
              cartId,
              saveCartName: 'imported saved cart',
            });
            this.savedCartService.loadSavedCarts();
          })
      );
    });
  }

  private processCsvData(data: string): ProductsData {
    let csvData = [];
    const dataArray = data.split('\n');
    for (let i = 0; i < dataArray.length; i++) {
      let row = { productCode: '', quantity: 0 };
      let rowData = dataArray[i].split(',');
      row['productCode'] = rowData[0];
      row['quantity'] = Number(rowData[1]);
      csvData.push(row);
    }
    return csvData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
