import { Component, OnInit } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

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
      // TODO load reviews from the store
      // this.productLoader.loadReviews(this.productCode);
      // this.productLoader.getSubscription(this.productCode + 'reviews').subscribe((reviewData) => {
      //     // console.log('reviewData', reviewData);
      //     if (reviewData && reviewData.reviews) {
      //         this.reviews = reviewData.reviews;
      //     }
      // });
    }
  }
}
