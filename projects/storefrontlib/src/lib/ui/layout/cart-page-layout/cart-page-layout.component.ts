import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCartStore from '../../../cart/store';
import * as fromUserStore from '../../../auth/store';
import { Subscription, Observable } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'y-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements OnInit {
  cart$: Observable<any>;
  subscription: Subscription;

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {}

  ngOnInit() {
    this.store.pipe(select(fromUserStore.getUserToken)).subscribe(token => {
      if (token.access_token) {
        this.cartService.loadCartDetails();
      }
    });
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
  }
}
