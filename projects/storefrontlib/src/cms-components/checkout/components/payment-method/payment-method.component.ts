import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  Address,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { ICON_TYPE } from '../../../misc/icon';
import { CheckoutConfigService } from '../../services/checkout-config.service';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  newPaymentFormManuallyOpened = false;
  existingPaymentMethods$: Observable<PaymentDetails[]>;
  isLoading$: Observable<boolean>;
  allowRouting: boolean;
  isGuestCheckout = false;
  cards$: Observable<{ card: Card; paymentMethod: PaymentDetails }[]>;
  selectedMethod$: Observable<PaymentDetails>;

  private deliveryAddress: Address;
  private checkoutStepUrlNext: string;
  private checkoutStepUrlPrevious: string;

  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutService: CheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService
  ) {}

  ngOnInit() {
    this.allowRouting = false;
    this.isLoading$ = this.userPaymentService.getPaymentMethodsLoading();

    if (!this.activeCartService.isGuestCart()) {
      this.userPaymentService.loadPaymentMethods();
    } else {
      this.isGuestCheckout = true;
    }

    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );

    this.checkoutDeliveryService
      .getDeliveryAddress()
      .pipe(take(1))
      .subscribe((address: Address) => {
        this.deliveryAddress = address;
      });

    this.existingPaymentMethods$ = this.userPaymentService.getPaymentMethods();
    this.selectedMethod$ = this.checkoutPaymentService.getPaymentDetails().pipe(
      tap((paymentInfo) => {
        console.log(paymentInfo);
        if (paymentInfo && !!Object.keys(paymentInfo).length) {
          if (this.allowRouting) {
            this.routingService.go(this.checkoutStepUrlNext);
          }
          if (paymentInfo['hasError']) {
            Object.keys(paymentInfo).forEach((key) => {
              if (key.startsWith('InvalidField')) {
                this.sendPaymentMethodFailGlobalMessage(paymentInfo[key]);
              }
            });
            this.checkoutService.clearCheckoutStep(3);
          }
        }
      })
    );

    this.cards$ = combineLatest([
      this.existingPaymentMethods$.pipe(
        switchMap((methods) => {
          return !methods || !methods.length
            ? of([])
            : combineLatest(
                methods.map((method) =>
                  combineLatest([
                    of(method),
                    this.translation.translate('paymentCard.expires', {
                      month: method.expiryMonth,
                      year: method.expiryYear,
                    }),
                  ]).pipe(
                    map(([method, translation]) => ({
                      payment: method,
                      expiryTranslation: translation,
                    }))
                  )
                )
              );
        })
      ),
      this.selectedMethod$,
      this.translation.translate('paymentForm.useThisPayment'),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
      this.translation.translate('paymentCard.selected'),
    ]).pipe(
      map(
        ([
          paymentMethods,
          selectedMethod,
          textUseThisPayment,
          textDefaultPaymentMethod,
          textSelected,
        ]) => {
          console.log(paymentMethods);
          if (
            paymentMethods.length &&
            (!selectedMethod || Object.keys(selectedMethod).length === 0)
          ) {
            const defaultPaymentMethod = paymentMethods.find(
              (paymentMethod) => paymentMethod.payment.defaultPayment
            );
            selectedMethod = defaultPaymentMethod.payment;
            this.checkoutPaymentService.setPaymentDetails(selectedMethod);
          }
          return paymentMethods.map((payment) => ({
            card: this.createCard(
              payment.payment,
              {
                textExpires: payment.expiryTranslation,
                textUseThisPayment,
                textDefaultPaymentMethod,
                textSelected,
              },
              selectedMethod
            ),
            paymentMethod: payment.payment,
          }));
        }
      )
    );
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    this.checkoutPaymentService.setPaymentDetails(paymentDetails);
  }

  showNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = true;
  }

  hideNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = false;
  }

  setPaymentDetails({
    paymentDetails,
    billingAddress,
    isNewPayment = true,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress?: Address;
    isNewPayment?: boolean;
  }): void {
    const details: PaymentDetails = { ...paymentDetails };
    details.billingAddress = billingAddress || this.deliveryAddress;

    if (isNewPayment) {
      this.checkoutPaymentService.createPaymentDetails(details);
    }
    // } else if (this.selectedPayment && this.selectedPayment.id === details.id) {
    //   this.checkoutPaymentService.setPaymentDetails(details);
    // }

    this.allowRouting = true;
  }

  ngOnDestroy(): void {
    this.checkoutPaymentService.paymentProcessSuccess();
  }

  protected getCardIcon(code: string): string {
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

  protected sendPaymentMethodFailGlobalMessage(msg: string) {
    this.globalMessageService.add(
      {
        key: 'paymentMethods.invalidField',
        params: { field: msg },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected createCard(paymentDetails, cardLabels, selected): Card {
    return {
      title: paymentDetails.defaultPayment
        ? cardLabels.textDefaultPaymentMethod
        : '',
      textBold: paymentDetails.accountHolderName,
      text: [paymentDetails.cardNumber, cardLabels.textExpires],
      img: this.getCardIcon(paymentDetails.cardType.code),
      actions: [{ name: cardLabels.textUseThisPayment, event: 'send' }],
      header:
        selected && selected.id === paymentDetails.id
          ? cardLabels.textSelected
          : undefined,
    };
  }

  goNext(): void {
    // this.setPaymentDetails({
    //   paymentDetails: this.selectedPayment,
    //   isNewPayment: false,
    // });
  }

  goPrevious(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }
}
