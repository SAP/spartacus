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

  step1Sub: Subscription;
  step2Sub: Subscription;
  step3Sub: Subscription;
  step4Sub: Subscription;

  cart$: Observable<any>;

  labels = {
    title: 'Checkout <#> items',
    cartTotal: 'Cart total (3 items): $300.00',
    btnPlaceOrder: 'Place Order',
    btnBack: 'Back'
  };

  navs = [
    {
      id: 1,
      label: '1. Shipping Address',
      status: {
        disabled: false,
        completed: false,
        active: true
      },
      progressBar: true
    },
    {
      id: 2,
      label: '2. Shipping Method',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: false
    },
    {
      id: 3,
      label: '3. Payment',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: false
    },
    {
      id: 4,
      label: '4. Review',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: false
    }
  ];

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: CartService,
    private store: Store<fromCheckoutStore.CheckoutState>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
        this.nextStep(2);
        this.refreshCart();
        this.deliveryAddress = deliveryAddress;
        this.cd.detectChanges();
      });

    // step2: select delivery mode
    this.step2Sub = this.store
      .select(fromCheckoutStore.getSelectedCode)
      .pipe(filter(selected => selected !== '' && this.step === 2))
      .subscribe(() => {
        this.nextStep(3);
        this.refreshCart();
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
    if (this.step > backStep) {
      for (let i = backStep; i <= this.step; i++) {
        this.store.dispatch(new fromCheckoutStore.ClearCheckoutStep(i));
      }

      this.nextStep(backStep);
    }
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
      this.checkoutService.setDeliveryAddress(addressObject.address);
    }
  }

  setDeliveryMode(deliveryMode: any) {
    this.checkoutService.setDeliveryMode(deliveryMode.deliveryModeId);
  }

  addPaymentInfo(paymentDetailsObject) {
    if (paymentDetailsObject.newPayment) {
      paymentDetailsObject.payment.billingAddress = this.deliveryAddress;
      this.checkoutService.createPaymentDetails(paymentDetailsObject.payment);
    } else {
      this.checkoutService.setPaymentDetails(paymentDetailsObject.payment);
    }
  }

  placeOrder() {
    this.checkoutService.placeOrder();
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
