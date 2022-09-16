/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'cx-cart-proceed-to-checkout',
  templateUrl: './cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
  cartValidationInProgress = false;

  protected subscription = new Subscription();

  constructor(protected router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.cartValidationInProgress = false;
        }
      })
    );
  }

  disableButtonWhileNavigation(): void {
    this.cartValidationInProgress = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
