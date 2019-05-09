import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import {
  PaymentDetails,
  Address,
  CheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  CartDataService,
  UserService,
} from '@spartacus/core';

import { ActivatedRoute } from '@angular/router';
import { masterCardImgSrc } from '../../../ui/images/masterCard';
import { visaImgSrc } from '../../../ui/images/visa';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../checkout-config.service';
import { CheckoutStepType } from '../../model/checkout-step.model';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  newPaymentFormManuallyOpened = false;
  existingPaymentMethods$: Observable<PaymentDetails[]>;
  cards: Card[] = [];
  isLoading$: Observable<boolean>;
  getPaymentDetailsSub: Subscription;
  getDeliveryAddressSub: Subscription;
  selectedPayment: PaymentDetails;
  deliveryAddress: Address;
  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: string;

  constructor(
    protected cartData: CartDataService,
    protected userService: UserService,
    protected checkoutService: CheckoutService,
    protected globalMessageService: GlobalMessageService,
    private routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userService.getPaymentMethodsLoading();
    this.userService.loadPaymentMethods(this.cartData.userId);

    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );

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

    this.getPaymentDetailsSub = this.checkoutService
      .getPaymentDetails()
      .pipe(
        filter(
          paymentInfo => paymentInfo && Object.keys(paymentInfo).length !== 0
        )
      )
      .subscribe(paymentInfo => {
        if (!paymentInfo['hasError']) {
          this.selectedPayment = paymentInfo;
        } else {
          Object.keys(paymentInfo).forEach(key => {
            if (key.startsWith('InvalidField')) {
              this.globalMessageService.add(
                'InvalidField: ' + paymentInfo[key],
                GlobalMessageType.MSG_TYPE_ERROR
              );
            }
          });
          this.checkoutService.clearCheckoutStep(3);
        }
      });
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
        'Expires: ' + payment.expiryMonth + '/' + payment.expiryYear,
      ],
      img: ccImage,
      actions: [{ name: 'Use this payment', event: 'send' }],
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

    this.routingService.go(this.checkoutStepUrlNext);
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
    this.getDeliveryAddressSub = this.checkoutService
      .getDeliveryAddress()
      .subscribe(address => {
        billingAddress = address;
      });
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
    payment.billingAddress = billingAddress
      ? billingAddress
      : this.deliveryAddress;

    if (newPayment) {
      this.checkoutService.createPaymentDetails(payment);
      this.checkoutService.clearCheckoutStep(3);
    }

    // if the selected payment is the same as the cart's one
    if (this.selectedPayment && this.selectedPayment.id === payment.id) {
      this.checkoutService.setPaymentDetails(payment);
      this.checkoutService.clearCheckoutStep(3);
    }

    this.getPaymentDetailsSub = this.checkoutService
      .getPaymentDetails()
      .subscribe(data => {
        if (data.accountHolderName && data.cardNumber) {
          const lastStepUrl = this.checkoutConfigService.getCheckoutStep(
            CheckoutStepType.reviewOrder
          ).url;
          this.routingService.go(lastStepUrl);

          return;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.getPaymentDetailsSub) {
      this.getPaymentDetailsSub.unsubscribe();
    }
    if (this.getDeliveryAddressSub) {
      this.getDeliveryAddressSub.unsubscribe();
    }
  }
}
