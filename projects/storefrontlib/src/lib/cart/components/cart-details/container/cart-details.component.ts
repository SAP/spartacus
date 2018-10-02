import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../store';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;
  cartIsLoading = false;

  constructor(protected store: Store<fromCartStore.CartState>) {}

  ngOnInit() {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);

    this.entries$ = this.store.select(fromCartStore.getEntries);

    this.store
      .select(fromCartStore.getLoaded)
      .subscribe(isLoaded => (this.cartIsLoading = !isLoaded));
  }

  getAllPromotionsForCart(cart) {
    const potentialPromotions = cart.potentialOrderPromotions || [];
    const appliedPromotions = cart.appliedOrderPromotions || [];
    return [...potentialPromotions, ...appliedPromotions];
  }

  cartHasPromotions(cart) {
    const hasPotentialPromotions =
      cart.potentialOrderPromotions && cart.potentialOrderPromotions.length > 0;
    const hasAppliedPromotions =
      cart.appliedOrderPromotions && cart.appliedOrderPromotions.length > 0;
    return hasPotentialPromotions || hasAppliedPromotions;
  }
}
