/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Review } from '../../../model/product.model';
import {
  PRODUCT_REVIEW_NORMALIZER,
  PRODUCT_REVIEW_SERIALIZER,
} from '../../../product/connectors/reviews/converters';
import { ProductReviewsAdapter } from '../../../product/connectors/reviews/product-reviews.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccProductReviewsAdapter implements ProductReviewsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(productCode: string, maxCount?: number): Observable<Review[]> {
    return this.http
      .get<Occ.Product>(this.getEndpoint(productCode, maxCount))
      .pipe(
        map((productResponse) => productResponse.reviews),
        map((reviews) => reviews ?? []),
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
