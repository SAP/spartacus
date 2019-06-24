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
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { ICON_TYPE } from '../../../misc/icon';
import { CheckoutConfigService } from '../../checkout-config.service';

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
  newPayment = false;

  private getPaymentDetailsSub: Subscription;
  private getDeliveryAddressSub: Subscription;

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
    protected translation: TranslationService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userPaymentService.getPaymentMethodsLoading();
    this.userPaymentService.loadPaymentMethods();

    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );

    this.getDeliveryAddressSub = this.checkoutDeliveryService
      .getDeliveryAddress()
      .subscribe((address: Address) => {
        this.deliveryAddress = address;
      });

    this.existingPaymentMethods$ = this.userPaymentService.getPaymentMethods();
    this.getPaymentDetailsSub = this.checkoutPaymentService
      .getPaymentDetails()
      .pipe(
        filter(
          paymentInfo => paymentInfo && Object.keys(paymentInfo).length !== 0
        ),
        tap(paymentInfo => {
          if (paymentInfo === this.selectedPayment || this.newPayment) {
            this.routingService.go(this.checkoutStepUrlNext);
          }
        })
      )
      .subscribe(paymentInfo => {
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
    this.addPaymentInfo({
      payment: this.selectedPayment,
      newPayment: false,
    });
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }

  addNewPaymentMethod({
    paymentDetails,
    billingAddress,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress: Address;
  }): void {
    this.addPaymentInfo({
      payment: paymentDetails,
      billingAddress,
      newPayment: true,
    });
  }

  addPaymentInfo({
    newPayment,
    payment,
    billingAddress,
  }: {
    newPayment: boolean;
    payment: PaymentDetails;
    billingAddress?: Address;
  }): void {
    if (newPayment) {
      payment.billingAddress = billingAddress
        ? billingAddress
        : this.deliveryAddress;

      this.checkoutPaymentService.createPaymentDetails(payment);
      this.checkoutService.clearCheckoutStep(3);
      this.newPayment = newPayment;
    } else if (this.selectedPayment && this.selectedPayment.id === payment.id) {
      this.checkoutPaymentService.setPaymentDetails(payment);
      this.checkoutService.clearCheckoutStep(3);
    }
  }

  ngOnDestroy(): void {
    if (this.getPaymentDetailsSub) {
      this.getPaymentDetailsSub.unsubscribe();
    }
    if (this.getDeliveryAddressSub) {
      this.getDeliveryAddressSub.unsubscribe();
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
