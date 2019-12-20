import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductLoadingService {
  private products: {
    [code: string]: { [scope: string]: Observable<Product> };
  } = {};

  constructor(
    protected store: Store<StateWithProduct>,
    protected loadingScopes: LoadingScopesService,
    protected actions$: Actions,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  get(productCode: string, scopes: string[]): Observable<Product> {
    scopes = this.loadingScopes.expand('product', scopes);

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

  protected initProductScopes(productCode: string, scopes: string[]): void {
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
  protected getProductForScope(
    productCode: string,
    scope: string
  ): Observable<Product> {
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

    const isLoading$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)
      )
    );

    const productLoadLogic$ = merge(
      shouldLoad$,
      ...this.getProductReloadTriggers(productCode, scope)
    ).pipe(
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

  /**
   * Returns reload triggers for product per scope
   *
   * @param productCode
   * @param scope
   */
  protected getProductReloadTriggers(
    productCode: string,
    scope: string
  ): Observable<boolean>[] {
    const triggers = [];

    // TTL trigger add
    const ttl = this.loadingScopes.getTtl('product', scope);
    if (ttl && isPlatformBrowser(this.platformId)) {
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

      triggers.push(this.getTTLReloadTrigger(loadStart$, loadSuccess$, ttl));
    }

    return triggers;
  }

  /**
   * Generic method that returns stream triggering reload by TTL
   *
   * Could be refactored to separate service in future to use in other
   * TTL reload implementations
   *
   * @param loadStart$ Stream that emits on load start
   * @param loadSuccess$ Stream that emits on load success
   * @param ttl TTL
   */
  private getTTLReloadTrigger(
    loadStart$,
    loadSuccess$,
    ttl
  ): Observable<boolean> {
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
}
