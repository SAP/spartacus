/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, Cart } from '@commerce-storefront-toolset/cart/base/root';
import { CheckoutStep } from '@commerce-storefront-toolset/checkout/base/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressMobileTopComponent {
  private _steps$: BehaviorSubject<CheckoutStep[]> =
    this.checkoutStepService.steps$;
  cart$: Observable<Cart> = this.activeCartFacade.getActive();

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService
  ) {}

  activeStepIndex: number;
  activeStepIndex$: Observable<number> =
    this.checkoutStepService.activeStepIndex$.pipe(
      tap((index) => (this.activeStepIndex = index))
    );

  get steps$(): Observable<CheckoutStep[]> {
    return this._steps$.asObservable();
  }
}
