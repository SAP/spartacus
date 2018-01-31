import { getProductReviewsEntities } from './../store/selectors/product-reviews.selectors';
import { Component, OnInit, Input } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

import { Store } from '@ngrx/store';
import * as fromStore from './../../product/store';

@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Input() productCode: string;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems;

  reviews;

  constructor(protected store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.maxListItems = this.initialMaxListItems;

    if (this.productCode) {
      let previousReviewsProductCode;
      this.store
        .select(fromStore.getProductReviewsEntities)
        .subscribe(reviewData => {
          previousReviewsProductCode = reviewData.productCode;
        });

      if (this.productCode !== previousReviewsProductCode) {
        this.store.dispatch(new fromStore.LoadProductReviews(this.productCode));
      }

      this.store
        .select(fromStore.getSelectedProductReviewsFactory(this.productCode))
        .subscribe(reviewData => {
          if (reviewData) {
            this.reviews = reviewData.list;
          }
        });
    }
  }
}
