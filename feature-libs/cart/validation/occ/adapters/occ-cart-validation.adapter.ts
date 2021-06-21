import { Injectable } from '@angular/core';
import {
  CartValidationAdapter,
  CART_VALIDATION_NORMALIZER,
} from '@spartacus/cart/validation/core';
import { HttpClient } from '@angular/common/http';
import {
  ConverterService,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  CartModification,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCartValidationAdapter implements CartValidationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  validate(cartId: string, userId: string): Observable<CartModification> {
    const url = this.occEndpoints.buildUrl('validate', {
      urlParams: { cartId, userId },
    });
    return this.http.get<Occ.CartModification>(url).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converter.pipeable(CART_VALIDATION_NORMALIZER)
    );
  }
}
