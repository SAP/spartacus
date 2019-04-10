import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import {
  CheckoutService,
  RoutingService,
  GlobalMessageService,
  CartService,
  CartDataService,
  PaymentDetails,
  Address,
  Cart,
} from '@spartacus/core';

import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CheckoutNavBarItem } from './checkout-navigation-bar';

@Component({
  selector: 'cx-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;

  deliveryAddress: Address;
  paymentDetails: PaymentDetails;
  deliveryMode: string;
  subscriptions: Subscription[] = [];

  cart$: Observable<Cart>;

  navs: CheckoutNavBarItem[] = this.initializeCheckoutNavBar();

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: CartService,
    protected cartDataService: CartDataService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef
  ) {}

  private refreshCart(): void {
    this.cartService.loadDetails();
  }

  ngOnInit() {
    if (!this.cartDataService.getDetails) {
      this.cartService.loadDetails();
    }
    this.cart$ = this.cartService.getActive();
    this.processSteps();
  }

  processSteps(): void {
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
          this.deliveryMode = selectedMode;
          this.cd.detectChanges();
        })
    );
  }

  setStep(backStep: number): void {
    this.nextStep(backStep);
  }

  goToStep(step: number): void {
    this.nextStep(step);
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

  initializeCheckoutNavBar(): CheckoutNavBarItem[] {
    return [
      {
        id: 1,
        label: '1. Shipping Address',
        status: {
          disabled: false,
          completed: false,
          active: true,
        },
        progressBar: true,
      },
      {
        id: 2,
        label: '2. Shipping Method',
        status: {
          disabled: true,
          completed: false,
          active: false,
        },
        progressBar: false,
      },
      {
        id: 3,
        label: '3. Payment',
        status: {
          disabled: true,
          completed: false,
          active: false,
        },
        progressBar: false,
      },
      {
        id: 4,
        label: '4. Review',
        status: {
          disabled: true,
          completed: false,
          active: false,
        },
        progressBar: false,
      },
    ];
  }

  clearCheckoutNavBar(): void {
    this.navs = [];
  }

  ngOnDestroy() {
    this.clearCheckoutNavBar();
  }
}
