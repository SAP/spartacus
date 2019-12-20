import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, defer, merge, Observable, of, using } from 'rxjs';
import {
  auditTime,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { deepMerge } from '../../config/utils/deep-merge';
import { withdrawOn } from '../../util/withdraw-on';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class ProductService {
  constructor(
    store: Store<StateWithProduct>,
    // tslint:disable-next-line:unified-signatures
    loadingScopes: LoadingScopesService,
    actions$: Actions
  );
  /**
   * @deprecated since 1.4
   */
  constructor(store: Store<StateWithProduct>);

  constructor(
    protected store: Store<StateWithProduct>,
    protected loadingScopes?: LoadingScopesService,
    protected actions$?: Actions
  ) {}

  private products: {
    [code: string]: { [scope: string]: Observable<Product> };
  } = {};

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   *
   * You should provide product data scope you are interested in to not load all
   * the data if not needed. You can provide more than one scope.
   *
   * @param productCode Product code to load
   * @param scopes Scope or scopes of the product data
   */
  get(
    productCode: string,
    scopes: string[] | string = ''
  ): Observable<Product> {
    scopes = [].concat(scopes);

    if (this.loadingScopes) {
      scopes = this.loadingScopes.expand('product', scopes);
    }

    this.initProductScopes(productCode, scopes);

    if (scopes.length > 1) {
      return combineLatest(
        scopes.map(scope => this.products[productCode][scope])
      ).pipe(
        auditTime(0),
        map(
          productParts =>
            productParts.find(Boolean) && deepMerge({}, ...productParts)
        )
      );
    } else {
      return this.products[productCode][scopes[0]];
    }
  }

  private initProductScopes(productCode: string, scopes: string[]): void {
    if (!this.products[productCode]) {
      this.products[productCode] = {};
    }

    for (const scope of scopes) {
      if (!this.products[productCode][scope]) {
        this.products[productCode][scope] = this.getProductForScope(
          productCode,
          scope
        );
      }
    }
  }

  /**
   * Creates observable for providing specified product data for the scope
   *
   * @param productCode
   * @param scope
   */
  private getProductForScope(
    productCode: string,
    scope: string
  ): Observable<Product> {
    const ttl = this.loadingScopes.getTtl('product', scope);

    const loadSuccess$ = this.actions$.pipe(
      ofType(ProductActions.LOAD_PRODUCT_SUCCESS),
      filter(
        (action: ProductActions.LoadProductSuccess) =>
          action.payload.code === productCode && action.meta.scope === scope
      )
    );

    const loadStart$ = this.actions$.pipe(
      ofType(ProductActions.LOAD_PRODUCT),
      filter(
        (action: ProductActions.LoadProduct) =>
          action.payload === productCode && action.meta.scope === scope
      )
    );

    const shouldLoad$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductStateFactory(productCode, scope)
      ),
      map(
        productState =>
          !productState.loading && !productState.success && !productState.error
      ),
      distinctUntilChanged(),
      filter(x => !!x)
    );

    const shouldReload$ = this.getTTLReloadTicker(
      loadStart$,
      loadSuccess$,
      ttl
    );

    const loadTriggers = [shouldLoad$];

    if (ttl) {
      loadTriggers.push(shouldReload$);
    }

    const isLoading$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)
      )
    );

    const productLoadLogic$ = merge(...loadTriggers).pipe(
      debounceTime(0),
      withLatestFrom(isLoading$),
      tap(([, isLoading]) => {
        if (!isLoading) {
          this.store.dispatch(
            new ProductActions.LoadProduct(productCode, scope)
          );
        }
      })
    );

    const productData$ = this.store.pipe(
      select(ProductSelectors.getSelectedProductFactory(productCode, scope))
    );

    return using(() => productLoadLogic$.subscribe(), () => productData$).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getTTLReloadTicker(loadStart$, loadSuccess$, ttl): Observable<boolean> {
    let timestamp = 0;

    const timestamp$ = loadSuccess$.pipe(tap(() => (timestamp = Date.now())));

    const shouldReload$: Observable<boolean> = defer(() => {
      const age = Date.now() - timestamp;

      const timestampRefresh$ = timestamp$.pipe(
        delay(ttl),
        mapTo(true),
        withdrawOn(loadStart$)
      );

      if (timestamp === 0 || age > ttl) {
        return merge(of(true), timestampRefresh$);
      } else {
        return merge(of(true).pipe(delay(ttl - age)), timestampRefresh$);
      }
    });

    return shouldReload$;
  }

  /**
   * Returns boolean observable for product's loading state
   */
  isLoading(productCode: string, scope = ''): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load success state
   */
  isSuccess(productCode: string, scope = ''): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSuccessFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load error state
   */
  hasError(productCode: string, scope = ''): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductErrorFactory(productCode, scope)
      )
    );
  }

  /**
   * Reloads the product. The product is loaded implicetly
   * whenever selected by the `get`, but in some cases an
   * explicit reload might be needed.
   */
  reload(productCode: string, scope = ''): void {
    this.store.dispatch(new ProductActions.LoadProduct(productCode, scope));
  }
}
