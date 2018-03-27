import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import * as fromAuthStore from '../../../../auth/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent implements OnInit {
  cart$;

  cart;
  userId;
  callback: Function;

  constructor(
    private cartStore: Store<fromCartStore.CartState>,
    protected authStore: Store<fromAuthStore.UserState>
  ) {}

  ngOnInit() {
    this.cartStore.select(fromCartStore.getActiveCart).subscribe(cart => {
      this.cart = cart;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.authStore.select(fromAuthStore.getUserToken).subscribe(userToken => {
      this.userId = userToken.userId;
    });

    this.cartStore.dispatch(
      new fromCartStore.LoadCart({
        userId: this.userId,
        cartId: this.cart.code,
        details: true
      })
    );
    this.cart$ = this.cartStore.select(fromCartStore.getActiveCart);
  }
}
