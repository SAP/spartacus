import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$: Observable<
    ProductActions.SearchProductsSuccess | ProductActions.SearchProductsFail
  > = this.actions$.pipe(
    ofType(ProductActions.SEARCH_PRODUCTS),
    groupBy((action: ProductActions.SearchProducts) => action.auxiliary),
    mergeMap((group) =>
      group.pipe(
        switchMap((action: ProductActions.SearchProducts) => {
          return this.productSearchConnector
            .search(action.payload.queryText, action.payload.searchConfig)
            .pipe(
              map((data) => {
                return new ProductActions.SearchProductsSuccess(
                  data,
                  action.auxiliary
                );
              }),
              catchError((error) =>
                of(
                  new ProductActions.SearchProductsFail(
                    normalizeHttpError(error),
                    action.auxiliary
                  )
                )
              )
            );
        })
      )
    )
  );

  @Effect()
  getProductSuggestions$: Observable<
    | ProductActions.GetProductSuggestionsSuccess
    | ProductActions.GetProductSuggestionsFail
  > = this.actions$.pipe(
    ofType(ProductActions.GET_PRODUCT_SUGGESTIONS),
    map((action: ProductActions.GetProductSuggestions) => action.payload),
    switchMap((payload) => {
      return this.productSearchConnector
        .getSuggestions(payload.term, payload.searchConfig.pageSize)
        .pipe(
          map((suggestions) => {
            if (suggestions === undefined) {
              return new ProductActions.GetProductSuggestionsSuccess([]);
            }
            return new ProductActions.GetProductSuggestionsSuccess(suggestions);
          }),
          catchError((error) =>
            of(
              new ProductActions.GetProductSuggestionsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private productSearchConnector: ProductSearchConnector
  ) {}
}
