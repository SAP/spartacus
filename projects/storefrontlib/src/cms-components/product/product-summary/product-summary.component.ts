import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TranslationService, Product } from '@spartacus/core';
import { ProductDetailOutlets } from '../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent implements AfterContentChecked {
  static outlets = ProductDetailOutlets;

  itemCount = 1;
  reviewsTabAvailable = new BehaviorSubject<boolean>(false);

  product$: Observable<Product>;

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

  updateCount(value) {
    this.itemCount = value;
  }

  // NOTE: Does not currently exists as its own component
  // but part of tabs component. This is likely to change in refactor.
  private getReviewsComponent(): Element {
    return document.querySelector('cx-product-reviews');
  }

  // Get Tabs Component if exists on page
  private getTabsComponent(): Element {
    return document.querySelector('cx-tab-paragraph-container');
  }

  // Get Tab by label if exists on page
  getTabByLabel(label: string, tabsComponent: Element): HTMLElement {
    if (tabsComponent) {
      // NOTE: Reads through h3 tags to click on correct tab
      // There may be a better way of doing this now/after refactor
      const h3Elements: HTMLCollectionOf<
        HTMLElement
      > = tabsComponent.getElementsByTagName('h3');

      // Look through h3 tab elements until finding tab with label
      for (const h3Element of Array.from(h3Elements)) {
        if (h3Element.innerHTML.includes(label)) {
          return h3Element;
        }
      }
    }
  }

  // Click to activate tab if not already active
  clickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  // Scroll to views component on page and click "Reviews" tab
  showReviews() {
    // Use translated label for Reviews tab reference
    this.translationService
      .translate('CMSTabParagraphContainer.tabs.ProductReviewsTabComponent')
      .subscribe(reviewsTabLabel => {
        const tabsComponent = this.getTabsComponent();
        const reviewsTab = this.getTabByLabel(reviewsTabLabel, tabsComponent);
        const reviewsComponent = this.getReviewsComponent();
        if (reviewsTab && reviewsComponent) {
          this.clickTabIfInactive(reviewsTab);
          setTimeout(
            () => reviewsComponent.scrollIntoView({ behavior: 'smooth' }),
            0
          );
        }
      })
      .unsubscribe();
  }

  constructor(
    protected currentPageService: CurrentProductService,
    private translationService: TranslationService
  ) {}

  ngAfterContentChecked() {
    this.product$ = this.currentPageService.getProduct();
    this.reviewsTabAvailable.next(!!this.getReviewsComponent());
  }
}
