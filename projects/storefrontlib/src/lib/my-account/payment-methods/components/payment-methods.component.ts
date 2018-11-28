import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../ui/components/card/card.component';
import { PaymentMethodsService } from './../services/payment-methods.service';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<any>;
  editCard: string;
  loading$: Observable<boolean>;

  constructor(private paymentMethodsService: PaymentMethodsService) {}

  ngOnInit() {
    this.paymentMethods$ = this.paymentMethodsService.loadUserPaymentMethods();
    this.editCard = null;
    this.loading$ = this.paymentMethodsService.paymentMethodsLoading$;
  }

  getCardContent(payment): Card {
    const actions = [
      payment.defaultPayment
        ? null
        : { name: 'Set as default', event: 'default' },
      { name: 'Delete', event: 'edit' }
    ].filter(Boolean);
    const card: Card = {
      header: payment.defaultPayment ? 'DEFAULT' : null,
      textBold: payment.accountHolderName,
      text: [
        payment.cardNumber,
        `Expires: ${payment.expiryMonth}/${payment.expiryYear}`
      ],
      actions,
      deleteMsg: 'Are you sure you want to delete this payment method?'
    };

    return card;
  }

  deletePaymentMethod(paymentMethod) {
    this.paymentMethodsService.deleteUserPaymentMethod(paymentMethod.id);
    this.editCard = null;
  }

  setEdit(paymentMethod) {
    this.editCard = paymentMethod.id;
  }

  cancelCard() {
    this.editCard = null;
  }

  setDefaultPaymentMethod(paymentMethod) {
    this.paymentMethodsService.setPaymentMethodAsDefault(paymentMethod.id);
  }
}
