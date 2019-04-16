import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslatePipe],
})
export class ProductSummaryComponent {
  static outlets = ProductDetailOutlets;

  itemCount = 1;

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

  // Get Tabs Component if exists on page
  private getTabsComponent(): Element {
    // const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(
    //   'Tabs'
    // );

    // return elements.length > 0 ? elements[0] : null;
    return document.querySelector('cx-product-tabs');
  }

  // Get Reviews Tab if exists on page
  private getReviewsTab(): HTMLElement {
    if (this.getTabsComponent()) {
      const h3Elements: HTMLCollectionOf<
        HTMLElement
      > = this.getTabsComponent().getElementsByTagName('h3');

      // Use translated label for Reviews tab reference
      const reviewsTabTitle = this.translatePipe.transform(
        'productDetails.label.reviews'
      );

      // Look through h3 tab elements until finding tab with Reviews reference
      for (const h3Element of Array.from(h3Elements)) {
        if (h3Element.innerHTML.indexOf(reviewsTabTitle) > -1) {
          return h3Element;
        }
      }
    }

    return null;
  }

  // Scroll to views component on page and click "Reviews" tab
  showReviews() {
    if (!this.getTabsComponent()) {
      console.error(`Cannot find tabs component`);
      return;
    }
    if (!this.getReviewsTab()) {
      console.error(`Cannot find Reviews reference in tabs component`);
      return;
    }

    this.getTabsComponent().scrollIntoView();
    this.getReviewsTab().click();
  }

  constructor(protected translatePipe: TranslatePipe) {}
}
