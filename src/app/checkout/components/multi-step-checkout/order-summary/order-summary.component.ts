import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import * as fromAuthStore from '../../../../auth/store';
import { CheckoutService } from '../../../services';

@Component({
  selector: 'y-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent implements OnInit {
  cart$;

  cartId;
  userId;

  constructor(
    protected cartStore: Store<fromCartStore.CartState>,
    protected authStore: Store<fromAuthStore.UserState>,
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.cartStore.select(fromCartStore.getActiveCart).subscribe(cart => {
      this.cartId = cart.code;
    });

    this.authStore.select(fromAuthStore.getUserToken).subscribe(userToken => {
      this.userId = userToken.userId;
    });

    this.checkoutService.loadCartDetails(this.userId, this.cartId);

    this.cart$ = this.cartStore.select(fromCartStore.getActiveCart);
  }
}
