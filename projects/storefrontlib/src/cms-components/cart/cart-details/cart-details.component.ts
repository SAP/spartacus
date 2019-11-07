import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart, CartService, OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  getAllOrderPromotionsForCart(cart: Cart): PromotionResult[] {
    const potentialPromotions = [];
    potentialPromotions.push(...(cart.potentialOrderPromotions || []));

    const appliedPromotions = [];
    appliedPromotions.push(...(cart.appliedOrderPromotions || []));

    return [...potentialPromotions, ...appliedPromotions];
  }
}
