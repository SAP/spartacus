import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCartStore from '../../../cart/store';
import { Observable } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'cx-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements OnInit {
  cart$: Observable<any>;

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromCartStore.getCartMergeComplete))
      .subscribe(isCartMergeComplete => {
        if (isCartMergeComplete) {
          this.cartService.loadCartDetails();
        }
      });
    this.cart$ = this.store.pipe(select(fromCartStore.getActiveCart));
  }
}
