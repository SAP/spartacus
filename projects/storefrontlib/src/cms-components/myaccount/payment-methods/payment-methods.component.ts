import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PaymentDetails,
  TranslationService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card } from '../../../shared/components/card/card.component';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string;
  loading$: Observable<boolean>;

  userServiceSub: Subscription;

  constructor(
    private userService: UserService,
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.paymentMethods$ = this.userService.getPaymentMethods().pipe(
      tap(paymentDetails => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find(paymentDetail => paymentDetail.defaultPayment)
        ) {
          this.setDefaultPaymentMethod(paymentDetails[0]);
        }
      })
    );

    this.editCard = null;
    this.loading$ = this.userService.getPaymentMethodsLoading();
    this.userService.loadPaymentMethods();
  }

  getCardContent({
    defaultPayment,
    accountHolderName,
    expiryMonth,
    expiryYear,
    cardNumber,
  }: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.deleteConfirmation'),
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(
        ([
          textSetAsDefault,
          textDelete,
          textDeleteConfirmation,
          textExpires,
          textDefaultPaymentMethod,
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'edit' });
          const card: Card = {
            header: defaultPayment ? textDefaultPaymentMethod : null,
            textBold: accountHolderName,
            text: [cardNumber, textExpires],
            actions,
            deleteMsg: textDeleteConfirmation,
          };

          return card;
        }
      )
    );
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    this.userService.deletePaymentMethod(paymentMethod.id);
    this.editCard = null;
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelCard(): void {
    this.editCard = null;
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.userService.setPaymentMethodAsDefault(paymentMethod.id);
  }

  ngOnDestroy(): void {
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
  }
}
