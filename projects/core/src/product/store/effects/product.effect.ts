import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMapTo } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { ProductConnector } from '../../connectors/product/product.connector';
import { ProductActions } from '../actions/index';
import { ProductWithScope } from '../../connectors/product/product-woth-scope';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/buffer-debounce-time';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$: Observable<
    ProductActions.LoadProductSuccess | ProductActions.LoadProductFail
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    ),
    switchMapTo(this.actions$),
    ofType(ProductActions.LOAD_PRODUCT),
    map((action: ProductActions.LoadProduct) => ({
      code: action.payload,
      scope: action.meta.scope,
    })),
    bufferDebounceTime(0),
    mergeMap(products =>
      merge(
        ...this.productConnector.getMany(products).map(this.productLoadEffect)
      )
    )
  );

  private productLoadEffect(
    productLoad: ProductWithScope
  ): Observable<
    ProductActions.LoadProductSuccess | ProductActions.LoadProductFail
  > {
    return productLoad.data$.pipe(
      map(
        data =>
          new ProductActions.LoadProductSuccess(
            { code: productLoad.code, ...data },
            productLoad.scope
          )
      ),
      catchError(error => {
        return of(
          new ProductActions.LoadProductFail(
            productLoad.code,
            makeErrorSerializable(error),
            productLoad.scope
          )
        );
      })
    );
  }

  constructor(
    private actions$: Actions,
    private productConnector: ProductConnector
  ) {}
}
