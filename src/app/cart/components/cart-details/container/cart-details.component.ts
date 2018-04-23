import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromCartStore from '../../../store';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);
  }

  ngOnInit() {
    this.cartService.loadCartDetails();
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
  }
}
