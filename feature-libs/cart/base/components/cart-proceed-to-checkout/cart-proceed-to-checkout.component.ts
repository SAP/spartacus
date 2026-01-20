/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { ProgressButtonComponent } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cart-proceed-to-checkout',
  templateUrl: './cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressButtonComponent, RouterLink, TranslatePipe, UrlPipe],
})
export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
  cartValidationInProgress = false;

  protected subscription = new Subscription();

  constructor(
    protected router: Router,
    protected cd?: ChangeDetectorRef
  ) {}

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
