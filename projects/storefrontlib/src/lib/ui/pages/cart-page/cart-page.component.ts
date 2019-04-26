import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UICart, CartService } from '@spartacus/core';

@Component({
  selector: 'cx-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cart$: Observable<UICart>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
}
