import { Injectable } from '@angular/core';
import {
  CartValidationAdapter,
  CART_VALIDATION_NORMALIZER,
} from '@spartacus/cart/validation/core';
import { HttpClient } from '@angular/common/http';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartModificationList } from '@spartacus/cart/validation/root';

@Injectable()
export class OccCartValidationAdapter implements CartValidationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(cartId: string, userId: string): Observable<CartModificationList> {
    const url = this.occEndpoints.buildUrl('validate', {
      urlParams: { cartId, userId },
    });

    return this.http.post<any>(url, null).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converter.pipeable(CART_VALIDATION_NORMALIZER)
    );
  }
}
