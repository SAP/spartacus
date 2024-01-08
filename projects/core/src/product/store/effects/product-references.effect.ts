/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductReferencesConnector } from '../../connectors/references/product-references.connector';
import { ProductActions } from '../actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { LoggerService } from '../../../logger';

@Injectable()
export class ProductReferencesEffects {
  protected logger = inject(LoggerService);
  loadProductReferences$: Observable<
    | ProductActions.LoadProductReferencesSuccess
    | ProductActions.LoadProductReferencesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.LOAD_PRODUCT_REFERENCES),
      map((action: ProductActions.LoadProductReferences) => action.payload),
      mergeMap((payload) => {
        return this.productReferencesConnector
          .get(payload.productCode, payload.referenceType, payload.pageSize)
          .pipe(
            map((data) => {
              return new ProductActions.LoadProductReferencesSuccess({
                productCode: payload.productCode,
                list: data,
              });
            }),
            catchError((error) =>
              of(
                new ProductActions.LoadProductReferencesFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productReferencesConnector: ProductReferencesConnector
  ) {}
}
