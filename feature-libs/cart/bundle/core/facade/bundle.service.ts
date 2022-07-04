import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BundleActions, BundleSelectors, StateWithBundle } from '../store';
import { BundleStarter } from '../model/bundle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GlobalMessageService,
  Product,
  RoutingService,
  SearchConfig,
  WindowRef,
} from '@spartacus/core';
import { BundleTypes } from '../model';
import { EntryGroup } from '@spartacus/cart/base/root';

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
  ) {}

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
        return data.availableEntriesEntities;
      })
    );
  }

  /**
   * Returns observable for store's entities
   */
  getAvailableEntriesEntity(
    cartId: string,
    entryGroupNumber: number
  ): Observable<any> {
    return this.store.pipe(
      select(BundleSelectors.getAvailableEntriesEntities),
      map((data) => {
        console.log(
          data.availableEntriesEntities?.[cartId]?.[entryGroupNumber]
        );
        return data.availableEntriesEntities?.[cartId]?.[entryGroupNumber];
      })
    );
  }

  /**
   * Get all selected products for the bundle
   *
   * @param cartId
   * @param bundleId
   * @param sectionId
   * @returns selected products for given bundle
   */
  getBundleSelectedProducts(
    cartId: string,
    bundleId: number
  ): Observable<Record<number, Product[]>> {
    return this.store.pipe(
      select(BundleSelectors.getSelectedProductsState),
      map((data: any) => data?.[cartId]?.[bundleId])
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

  /**
   * Select product for bundle section
   *
   * @param cartId
   * @param bundleId
   * @param sectionId
   * @param product
   */
  addProductToBundle(
    cartId: string,
    bundleId: number,
    sectionId: number,
    product: Product
  ) {
    this.store.dispatch(
      new BundleActions.AddProductToBundle({
        cartId,
        bundleId,
        sectionId,
        product,
      })
    );
  }

  /**
   * Remove product from bundle section
   *
   * @param cartId
   * @param bundleId
   * @param sectionId
   * @param product
   */
  removeProductFromBundle(
    cartId: string,
    bundleId: number,
    sectionId: number,
    product: Product
  ) {
    this.store.dispatch(
      new BundleActions.RemoveProductFromBundle({
        cartId,
        bundleId,
        sectionId,
        product,
      })
    );
  }

  /**
   * Check if given entry group is a bundle
   *
   * @param entryGroup
   */
  isBundle(entryGroup: EntryGroup): boolean {
    return (
      Boolean(entryGroup.type) &&
      Object.values(BundleTypes).includes(entryGroup.type as BundleTypes)
    );
  }
}
