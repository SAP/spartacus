import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, SaveForLaterService } from '@spartacus/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cart$: Observable<Cart>;
  sflCart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    private sflCartService: SaveForLaterService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.sflCart$ = this.sflCartService
      .getSaveForLater()
      .pipe(tap(c => console.log(JSON.stringify(c))));
  }
}
