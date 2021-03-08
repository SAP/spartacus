import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreFinderSelectors } from '../store/selectors/index';
import { StateWithStoreFinder } from '../store/store-finder-state';
import {
  GlobalMessageService,
  RoutingService,
  SearchConfig,
  WindowRef,
} from '@spartacus/core';
import { StoreEntities } from '../model';
import { map } from 'rxjs/operators';
import { BundleActions } from '../store';
import { BundleStarter } from 'projects/core/src/cart/bundle/core/public_api';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  constructor(
    protected store: Store<StateWithStoreFinder>,
    protected winRef: WindowRef,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    @Inject(PLATFORM_ID) protected platformId?: any
  ) {}

  /**
   * Returns boolean observable for store's loading state
   */
  getStoresLoading(): Observable<boolean> {
    return this.store.pipe(select(StoreFinderSelectors.getStoresLoading));
  }

  /**
   * Returns boolean observable for store's success state
   */
  getStoresLoaded(): Observable<boolean> {
    return this.store.pipe(select(StoreFinderSelectors.getStoresSuccess));
  }

  /**
   * Returns observable for store's entities
   */
  getFindStoresEntities(): Observable<StoreEntities> {
    return this.store.pipe(
      select(StoreFinderSelectors.getFindStoresEntities),
      map((data) => data.findStoresEntities)
    );
  }

  /**
   * Start bundle
   *
   * @param cartId
   * @param userId
   * @param productCode
   * @param quantity
   * @param templateId
   */
  startBundle(cartId: string, userId: string, bundleStarter: BundleStarter) {
    this.store.dispatch(
      new BundleActions.StartBundle({
        cartId,
        userId,
        bundleStarter,
      })
    );
  }

  /**
   * Start bundle
   *
   * @param cartId
   * @param userId
   * @param entryGroupNumber
   */
  getBundleAllowedProducts(
    cartId: string,
    userId: string,
    entryGroupNumber: number,
    searchConfig?: SearchConfig
  ) {
    this.store.dispatch(
      new BundleActions.GetBundleAllowedProducts({
        cartId,
        userId,
        entryGroupNumber,
        searchConfig,
      })
    );
  }
}
