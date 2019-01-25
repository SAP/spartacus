import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { PaymentDetails } from '@spartacus/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CartDataService } from '@spartacus/core';
import { masterCardImgSrc } from '../../../../ui/images/masterCard';
import { visaImgSrc } from '../../../../ui/images/visa';
import { UserService } from '@spartacus/core';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodComponent implements OnInit {
  newPaymentFormManuallyOpened = false;
  existingPaymentMethods$: Observable<PaymentDetails[]>;
  cards = [];
  isLoading$: Observable<boolean>;

  @Input()
  selectedPayment: any;
  @Output()
  backStep = new EventEmitter<any>();
  @Output()
  addPaymentInfo = new EventEmitter<any>();

  constructor(
    protected cartData: CartDataService,
    protected userService: UserService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userService.getPaymentMethodsLoading();
    this.userService.loadPaymentMethods(this.cartData.userId);

    this.existingPaymentMethods$ = this.userService.getPaymentMethods().pipe(
      tap(payments => {
        if (this.cards.length === 0) {
          payments.forEach(payment => {
            const card = this.getCardContent(payment);
            if (
              this.selectedPayment &&
              this.selectedPayment.id === payment.id
            ) {
              card.header = 'SELECTED';
            }
          });
        }
      })
    );
  }

  getCardContent(payment): Card {
    let ccImage;
    if (payment.cardType.code === 'visa') {
      ccImage = visaImgSrc;
    } else if (payment.cardType.code === 'master') {
      ccImage = masterCardImgSrc;
    }
    const card: Card = {
      title: payment.defaultPayment ? 'Default Payment Method' : '',
      textBold: payment.accountHolderName,
      text: [
        payment.cardNumber,
        'Expires: ' + payment.expiryMonth + '/' + payment.expiryYear
      ],
      img: ccImage,
      actions: [{ name: 'Use this payment', event: 'send' }]
    };

    this.cards.push(card);
    return card;
  }

  paymentMethodSelected(paymentDetails, index) {
    this.selectedPayment = paymentDetails;

    for (let i = 0; this.cards[i]; i++) {
      const card = this.cards[i];
      if (i === index) {
        card.header = 'SELECTED';
      } else {
        card.header = '';
      }
    }
  }

  next() {
    this.addPaymentInfo.emit({
      payment: this.selectedPayment,
      newPayment: false
    });
  }

  addNewPaymentMethod({ paymentDetails, billingAddress }) {
    this.addPaymentInfo.emit({
      payment: paymentDetails,
      billingAddress,
      newPayment: true
    });
  }

  showNewPaymentForm() {
    this.newPaymentFormManuallyOpened = true;
  }

  hideNewPaymentForm() {
    this.newPaymentFormManuallyOpened = false;
  }

  back() {
    this.backStep.emit();
  }
}
