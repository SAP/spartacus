import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Review } from '../../../model/product.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  PRODUCT_REVIEW_NORMALIZER,
  PRODUCT_REVIEW_SERIALIZER,
} from '../../../product/connectors/reviews/converters';
import { ProductReviewsAdapter } from '../../../product/connectors/reviews/product-reviews.adapter';

@Injectable()
export class OccProductReviewsAdapter implements ProductReviewsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(productCode: string, maxCount?: number): Observable<Review[]> {
    return this.http
      .get(this.getEndpoint(productCode, maxCount))
      .pipe(
        pluck('reviews'),
        this.converter.pipeableMany(PRODUCT_REVIEW_NORMALIZER)
      );
  }

  post(productCode: string, review: any): Observable<Review> {
    review = this.converter.convert(review, PRODUCT_REVIEW_SERIALIZER);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.append('headline', review.headline);
    body.append('comment', review.comment);
    body.append('rating', review.rating.toString());
    body.append('alias', review.alias);

    return this.http.post(this.getEndpoint(productCode), body.toString(), {
      headers,
    });
  }

  protected getEndpoint(code: string, maxCount?: number): string {
    return this.occEndpoints.buildUrl('productReviews', {
      urlParams: { productCode: code },
      queryParams: { maxCount },
    });
  }
}
