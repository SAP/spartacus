import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  OccEndpointsService,
  ConverterService,
  normalizeHttpError,
} from '@spartacus/core';

import { FutureStockAdapter, FUTURE_STOCK_NORMALIZER } from '@spartacus/future-stock/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductFutureStock } from '../../core/model/future-stock.model';

@Injectable()
export class OccFutureStockAdapter implements FutureStockAdapter {
	constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getFutureStock(userId: string, productCode: string): Observable<ProductFutureStock> {
    return this.http
      .get<ProductFutureStock>(this.getFutureStockEndpoint(userId, productCode))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(FUTURE_STOCK_NORMALIZER)
      );
  }

  protected getFutureStockEndpoint(userId: string, productCode: string): string {
    return this.occEndpoints.buildUrl('getFutureStock', {
      urlParams: { userId, productCode },
    });
  }
}
