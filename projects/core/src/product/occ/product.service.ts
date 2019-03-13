import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product, ReviewList, Review } from '../../occ/occ-models/occ.models';
import { OccProductConfig } from './product-config';
import { dynamicTemplate } from '../../config/utils/dynamic-template';

@Injectable()
export class OccProductService {
  constructor(private http: HttpClient, private config: OccProductConfig) {}

  protected getProductEndpoint(): string {
    return (
      (this.config.occProduct.baseUrl || (this.config.server.baseUrl || '')) +
      (this.config.occProduct.occPrefix || this.config.server.occPrefix) +
      (this.config.occProduct.baseSite || this.config.site.baseSite) +
      '/'
    );
  }

  loadProduct(productCode: string): Observable<Product> {
    return this.http
      .get(
        this.getProductEndpoint() +
          dynamicTemplate(this.config.occProduct.getProduct, {
            productCode
          })
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadProductReviews(
    productCode: string,
    maxCount?: number
  ): Observable<ReviewList> {
    let url =
      this.getProductEndpoint() +
      dynamicTemplate(this.config.occProduct.getProduct, { productCode });
    if (maxCount && maxCount > 0) {
      url += `?maxCount=${maxCount}`;
    }

    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public postProductReview(
    productCode: String,
    review: any
  ): Observable<Review> {
    const url = this.getProductEndpoint() + `/${productCode}/reviews`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append('headline', review.headline);
    body.append('comment', review.comment);
    body.append('rating', review.rating.toString());
    body.append('alias', review.alias);

    return this.http
      .post(url, body.toString(), { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
