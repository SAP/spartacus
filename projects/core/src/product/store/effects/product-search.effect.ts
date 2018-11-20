import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as productsSearchActions from '../actions/product-search.action';
import { OccProductSearchService } from '../../occ/product-search.service';
import { ProductImageConverterService } from '../converters/product-image-converter.service';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$: Observable<any> = this.actions$.pipe(
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
  getProductSuggestions$: Observable<any> = this.actions$.pipe(
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

  constructor(
    private actions$: Actions,
    private occProductSearchService: OccProductSearchService,
    private productImageConverter: ProductImageConverterService
  ) {}
}
