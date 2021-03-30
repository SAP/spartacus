import { Injectable, OnDestroy } from '@angular/core';
import { MultiCartService, UserIdService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SavedCartService } from './saved-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ImportToCartService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartService
  ) {}

  addProductsToCart(data) {
    const productsToAdd = this.processCsvData(data);
    let userId: string;
    this.userIdService.getUserId().subscribe((data) => {
      userId = data;
      const createdCart = this.multiCartService.createCart({
        userId,

        extraData: { active: false },
      });
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
          // RELOAD SAVED CART HISTORY PAGE
          this.getSummary(cartId, productsToAdd);
        });
    });
  }

  private processCsvData(data) {
    let csvData = [];
    data = data.split('\n');
    for (let i = 0; i < data.length; i++) {
      let row = { productCode: '', quantity: 0 };
      let rowData = data[i].split(',');
      row['productCode'] = rowData[0];
      row['quantity'] = rowData[1];
      csvData.push(row);
    }
    return csvData;
  }

  private getSummary(cartId, csvData) {
    this.subscription = this.multiCartService
      .getEntries(cartId)
      .pipe(
        map((data) => {
          let productsInCart = [];
          data.forEach((entry) => {
            productsInCart.push({
              productCode: entry.product?.code,
              quantity: entry.quantity,
            });
          });
          // this.compareProducts(productsInCart, csvData);
          console.log('PRODUCTS FROM CART: ', productsInCart);
          console.log('PRODUCTS FROM CSV: ', csvData);
        })
      )
      .subscribe();
  }

  // private compareProducts(productsInCart, csvData) {
  // let importSuccess = 0;
  // let importFailed = 0;
  // compare and get the numbers
  // include partial success in success
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
