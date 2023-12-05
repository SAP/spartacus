import * as i0 from '@angular/core';
import { Injectable, inject, InjectionToken, NgModule } from '@angular/core';
import * as i4 from '@spartacus/core';
import { Config, StateUtils, LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import * as i2 from '@spartacus/pickup-in-store/root';
import { getProperty, PREFERRED_STORE_LOCAL_STORAGE_KEY, IntendedPickupLocationFacade, PickupLocationsSearchFacade, PickupOptionFacade, PreferredStoreFacade } from '@spartacus/pickup-in-store/root';
import * as i1$1 from '@ngrx/store';
import { createAction, props, createReducer, on, StoreModule, createFeatureSelector, createSelector, select } from '@ngrx/store';
import { switchMap, mergeMap, filter, map, catchError, tap, concatMap } from 'rxjs/operators';
import * as i1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { iif, of, Subscription } from 'rxjs';
import * as i3 from '@spartacus/user/profile/root';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultPickupInStoreConfig = {
    pickupInStore: {
        consentTemplateId: 'STORE_USER_INFORMATION',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupInStoreConfig {
}
PickupInStoreConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PickupInStoreConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreConfig, decorators: [{
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Adapter for getting store details.
 */
class PickupLocationAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Connector for getting store details.
 */
class PickupLocationConnector {
    constructor(adapter) {
        this.adapter = adapter;
        // Intentional empty constructor
    }
    /**
     * Get the store details by store name.
     * @param storeName The store name to get details for
     */
    getStoreDetails(storeName) {
        return this.adapter.getStoreDetails(storeName);
    }
}
PickupLocationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, deps: [{ token: PickupLocationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: PickupLocationAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Adapter for finding stock levels of a product in stores.
 */
class StockAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Connector for finding stock levels of a product in stores.
 */
class StockConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Finds stock levels of a product at stores near a location.
     * @param productCode the product code of the product to find stock levels for
     * @param location the location to find stock levels at, either lat long or free text search
     */
    loadStockLevels(productCode, location) {
        return this.adapter.loadStockLevels(productCode, location);
    }
    /**
     * Finds stock levels of a product at an individual store.
     * @param productCode the product code of the product to find stock levels for
     * @param storeName the name of the store to find stock levels at
     */
    loadStockLevelAtStore(productCode, storeName) {
        return this.adapter.loadStockLevelAtStore(productCode, storeName);
    }
}
StockConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, deps: [{ token: StockAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
StockConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: StockAdapter }]; } });

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
const ADD_BROWSER_LOCATION = '[Pickup Locations] Add Browser Location';
const AddBrowserLocation = createAction(ADD_BROWSER_LOCATION, props());

var browserLocation_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADD_BROWSER_LOCATION: ADD_BROWSER_LOCATION,
    AddBrowserLocation: AddBrowserLocation
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_DEFAULT_POINT_OF_SERVICE = '[Default Point Of Service] Load Default Point Of Service';
const LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS = '[Default Point Of Service] Load Default Point Of Service Success';
const SET_DEFAULT_POINT_OF_SERVICE = '[Default Point Of Service] Set Default Point Of Service';
const LoadDefaultPointOfService = createAction(LOAD_DEFAULT_POINT_OF_SERVICE);
const LoadDefaultPointOfServiceSuccess = createAction(LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS, props());
const SetDefaultPointOfService = createAction(SET_DEFAULT_POINT_OF_SERVICE, props());

var defaultPointOfServiceName_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_DEFAULT_POINT_OF_SERVICE: LOAD_DEFAULT_POINT_OF_SERVICE,
    LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS: LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS,
    LoadDefaultPointOfService: LoadDefaultPointOfService,
    LoadDefaultPointOfServiceSuccess: LoadDefaultPointOfServiceSuccess,
    SET_DEFAULT_POINT_OF_SERVICE: SET_DEFAULT_POINT_OF_SERVICE,
    SetDefaultPointOfService: SetDefaultPointOfService
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ADD_LOCATION = '[Pickup Locations] Add Location';
const REMOVE_LOCATION = '[Pickup Locations] Remove Location';
const SET_PICKUP_OPTION$1 = '[Pickup Locations] Set Pickup Option';
const GET_STORE_DETAILS = '[Pickup Locations] Get Store Details';
const STORE_DETAILS_SUCCESS = '[Pickup Locations] Get Store Details Success';
const STORE_DETAILS_FAIL = '[Pickup Locations] Get Store Details Fail';
const SET_PICKUP_OPTION_TO_DELIVERY = '[Pickup Locations] Set Pickup Option To Delivery';
const SET_PICKUP_OPTION_TO_DELIVERY_SUCCESS = '[Pickup Locations] Set Pickup Option To Delivery Success';
const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE = '[Pickup Locations] Set Pickup Option To Pickup In Store';
const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS = '[Pickup Locations] Set Pickup Option To Pickup In Store Success';
const CART_RELOAD_SUCCESS = '[Pickup Locations] CART_RELOAD_SUCCESS';
const DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS = '[Pickup Locations CHECKOUT] CHECKOUT_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS';
/**
 * Add a proposed pickup location for a product code.
 */
const AddLocation = createAction(ADD_LOCATION, props());
/**
 * Remove a proposed pickup location for a product code.
 */
const RemoveLocation = createAction(REMOVE_LOCATION, props());
/**
 * Set pickup option for a product code.
 */
const SetPickupOption$1 = createAction(SET_PICKUP_OPTION$1, props());
/**
 * Get Store Details By Id
 */
const GetStoreDetailsById = createAction(GET_STORE_DETAILS, props());
const SetStoreDetailsSuccess = createAction(STORE_DETAILS_SUCCESS, props());
const SetStoreDetailsFailure = createAction(STORE_DETAILS_FAIL, props());

var pickupLocation_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADD_LOCATION: ADD_LOCATION,
    AddLocation: AddLocation,
    CART_RELOAD_SUCCESS: CART_RELOAD_SUCCESS,
    DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS: DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS,
    GET_STORE_DETAILS: GET_STORE_DETAILS,
    GetStoreDetailsById: GetStoreDetailsById,
    REMOVE_LOCATION: REMOVE_LOCATION,
    RemoveLocation: RemoveLocation,
    SET_PICKUP_OPTION: SET_PICKUP_OPTION$1,
    SET_PICKUP_OPTION_TO_DELIVERY: SET_PICKUP_OPTION_TO_DELIVERY,
    SET_PICKUP_OPTION_TO_DELIVERY_SUCCESS: SET_PICKUP_OPTION_TO_DELIVERY_SUCCESS,
    SET_PICKUP_OPTION_TO_PICKUP_IN_STORE: SET_PICKUP_OPTION_TO_PICKUP_IN_STORE,
    SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS: SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS,
    STORE_DETAILS_FAIL: STORE_DETAILS_FAIL,
    STORE_DETAILS_SUCCESS: STORE_DETAILS_SUCCESS,
    SetPickupOption: SetPickupOption$1,
    SetStoreDetailsFailure: SetStoreDetailsFailure,
    SetStoreDetailsSuccess: SetStoreDetailsSuccess
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const SET_PICKUP_OPTION = '[PickupOption] Set Pickup Option';
const REMOVE_PICKUP_OPTION = '[PickupOption] Remove Pickup Option';
const REMOVE_ALL_PICKUP_OPTION = '[PickupOption] Remove All Pickup Option';
const SET_PAGE_CONTEXT = '[PickupOption] Set Page Context';
const SetPickupOption = createAction(SET_PICKUP_OPTION, props());
const RemovePickupOption = createAction(REMOVE_PICKUP_OPTION, props());
const RemoveAllPickupOptions = createAction(REMOVE_ALL_PICKUP_OPTION);
const SetPageContext = createAction(SET_PAGE_CONTEXT, props());

var pickupOption_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RemoveAllPickupOptions: RemoveAllPickupOptions,
    RemovePickupOption: RemovePickupOption,
    SetPageContext: SetPageContext,
    SetPickupOption: SetPickupOption
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const STOCK_FEATURE = 'stock';
const STOCK_DATA = '[Stock] Stock Data';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const STOCK_LEVEL = '[Stock] Get Stock Level';
const STOCK_LEVEL_ON_HOLD = '[Stock] On Hold';
const STOCK_LEVEL_FAIL = '[Stock] Get Stock Level Fail';
const STOCK_LEVEL_SUCCESS = '[Stock] Get Stock Level Success';
const CLEAR_STOCK_DATA = '[Stock] Clear Data';
const STOCK_LEVEL_AT_STORE = '[Stock] Get Stock Level at Store';
const STOCK_LEVEL_AT_STORE_SUCCESS = '[Stock] Get Stock Level at Store Success';
class StockLevel extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(STOCK_DATA);
        this.payload = payload;
        this.type = STOCK_LEVEL;
    }
}
class StockLevelOnHold extends StateUtils.LoaderLoadAction {
    constructor() {
        super(STOCK_DATA);
        this.type = STOCK_LEVEL_ON_HOLD;
    }
}
class StockLevelFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(STOCK_DATA, payload);
        this.payload = payload;
        this.type = STOCK_LEVEL_FAIL;
    }
}
class StockLevelSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(STOCK_DATA);
        this.payload = payload;
        this.type = STOCK_LEVEL_SUCCESS;
    }
}
class ClearStockData extends StateUtils.LoaderResetAction {
    constructor() {
        super(STOCK_DATA);
        this.type = CLEAR_STOCK_DATA;
    }
}
/**
 * Add a proposed pickup location for a product code.
 */
