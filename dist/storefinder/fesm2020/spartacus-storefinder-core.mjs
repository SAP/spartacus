import * as i0 from '@angular/core';
import { Injectable, InjectionToken, PLATFORM_ID, Inject, inject, isDevMode, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { Config, StateUtils, GlobalMessageType, LoggerService, SiteContextActions, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { map, filter, withLatestFrom, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import * as i1$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderConfig {
}
StoreFinderConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    search(query, searchConfig, longitudeLatitude, radius) {
        return this.adapter.search(query, searchConfig, longitudeLatitude, radius);
    }
    getCounts() {
        return this.adapter.loadCounts();
    }
    get(storeId) {
        return this.adapter.load(storeId);
    }
}
StoreFinderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConnector, deps: [{ token: StoreFinderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderConnector, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: StoreFinderAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const STORE_FINDER_SEARCH_PAGE_NORMALIZER = new InjectionToken('StoreFinderSearchPageNormalizer');
const STORE_COUNT_NORMALIZER = new InjectionToken('StoreCountNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const STORE_FINDER_FEATURE = 'stores';
const STORE_FINDER_DATA = '[StoreFinder] Store Finder Data';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const FIND_STORES_ON_HOLD = '[StoreFinder] On Hold';
const FIND_STORES = '[StoreFinder] Find Stores';
const FIND_STORES_FAIL = '[StoreFinder] Find Stores Fail';
const FIND_STORES_SUCCESS = '[StoreFinder] Find Stores Success';
const FIND_STORE_BY_ID = '[StoreFinder] Find a Store by Id';
const FIND_STORE_BY_ID_FAIL = '[StoreFinder] Find a Store by Id Fail';
const FIND_STORE_BY_ID_SUCCESS = '[StoreFinder] Find a Store by Id Success';
class FindStoresOnHold extends StateUtils.LoaderLoadAction {
    constructor() {
        super(STORE_FINDER_DATA);
        this.type = FIND_STORES_ON_HOLD;
    }
}
class FindStores extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(STORE_FINDER_DATA);
        this.payload = payload;
        this.type = FIND_STORES;
    }
}
class FindStoresFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(STORE_FINDER_DATA, payload);
        this.payload = payload;
        this.type = FIND_STORES_FAIL;
    }
}
class FindStoresSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(STORE_FINDER_DATA);
        this.payload = payload;
        this.type = FIND_STORES_SUCCESS;
    }
}
class FindStoreById extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(STORE_FINDER_DATA);
        this.payload = payload;
        this.type = FIND_STORE_BY_ID;
    }
}
class FindStoreByIdFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(STORE_FINDER_DATA, payload);
        this.payload = payload;
        this.type = FIND_STORE_BY_ID_FAIL;
    }
}
class FindStoreByIdSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(STORE_FINDER_DATA);
        this.payload = payload;
        this.type = FIND_STORE_BY_ID_SUCCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const VIEW_ALL_STORES = '[StoreFinder] View All Stores';
