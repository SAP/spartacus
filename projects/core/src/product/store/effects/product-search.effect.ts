import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRouterStore from '@ngrx/router-store';

import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  skipLast,
  filter,
  withLatestFrom
} from 'rxjs/operators';

import * as productsSearchActions from '../actions/product-search.action';
import { ProductImageConverterService } from '../converters/product-image-converter.service';
import { OccProductSearchService } from '../../occ/product-search.service';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$: Observable<
    | productsSearchActions.SearchProductsSuccess
    | productsSearchActions.SearchProductsFail
  > = this.actions$.pipe(
    ofType(productsSearchActions.SEARCH_PRODUCTS),
    switchMap((action: productsSearchActions.SearchProducts) => {
      return this.occProductSearchService
        .query(action.payload.queryText, action.payload.searchConfig)
        .pipe(
          map(data => {
            this.productImageConverter.convertList(data.products);
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
      return this.occProductSearchService
        .queryProductSuggestions(payload.term, payload.searchConfig.pageSize)
        .pipe(
          map(data => {
            if (data.suggestions === undefined) {
              return new productsSearchActions.GetProductSuggestionsSuccess([]);
            }
            return new productsSearchActions.GetProductSuggestionsSuccess(
              data.suggestions
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
    private occProductSearchService: OccProductSearchService,
    private productImageConverter: ProductImageConverterService
  ) {}
}
