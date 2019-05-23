import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, SaveForLaterService } from '@spartacus/core';

@Component({
  selector: 'cx-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cart$: Observable<Cart>;
  sflCart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    protected sflCartService: SaveForLaterService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.sflCart$ = this.sflCartService.getSaveForLater();
  }
}
