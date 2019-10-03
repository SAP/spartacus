import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
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
  CartService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
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
  selectedPayment: PaymentDetails;
  allowRouting: boolean;
  isGuestCheckout = false;

  private getPaymentDetailsSub: Subscription;

  private deliveryAddress: Address;
  private checkoutStepUrlNext: string;
  private checkoutStepUrlPrevious: string;

  constructor(
    userPaymentService: UserPaymentService,
    checkoutService: CheckoutService,
    checkoutDeliveryService: CheckoutDeliveryService,
    checkoutPaymentService: CheckoutPaymentService,
    globalMessageService: GlobalMessageService,
    routingService: RoutingService,
    checkoutConfigService: CheckoutConfigService,
    activatedRoute: ActivatedRoute,
    translation: TranslationService,
    cartService: CartService // tslint:disable-line
  );
  /**
   * @deprecated since 1.x
   * NOTE: check issue:#1181 for more info
   *
   * TODO(issue:#1181) Deprecated since 1.x
   */
  constructor(
    userPaymentService: UserPaymentService,
    checkoutService: CheckoutService,
    checkoutDeliveryService: CheckoutDeliveryService,
    checkoutPaymentService: CheckoutPaymentService,
    globalMessageService: GlobalMessageService,
    routingService: RoutingService,
    checkoutConfigService: CheckoutConfigService,
    activatedRoute: ActivatedRoute,
    translation: TranslationService
  );
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
    protected cartService?: CartService
  ) {}

  ngOnInit() {
    this.allowRouting = false;
    this.isLoading$ = this.userPaymentService.getPaymentMethodsLoading();

    if (!this.cartService.isGuestCart()) {
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
    this.getPaymentDetailsSub = this.checkoutPaymentService
      .getPaymentDetails()
      .pipe(
        filter(paymentInfo => paymentInfo && !!Object.keys(paymentInfo).length)
      )
      .subscribe(paymentInfo => {
        if (this.allowRouting) {
          this.routingService.go(this.checkoutStepUrlNext);
        }
        if (!paymentInfo['hasError']) {
          this.selectedPayment = paymentInfo;
        } else {
          Object.keys(paymentInfo).forEach(key => {
            if (key.startsWith('InvalidField')) {
              this.globalMessageService.add(
                {
                  key: 'paymentMethods.invalidField',
                  params: { field: paymentInfo[key] },
                },
                GlobalMessageType.MSG_TYPE_ERROR
              );
            }
          });
          this.checkoutService.clearCheckoutStep(3);
        }
      });
  }

  getCardContent(payment: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.expires', {
        month: payment.expiryMonth,
        year: payment.expiryYear,
      }),
      this.translation.translate('paymentForm.useThisPayment'),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
      this.translation.translate('paymentCard.selected'),
    ]).pipe(
      map(
        ([
          textExpires,
          textUseThisPayment,
          textDefaultPaymentMethod,
          textSelected,
        ]) => {
          const card: Card = {
            title: payment.defaultPayment ? textDefaultPaymentMethod : '',
            textBold: payment.accountHolderName,
            text: [payment.cardNumber, textExpires],
            img: this.getCardIcon(payment.cardType.code),
            actions: [{ name: textUseThisPayment, event: 'send' }],
          };
          if (!this.selectedPayment && payment.defaultPayment) {
            this.selectedPayment = payment;
          }
          if (this.selectedPayment && this.selectedPayment.id === payment.id) {
            card.header = textSelected;
          }
          return card;
        }
      )
    );
  }

  paymentMethodSelected(paymentDetails: PaymentDetails) {
    this.selectedPayment = paymentDetails;
  }

  showNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = true;
  }

  hideNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = false;
  }

  next(): void {
    this.setPaymentDetails({
      paymentDetails: this.selectedPayment,
      isNewPayment: false,
    });
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
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
    } else if (this.selectedPayment && this.selectedPayment.id === details.id) {
      this.checkoutPaymentService.setPaymentDetails(details);
    }

    this.allowRouting = true;
  }

  ngOnDestroy(): void {
    if (this.getPaymentDetailsSub) {
      this.getPaymentDetailsSub.unsubscribe();
    }
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
}
