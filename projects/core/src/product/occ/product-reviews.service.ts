import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ReviewList, Review } from '../../occ/occ-models/occ.models';
import { DynamicTemplate } from '../../config/utils/dynamic-template';

import { OccProductConfig } from './product-config';

@Injectable()
export class OccProductReviewsService {
  constructor(
    private http: HttpClient,
    private config: OccProductConfig,
    private dynamicTemplate: DynamicTemplate
  ) {}

  private getProductEndpoint(): string {
    return (
      (this.config.occProduct.baseUrl || (this.config.server.baseUrl || '')) +
      (this.config.occProduct.occPrefix || this.config.server.occPrefix) +
      (this.config.occProduct.baseSite || this.config.site.baseSite) +
      '/'
    );
  }

  protected getEndpoint(code: string, maxCount?: number): string {
    let url =
      this.getProductEndpoint() +
      this.dynamicTemplate.resolve(this.config.occProduct.productReviews, {
        productCode: code
      });

    if (maxCount && maxCount > 0) {
      url += `?maxCount=${maxCount}`;
    }

    return url;
  }

  loadProductReviews(
    productCode: string,
    maxCount?: number
  ): Observable<ReviewList> {
    return this.http
      .get(this.getEndpoint(productCode, maxCount))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  postProductReview(productCode: string, review: any): Observable<Review> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append('headline', review.headline);
    body.append('comment', review.comment);
    body.append('rating', review.rating.toString());
    body.append('alias', review.alias);

    return this.http
      .post(this.getEndpoint(productCode), body.toString(), { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
