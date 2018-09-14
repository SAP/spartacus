import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckoutService } from '../../../checkout/services/checkout.service';
import { tap } from 'rxjs/operators';
import * as fromUserStore from '../../../user/store';

@Component({
  selector: 'y-payment-management-page-layout',
  templateUrl: './payment-management-page-layout.component.html',
  styles: ['./payment-management-page-layout.scss']
})
export class PaymentManagementPageLayoutComponent implements OnInit {
  existingPaymentMethods$: Observable<any>;

  constructor(
    private store: Store<fromUserStore.UserState>,
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
