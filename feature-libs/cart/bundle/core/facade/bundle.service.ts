import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BundleActions, BundleSelectors, StateWithBundle } from '../store';
import { BundleStarter } from '../model/bundle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalMessageService, RoutingService, SearchConfig, WindowRef } from '@spartacus/core';

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
   */
  getAvailableEntriesLoading(): Observable<boolean> {
    return this.store.pipe(select(BundleSelectors.getAvailableEntriesLoading));
  }

  /**
   * Returns boolean observable for store's success state
   */
  getAvailableEntriesLoaded(): Observable<boolean> {
    return this.store.pipe(select(BundleSelectors.getAvailableEntriesSuccess));
  }

  /**
   * Returns observable for store's entities
   */
  getAvailableEntriesEntities(): Observable<any> {
    return this.store.pipe(
      select(BundleSelectors.getAvailableEntriesEntities),
      map((data) => {
        return data.availableEntriesEntities
      })
    );
  }

  /**
 * Returns observable for store's entities
 */
  getAvailableEntriesEntity(cartId: string, entryGroupNumber: number): Observable<any> {
    return this.store.pipe(
      select(BundleSelectors.getAvailableEntriesEntities),
      map((data) => {
        console.log(data.availableEntriesEntities?.[cartId]?.[entryGroupNumber])
        return data.availableEntriesEntities?.[cartId]?.[entryGroupNumber]
      })
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
