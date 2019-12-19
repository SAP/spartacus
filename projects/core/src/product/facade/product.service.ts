import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  merge,
  Observable,
  of,
  queueScheduler,
  timer,
} from 'rxjs';
import {
  auditTime,
  delay,
  distinctUntilChanged,
  map,
  mapTo,
  observeOn,
  pluck,
  shareReplay,
  startWith,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { deepMerge } from '../../config/utils/deep-merge';

@Injectable()
export class ProductService {
  constructor(
    store: Store<StateWithProduct>,
    // tslint:disable-next-line:unified-signatures
    loadingScopes: LoadingScopesService
  );
  /**
   * @deprecated since 1.4
   */
  constructor(store: Store<StateWithProduct>);

  constructor(
    protected store: Store<StateWithProduct>,
    protected loadingScopes?: LoadingScopesService
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
    // return this.store.pipe(
    //   select(
    //     ProductSelectors.getSelectedProductStateFactory(productCode, scope)
    //   ),
    //   observeOn(queueScheduler),
    //   tap(productState => {
    //
    //     const attemptedLoad =
    //       productState.loading || productState.success || productState.error;
    //     console.log('ATTE', attemptedLoad);
    //     if (!attemptedLoad) {
    //       this.store.dispatch(
    //         new ProductActions.LoadProduct(productCode, scope)
    //       );
    //     }
    //   }),
    //   map(productState => productState.value),
    //   shareReplay({ bufferSize: 1, refCount: true })
    // );

    let timestamp = 0;
    const ttl = this.loadingScopes.getTtl('product', scope);
    let wasLoading = false;

    let timeout;

    const queuedProductState$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductStateFactory(productCode, scope)
      ),
      observeOn(queueScheduler)
    );

    const ttlReload = new BehaviorSubject<undefined>(undefined);
    const ttlSource$ = ttlReload.pipe(
      delay(ttl),
      startWith(undefined)
    );

    const ttlRestart$ = defer(() => {
      const age = Date.now() - timestamp;
      const delayTime = age < ttl ? ttl - age : 0;
      return ttlReload.pipe(
        delay(delayTime),
        startWith(undefined)
      );
    });

    console.log('__------------- INITITINg ---------asdsa');
    const ttlTicker$ = ttl
      ? defer(() => {
          const age = Date.now() - timestamp;
          const delayTime = age < ttl ? ttl - age : 0;
          // console.log('interval', delay, age);
          return timer(delayTime, ttl);
        })
      : of(undefined);

    /*

Kiedy wywołujemy reload?




 */

    const timestamp$ = new BehaviorSubject<number>(0);

    const shouldReload$: Observable<boolean> = defer(() => {
      console.log('we are in defer');

      const age = Date.now() - timestamp$.value;

      const timestampRefresh$ = timestamp$.pipe(
        tap(x => console.log('timestaop', x)),
        delay(ttl),
        mapTo(true)
      );

      if (timestamp$.value === 0 || age > ttl) {
        console.log('defer standard 0 ', ttl);
        return timestampRefresh$.pipe(startWith(true));
      } else {
        console.log('defer special 0 ', ttl, ttl - age);
        return merge(
          timestampRefresh$.pipe(startWith(false)),
          timer(ttl - age).pipe(mapTo(true))
        );
      }
    });

    const shouldReloadIsLoadAttempted$ = combineLatest(
      queuedProductState$,
      // ttlTicker$
      ttl
        ? shouldReload$.pipe(tap(x => console.log('should reload emit', x)))
        : of(false)
    ).pipe(
      // tap((_, b) => console.log('timer', b)),
      // tap(x => {
      //   i++;
      //   console.log('dadsa', x, i);
      // }),
      tap(([productState]) => {
        console.log('tapp', wasLoading, productState.loading, productState.success);
        if (productState.loading) {
          wasLoading = true;
          console.log('was loading TRUE');
        } else {
          if (wasLoading && productState.success) {
            timestamp$.next(Date.now());

            // ttlReload.next(undefined);
            // console.log('set timeout');
            // timeout = setTimeout(() => {
            //   console.log('do timeout');
            //   ttlReload.next(undefined);
            // }, ttl);

            // console.log('set time stamp');
            wasLoading = false;
          }
        }
      }),
      map(([productState, shouldReload]) => {
        let isLoadAttempted =
          productState.loading || productState.success || productState.error;

        // const now = Date.now();
        // if (
        //   isLoadAttempted &&
        //   !productState.loading &&
        //   ttl &&
        //   now - timestamp$.value > ttl
        // ) {
        //   isLoadAttempted = false;
        // }
        // console.log('check', now - timestamp$.value);
        return !isLoadAttempted || shouldReload;
      }),
      distinctUntilChanged()
    );

    const productData$ = this.store.pipe(
      select(ProductSelectors.getSelectedProductFactory(productCode, scope))
    );

    // const productWithLoad$ = isLoadAttempted$.pipe(
    //   tap(isLoadAttempted => {
    //     console.log('ATTEMPTE', isLoadAttempted, productCode + scope);
    //     if (!isLoadAttempted) {
    //       this.store.dispatch(
    //         new ProductActions.LoadProduct(productCode, scope)
    //       );
    //     }
    //   }),
    //   switchMapTo(productData$),
    //   distinctUntilChanged(),
    //   shareReplay({ bufferSize: 1, refCount: true })
    // );

    return shouldReloadIsLoadAttempted$.pipe(
      tap(shouldReloadIsLoadAttempted => {
        // console.log('ATTEMPTE', isLoadAttempted, productCode + scope);

        if (shouldReloadIsLoadAttempted) {
          this.store.dispatch(
            new ProductActions.LoadProduct(productCode, scope)
          );
        }
      }),
      switchMapTo(productData$),
      distinctUntilChanged(),
      // map((x, index) => {
      //   console.log('mapppp', index);
      //
      //   if (index === 0 && timestamp !== 0) {
      //     const age = Date.now() - timestamp;
      //     if (age < ttl) {
      //       console.log('restore timeout', ttl - age);
      //       timeout = setTimeout(() => {
      //         console.log('do timeout');
      //         ttlReload.next(undefined);
      //       }, ttl - age);
      //     }
      //   }
      //
      //   return x;
      // }),
      // finalize(() => {
      //   if (timeout) {
      //     console.log('clear timeout');
      //     clearTimeout(timeout);
      //     timeout = undefined;
      //   }
      // }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // return combineLatest(
    //   this.store.pipe(
    //     select(
    //       ProductSelectors.getSelectedProductStateFactory(productCode, scope)
    //     ),
    //     observeOn(queueScheduler)
    //   ),
    //   ttl ? interval(ttl) : of(undefined)
    // ).pipe(
    //   pluck(0),
    //   tap(productState => {
    //     if (
    //       !loaded &&
    //       !productState.loading &&
    //       (productState.success || productState.error)
    //     ) {
    //       timestamp = Date.now();
    //       loaded = true;
    //       console.log('timestamp', timestamp);
    //     }
    //   }),
    //   tap(productState => {
    //     const attemptedLoad =
    //       productState.loading || productState.success || productState.error;
    //
    //     const ttlExpired = ttl && Date.now() - timestamp > ttl;
    //
    //     const shouldLoad = !attemptedLoad || (ttlExpired && !productState.loading);
    //
    //     if (shouldLoad) {
    //       timestamp = Date.now();
    //       this.store.dispatch(
    //         new ProductActions.LoadProduct(productCode, scope)
    //       );
    //     }
    //   }),
    //   map(productState => productState.value),
    //   distinctUntilChanged(),
    //   shareReplay({ bufferSize: 1, refCount: true })
    // );
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
