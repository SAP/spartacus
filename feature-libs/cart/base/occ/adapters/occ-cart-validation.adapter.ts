/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CART_VALIDATION_NORMALIZER,
  CartValidationAdapter,
} from '@spartacus/cart/base/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import {
  ConverterService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCartValidationAdapter implements CartValidationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  validate(cartId: string, userId: string): Observable<CartModificationList> {
    const url = this.occEndpoints.buildUrl('validate', {
      urlParams: { cartId, userId },
    });

    return this.http.post<any>(url, null).pipe(
      catchError((error) => {
        throw normalizeHttpError(error);
      }),
      this.converter.pipeable(CART_VALIDATION_NORMALIZER)
    );
  }
}
