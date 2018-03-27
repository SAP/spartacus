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

  constructor(
    protected cartStore: Store<fromCartStore.CartState>,
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.checkoutService.loadCartDetails();
    this.cart$ = this.cartStore.select(fromCartStore.getActiveCart);
  }
}
