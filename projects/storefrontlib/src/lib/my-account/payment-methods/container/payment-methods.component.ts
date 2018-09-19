import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUserStore from '../../../user/store';
import { CheckoutService } from '../../../checkout/services/checkout.service';
import { tap } from 'rxjs/operators';
import { Card } from '../../../ui/components/card/card.component';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'y-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<any>;

  constructor(
    protected store: Store<fromUserStore.UserState>,
    // tslint:disable-next-line:no-unused-variable max-line-length
    private cartService: CartService, // hack: unused, but it has to be created before CheckoutService, because CartService initializes CartDataService
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.paymentMethods$ = this.store
      .select(fromUserStore.getPaymentMethods)
      .pipe(
        tap(paymentMethods => {
          if (!paymentMethods.length) {
            this.checkoutService.loadUserPaymentMethods();
          }
        })
      );
  }

  getCardContent(payment): Card {
    let ccImage;
    if (payment.cardType.code === 'visa') {
      ccImage = 'assets/visa.png';
    } else if (payment.cardType.code === 'master') {
      ccImage = 'assets/masterCard.png';
    }
    const card: Card = {
      header: payment.defaultPayment ? 'DEFAULT' : null,
      textBold: payment.accountHolderName,
      text: [
        payment.cardNumber,
        'Expires: ' + payment.expiryMonth + '/' + payment.expiryYear
      ],
      img: ccImage,
      actions: [{ name: 'DELETE', event: 'delete' }],
      deleteMsg: 'Are you sure you want to delete this payment method?'
    };

    return card;
  }

  deletePaymentMethod(paymentMethod) {
    console.log('TODO: delete payment method in backend'); // TODO delete payment method in backend
  }
}
