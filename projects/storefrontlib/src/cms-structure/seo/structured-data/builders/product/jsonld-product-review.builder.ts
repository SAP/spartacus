import { Injectable } from '@angular/core';
import { Product, ProductReviewService, Review } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JsonLdBuilder } from '../schema.interface';

/**
 * Builds the structured data for the product reviews, see https://schema.org/Review.
 * The data includes the aggregated product rating and the individual reviews.
 */
@Injectable({
  providedIn: 'root',
})
export class JsonLdProductReviewBuilder implements JsonLdBuilder<Product> {
  constructor(private reviewService: ProductReviewService) {}

  build(product: Product): Observable<any> {
    return this.reviewService.getByProductCode(product.code).pipe(
      filter(Boolean),
      map((reviews: Review[]) => {
        return {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.averageRating,
            ratingCount: reviews.filter(rev => !!rev.rating).length,
            reviewCount: reviews.filter(rev => !!rev.comment).length,
          },
          review: this.buildReviews(reviews),
        };
      })
    );
  }

  private buildReviews(reviews: Review[]) {
    return reviews.map(review => {
      return {
        '@type': 'review',
        author: review.principal.name,
        datePublished: this.getDate(review.date),
        name: review.headline,
        description: review.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
        },
      };
    });
  }

  private getDate(d: any) {
    const date = new Date(d);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}
