/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'cx-checkout-review-overview',
  templateUrl: './checkout-review-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutReviewOverviewComponent implements AfterViewInit {
  protected document = inject(DOCUMENT, { optional: true });
  protected translationService = inject(TranslationService, { optional: true });
  private featureService = inject(FeatureConfigService, { optional: true });

  // These are the components that we need to wrap with section element.
  protected readonly CHECKOUT_COMPONENTS = [
    'cx-checkout-review-payment',
    'cx-checkout-review-overview',
    'cx-checkout-review-shipping',
  ];

  constructor(protected activeCartFacade: ActiveCartFacade) {}

  ngAfterViewInit(): void {
    this.wrapComponentsWithSectionEl();
  }

  get cart$(): Observable<Cart> {
    return this.activeCartFacade.getActive();
  }

  /**
   * Wraps checkout review components with section element required
   * for applying correct a11y practices.
   *
   * Note: We need to do it this way because there is no single parent component
   * template we can use to wrap all related components because the layout is
   * CMS-driven (ie. by page slot).
   */
  protected wrapComponentsWithSectionEl() {
    if (
      this.document &&
      this.translationService &&
      this.featureService?.isEnabled('a11yWrapReviewOrderInSection')
    ) {
      this.translationService
        .translate('checkoutReview.reviewOrder')
        .pipe(take(1))
        .subscribe((label) => {
          // We need to delay for a tick to let components render before querying.
          requestAnimationFrame(() => {
            // Wrap checkout components with section selector.
            const els = this.CHECKOUT_COMPONENTS.map((selector) =>
              this.document?.querySelector(selector)
            );
            const parent = els[0]?.parentNode;
            const section = this.document?.createElement('section');
            if (parent && section) {
              section.ariaLabel = label;
              parent.replaceChild(section, <Node>els[0]);
              els.forEach((el: any) => section.appendChild(el));
            }
          });
        });
    }
  }
}
