import { Injectable } from '@angular/core';
import { Product, ProductReviewService, Review } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoConfig } from '../../../config';
import { JsonLdBuilder } from '../schema.interface';

/**
 * Builds the structured data for the product reviews, see https://schema.org/Review.
 * The data includes the aggregated product rating and the individual reviews.
 */
@Injectable({
  providedIn: 'root',
})
export class JsonLdProductReviewBuilder implements JsonLdBuilder<Product> {
  constructor(
    protected reviewService: ProductReviewService,
    protected config: SeoConfig
  ) {}

  build(product: Product): Observable<any> {
    return this.reviewService.getByProductCode(product.code).pipe(
      map((reviews: Review[]) =>
        reviews?.length > 0
          ? {
              aggregateRating: this.buildAggregatedReviews(product, reviews),
              review: reviews.map((review) => this.buildReviews(review)),
            }
          : {}
      )
    );
  }

  protected buildAggregatedReviews(product: Product, reviews: Review[]) {
    const aggregated: any = {
      '@type': 'AggregateRating',
    };
    if (product.averageRating) {
      aggregated.ratingValue = product.averageRating;
    }
    if (reviews) {
      aggregated.ratingCount = reviews.filter((rev) => !!rev.rating).length;
      aggregated.reviewCount = reviews.filter((rev) => !!rev.comment).length;
    }
    return aggregated;
  }

  protected buildReviews(review: Review) {
    const reviewSchema: any = {
      '@type': 'review',
    };

    if (review.principal && review.principal.name) {
      reviewSchema.author = review.principal.name;
    }
    if (review.date) {
      const date = new Date(review.date);
      reviewSchema.datePublished = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    }
    if (review.headline) {
      reviewSchema.name = review.headline;
    }
    if (review.comment) {
      reviewSchema.description = review.comment;
    }
    if (review.rating) {
      reviewSchema.reviewRating = {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
      };
    }

    return reviewSchema;
  }
}
