import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
  //   Output,
  //   EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
// import { FormGroup } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';

// import * as fromRouting from '../../../../routing/store';
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
  @Input() cart$;

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
    this.cart$.subscribe(data => console.log(data));
  }
}
