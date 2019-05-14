import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { GlobalMessageService, CartService, Cart } from '@spartacus/core';

import { Observable } from 'rxjs';

import { CheckoutNavBarItem } from './checkout-navigation-bar';
import { CheckoutDetailsService } from '../../../checkout-details.service';

@Component({
  selector: 'cx-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;
  cart$: Observable<Cart>;
  navs: CheckoutNavBarItem[] = this.initializeCheckoutNavBar();

  constructor(
    public checkoutDetailsService: CheckoutDetailsService,
    protected cartService: CartService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getActive();
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
