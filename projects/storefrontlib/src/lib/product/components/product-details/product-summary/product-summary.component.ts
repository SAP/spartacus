import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';
import { TranslatePipe } from '@spartacus/core';
import { Observable, Observer } from 'rxjs';

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

  showReviews$: Observable<boolean>;

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

  // Checks if product has reviews
  hasReviews(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      if (this.product.numberOfReviews === 0) {
        // Product has no reviews
        observer.next(false);
      } else if (this.getReviewsComponent()) {
        // Product reviews have rendered
        observer.next(true);
      }

      observer.complete();
    });
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

  // Get Reviews Tab if exists on page
  private getReviewsTab(): HTMLElement {
    if (this.getTabsComponent()) {
      // NOTE: Reads through h3 tags to click on correct tab
      // There may be a better way of doing this now/after refactor
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
    if (!this.getReviewsComponent()) {
      console.error(`Cannot find Reviews component`);
      return;
    }

    this.getReviewsComponent().scrollIntoView();

    // Open reviews tab if not already open
    if (
      !this.getReviewsTab().classList.contains('active') ||
      this.getReviewsTab().classList.contains('toggled')
    ) {
      this.getReviewsTab().click();
    }
  }

  constructor(protected translatePipe: TranslatePipe) {}

  ngOnInit() {
    this.showReviews$ = this.hasReviews();
  }
}
