import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  RoutingService,
  GlobalMessageService,
  GlobalMessageType,
  CartService,
  CartDataService,
  Address
} from '@spartacus/core';

import { CheckoutService } from '../../../facade/checkout.service';

import { checkoutNavBar } from './checkout-navigation-bar';

@Component({
  selector: 'cx-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;
  done = false;

  deliveryAddress: Address;
  paymentDetails: any;
  shippingMethod: string;
  subscriptions: Subscription[] = [];

  cart$: Observable<any>;
  tAndCToggler = false;

  navs = checkoutNavBar;

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: CartService,
    protected cartDataService: CartDataService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef
  ) {}

  private refreshCart() {
    this.cartService.loadCartDetails();
  }

  ngOnInit() {
    if (!this.cartDataService.getDetails) {
      this.cartService.loadCartDetails();
    }
    this.cart$ = this.cartService.activeCart$;
    this.processSteps();
  }

  processSteps() {
    // step1: set delivery address
    this.subscriptions.push(
      this.checkoutService
        .getDeliveryAddress()
        .pipe(
          filter(
            deliveryAddress =>
              Object.keys(deliveryAddress).length !== 0 && this.step === 1
          )
        )
        .subscribe(deliveryAddress => {
          this.deliveryAddress = deliveryAddress;
          this.nextStep(2);
          this.refreshCart();
          this.cd.detectChanges();
        })
    );

    // step2: select delivery mode
    this.subscriptions.push(
      this.checkoutService
        .getSelectedDeliveryModeCode()
        .pipe(filter(selected => selected !== '' && this.step === 2))
        .subscribe(selectedMode => {
          this.nextStep(3);
          this.refreshCart();
          this.shippingMethod = selectedMode;
          this.cd.detectChanges();
        })
    );

    // step3: set payment information
    this.subscriptions.push(
      this.checkoutService
        .getPaymentDetails()
        .pipe(
          filter(
            paymentInfo =>
              Object.keys(paymentInfo).length !== 0 && this.step === 3
          )
        )
        .subscribe(paymentInfo => {
          if (!paymentInfo['hasError']) {
            this.nextStep(4);
            this.paymentDetails = paymentInfo;
            this.cd.detectChanges();
          } else {
            Object.keys(paymentInfo).forEach(key => {
              if (key.startsWith('InvalidField')) {
                this.globalMessageService.add({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'InvalidField: ' + paymentInfo[key]
                });
              }
            });
            this.checkoutService.clearCheckoutStep(3);
          }
        })
    );

    // step4: place order
    this.subscriptions.push(
      this.checkoutService
        .getOrderDetails()
        .pipe(
          filter(order => Object.keys(order).length !== 0 && this.step === 4)
        )
        .subscribe(() => {
          // checkout steps are done
          this.done = true;
          this.routingService.go({ route: ['orderConfirmation'] });
        })
    );
  }

  setStep(backStep) {
    this.nextStep(backStep);
  }

  nextStep(step: number): void {
    const previousStep = step - 1;

    this.navs.forEach(function(nav) {
      if (nav.id === previousStep) {
        nav.status.completed = true;
      }
      if (nav.id === step) {
        nav.status.active = true;
        nav.status.disabled = false;
      } else {
        nav.status.active = false;
      }

      nav.progressBar = nav.status.active || nav.status.completed;
    });

    this.step = step;
    this.tAndCToggler = false;
  }

  addAddress({ newAddress, address }) {
    if (newAddress) {
      this.checkoutService.createAndSetAddress(address);
      return;
    }
    // if the selected address is the same as the cart's one
    if (this.deliveryAddress && address.id === this.deliveryAddress.id) {
      this.nextStep(2);
      return;
    }
    this.checkoutService.setDeliveryAddress(address);
    return;
  }

  setDeliveryMode({ deliveryModeId }) {
    // if the selected shipping method is the same as the cart's one
    if (this.shippingMethod && this.shippingMethod === deliveryModeId) {
      this.nextStep(3);
      return;
    }
    this.checkoutService.setDeliveryMode(deliveryModeId);
    return;
  }

  addPaymentInfo({ newPayment, payment }) {
    if (newPayment) {
      payment.billingAddress = this.deliveryAddress;
      this.checkoutService.createPaymentDetails(payment);
      return;
    }

    // if the selected paymetn is the same as the cart's one
    if (this.paymentDetails && this.paymentDetails.id === payment.id) {
      this.nextStep(4);
      return;
    }
    this.checkoutService.setPaymentDetails(payment);
    return;
  }

  placeOrder() {
    this.checkoutService.placeOrder();
  }

  toggleTAndC() {
    this.tAndCToggler = !this.tAndCToggler;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (!this.done) {
      this.checkoutService.clearCheckoutData();
    }
  }
}
