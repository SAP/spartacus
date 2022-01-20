import { Injectable } from '@angular/core';
import { CartValidationAdapter } from '../../../cart/connectors/validation/cart-validation.adapter';
import { CART_VALIDATION_NORMALIZER } from '../../../cart/connectors/validation/converters';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { CartModificationList } from '../../../model/cart.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';

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
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converter.pipeable(CART_VALIDATION_NORMALIZER)
    );
  }
}
