import { Component, OnInit } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

import { Store } from '@ngrx/store';
import * as fromStore from './../../../../product/store';
// import { ChangeDetectorRef } from '@angular/core';
// import { ProductLoaderService } from './../../../../data/product-loader.service';
@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent extends AbstractProductComponent
  implements OnInit {
  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems;

  reviews;

  ngOnInit() {
    this.maxListItems = this.initialMaxListItems;
    if (this.productCode) {
<<<<<<< HEAD
      this.store
        .select(fromStore.getProductReviewsEntities)
        .subscribe(reviews => {
          if (reviews && reviews.list) {
            this.reviews = reviews.list;
=======
      this.productLoader.loadReviews(this.productCode);
      this.productLoader
        .getSubscription(this.productCode + 'reviews')
        .subscribe(reviewData => {
          // console.log('reviewData', reviewData);
          if (reviewData && reviewData.reviews) {
            this.reviews = reviewData.reviews;
>>>>>>> origin/feature/SPA-223
          }
        });
    }
  }
}