const VIEW_ALL_STORES_FAIL = '[StoreFinder] View All Stores Fail';
const VIEW_ALL_STORES_SUCCESS = '[StoreFinder] View All Stores Success';
const CLEAR_STORE_FINDER_DATA = '[StoreFinder] Clear Data';
class ViewAllStores extends StateUtils.LoaderLoadAction {
    constructor() {
        super(STORE_FINDER_DATA);
        this.type = VIEW_ALL_STORES;
    }
}
class ViewAllStoresFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(STORE_FINDER_DATA, payload);
        this.payload = payload;
        this.type = VIEW_ALL_STORES_FAIL;
    }
}
class ViewAllStoresSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(STORE_FINDER_DATA);
        this.payload = payload;
        this.type = VIEW_ALL_STORES_SUCCESS;
    }
}
class ClearStoreFinderData {
    constructor() {
        this.type = CLEAR_STORE_FINDER_DATA;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var storeFinderGroup_actions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CLEAR_STORE_FINDER_DATA: CLEAR_STORE_FINDER_DATA,
        ClearStoreFinderData: ClearStoreFinderData,
        FIND_STORES: FIND_STORES,
        FIND_STORES_FAIL: FIND_STORES_FAIL,
        FIND_STORES_ON_HOLD: FIND_STORES_ON_HOLD,
        FIND_STORES_SUCCESS: FIND_STORES_SUCCESS,
        FIND_STORE_BY_ID: FIND_STORE_BY_ID,
        FIND_STORE_BY_ID_FAIL: FIND_STORE_BY_ID_FAIL,
        FIND_STORE_BY_ID_SUCCESS: FIND_STORE_BY_ID_SUCCESS,
        FindStoreById: FindStoreById,
        FindStoreByIdFail: FindStoreByIdFail,
        FindStoreByIdSuccess: FindStoreByIdSuccess,
        FindStores: FindStores,
        FindStoresFail: FindStoresFail,
        FindStoresOnHold: FindStoresOnHold,
        FindStoresSuccess: FindStoresSuccess,
        VIEW_ALL_STORES: VIEW_ALL_STORES,
        VIEW_ALL_STORES_FAIL: VIEW_ALL_STORES_FAIL,
        VIEW_ALL_STORES_SUCCESS: VIEW_ALL_STORES_SUCCESS,
        ViewAllStores: ViewAllStores,
        ViewAllStoresFail: ViewAllStoresFail,
        ViewAllStoresSuccess: ViewAllStoresSuccess
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getStoreFinderState = createFeatureSelector(STORE_FINDER_FEATURE);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getFindStoresState = createSelector(getStoreFinderState, (storesState) => storesState.findStores);
const getFindStoresEntities = createSelector(getFindStoresState, (state) => StateUtils.loaderValueSelector(state));
const getStoresLoading = createSelector(getFindStoresState, (state) => StateUtils.loaderLoadingSelector(state));
const getStoresSuccess = createSelector(getFindStoresState, (state) => StateUtils.loaderSuccessSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getViewAllStoresState = createSelector(getStoreFinderState, (storesState) => storesState.viewAllStores);
const getViewAllStoresEntities = createSelector(getViewAllStoresState, (state) => StateUtils.loaderValueSelector(state));
const getViewAllStoresLoading = createSelector(getViewAllStoresState, (state) => StateUtils.loaderLoadingSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var storeFinderGroup_selectors = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getFindStoresEntities: getFindStoresEntities,
        getFindStoresState: getFindStoresState,
        getStoresLoading: getStoresLoading,
        getStoresSuccess: getStoresSuccess,
        getViewAllStoresEntities: getViewAllStoresEntities,
        getViewAllStoresLoading: getViewAllStoresLoading,
        getViewAllStoresState: getViewAllStoresState
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderService {
    constructor(store, winRef, globalMessageService, routingService, platformId) {
        this.store = store;
        this.winRef = winRef;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.platformId = platformId;
        this.geolocationWatchId = null;
        this.subscription = new Subscription();
        this.reloadStoreEntitiesOnContextChange();
    }
    /**
     * Returns boolean observable for store's loading state
     */
    getStoresLoading() {
        return this.store.pipe(select(getStoresLoading));
    }
    /**
     * Returns boolean observable for store's success state
     */
    getStoresLoaded() {
        return this.store.pipe(select(getStoresSuccess));
    }
    /**
     * Returns observable for store's entities
     * CXSPA-4871: The return value of this method signature is wrong, should be StoreFinderSearchPage.
     */
    getFindStoresEntities() {
        return this.store.pipe(select(getFindStoresEntities), map((data) => data.findStoresEntities));
    }
    /**
     * Returns observable for a single store by Id
     */
    getFindStoreEntityById() {
        return this.store.pipe(select(getFindStoresEntities), map((data) => data.findStoreEntityById));
    }
    /**
     * Returns boolean observable for view all store's loading state
     */
    getViewAllStoresLoading() {
        return this.store.pipe(select(getViewAllStoresLoading));
    }
    /**
     * Returns observable for view all store's entities
     */
    getViewAllStoresEntities() {
        return this.store.pipe(select(getViewAllStoresEntities), map((data) => data.viewAllStoresEntities));
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
    findStoresAction(queryText, searchConfig, longitudeLatitude, countryIsoCode, useMyLocation, radius) {
        if (useMyLocation && this.winRef.nativeWindow) {
            this.clearWatchGeolocation(new FindStoresOnHold());
            this.geolocationWatchId =
                this.winRef.nativeWindow.navigator.geolocation.watchPosition((pos) => {
                    const position = {
                        longitude: pos.coords.longitude,
                        latitude: pos.coords.latitude,
                    };
                    this.clearWatchGeolocation(new FindStores({
                        queryText: queryText,
                        searchConfig: searchConfig,
                        longitudeLatitude: position,
                        countryIsoCode: countryIsoCode,
                        radius: radius,
                    }));
                }, () => {
                    this.globalMessageService.add({ key: 'storeFinder.geolocationNotEnabled' }, GlobalMessageType.MSG_TYPE_ERROR);
                    this.routingService.go(['/store-finder']);
                });
        }
        else {
            this.clearWatchGeolocation(new FindStores({
                queryText: queryText,
                searchConfig: searchConfig,
                longitudeLatitude: longitudeLatitude,
                countryIsoCode: countryIsoCode,
                radius: radius,
            }));
        }
    }
    /**
     * View all stores
     */
    viewAllStores() {
        this.clearWatchGeolocation(new ViewAllStores());
    }
    /**
     * View all stores by id
     * @param storeId store id
     */
    viewStoreById(storeId) {
        this.clearWatchGeolocation(new FindStoreById({ storeId }));
    }
    clearWatchGeolocation(callbackAction) {
        if (this.geolocationWatchId !== null) {
            this.winRef.nativeWindow?.navigator.geolocation.clearWatch(this.geolocationWatchId);
            this.geolocationWatchId = null;
        }
        this.store.dispatch(callbackAction);
    }
    isEmpty(store) {
        return (!store || (typeof store === 'object' && Object.keys(store).length === 0));
    }
    /**
     * Reload store data when store entities are empty because of the context change
     */
    reloadStoreEntitiesOnContextChange() {
        if (isPlatformBrowser(this.platformId) || !this.platformId) {
            this.subscription = this.getFindStoresEntities()
                .pipe(filter((data) => this.isEmpty(data)), withLatestFrom(this.getStoresLoading(), this.getStoresLoaded(), this.routingService.getParams()))
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
    callFindStoresAction(routeParams) {
        this.findStoresAction('', {
            pageSize: -1,
        }, undefined, routeParams.country);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    /**
     * Returns store latitude
     * @param location store location
     */
    getStoreLatitude(location) {
        return location?.geoPoint?.latitude;
    }
    /**
     * Returns store longitude
     * @param location store location
     */
    getStoreLongitude(location) {
        return location?.geoPoint?.longitude;
    }
    /**
     * Generates a link leading to the directions of the given store location
     * @param location store location
     * @returns URL for directions to the store
     */
    getDirections(location) {
        const url = 'https://www.google.com/maps/dir/Current+Location/';
        const latitude = this.getStoreLatitude(location);
        const longitude = this.getStoreLongitude(location);
        return url + latitude + ',' + longitude;
    }
}
StoreFinderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, deps: [{ token: i1.Store }, { token: i2.WindowRef }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.WindowRef }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/google.maps" />
class GoogleMapRendererService {
    constructor(config, storeFinderService, scriptLoader) {
        this.config = config;
        this.storeFinderService = storeFinderService;
        this.scriptLoader = scriptLoader;
        this.googleMap = null;
        this.logger = inject(LoggerService);
    }
    /**
     * Renders google map on the given element and draws markers on it.
     * If map already exists it will use an existing map otherwise it will create one
     * @param mapElement HTML element inside of which the map will be displayed
     * @param locations array containign geo data to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    renderMap(mapElement, locations, selectMarkerHandler) {
        if (this.config.googleMaps?.apiKey) {
            if (Object.entries(locations[Object.keys(locations)[0]]).length > 0) {
                if (this.googleMap === null) {
                    const apiKey = this.config.googleMaps.apiKey === GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG
                        ? ''
                        : this.config.googleMaps.apiKey;
                    this.scriptLoader.embedScript({
                        src: this.config.googleMaps.apiUrl,
                        params: { key: apiKey },
                        attributes: { type: 'text/javascript' },
                        callback: () => {
                            this.drawMap(mapElement, locations, selectMarkerHandler);
                        },
                    });
                }
                else {
                    this.drawMap(mapElement, locations, selectMarkerHandler);
                }
            }
        }
        else {
            if (isDevMode()) {
                this.logger.warn('A Google Maps api key is required in the store finder configuration to display the Google map.');
            }
        }
    }
    /**
     * Centers the map to the given point
     * @param latitute latitude of the new center
     * @param longitude longitude of the new center
     */
    centerMap(latitute, longitude) {
        this.googleMap.panTo({ lat: latitute, lng: longitude });
        this.googleMap.setZoom(this.config.googleMaps.selectedMarkerScale);
    }
    /**
     * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
     * @param locations list of locations
     */
    defineMapCenter(locations) {
        return new google.maps.LatLng(this.storeFinderService.getStoreLatitude(locations[0]), this.storeFinderService.getStoreLongitude(locations[0]));
    }
    /**
     * Creates google map inside if the given HTML element centered to the given point
     * @param mapElement {@link HTMLElement} inside of which the map will be created
     * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
     */
    initMap(mapElement, mapCenter) {
        const gestureOption = 'greedy';
        const mapProp = {
            center: mapCenter,
            zoom: this.config.googleMaps.scale,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: gestureOption,
        };
        this.googleMap = new google.maps.Map(mapElement, mapProp);
    }
    /**
     * Erases the current map's markers and create a new one based on the given locations
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    createMarkers(locations, selectMarkerHandler) {
        this.markers = [];
        locations.forEach((element, index) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.storeFinderService.getStoreLatitude(element), this.storeFinderService.getStoreLongitude(element)),
                label: index + 1 + '',
            });
            this.markers.push(marker);
            marker.setMap(this.googleMap);
            marker.addListener('mouseover', function () {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            });
            marker.addListener('mouseout', function () {
                marker.setAnimation(null);
            });
            if (selectMarkerHandler) {
                marker.addListener('click', function () {
                    selectMarkerHandler(index);
                });
            }
        });
    }
    /**
     * Initialize and draw the map
     * @param mapElement {@link HTMLElement} inside of which the map will be drawn
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    drawMap(mapElement, locations, selectMarkerHandler) {
        this.initMap(mapElement, this.defineMapCenter(locations));
        this.createMarkers(locations, selectMarkerHandler);
    }
}
GoogleMapRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, deps: [{ token: StoreFinderConfig }, { token: StoreFinderService }, { token: i2.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
GoogleMapRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: StoreFinderConfig }, { type: StoreFinderService }, { type: i2.ScriptLoader }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultStoreFinderConfig = {
    googleMaps: {
        apiUrl: 'https://maps.googleapis.com/maps/api/js',
        apiKey: '',
        scale: 5,
        selectedMarkerScale: 17,
        radius: 50000,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$1 = {
    findStoresEntities: {},
    findStoreEntityById: {},
};
function findStoresReducer(state = initialState$1, action) {
    switch (action.type) {
        case FIND_STORES_SUCCESS: {
            const findStoresEntities = action.payload;
            return { ...state, findStoresEntities };
        }
        case FIND_STORE_BY_ID_SUCCESS: {
            const findStoreEntityById = action.payload;
            return { ...state, findStoreEntityById };
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    viewAllStoresEntities: {},
};
function viewAllStoresReducer(state = initialState, action) {
    switch (action.type) {
        case VIEW_ALL_STORES_SUCCESS: {
            const viewAllStoresEntities = action.payload;
            return {
                ...state,
                viewAllStoresEntities,
            };
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        findStores: StateUtils.loaderReducer(STORE_FINDER_DATA, findStoresReducer),
        viewAllStores: StateUtils.loaderReducer(STORE_FINDER_DATA, viewAllStoresReducer),
    };
}
const reducerToken = new InjectionToken('StoreFinderReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
function clearStoreFinderState(reducer) {
    return function (state, action) {
        if (action.type === SiteContextActions.LANGUAGE_CHANGE) {
            state = undefined;
        }
        if (action.type === CLEAR_STORE_FINDER_DATA) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
const metaReducers = [clearStoreFinderState];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FindStoresEffect {
    constructor(actions$, storeFinderConnector) {
        this.actions$ = actions$;
        this.storeFinderConnector = storeFinderConnector;
        this.logger = inject(LoggerService);
        this.findStores$ = createEffect(() => this.actions$.pipe(ofType(FIND_STORES), map((action) => action.payload), mergeMap((payload) => this.storeFinderConnector
            .search(payload.queryText, payload.searchConfig, payload.longitudeLatitude, payload.radius)
            .pipe(map((data) => {
            if (payload.countryIsoCode) {
                data.stores = data.stores.filter((store) => store.address.country.isocode === payload.countryIsoCode);
                data.stores.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            }
            return new FindStoresSuccess(data);
        }), catchError((error) => of(new FindStoresFail(normalizeHttpError(error, this.logger))))))));
        this.findStoreById$ = createEffect(() => this.actions$.pipe(ofType(FIND_STORE_BY_ID), map((action) => action.payload), switchMap((payload) => this.storeFinderConnector.get(payload.storeId).pipe(map((data) => new FindStoreByIdSuccess(data)), catchError((error) => of(new FindStoreByIdFail(normalizeHttpError(error, this.logger))))))));
    }
}
FindStoresEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FindStoresEffect, deps: [{ token: i1$1.Actions }, { token: StoreFinderConnector }], target: i0.ɵɵFactoryTarget.Injectable });
FindStoresEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FindStoresEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FindStoresEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: StoreFinderConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ViewAllStoresEffect {
    constructor(actions$, storeFinderConnector) {
        this.actions$ = actions$;
        this.storeFinderConnector = storeFinderConnector;
        this.logger = inject(LoggerService);
        this.viewAllStores$ = createEffect(() => this.actions$.pipe(ofType(VIEW_ALL_STORES, CLEAR_STORE_FINDER_DATA), switchMap(() => {
            return this.storeFinderConnector.getCounts().pipe(map((data) => {
                data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
                return new ViewAllStoresSuccess(data);
            }), catchError((error) => of(new ViewAllStoresFail(normalizeHttpError(error, this.logger)))));
        })));
        this.clearStoreFinderData$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE, SiteContextActions.CURRENCY_CHANGE), map(() => {
            return new ClearStoreFinderData();
        })));
    }
}
ViewAllStoresEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewAllStoresEffect, deps: [{ token: i1$1.Actions }, { token: StoreFinderConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ViewAllStoresEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewAllStoresEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewAllStoresEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: StoreFinderConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [FindStoresEffect, ViewAllStoresEffect];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderStoreModule {
}
StoreFinderStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreModule, imports: [CommonModule, i1.StoreFeatureModule, i1$1.EffectsFeatureModule] });
StoreFinderStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreModule, providers: [reducerProvider], imports: [CommonModule,
        StoreModule.forFeature(STORE_FINDER_FEATURE, reducerToken, {
            metaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StoreModule.forFeature(STORE_FINDER_FEATURE, reducerToken, {
                            metaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderCoreModule {
}
StoreFinderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, imports: [StoreFinderStoreModule] });
StoreFinderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, providers: [
        provideDefaultConfig(defaultStoreFinderConfig),
        StoreFinderConnector,
    ], imports: [StoreFinderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StoreFinderStoreModule],
                    providers: [
                        provideDefaultConfig(defaultStoreFinderConfig),
                        StoreFinderConnector,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GoogleMapRendererService, STORE_COUNT_NORMALIZER, STORE_FINDER_DATA, STORE_FINDER_FEATURE, STORE_FINDER_SEARCH_PAGE_NORMALIZER, storeFinderGroup_actions as StoreFinderActions, StoreFinderAdapter, StoreFinderConfig, StoreFinderConnector, StoreFinderCoreModule, storeFinderGroup_selectors as StoreFinderSelectors, StoreFinderService };
//# sourceMappingURL=spartacus-storefinder-core.mjs.map
