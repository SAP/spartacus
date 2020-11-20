import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  defer,
  merge,
  Observable,
  of,
  SchedulerLike,
  using,
} from 'rxjs';
import {
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
import { deepMerge } from '../../config/utils/deep-merge';
import { Product } from '../../model/product.model';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { withdrawOn } from '../../util/withdraw-on';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { polish } from '../../util/polish';

@Injectable({
  providedIn: 'root',
})
export class ProductLoadingService {
  protected products: {
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
    return this.products[productCode][this.getScopesIndex(scopes)];
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

    if (scopes.length > 1) {
      this.products[productCode][this.getScopesIndex(scopes)] = combineLatest(
        scopes.map((scope) => this.products[productCode][scope])
      ).pipe(
        polish(),
        map((productParts) =>
          productParts.every(Boolean)
            ? deepMerge({}, ...productParts)
            : undefined
        ),
        distinctUntilChanged()
      );
    }
  }

  protected getScopesIndex(scopes: string[]): string {
    return scopes.join('ɵ');
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
        (productState) =>
          !productState.loading && !productState.success && !productState.error
      ),
      distinctUntilChanged(),
      filter((x) => x)
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

    return using(
      () => productLoadLogic$.subscribe(),
      () => productData$
    ).pipe(shareReplay({ bufferSize: 1, refCount: true }));
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

    // max age trigger add
    const maxAge = this.loadingScopes.getMaxAge('product', scope);
    if (maxAge && isPlatformBrowser(this.platformId)) {
      // we want to grab load product success and load product fail for this product and scope
      const loadFinish$ = this.actions$.pipe(
        filter(
          (
            action:
              | ProductActions.LoadProductSuccess
              | ProductActions.LoadProductFail
          ) =>
            (action.type === ProductActions.LOAD_PRODUCT_SUCCESS ||
              action.type === ProductActions.LOAD_PRODUCT_FAIL) &&
            action.meta.entityId === productCode &&
            action.meta.scope === scope
        )
      );

      const loadStart$ = this.actions$.pipe(
        ofType(ProductActions.LOAD_PRODUCT),
        filter(
          (action: ProductActions.LoadProduct) =>
            action.payload === productCode && action.meta.scope === scope
        )
      );

      triggers.push(this.getMaxAgeTrigger(loadStart$, loadFinish$, maxAge));
    }

    return triggers;
  }

  /**
   * Generic method that returns stream triggering reload by maxAge
   *
   * Could be refactored to separate service in future to use in other
   * max age reload implementations
   *
   * @param loadStart$ Stream that emits on load start
   * @param loadFinish$ Stream that emits on load finish
   * @param maxAge max age
   */
  private getMaxAgeTrigger(
    loadStart$: Observable<any>,
    loadFinish$: Observable<any>,
    maxAge: number,
    scheduler?: SchedulerLike
  ): Observable<boolean> {
    let timestamp = 0;

    const now = () => (scheduler ? scheduler.now() : Date.now());

    const timestamp$ = loadFinish$.pipe(tap(() => (timestamp = now())));

    const shouldReload$: Observable<boolean> = defer(() => {
      const age = now() - timestamp;

      const timestampRefresh$ = timestamp$.pipe(
        delay(maxAge, scheduler),
        mapTo(true),
        withdrawOn(loadStart$)
      );

      if (age > maxAge) {
        // we should emit first value immediately
        return merge(of(true), timestampRefresh$);
      } else if (age === 0) {
        // edge case, we should emit max age timeout after next load success
        // could happen with artificial schedulers
        return timestampRefresh$;
      } else {
        // we should emit first value when age will expire
        return merge(
          of(true).pipe(delay(maxAge - age, scheduler)),
          timestampRefresh$
        );
      }
    });

    return shouldReload$;
  }
}
