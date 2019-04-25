import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  CheckoutService,
  GlobalMessageService,
  CartService,
  UICart,
  UserService,
  User,
} from '@spartacus/core';

import { Observable, combineLatest } from 'rxjs';

import { CheckoutNavBarItem } from './checkout-navigation-bar';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;

  cart$: Observable<UICart>;
  user$: Observable<User>;
  checkoutDetails$: Observable<[User, UICart]>;

  navs: CheckoutNavBarItem[] = this.initializeCheckoutNavBar();

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: CartService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.get();
    this.cart$ = this.cartService.getActive();

    this.checkoutDetails$ = combineLatest(this.user$, this.cart$).pipe(
      filter(([user, cart]) => !!(user && user.uid && cart && cart.code)),
      tap(([user, cart]) => {
        this.checkoutService.loadCheckoutDetails(user.uid, cart.code);
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
