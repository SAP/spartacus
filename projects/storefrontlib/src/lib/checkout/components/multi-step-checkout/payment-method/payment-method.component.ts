import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import * as fromUserStore from '../../../../user/store';
import { CheckoutService } from '../../../services/checkout.service';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodComponent implements OnInit {
  isPaymentForm = false;
  existingPaymentMethods$;

  @Output() backStep = new EventEmitter<any>();
  @Output() addPaymentInfo = new EventEmitter<any>();

  constructor(
    protected store: Store<fromUserStore.UserState>,
    protected checkoutService: CheckoutService
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

  paymentMethodSelected(paymentDetails) {
    this.addPaymentInfo.emit({ payment: paymentDetails, newPayment: false });
  }

  addNewPaymentMethod(paymentDetails) {
    this.addPaymentInfo.emit({ payment: paymentDetails, newPayment: true });
  }

  goToPaymentForm() {
    this.isPaymentForm = true;
  }

  backToPaymentMethod() {
    this.isPaymentForm = false;
  }

  back() {
    this.backStep.emit();
  }
}
