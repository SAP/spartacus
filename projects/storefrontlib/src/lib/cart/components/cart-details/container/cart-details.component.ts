import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCartStore from '../../../store';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;
  cartLoaded$;

  constructor(protected store: Store<fromCartStore.CartState>) {}

  ngOnInit() {
    this.cart$ = this.store.pipe(select(fromCartStore.getActiveCart));
    this.entries$ = this.store.pipe(select(fromCartStore.getEntries));
    this.cartLoaded$ = this.store.pipe(select(fromCartStore.getLoaded));
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
