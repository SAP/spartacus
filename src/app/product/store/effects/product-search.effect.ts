import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import * as productsSearchActions from '../actions/product-search.action';
import { OccProductSearchService } from '../../../newocc/product/product-search.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$ = this.actions$
    .ofType(productsSearchActions.SEARCH_PRODUCTS)
    .pipe(
      map((action: productsSearchActions.SearchProducts) => action.payload),
      switchMap(payload => {
        return this.occProductSearchService
          .query(payload.queryText, payload.searchConfig.pageSize)
          .pipe(
            map(data => {
              this.productImageConverter.convertList(data.products);
              return new productsSearchActions.SearchProductsSuccess(data);
            }),
            catchError(error =>
              of(new productsSearchActions.SearchProductsFail(error))
            )
          );
      })
    );

  @Effect()
  getProductSuggestions$ = this.actions$
    .ofType(productsSearchActions.GET_PRODUCT_SUGGESTIONS)
    .pipe(
      map(
        (action: productsSearchActions.GetProductSuggestions) => action.payload
      ),
      switchMap(payload => {
        return this.occProductSearchService
          .queryProductSuggestions(payload.term, payload.searchConfig.pageSize)
          .pipe(
            map(data => {
              if (data.suggestions === undefined) {
                return new productsSearchActions.GetProductSuggestionsSuccess(
                  []
                );
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
