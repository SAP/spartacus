import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUserStore from '../../user/store';
import * as fromAuthStore from '../../auth/store';
import { tap } from 'rxjs/operators';
import { Card } from '../../ui/components/card/card.component';

@Component({
  selector: 'y-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<any>;

  constructor(private store: Store<fromUserStore.UserState>) {}

  ngOnInit() {
    this.paymentMethods$ = this.store
      .select(fromUserStore.getPaymentMethods)
      .pipe(
        tap(paymentMethods => {
          if (!paymentMethods.length) {
            this.loadPaymentMethods();
          }
        })
      );
  }

  private loadPaymentMethods() {
    this.store
      .select(fromAuthStore.getUserToken)
      .subscribe(userData => {
        if (userData && userData.userId) {
          this.store.dispatch(
            new fromUserStore.LoadUserPaymentMethods(userData.userId)
          );
        }
      })
      .unsubscribe();
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
        `Expires: ${payment.expiryMonth}/${payment.expiryYear}`
      ],
      img: ccImage,
      actions: [{ name: 'DELETE', event: 'delete' }],
      deleteMsg: 'Are you sure you want to delete this payment method?'
    };

    return card;
  }

  deletePaymentMethod(paymentMethod) {
    // TODO delete payment method in backend
  }
}
