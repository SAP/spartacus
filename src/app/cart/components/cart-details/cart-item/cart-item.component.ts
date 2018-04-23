import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import { CartService } from '../../../services';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {
  cart$;

  constructor(
    protected cartStore: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.loadCartDetails();
    this.cart$ = this.cartStore.select(fromCartStore.getActiveCart);
  }
}
