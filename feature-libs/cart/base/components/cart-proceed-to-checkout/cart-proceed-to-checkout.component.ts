/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { Subscription } from 'rxjs';
import { ProgressButtonComponent } from '../../../../../projects/storefrontlib/shared/components/progress-button/progress-button.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-cart-proceed-to-checkout',
  templateUrl: './cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressButtonComponent,
    RouterLink,
    TranslatePipe,
    UrlPipe,
    MockTranslatePipe,
  ],
})
export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
  cartValidationInProgress = false;

  protected subscription = new Subscription();

  constructor(
    router: Router,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    cd?: ChangeDetectorRef
  );
  /**
   * @deprecated since 5.2
   */
  constructor(router: Router);
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
