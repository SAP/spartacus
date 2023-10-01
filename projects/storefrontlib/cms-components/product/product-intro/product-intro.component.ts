/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  EventService,
  LoggerService,
  Product,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { Observable, defer, merge, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  ComponentCreateEvent,
  ComponentDestroyEvent,
} from '../../../cms-structure';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-intro',
  templateUrl: './product-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductIntroComponent {
  product$: Observable<Product | null> =
    this.currentProductService.getProduct();

  /**
   * Observable that checks the reviews component availability on the page.
   */
  areReviewsAvailable$: Observable<boolean> = merge(
    // Check if reviews component is already defined:
    defer(() => of(!!this.getReviewsComponent())),

    // Observe EventService for reviews availability:
    this.eventService.get(ComponentCreateEvent).pipe(
      filter((event) => event.id === this.reviewsComponentId),
      map(() => true)
    ),
    this.eventService.get(ComponentDestroyEvent).pipe(
      filter((event) => event.id === this.reviewsComponentId),
      map(() => false)
    )
  );

  protected reviewsComponentId = 'ProductReviewsTabComponent';

  protected reviewsTranslationKey = `TabPanelContainer.tabs.${this.reviewsComponentId}`;

  constructor(
    protected currentProductService: CurrentProductService,
    protected translationService: TranslationService,
    protected winRef: WindowRef,
    protected eventService: EventService
  ) {
    const logger = inject(LoggerService);
    logger.log('Some malicious test log message from ProductIntroComponent constructor');
    logger.log('<script>javascript:alert(1)</script>');
    logger.log('<img src=1 href=1 onerror="javascript:alert(1)"></img>');
    logger.log('<IMG SRC=x onload="alert(String.fromCharCode(88,83,83))">');
    logger.log(' <script\x0Ctype="text/javascript">javascript:alert(1);</script>');
    logger.log('<SCRIPT FOR=document EVENT=onreadystatechange>javascript:alert(1)</SCRIPT>');
    logger.log('<script src="javascript:alert(1)">');
    logger.log(' <img src="javascript:alert(1)">');
    logger.log('\'1\' ORDER BY 1--+');
    logger.log('\' 1 AND (SELECT * FROM Users) = 1');	
    logger.log('\'OR 1=1');
    logger.log('\'1\' ORDER BY 3--+\'');
    logger.log('WHERE 1=1 AND 1=0');
    logger.log('or true--');
    logger.log('\'admin\' or 1=1');
  }

  /**
   * Scroll to views component on page and click "Reviews" tab
   */
  showReviews() {
    // Use translated label for Reviews tab reference
    this.translationService
      .translate(this.reviewsTranslationKey)
      .subscribe((reviewsTabLabel) => {
        const tabsComponent = this.getTabsComponent();
        const reviewsTab =
          tabsComponent && this.getTabByLabel(reviewsTabLabel, tabsComponent);

        if (reviewsTab) {
          this.clickTabIfInactive(reviewsTab);
          setTimeout(() => {
            reviewsTab.scrollIntoView({ behavior: 'smooth' });
            reviewsTab.focus({ preventScroll: true });
          });
        }
      })
      .unsubscribe();
  }

  // NOTE: Does not currently exists as its own component
  // but part of tabs component. This is likely to change in refactor.
  /**
   * Get Reviews Component if exists on page
   */
  protected getReviewsComponent(): HTMLElement | null {
    return this.winRef.document.querySelector('cx-product-reviews');
  }

  /**
   * Get Tabs Component if exists on page
   */
  private getTabsComponent(): HTMLElement | null {
    return this.winRef.document.querySelector('cx-tab-paragraph-container');
  }

  /**
   * Click to activate tab if not already active
   *
   * @param tab tab to click if needed
   */
  private clickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  /**
   * Get Tab by label if exists on page
   *
   * @param label label of searched tab
   * @param tabsComponent component containing tabs
   */
  private getTabByLabel(
    label: string,
    tabsComponent: HTMLElement
  ): HTMLElement | undefined {
    // NOTE: Reads through button tags to click on correct tab
    // There may be a better way of doing this now/after refactor
    const tabElements: HTMLCollectionOf<HTMLElement> =
      tabsComponent.getElementsByTagName('button');

    // Look through button tab elements until finding tab with label
    return Array.from(tabElements).find((buttonElement) =>
      buttonElement.innerHTML.includes(label)
    );
  }
}
