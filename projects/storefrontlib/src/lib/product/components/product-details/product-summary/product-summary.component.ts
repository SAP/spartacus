import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
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

  get stockInfo(): string {
    return this.hasStock()
      ? `${this.product.stock.stockLevel} in stock`
      : 'Out of stock';
  }

  private hasStock(): boolean {
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
  private getTabByLabel(label: string): HTMLElement {
    const tabsComponent = this.getTabsComponent();

    if (tabsComponent) {
      // NOTE: Reads through h3 tags to click on correct tab
      // There may be a better way of doing this now/after refactor
      const h3Elements: HTMLCollectionOf<
        HTMLElement
      > = tabsComponent.getElementsByTagName('h3');

      // Look through h3 tab elements until finding tab with label
      for (const h3Element of Array.from(h3Elements)) {
        if (h3Element.innerHTML.indexOf(label) > -1) {
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
    const reviewsTabLabel = this.translatePipe.transform(
      'productDetails.label.reviews'
    );

    const reviewsTab = this.getTabByLabel(reviewsTabLabel);
    const reviewsComponent = this.getReviewsComponent();

    if (reviewsTab && reviewsComponent) {
      reviewsComponent.scrollIntoView();
      this.clickTabIfInactive(reviewsTab);
    }
  }

  constructor(protected translatePipe: TranslatePipe) {}

  ngOnInit() {
    this.reviewsTabAvailable = !!this.getReviewsComponent();
  }
}
