import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromCartStore from '../../../cart/store';
import { CartService } from '../../../cart/services';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent {
  cart$;
  entries$;

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
  }
}
