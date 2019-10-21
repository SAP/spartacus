import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { merge, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  startWith,
  switchMapTo,
} from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { ProductConnector } from '../../connectors/product/product.connector';
import { ProductActions } from '../actions/index';
import { ScopedProductData } from '../../connectors/product/scoped-product-data';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/buffer-debounce-time';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$ = createEffect(
    () => ({ scheduler, debounce = 0 } = {}): Observable<
      ProductActions.LoadProductSuccess | ProductActions.LoadProductFail
    > =>
      this.actions$.pipe(
        ofType(
          SiteContextActions.CURRENCY_CHANGE,
          SiteContextActions.LANGUAGE_CHANGE
        ),
        startWith({}),
        switchMapTo(this.actions$),
        ofType(ProductActions.LOAD_PRODUCT),
        map((action: ProductActions.LoadProduct) => ({
          id: action.payload,
          scope: action.meta.scope,
        })),
        bufferDebounceTime(debounce, scheduler),
        mergeMap(products =>
          merge(
            ...this.productConnector
              .getMany(products)
              .map(this.productLoadEffect)
          )
        )
      )
  );

  private productLoadEffect(
    productLoad: ScopedProductData
  ): Observable<
    ProductActions.LoadProductSuccess | ProductActions.LoadProductFail
  > {
    return productLoad.data$.pipe(
      map(
        data =>
          new ProductActions.LoadProductSuccess(
            { code: productLoad.id, ...data },
            productLoad.scope
          )
      ),
      catchError(error => {
        return of(
          new ProductActions.LoadProductFail(
            productLoad.id,
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
