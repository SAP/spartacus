import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslatePipe, TranslationService } from '@spartacus/core';
import { ProductDetailOutlets } from '../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslatePipe],
})
export class ProductSummaryComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  itemCount = 1;
  reviewsTabAvailable: boolean;

  @Input() product: any;

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

  updateCount(value) {
    this.itemCount = value;
  }

  get hasStock(): boolean {
    return (
      this.product &&
      this.product.stock &&
      (this.product.stock.stockLevel > 0 ||
        this.product.stock.stockLevelStatus === 'inStock')
    );
  }

  // NOTE: Does not currently exists as its own component
  // but part of tabs component. This is likely to change in refactor.
  private getReviewsComponent(): Element {
    return document.querySelector('cx-product-reviews');
  }

  // Get Tabs Component if exists on page
  private getTabsComponent(): Element {
    return document.querySelector('cx-product-tabs');
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
      .translate('productDetails.reviews')
      .subscribe(reviewsTabLabel => {
        const tabsComponent = this.getTabsComponent();
        const reviewsTab = this.getTabByLabel(reviewsTabLabel, tabsComponent);
        const reviewsComponent = this.getReviewsComponent();

        if (reviewsTab && reviewsComponent) {
          reviewsComponent.scrollIntoView();
          this.clickTabIfInactive(reviewsTab);
        }
      });
  }

  constructor(
    protected translatePipe: TranslatePipe,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.reviewsTabAvailable = !!this.getReviewsComponent();
  }
}
