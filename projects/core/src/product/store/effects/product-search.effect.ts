import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';

import * as productsSearchActions from '../actions/product-search.action';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$: Observable<
    | productsSearchActions.SearchProductsSuccess
    | productsSearchActions.SearchProductsFail
  > = this.actions$.pipe(
    ofType(productsSearchActions.SEARCH_PRODUCTS),
    groupBy((action: productsSearchActions.SearchProducts) => action.auxiliary),
    mergeMap(group =>
      group.pipe(
        switchMap((action: productsSearchActions.SearchProducts) => {
          return this.productSearchConnector
            .search(action.payload.queryText, action.payload.searchConfig)
            .pipe(
              map(data => {
                return new productsSearchActions.SearchProductsSuccess(
                  data,
                  action.auxiliary
                );
              }),
              catchError(error =>
                of(
                  new productsSearchActions.SearchProductsFail(
                    error,
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
    | productsSearchActions.GetProductSuggestionsSuccess
    | productsSearchActions.GetProductSuggestionsFail
  > = this.actions$.pipe(
    ofType(productsSearchActions.GET_PRODUCT_SUGGESTIONS),
    map(
      (action: productsSearchActions.GetProductSuggestions) => action.payload
    ),
    switchMap(payload => {
      return this.productSearchConnector
        .getSuggestions(payload.term, payload.searchConfig.pageSize)
        .pipe(
          map(suggestions => {
            if (suggestions === undefined) {
              return new productsSearchActions.GetProductSuggestionsSuccess([]);
            }
            return new productsSearchActions.GetProductSuggestionsSuccess(
              suggestions
            );
          }),
          catchError(error =>
            of(new productsSearchActions.GetProductSuggestionsFail(error))
          )
        );
    })
  );

  @Effect()
  getProductsAfterNavigateBackOrForward: Observable<any> = this.actions$.pipe(
    ofType(fromRouterStore.ROUTER_REQUEST),
    map((action: fromRouterStore.RouterRequestAction) => action.payload.event),
    filter(event => event.navigationTrigger === 'popstate'),
    // TODO: filter should allow for route {category, brand, search} only
    withLatestFrom(
      this.actions$.pipe(
        ofType(productsSearchActions.SEARCH_PRODUCTS),
        skipLast(1)
      )
    ),
    map(
      ([, searchProductAction]: [
        NavigationStart,
        productsSearchActions.SearchProducts | never[]
      ]) => {
        if (
          searchProductAction instanceof productsSearchActions.SearchProducts
        ) {
          return new productsSearchActions.SearchProducts(
            searchProductAction.payload
          );
        } else {
          return new productsSearchActions.SearchProductsFail({});
        }
      }
    )
  );

  constructor(
    private actions$: Actions,
    private productSearchConnector: ProductSearchConnector
  ) {}
}
