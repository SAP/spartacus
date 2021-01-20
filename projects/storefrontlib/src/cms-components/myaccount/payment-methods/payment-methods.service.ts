import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { Card } from '../../../shared';
import { ICON_TYPE } from '../../misc';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  loading$: Observable<
    boolean
  > = this.userPaymentService.getPaymentMethodsLoading();
  editCard: string = null;

  constructor(
    protected userPaymentService: UserPaymentService,
    protected translation: TranslationService
  ) {
    this.userPaymentService.loadPaymentMethods();
  }

  get(): Observable<PaymentDetails[]> {
    return this.userPaymentService.getPaymentMethods().pipe(
      tap((paymentDetails) => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find((paymentDetail) => paymentDetail.defaultPayment)
        ) {
          this.setDefault(paymentDetails[0]);
        }
      })
    );
  }

  getCardContent(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.deleteConfirmation'),
      this.translation.translate('paymentCard.expires', {
        month: paymentDetails.expiryMonth,
        year: paymentDetails.expiryYear,
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
          if (!paymentDetails.defaultPayment) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'edit' });
          const card: Card = {
            header: paymentDetails.defaultPayment
              ? textDefaultPaymentMethod
              : null,
            textBold: paymentDetails.accountHolderName,
            text: [paymentDetails.cardNumber, textExpires],
            actions,
            deleteMsg: textDeleteConfirmation,
            img: this.getCardIcon(paymentDetails.cardType.code),
          };

          return card;
        }
      )
    );
  }

  delete(paymentMethod: PaymentDetails): void {
    this.userPaymentService.deletePaymentMethod(paymentMethod.id);
    this.editCard = null;
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelEdit(): void {
    this.editCard = null;
  }

  setDefault(paymentMethod: PaymentDetails): void {
    this.userPaymentService.setPaymentMethodAsDefault(paymentMethod.id);
  }

  getCardIcon(code: string): ICON_TYPE {
    let ccIcon: ICON_TYPE;
    if (code === 'visa') {
      ccIcon = ICON_TYPE.VISA;
    } else if (code === 'master' || code === 'mastercard_eurocard') {
      ccIcon = ICON_TYPE.MASTER_CARD;
    } else if (code === 'diners') {
      ccIcon = ICON_TYPE.DINERS_CLUB;
    } else if (code === 'amex') {
      ccIcon = ICON_TYPE.AMEX;
    } else {
      ccIcon = ICON_TYPE.CREDIT_CARD;
    }

    return ccIcon;
  }
}
