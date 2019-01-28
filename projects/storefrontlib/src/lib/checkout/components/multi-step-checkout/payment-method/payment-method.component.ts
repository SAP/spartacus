import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { PaymentDetails, Address } from '@spartacus/core';
import { CartDataService } from '@spartacus/core';
import { UserService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { masterCardImgSrc } from '../../../../ui/images/masterCard';
import { visaImgSrc } from '../../../../ui/images/visa';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  newPaymentFormManuallyOpened = false;
  existingPaymentMethods$: Observable<PaymentDetails[]>;
  cards: Card[] = [];
  isLoading$: Observable<boolean>;

  @Input()
  selectedPayment: PaymentDetails;
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

  getCardContent(payment: PaymentDetails): Card {
    let ccImage: string;
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

  paymentMethodSelected(paymentDetails: PaymentDetails, index: number) {
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

  next(): void {
    this.addPaymentInfo.emit({
      payment: this.selectedPayment,
      newPayment: false
    });
  }

  addNewPaymentMethod({
    paymentDetails,
    billingAddress
  }: {
    paymentDetails: PaymentDetails;
    billingAddress: Address;
  }): void {
    this.addPaymentInfo.emit({
      payment: paymentDetails,
      billingAddress,
      newPayment: true
    });
  }

  showNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = true;
  }

  hideNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = false;
  }

  back(): void {
    this.backStep.emit();
  }
}
