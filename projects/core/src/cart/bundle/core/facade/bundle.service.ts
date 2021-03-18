import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { BundleActions, StateWithBundle } from '../store';
import { BundleStarter } from '../model/bundle.model';
import { WindowRef } from '../../../../window/window-ref';
import { GlobalMessageService } from '../../../../global-message/facade/global-message.service';
import { RoutingService } from '../../../../routing/facade/routing.service';
import { SearchConfig } from '../../../../product/model/search-config';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  constructor(
    protected store: Store<StateWithBundle>,
    protected winRef: WindowRef,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    @Inject(PLATFORM_ID) protected platformId?: any
  ) { }

  /**
   * Returns boolean observable for store's loading state
  //  */
  // getStoresLoading(): Observable<boolean> {
  //   return this.store.pipe(select(BundleSelectors.getBundlesLoading));
  // }

  // /**
  //  * Returns boolean observable for store's success state
  //  */
  // getStoresLoaded(): Observable<boolean> {
  //   return this.store.pipe(select(BundleSelectors.getBundlesSuccess));
  // }

  /**
   * Returns observable for store's entities
   */
  // getBundleEntities(): Observable<BundleEntities> {
  //   return this.store.pipe(
  //     select(BundleSelectors.getBundlesEntities),
  //     map((data) => data.bundlesEntities)
  //   );
  // }

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