const StockLevelAtStore = createAction(STOCK_LEVEL_AT_STORE, props());
/**
 * Add the stock level for a product at a store.
 */
const StockLevelAtStoreSuccess = createAction(STOCK_LEVEL_AT_STORE_SUCCESS, props());

var stock_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CLEAR_STOCK_DATA: CLEAR_STOCK_DATA,
    ClearStockData: ClearStockData,
    STOCK_LEVEL: STOCK_LEVEL,
    STOCK_LEVEL_AT_STORE: STOCK_LEVEL_AT_STORE,
    STOCK_LEVEL_AT_STORE_SUCCESS: STOCK_LEVEL_AT_STORE_SUCCESS,
    STOCK_LEVEL_FAIL: STOCK_LEVEL_FAIL,
    STOCK_LEVEL_ON_HOLD: STOCK_LEVEL_ON_HOLD,
    STOCK_LEVEL_SUCCESS: STOCK_LEVEL_SUCCESS,
    StockLevel: StockLevel,
    StockLevelAtStore: StockLevelAtStore,
    StockLevelAtStoreSuccess: StockLevelAtStoreSuccess,
    StockLevelFail: StockLevelFail,
    StockLevelOnHold: StockLevelOnHold,
    StockLevelSuccess: StockLevelSuccess
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const TOGGLE_HIDE_OUT_OF_STOCK_OPTIONS = '[Stock] Toggle Hide Out Of Stock Options';
const ToggleHideOutOfStockOptionsAction = createAction(TOGGLE_HIDE_OUT_OF_STOCK_OPTIONS);

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
class DefaultPointOfServiceEffect {
    constructor(actions$, store, userProfileService, winRef) {
        this.actions$ = actions$;
        this.store = store;
        this.userProfileService = userProfileService;
        this.winRef = winRef;
        this.loadDefaultPointOfService$ = createEffect(() => this.actions$.pipe(ofType(LOAD_DEFAULT_POINT_OF_SERVICE), switchMap(() => this.userProfileService.get().pipe(mergeMap((preferredStore) => iif(() => !!preferredStore && !!preferredStore.defaultPointOfServiceName, of({
            name: getProperty(preferredStore, 'defaultPointOfServiceName'),
            displayName: '',
        }), (() => {
            const PREFERRED_STORE = this.winRef.localStorage?.getItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
            return of(PREFERRED_STORE ? JSON.parse(PREFERRED_STORE) : undefined);
        })())), filter((defaultPointOfService) => defaultPointOfService), map((defaultPointOfService) => LoadDefaultPointOfServiceSuccess({
            payload: defaultPointOfService,
        })), catchError((_error) => of(LoadDefaultPointOfServiceSuccess({
            payload: {
                name: '',
                displayName: '',
            },
        })))))));
        this.setDefaultPointOfService$ = createEffect(() => this.actions$.pipe(ofType(SET_DEFAULT_POINT_OF_SERVICE), map((action) => action['payload']), tap((preferredStore) => this.winRef.localStorage?.setItem(PREFERRED_STORE_LOCAL_STORAGE_KEY, JSON.stringify(preferredStore))), switchMap((preferredStore) => this.userProfileService
            .update({
            defaultPointOfServiceName: preferredStore.name,
        })
            .pipe(map(() => LoadDefaultPointOfService()), catchError((_error) => of(LoadDefaultPointOfService)))), map(() => LoadDefaultPointOfService())));
    }
}
DefaultPointOfServiceEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultPointOfServiceEffect, deps: [{ token: i1.Actions }, { token: i1$1.Store }, { token: i3.UserProfileFacade }, { token: i4.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
DefaultPointOfServiceEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultPointOfServiceEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultPointOfServiceEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i1$1.Store }, { type: i3.UserProfileFacade }, { type: i4.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupLocationEffect {
    constructor(actions$, pickupLocationConnector) {
        this.actions$ = actions$;
        this.pickupLocationConnector = pickupLocationConnector;
        this.logger = inject(LoggerService);
        this.storeDetails$ = createEffect(() => this.actions$.pipe(ofType(GET_STORE_DETAILS), map((action) => action.payload), mergeMap((storeName) => this.pickupLocationConnector.getStoreDetails(storeName).pipe(map((storeDetails) => SetStoreDetailsSuccess({
            payload: storeDetails,
        })), catchError((error) => of(SetStoreDetailsFailure({
            payload: normalizeHttpError(error, this.logger),
        })))))));
        // Intentional empty constructor
    }
}
PickupLocationEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect, deps: [{ token: i1.Actions }, { token: PickupLocationConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: PickupLocationConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StockEffect {
    constructor(actions$, stockConnector) {
        this.actions$ = actions$;
        this.stockConnector = stockConnector;
        this.logger = inject(LoggerService);
        this.loadStockLevels$ = createEffect(() => this.actions$.pipe(ofType(STOCK_LEVEL), map((action) => action.payload), switchMap(({ productCode, ...location }) => this.stockConnector.loadStockLevels(productCode, location).pipe(map((stockLevels) => new StockLevelSuccess({
            productCode,
            stockLevels,
        })), catchError((error) => of(new StockLevelFail(normalizeHttpError(error, this.logger))))))));
        this.loadStockLevelAtStore$ = createEffect(() => this.actions$.pipe(ofType(STOCK_LEVEL_AT_STORE), map(({ payload }) => payload), concatMap(({ productCode, storeName }) => this.stockConnector.loadStockLevelAtStore(productCode, storeName).pipe(map((stockLevel) => StockLevelAtStoreSuccess({
            payload: { productCode, storeName, stockLevel },
        }))))));
        // Intentional empty constructor
    }
}
StockEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockEffect, deps: [{ token: i1.Actions }, { token: StockConnector }], target: i0.ɵɵFactoryTarget.Injectable });
StockEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: StockConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [
    DefaultPointOfServiceEffect,
    StockEffect,
    PickupLocationEffect,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PICKUP_LOCATIONS_FEATURE = 'pickup-locations';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PICKUP_OPTION_FEATURE = 'pickup-option';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultPointOfServiceInitialState = null;
const defaultPointOfServiceReducer = createReducer(defaultPointOfServiceInitialState, on(LoadDefaultPointOfServiceSuccess, (_state, { payload }) => payload));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const intendedPickupLocationsInitialState = {};
const intendedPickupLocationsReducer = createReducer(intendedPickupLocationsInitialState, on(AddLocation, (state, { payload }) => ({
    ...state,
    [payload.productCode]: payload.location,
})), on(RemoveLocation, (state, { payload }) => ({
    ...state,
    [payload]: { pickupOption: 'delivery' },
})), on(SetPickupOption$1, (state, { payload }) => ({
    ...state,
    [payload.productCode]: {
        ...state[payload.productCode],
        pickupOption: payload.pickupOption,
    },
})));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const storeDetailsInitialState = {};
const storeDetailsReducer = createReducer(storeDetailsInitialState, on(SetStoreDetailsSuccess, (state, { payload }) => ({
    ...state,
    ...(payload.name ? { [payload.name]: payload } : {}),
})));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers$1() {
    return {
        intendedPickupLocations: intendedPickupLocationsReducer,
        storeDetails: storeDetailsReducer,
        defaultPointOfService: defaultPointOfServiceReducer,
    };
}
const pickupLocationsReducersToken = new InjectionToken('PickupLocationsReducers');
const pickupLocationsReducersProvider = {
    provide: pickupLocationsReducersToken,
    useFactory: getReducers$1,
};
const pickupLocationsMetaReducers = [];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$3 = '';
const pageContextReducer = createReducer(initialState$3, on(SetPageContext, (_state, { payload }) => payload.pageContext));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$2 = [];
const pickupOptionReducer = createReducer(initialState$2, on(SetPickupOption, (state, { payload }) => {
    const newState = state.filter((entry) => entry.entryNumber !== payload.entryNumber);
    return [...newState, payload];
}), on(RemovePickupOption, (state, { payload }) => {
    return state
        .filter((entry) => entry.entryNumber !== payload.entryNumber)
        .map((entry) => ({
        ...entry,
        entryNumber: entry.entryNumber > payload.entryNumber
            ? entry.entryNumber - 1
            : entry.entryNumber,
    }));
}), on(RemoveAllPickupOptions, (_state) => initialState$2));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getPickupReducers() {
    return {
        pageContext: pageContextReducer,
        pickupOption: pickupOptionReducer,
    };
}
const pickupOptionReducersToken = new InjectionToken('PickupOptionReducers');
const pickupOptionReducersProvider = {
    provide: pickupOptionReducersToken,
    useFactory: getPickupReducers,
};
const pickupOptionMetaReducers = [];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$1 = {
    latitude: null,
    longitude: null,
};
const browserLocationReducer = createReducer(initialState$1, on(AddBrowserLocation, (state, { payload }) => ({
    ...state,
    latitude: payload.latitude,
    longitude: payload.longitude,
})));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = false;
const hideOutOfStockReducer = createReducer(initialState, on(ToggleHideOutOfStockOptionsAction, (state) => !state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialStockLevelState = {};
const _stockReducer = createReducer(initialStockLevelState, on(createAction(STOCK_LEVEL_SUCCESS, props()), (state, { payload: { productCode, stockLevels } }) => ({
    ...state,
    [productCode]: stockLevels,
})), on(createAction(CLEAR_STOCK_DATA), (_state) => ({})));
function stockReducer(state, action) {
    return _stockReducer(state, action);
}
const initialStockLevelAtStoreState = {};
const stockAtStoreReducer = createReducer(initialStockLevelAtStoreState, on(StockLevelAtStoreSuccess, (state, { payload }) => ({
    ...state,
    [payload.productCode]: { [payload.storeName]: payload.stockLevel },
})));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        browserLocation: browserLocationReducer,
        hideOutOfStock: hideOutOfStockReducer,
        stockLevel: StateUtils.loaderReducer(STOCK_DATA, stockReducer),
        stockLevelAtStore: stockAtStoreReducer,
    };
}
const stockReducersToken = new InjectionToken('StockReducers');
const stockReducersProvider = {
    provide: stockReducersToken,
    useFactory: getReducers,
};
function clearStockState(reducer) {
    return function (state, action) {
        const STATE = new Map([[CLEAR_STOCK_DATA, undefined]]);
        return reducer(STATE.has(action.type) ? STATE.get(action.type) : state, action);
    };
}
const stockMetaReducers = [clearStockState];

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
class PickupInStoreStoreModule {
}
PickupInStoreStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, imports: [CommonModule, i1$1.StoreFeatureModule, i1$1.StoreFeatureModule, i1$1.StoreFeatureModule, i1.EffectsFeatureModule] });
PickupInStoreStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, providers: [
        pickupLocationsReducersProvider,
        pickupOptionReducersProvider,
        stockReducersProvider,
    ], imports: [CommonModule,
        StoreModule.forFeature(PICKUP_LOCATIONS_FEATURE, pickupLocationsReducersToken, {
            metaReducers: pickupLocationsMetaReducers,
        }),
        StoreModule.forFeature(PICKUP_OPTION_FEATURE, pickupOptionReducersToken, {
            metaReducers: pickupOptionMetaReducers,
        }),
        StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
            metaReducers: stockMetaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StoreModule.forFeature(PICKUP_LOCATIONS_FEATURE, pickupLocationsReducersToken, {
                            metaReducers: pickupLocationsMetaReducers,
                        }),
                        StoreModule.forFeature(PICKUP_OPTION_FEATURE, pickupOptionReducersToken, {
                            metaReducers: pickupOptionMetaReducers,
                        }),
                        StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
                            metaReducers: stockMetaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [
                        pickupLocationsReducersProvider,
                        pickupOptionReducersProvider,
                        stockReducersProvider,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getPickupLocationsState = createFeatureSelector(PICKUP_LOCATIONS_FEATURE);
const getPickupOptionState = createFeatureSelector(PICKUP_OPTION_FEATURE);
const getStockState = createFeatureSelector(STOCK_FEATURE);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getPreferredStore = createSelector(getPickupLocationsState, (pickupLocationsState) => pickupLocationsState.defaultPointOfService);

var defaultPointOfServiceName_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getPreferredStore: getPreferredStore
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getHideOutOfStockState = createSelector(getStockState, (stockState) => stockState.hideOutOfStock);

var hideOutOfStock_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getHideOutOfStockState: getHideOutOfStockState
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Get all the intended pickup locations.
 */
const getIntendedPickupLocations = createSelector(getPickupLocationsState, (state) => state.intendedPickupLocations);
/**
 * Get the intended pickup location for a given product.
 * @param productCode The product code of the product to get the intended pickup location for.
 * @returns The intended pickup location for the product.
 */
const getIntendedPickupLocationByProductCode = (productCode) => createSelector(getIntendedPickupLocations, (state) => state[productCode]);
const getPickupOptionByProductCode = (productCode) => createSelector(getIntendedPickupLocationByProductCode(productCode), (_getIntendedPickupLocationByProductCode) => _getIntendedPickupLocationByProductCode?.pickupOption ?? 'delivery');
const getStoreDetailsByName = (storeName) => createSelector(getPickupLocationsState, (state) => state.storeDetails[storeName]);

var pickupLocations_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getIntendedPickupLocationByProductCode: getIntendedPickupLocationByProductCode,
    getIntendedPickupLocations: getIntendedPickupLocations,
    getPickupOptionByProductCode: getPickupOptionByProductCode,
    getStoreDetailsByName: getStoreDetailsByName
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getPageContext = () => createSelector(getPickupOptionState, (state) => state.pageContext);
const getPickupOption = (entryNumber) => createSelector(getPickupOptionState, (state) => {
    return state.pickupOption.find((entry) => entry.entryNumber === entryNumber)
        ?.pickupOption;
});

var pickupOption_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getPageContext: getPageContext,
    getPickupOption: getPickupOption
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function isInStock(stockInfo) {
    return (!!stockInfo &&
        stockInfo.stockLevelStatus !== 'outOfStock' &&
        stockInfo.stockLevelStatus !== 'lowStock');
}
function storeHasStock({ stockInfo }) {
    return isInStock(stockInfo);
}

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
const getStockLevelState = createSelector(getStockState, (stockState) => stockState.stockLevel);
const getStockEntities = createSelector(getStockLevelState, (state) => StateUtils.loaderValueSelector(state));
const getStockLoading = createSelector(getStockLevelState, (state) => StateUtils.loaderLoadingSelector(state));
const getStockSuccess = createSelector(getStockLevelState, (state) => StateUtils.loaderSuccessSelector(state));
const getStockError = createSelector(getStockLevelState, (state) => StateUtils.loaderErrorSelector(state));
const hasSearchStarted = createSelector(getStockLoading, getStockSuccess, getStockError, (_getStockLoading, _getStockSuccess, _getStockError) => _getStockLoading || _getStockSuccess || _getStockError);
const hasSearchStartedForProductCode = (productCode) => createSelector(hasSearchStarted, getStockEntities, (hasSearchBeenStarted, stockEntities) => {
    return hasSearchBeenStarted && !!stockEntities[productCode];
});
const getStoresWithStockForProductCode = (productCode) => createSelector(getStockEntities, getHideOutOfStockState, (stockEntities, hideOutOfStock) => stockEntities[productCode]?.stores?.filter((store) => !hideOutOfStock || storeHasStock(store)) ?? []);
const getStockAtStore = (productCode, storeName) => createSelector(getStockState, (stockState) => stockState?.stockLevelAtStore?.[productCode]?.[storeName]);

var stock_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getStockAtStore: getStockAtStore,
    getStockEntities: getStockEntities,
    getStockError: getStockError,
    getStockLevelState: getStockLevelState,
    getStockLoading: getStockLoading,
    getStockSuccess: getStockSuccess,
    getStoresWithStockForProductCode: getStoresWithStockForProductCode,
    hasSearchStarted: hasSearchStarted,
    hasSearchStartedForProductCode: hasSearchStartedForProductCode
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
class PreferredStoreService {
    constructor(config, pickupLocationsSearchService, winRef, store) {
        this.config = config;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.winRef = winRef;
        this.store = store;
        this.store.dispatch(LoadDefaultPointOfService());
    }
    /**
     * Gets the user's preferred store for Pickup in Store.
     * @returns the preferred store from the store
     */
    getPreferredStore$() {
        return this.store.pipe(select(getPreferredStore));
    }
    /**
     * Sets the user's preferred store for Pickup in Store.
     * @param preferredStore the preferred store to set
     */
    setPreferredStore(preferredStore) {
        this.store.dispatch(SetDefaultPointOfService({ payload: preferredStore }));
    }
    /**
     * Clears the user's preferred store for Pickup in Store.
     */
    clearPreferredStore() {
        this.winRef.localStorage?.removeItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
    }
    /**
     * Get the user's preferred store from local storage and only return it if it
     * has stock for the given product.
     * @param productCode The product code to check the stock level of
     */
    getPreferredStoreWithProductInStock(productCode) {
        return this.getPreferredStore$().pipe(filter((store) => !!store), tap((preferredStore) => {
            this.pickupLocationsSearchService.stockLevelAtStore(productCode, preferredStore.name);
        }), switchMap((store) => this.pickupLocationsSearchService
            .getStockLevelAtStore(productCode, store.name)
            .pipe(filter(isInStock), map((_) => store), tap((preferredStore) => ({
            name: preferredStore.name,
            displayName: preferredStore.name,
        })))));
    }
}
PreferredStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService, deps: [{ token: PickupInStoreConfig }, { token: i2.PickupLocationsSearchFacade }, { token: i4.WindowRef }, { token: i1$1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
PreferredStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: PickupInStoreConfig }, { type: i2.PickupLocationsSearchFacade }, { type: i4.WindowRef }, { type: i1$1.Store }]; } });

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
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
class IntendedPickupLocationService {
    constructor(store) {
        this.store = store;
        // Intentional empty constructor
    }
    getIntendedLocation(productCode) {
        return this.store.pipe(select(getIntendedPickupLocationByProductCode(productCode)));
    }
    getPickupOption(productCode) {
        return this.store.pipe(select(getPickupOptionByProductCode(productCode)));
    }
    setPickupOption(productCode, pickupOption) {
        this.store.dispatch(SetPickupOption$1({
            payload: { productCode, pickupOption },
        }));
    }
    setIntendedLocation(productCode, location) {
        this.store.dispatch(AddLocation({ payload: { productCode, location } }));
    }
    removeIntendedLocation(productCode) {
        this.store.dispatch(RemoveLocation({ payload: productCode }));
    }
}
IntendedPickupLocationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationService, deps: [{ token: i1$1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
IntendedPickupLocationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupLocationsSearchService {
    constructor(store) {
        this.store = store;
        this.subscription = new Subscription();
        // Intentional empty constructor
    }
    stockLevelAtStore(productCode, storeName) {
        this.store.dispatch(StockLevelAtStore({
            payload: { productCode, storeName },
        }));
    }
    getStockLevelAtStore(productCode, storeName) {
        return this.store.pipe(select(getStockAtStore(productCode, storeName)));
    }
    startSearch(searchParams) {
        this.store.dispatch(new StockLevel(searchParams));
    }
    hasSearchStarted(productCode) {
        return this.store.pipe(select(hasSearchStartedForProductCode(productCode)));
    }
    isSearchRunning() {
        return this.store.pipe(select(getStockLoading));
    }
    getSearchResults(productCode) {
        return this.store.pipe(select(getStoresWithStockForProductCode(productCode)));
    }
    clearSearchResults() {
        this.store.dispatch(new ClearStockData());
    }
    getHideOutOfStock() {
        return this.store.pipe(select(getHideOutOfStockState));
    }
    setBrowserLocation(latitude, longitude) {
        this.store.dispatch(AddBrowserLocation({
            payload: { latitude, longitude },
        }));
    }
    toggleHideOutOfStock() {
        this.store.dispatch(ToggleHideOutOfStockOptionsAction());
    }
    loadStoreDetails(storeName) {
        this.subscription.add(this.getStoreDetails(storeName)
            .pipe(filter((storeDetails) => !storeDetails), tap((_storeDetails) => this.store.dispatch(GetStoreDetailsById({ payload: storeName }))))
            .subscribe());
    }
    getStoreDetails(name) {
        return this.store.pipe(select(getStoreDetailsByName(name)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PickupLocationsSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchService, deps: [{ token: i1$1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationsSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A service for managing the page context and pickup option for a cart entry.
 */
class PickupOptionService {
    constructor(store) {
        this.store = store;
        // Intentional empty constructor
    }
    setPageContext(pageContext) {
        this.store.dispatch(SetPageContext({
            payload: { pageContext },
        }));
    }
    getPageContext() {
        return this.store.pipe(select(getPageContext()));
    }
    setPickupOption(entryNumber, pickupOption) {
        this.store.dispatch(SetPickupOption({
            payload: { entryNumber, pickupOption },
        }));
    }
    getPickupOption(entryNumber) {
        return this.store.pipe(select(getPickupOption(entryNumber)));
    }
}
PickupOptionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService, deps: [{ token: i1$1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
PickupOptionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    IntendedPickupLocationService,
    {
        provide: IntendedPickupLocationFacade,
        useExisting: IntendedPickupLocationService,
    },
    PickupLocationsSearchService,
    {
        provide: PickupLocationsSearchFacade,
        useExisting: PickupLocationsSearchService,
    },
    PickupOptionService,
    {
        provide: PickupOptionFacade,
        useExisting: PickupOptionService,
    },
    PreferredStoreService,
    { provide: PreferredStoreFacade, useExisting: PreferredStoreService },
];

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
class PickupInStoreCoreModule {
}
PickupInStoreCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, imports: [PickupInStoreStoreModule] });
PickupInStoreCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, providers: [
        provideDefaultConfig(defaultPickupInStoreConfig),
        StockConnector,
        PickupLocationConnector,
        ...facadeProviders,
    ], imports: [PickupInStoreStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PickupInStoreStoreModule],
                    providers: [
                        provideDefaultConfig(defaultPickupInStoreConfig),
                        StockConnector,
                        PickupLocationConnector,
                        ...facadeProviders,
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

export { browserLocation_action as BrowserLocationActions, defaultPointOfServiceName_action as DefaultPointOfServiceActions, DefaultPointOfServiceEffect, defaultPointOfServiceName_selectors as DefaultPointOfServiceSelectors, hideOutOfStock_selectors as HideOutOfStockSelectors, PICKUP_LOCATIONS_FEATURE, PICKUP_OPTION_FEATURE, PickupInStoreConfig, PickupInStoreCoreModule, PickupInStoreStoreModule, pickupLocation_action as PickupLocationActions, PickupLocationAdapter, PickupLocationConnector, PickupLocationEffect, PickupLocationsSearchService, pickupLocations_selectors as PickupLocationsSelectors, pickupOption_action as PickupOptionActions, pickupOption_selectors as PickupOptionSelectors, PickupOptionService, PreferredStoreService, STOCK_DATA, STOCK_FEATURE, StockAdapter, StockConnector, StockEffect, stock_action as StockLevelActions, stock_selectors as StockSelectors, TOGGLE_HIDE_OUT_OF_STOCK_OPTIONS, ToggleHideOutOfStockOptionsAction, clearStockState, defaultPickupInStoreConfig, effects, facadeProviders, getPickupReducers, getReducers$1 as getReducers, isInStock, pickupLocationsMetaReducers, pickupLocationsReducersProvider, pickupLocationsReducersToken, pickupOptionMetaReducers, pickupOptionReducersProvider, pickupOptionReducersToken, stockMetaReducers, stockReducersProvider, stockReducersToken, storeHasStock };
//# sourceMappingURL=spartacus-pickup-in-store-core.mjs.map
