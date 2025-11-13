/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cart-proceed-to-checkout',
  templateUrl: './cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
  protected router = inject(Router);
  protected cd? = inject(ChangeDetectorRef);

  cartValidationInProgress = false;

  protected subscription = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.cartValidationInProgress = false;
          this.cd?.markForCheck();
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
