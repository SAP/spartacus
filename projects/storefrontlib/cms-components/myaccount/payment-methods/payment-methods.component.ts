import { Component, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon';
import { Card } from '../../../shared/components/card/card.component';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string;
  iconTypes = ICON_TYPE;
  loading$: Observable<boolean>;

  constructor(
    private userPaymentService: UserPaymentService,
    private translation: TranslationService,
    protected globalMessageService?: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.paymentMethods$ = this.userPaymentService.getPaymentMethods().pipe(
      tap((paymentDetails) => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find((paymentDetail) => paymentDetail.defaultPayment)
        ) {
          this.setDefaultPaymentMethod(paymentDetails[0]);
        }
      })
    );

    this.editCard = null;
    this.loading$ = this.userPaymentService.getPaymentMethodsLoading();
    this.userPaymentService.loadPaymentMethods();
  }

  getCardContent({
    defaultPayment,
    accountHolderName,
    expiryMonth,
    expiryYear,
    cardNumber,
    cardType,
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
            img: this.getCardIcon(cardType.code),
            label: defaultPayment
              ? 'paymentCard.defaultPaymentLabel'
              : 'paymentCard.additionalPaymentLabel',
          };

          return card;
        }
      )
    );
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    this.userPaymentService.deletePaymentMethod(paymentMethod.id);
    this.editCard = null;
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelCard(): void {
    this.editCard = null;
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.userPaymentService.setPaymentMethodAsDefault(paymentMethod.id);
    this.globalMessageService?.add(
      { key: 'messages.setAsDefaultSucessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  getCardIcon(code: string): string {
    let ccIcon: string;
    if (code === 'visa') {
      ccIcon = this.iconTypes.VISA;
    } else if (code === 'master' || code === 'mastercard_eurocard') {
      ccIcon = this.iconTypes.MASTER_CARD;
    } else if (code === 'diners') {
      ccIcon = this.iconTypes.DINERS_CLUB;
    } else if (code === 'amex') {
      ccIcon = this.iconTypes.AMEX;
    } else {
      ccIcon = this.iconTypes.CREDIT_CARD;
    }

    return ccIcon;
  }
}
