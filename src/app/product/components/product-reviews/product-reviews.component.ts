import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Input() product: any;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems;

  reviews;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {
    this.maxListItems = this.initialMaxListItems;

    if (this.product) {
      let previousReviewsProductCode;
      this.store
        .select(fromStore.getProductReviewsEntities)
        .subscribe(reviewData => {
          previousReviewsProductCode = reviewData.productCode;
        });

      if (this.product.code !== previousReviewsProductCode) {
        this.store.dispatch(
          new fromStore.LoadProductReviews(this.product.code)
        );
      }

      this.store
        .select(fromStore.getSelectedProductReviewsFactory(this.product.code))
        .subscribe(reviewData => {
          if (reviewData) {
            this.reviews = reviewData.list;
            this.cd.detectChanges();
          }
        });
    }
  }
}
