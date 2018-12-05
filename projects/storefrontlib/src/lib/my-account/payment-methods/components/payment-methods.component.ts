import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../ui/components/card/card.component';
import { UserService } from './../../../user/facade/user.service';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<any>;
  editCard: string;
  loading$: Observable<boolean>;
  userId: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.paymentMethods$ = this.userService.paymentMethods$;
    this.editCard = null;
    this.loading$ = this.userService.paymentMethodsLoading$;
    this.userService.user$.subscribe(data => {
      this.userId = data.uid;
      this.userService.loadPaymentMethods(this.userId);
    });
  }

  getCardContent({
    defaultPayment,
    accountHolderName,
    expiryMonth,
    expiryYear,
    cardNumber
  }): Card {
    const actions = [];
    if (!defaultPayment) {
      actions.push({ name: 'Set as default', event: 'default' });
    }
    actions.push({ name: 'Delete', event: 'edit' });
    const card: Card = {
      header: defaultPayment ? 'DEFAULT' : null,
      textBold: accountHolderName,
      text: [cardNumber, `Expires: ${expiryMonth}/${expiryYear}`],
      actions,
      deleteMsg: 'Are you sure you want to delete this payment method?'
    };

    return card;
  }

  deletePaymentMethod(paymentMethod) {
    if (this.userId) {
      this.userService.deleteUserPaymentMethod(this.userId, paymentMethod.id);
    }
    this.editCard = null;
  }

  setEdit(paymentMethod) {
    this.editCard = paymentMethod.id;
  }

  cancelCard() {
    this.editCard = null;
  }

  setDefaultPaymentMethod(paymentMethod) {
    if (this.userId) {
      this.userService.setPaymentMethodAsDefault(this.userId, paymentMethod.id);
    }
  }
}
