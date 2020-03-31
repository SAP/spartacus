import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ErrorModel } from '../../../model/misc.model';
import { ProductReferencesConnector } from '../../connectors/references/product-references.connector';
import { ProductActions } from '../actions/index';

@Injectable()
export class ProductReferencesEffects {
  @Effect()
  loadProductReferences$: Observable<
    | ProductActions.LoadProductReferencesSuccess
    | ProductActions.LoadProductReferencesFail
  > = this.actions$.pipe(
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
          catchError((_error) =>
            of(
              new ProductActions.LoadProductReferencesFail({
                message: payload.productCode,
              } as ErrorModel)
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private productReferencesConnector: ProductReferencesConnector
  ) {}
}
