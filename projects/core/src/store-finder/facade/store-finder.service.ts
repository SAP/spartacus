import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { GeoPoint } from '../../model/misc.model';
import { SearchConfig } from '../../product/model/search-config';
import { RoutingService } from '../../routing/index';
import { WindowRef } from '../../window/window-ref';
import { StoreFinderActions } from '../store/actions/index';
import { StoreFinderSelectors } from '../store/selectors/index';
import {
  FindStoresState,
  StateWithStoreFinder,
  ViewAllStoresState,
} from '../store/store-finder-state';

@Injectable({
  providedIn: 'root',
})
export class StoreFinderService {
  private geolocationWatchId: number = null;

  constructor(
    protected store: Store<StateWithStoreFinder>,
    protected winRef: WindowRef,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns boolean observable for store's loading state
   */
  getStoresLoading(): Observable<boolean> {
    return this.store.pipe(select(StoreFinderSelectors.getStoresLoading));
  }

  /**
   * Returns observable for store's entities
   */
  getFindStoresEntities(): Observable<FindStoresState> {
    return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities));
  }

  /**
   * Returns boolean observable for view all store's loading state
   */
  getViewAllStoresLoading(): Observable<boolean> {
    return this.store.pipe(
      select(StoreFinderSelectors.getViewAllStoresLoading)
    );
  }

  /**
   * Returns observable for view all store's entities
   */
  getViewAllStoresEntities(): Observable<ViewAllStoresState> {
    return this.store.pipe(
      select(StoreFinderSelectors.getViewAllStoresEntities)
    );
  }

  /**
   * Store finding action functionality
   * @param queryText text query
   * @param searchConfig search configuration
   * @param longitudeLatitude longitude and latitude coordinates
   * @param countryIsoCode country ISO code
   * @param useMyLocation current location coordinates
   * @param radius radius of the scope from the center point
   */
  findStoresAction(
    queryText: string,
    searchConfig?: SearchConfig,
    longitudeLatitude?: GeoPoint,
    countryIsoCode?: string,
    useMyLocation?: boolean,
    radius?: number
  ) {
    if (useMyLocation && this.winRef.nativeWindow) {
      this.clearWatchGeolocation(new StoreFinderActions.FindStoresOnHold());
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          const position: GeoPoint = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };

          this.clearWatchGeolocation(
            new StoreFinderActions.FindStores({
              queryText: queryText,
              searchConfig: searchConfig,
              longitudeLatitude: position,
              countryIsoCode: countryIsoCode,
              radius: radius,
            })
          );
        },
        () => {
          this.globalMessageService.add(
            { key: 'storeFinder.geolocationNotEnabled' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.routingService.go(['/store-finder']);
        }
      );
    } else {
      this.clearWatchGeolocation(
        new StoreFinderActions.FindStores({
          queryText: queryText,
          searchConfig: searchConfig,
          longitudeLatitude: longitudeLatitude,
          countryIsoCode: countryIsoCode,
          radius: radius,
        })
      );
    }
  }

  /**
   * View all stores
   */
  viewAllStores() {
    this.clearWatchGeolocation(new StoreFinderActions.ViewAllStores());
  }

  /**
   * View all stores by id
   * @param storeId store id
   */
  viewStoreById(storeId: string) {
    this.clearWatchGeolocation(
      new StoreFinderActions.FindStoreById({ storeId })
    );
  }

  private clearWatchGeolocation(callbackAction: Action) {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(callbackAction);
  }
}
