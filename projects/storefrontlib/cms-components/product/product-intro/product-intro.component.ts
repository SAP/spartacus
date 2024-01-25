/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EventService,
  Product,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { defer, merge, Observable, of } from 'rxjs';
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
  ) {}

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
