import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckoutService } from '../../../checkout/services/checkout.service';
import { tap } from 'rxjs/operators';
import * as fromUserStore from '../../../user/store';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'y-payment-management-page-layout',
  templateUrl: './payment-management-page-layout.component.html',
  styles: ['./payment-management-page-layout.scss']
})
export class PaymentManagementPageLayoutComponent implements OnInit {
  existingPaymentMethods$: Observable<any>;

  constructor(
    private store: Store<fromUserStore.UserState>,
    // spike-new:
    // tslint:disable-next-line:no-unused-variable max-line-length
    private cartService: CartService, // hack: unused, but it has to be created before CheckoutService, because CartService initializes CartDataService
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.existingPaymentMethods$ = this.store
      .select(fromUserStore.getPaymentMethods)
      .pipe(
        tap(payments => {
          if (payments.length === 0) {
            this.checkoutService.loadUserPaymentMethods();
          }
        })
      );
  }
}
