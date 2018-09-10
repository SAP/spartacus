import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

import * as fromCheckoutStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import * as fromCart from '../../../../cart/store';
import * as fromGlobalMessage from '../../../../global-message/store';

import { GlobalMessageType } from './../../../../global-message/models/message.model';
import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { Address } from '../../../models/address-model';
import { checkoutNavBar } from './checkout-navigation-bar';
import { CartDataService } from '../../../../cart/services';

@Component({
  selector: 'y-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;

  deliveryAddress: Address;
  paymentDetails: any;
  shippingMethod: string;

  step1Sub: Subscription;
  step2Sub: Subscription;
  step3Sub: Subscription;
  step4Sub: Subscription;

  cart$: Observable<any>;
  tAndCToggler = false;

  navs = checkoutNavBar;

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: CartService,
    protected cartDataService: CartDataService,
    private store: Store<fromCheckoutStore.CheckoutState>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.cartDataService.getDetails) {
      this.cartService.loadCartDetails();
    }
    this.cart$ = this.store.select(fromCart.getActiveCart);
    this.processSteps();
  }

  processSteps() {
    // step1: set delivery address
    this.step1Sub = this.store
      .select(fromCheckoutStore.getDeliveryAddress)
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
      });

    // step2: select delivery mode
    this.step2Sub = this.store
      .select(fromCheckoutStore.getSelectedCode)
      .pipe(filter(selected => selected !== '' && this.step === 2))
      .subscribe(selectedMode => {
        this.nextStep(3);
        this.refreshCart();
        this.shippingMethod = selectedMode;
        this.cd.detectChanges();
      });

    // step3: set payment information
    this.step3Sub = this.store
      .select(fromCheckoutStore.getPaymentDetails)
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
              this.store.dispatch(
                new fromGlobalMessage.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'InvalidField: ' + paymentInfo[key]
                })
              );
            }
          });
          this.store.dispatch(new fromCheckoutStore.ClearCheckoutStep(3));
        }
      });

    // step4: place order
    this.step4Sub = this.store
      .select(fromCheckoutStore.getOrderDetails)
      .pipe(filter(order => Object.keys(order).length !== 0 && this.step === 4))
      .subscribe(order => {
        this.checkoutService.orderDetails = order;
        this.store.dispatch(
          new fromRouting.Go({
            path: ['orderConfirmation']
          })
        );
      });
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
  }

  addAddress(addressObject) {
    if (addressObject.newAddress) {
      this.checkoutService.createAndSetAddress(addressObject.address);
    } else {
      // if the selected address is the same as the cart's one
      if (
        this.deliveryAddress &&
        addressObject.address.id === this.deliveryAddress.id
      ) {
        this.nextStep(2);
      } else {
        this.checkoutService.setDeliveryAddress(addressObject.address);
      }
    }
  }

  setDeliveryMode(deliveryMode: any) {
    // if the selected shipping method is the same as the cart's one
    if (
      this.shippingMethod &&
      this.shippingMethod === deliveryMode.deliveryModeId
    ) {
      this.nextStep(3);
    } else {
      this.checkoutService.setDeliveryMode(deliveryMode.deliveryModeId);
    }
  }

  addPaymentInfo(paymentDetailsObject) {
    if (paymentDetailsObject.newPayment) {
      paymentDetailsObject.payment.billingAddress = this.deliveryAddress;
      this.checkoutService.createPaymentDetails(paymentDetailsObject.payment);
    } else {
      // if the selected paymetn is the same as the cart's one
      if (
        this.paymentDetails &&
        this.paymentDetails.id === paymentDetailsObject.payment.id
      ) {
        this.nextStep(4);
      } else {
        this.checkoutService.setPaymentDetails(paymentDetailsObject.payment);
      }
    }
  }

  placeOrder() {
    this.checkoutService.placeOrder();
  }

  toggleTAndC() {
    this.tAndCToggler = !this.tAndCToggler;
  }

  private refreshCart() {
    this.cartService.loadCartDetails();
  }

  ngOnDestroy() {
    if (this.step1Sub) {
      this.step1Sub.unsubscribe();
    }
    if (this.step2Sub) {
      this.step2Sub.unsubscribe();
    }
    if (this.step3Sub) {
      this.step3Sub.unsubscribe();
    }
    if (this.step4Sub) {
      this.step4Sub.unsubscribe();
    }

    this.store.dispatch(new fromCheckoutStore.ClearCheckoutData());
  }
}
