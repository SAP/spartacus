import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import {
  GeoPoint,
  GlobalMessageService,
  GlobalMessageType,
  PointOfService,
  RoutingService,
  SearchConfig,
  WindowRef,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { StoreEntities } from '../model';
import { StoreFinderActions } from '../store/actions/index';
import { StoreFinderSelectors } from '../store/selectors/index';
import { StateWithStoreFinder } from '../store/store-finder-state';

@Injectable({
  providedIn: 'root',
})
export class StoreFinderService implements OnDestroy {
  private geolocationWatchId: number | null = null;
  protected subscription = new Subscription();

  constructor(
    protected store: Store<StateWithStoreFinder>,
    protected winRef: WindowRef,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {
    this.reloadStoreEntitiesOnContextChange();
  }

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
   * Returns observable for a single store by Id
   */
  getFindStoreEntityById(): Observable<StoreEntities> {
    return this.store.pipe(
      select(StoreFinderSelectors.getFindStoresEntities),
      map((data) => data.findStoreEntityById)
    );
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
  getViewAllStoresEntities(): Observable<StoreEntities> {
    return this.store.pipe(
      select(StoreFinderSelectors.getViewAllStoresEntities),
      map((data) => data.viewAllStoresEntities)
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
      this.geolocationWatchId =
        this.winRef.nativeWindow.navigator.geolocation.watchPosition(
          (pos: GeolocationPosition) => {
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
      this.winRef.nativeWindow?.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(callbackAction);
  }

  private isEmpty(store: StoreEntities): boolean {
    return (
      !store || (typeof store === 'object' && Object.keys(store).length === 0)
    );
  }

  /**
   * Reload store data when store entities are empty because of the context change
   */
  protected reloadStoreEntitiesOnContextChange(): void {
    if (isPlatformBrowser(this.platformId) || !this.platformId) {
      this.subscription = this.getFindStoresEntities()
        .pipe(
          filter((data) => this.isEmpty(data)),
          withLatestFrom(
            this.getStoresLoading(),
            this.getStoresLoaded(),
            this.routingService.getParams()
          )
        )
        .subscribe(([, loading, loaded, routeParams]) => {
          if (!loading && !loaded) {
            if (routeParams.country && !routeParams.store) {
              this.callFindStoresAction(routeParams);
            }
            if (routeParams.store) {
              this.viewStoreById(routeParams.store);
            }
          }
        });
    }
  }

  callFindStoresAction(routeParams: { [key: string]: string }): void {
    this.findStoresAction(
      '',
      {
        pageSize: -1,
      },
      undefined,
      routeParams.country
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Returns store latitude
   * @param location store location
   */
  getStoreLatitude(location: PointOfService): number | undefined {
    return location?.geoPoint?.latitude;
  }

  /**
   * Returns store longitude
   * @param location store location
   */
  getStoreLongitude(location: PointOfService): number | undefined {
    return location?.geoPoint?.longitude;
  }
}
