import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Cart, CartService } from '@spartacus/core';

@Component({
  selector: 'cx-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  subscription: Subscription;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.subscription = this.cartService
      .getCartMergeComplete()
      .pipe(
        filter(isCartMergeComplete => isCartMergeComplete),
        take(1)
      )
      .subscribe(() => {
        this.cartService.loadDetails();
      });
    this.cart$ = this.cartService.getActive();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
