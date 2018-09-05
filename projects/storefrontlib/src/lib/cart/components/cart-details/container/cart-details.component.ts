import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
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

  form: FormGroup = this.fb.group({});

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cartService.loadCartDetails();

    this.cart$ = this.store.select(fromCartStore.getActiveCart);

    this.entries$ = this.store.select(fromCartStore.getEntries);
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
  }

  updateEntry({ entry, updatedQuantity }) {
    this.cartService.updateCartEntry(entry.entryNumber, updatedQuantity);
  }

  getAllPromotionsForCart(cart) {
    const potentialPromotions = cart.potentialProductPromotions || [];
    const appliedPromotions = cart.appliedProductPromotions || [];
    return [
      ...potentialPromotions,
      ...appliedPromotions,
    ];
  }

  cartHasPromotions(cart) {
    const hasPotentialPromotions = cart.potentialProductPromotions
      && cart.potentialProductPromotions.length > 0;
    const hasAppliedPromotions = cart.appliedProductPromotions
      && cart.appliedProductPromotions.length > 0;
    return hasPotentialPromotions || hasAppliedPromotions;
  }
}
