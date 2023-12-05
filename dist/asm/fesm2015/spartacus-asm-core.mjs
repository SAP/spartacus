import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject, NgModule, Pipe } from '@angular/core';
import * as i1 from '@spartacus/core';
import { StateUtils, LoggerService, normalizeHttpError, StateModule, MODULE_INITIALIZER } from '@spartacus/core';
import * as i3$1 from '@spartacus/asm/root';
import { AsmCustomerListFacade, AsmBindCartFacade, AsmCreateCustomerFacade } from '@spartacus/asm/root';
import { map, take, concatMap, switchMap, catchError, filter } from 'rxjs/operators';
import * as i3 from '@spartacus/user/account/root';
import * as i1$2 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import * as i1$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { of, Subscription, combineLatest } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmConnector {
    constructor(asmAdapter) {
        this.asmAdapter = asmAdapter;
    }
    customerSearch(options) {
        return this.asmAdapter.customerSearch(options);
    }
    customerLists() {
        return this.asmAdapter.customerLists();
    }
    bindCart(options) {
        return this.asmAdapter.bindCart(options);
    }
    createCustomer(user) {
        return this.asmAdapter.createCustomer(user);
    }
}
AsmConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConnector, deps: [{ token: AsmAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
AsmConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: AsmAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken('CustomerSearchPageNormalizer');
const CUSTOMER_LISTS_NORMALIZER = new InjectionToken('CustomerListsNormalizer');

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
class AsmBindCartService {
    constructor(commandService, asmConnector, userAccountFacade) {
        this.commandService = commandService;
        this.asmConnector = asmConnector;
        this.userAccountFacade = userAccountFacade;
        this.bindCartCommand$ = this.commandService.create((cartId) => this.userAccountFacade.get().pipe(map((user) => {
            if (user === null || user === void 0 ? void 0 : user.uid) {
                return user.uid;
            }
            else {
                throw new Error('No identifier for authenticated user found.');
            }
        }), take(1), concatMap((customerId) => this.asmConnector.bindCart({
            cartId,
            customerId,
        }))));
    }
    bindCart(cartId) {
        return this.bindCartCommand$.execute(cartId);
    }
}
AsmBindCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService, deps: [{ token: i1.CommandService }, { token: AsmConnector }, { token: i3.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Injectable });
AsmBindCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: AsmConnector }, { type: i3.UserAccountFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCreateCustomerService {
    constructor(asmConnector, command) {
        this.asmConnector = asmConnector;
        this.command = command;
        this.createCustomerCommand = this.command.create(({ user }) => this.asmConnector.createCustomer(user));
    }
    createCustomer(user) {
        return this.createCustomerCommand.execute({ user });
    }
}
AsmCreateCustomerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService, deps: [{ token: AsmConnector }, { token: i1.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCreateCustomerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: AsmConnector }, { type: i1.CommandService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_UI_UPDATE = '[Asm] UI Update';
class AsmUiUpdate {
    constructor(payload) {
        this.payload = payload;
        this.type = ASM_UI_UPDATE;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_FEATURE = 'asm';
const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';
const CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA = '[asm] Customer list customers search data';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CUSTOMER_SEARCH = '[Asm] Customer Search';
const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';
const CUSTOMER_LIST_CUSTOMERS_SEARCH = '[Asm] Customer List Customers Search';
const CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL = '[Asm] Customer List Customers Search Fail';
const CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS = '[Asm] Customer List Customers Search Success';
const CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET = '[Asm] Customer List Customers Search Reset';
class CustomerSearch extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH;
    }
}
class CustomerSearchFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH_FAIL;
    }
}
class CustomerSearchSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH_SUCCESS;
    }
}
class CustomerSearchReset extends StateUtils.LoaderResetAction {
    constructor() {
        super(CUSTOMER_SEARCH_DATA);
        this.type = CUSTOMER_SEARCH_RESET;
    }
}
class CustomerListCustomersSearch extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_LIST_CUSTOMERS_SEARCH;
    }
}
class CustomerListCustomersSearchFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL;
    }
}
class CustomerListCustomersSearchSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS;
    }
}
class CustomerListCustomersSearchReset extends StateUtils.LoaderResetAction {
    constructor() {
        super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
        this.type = CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOGOUT_CUSTOMER_SUPPORT_AGENT = '[Auth] Logout Customer Support Agent';
/**
 * Action dispatched after customer support agent logout. Used to clear store data (ui, search results)
 */
class LogoutCustomerSupportAgent {
    constructor() {
        this.type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var customerGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ASM_UI_UPDATE: ASM_UI_UPDATE,
    AsmUiUpdate: AsmUiUpdate,
    CUSTOMER_LIST_CUSTOMERS_SEARCH: CUSTOMER_LIST_CUSTOMERS_SEARCH,
    CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL: CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL,
    CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET: CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET,
    CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS: CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS,
    CUSTOMER_SEARCH: CUSTOMER_SEARCH,
    CUSTOMER_SEARCH_FAIL: CUSTOMER_SEARCH_FAIL,
    CUSTOMER_SEARCH_RESET: CUSTOMER_SEARCH_RESET,
    CUSTOMER_SEARCH_SUCCESS: CUSTOMER_SEARCH_SUCCESS,
    CustomerListCustomersSearch: CustomerListCustomersSearch,
    CustomerListCustomersSearchFail: CustomerListCustomersSearchFail,
    CustomerListCustomersSearchReset: CustomerListCustomersSearchReset,
    CustomerListCustomersSearchSuccess: CustomerListCustomersSearchSuccess,
    CustomerSearch: CustomerSearch,
    CustomerSearchFail: CustomerSearchFail,
    CustomerSearchReset: CustomerSearchReset,
    CustomerSearchSuccess: CustomerSearchSuccess,
    LOGOUT_CUSTOMER_SUPPORT_AGENT: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    LogoutCustomerSupportAgent: LogoutCustomerSupportAgent
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
class CustomerEffects {
    constructor(actions$, asmConnector) {
        this.actions$ = actions$;
        this.asmConnector = asmConnector;
        this.logger = inject(LoggerService);
        this.customerSearch$ = createEffect(() => this.actions$.pipe(ofType(CUSTOMER_SEARCH), map((action) => action.payload), switchMap((options) => this.asmConnector.customerSearch(options).pipe(map((customerSearchResults) => {
            return new CustomerSearchSuccess(customerSearchResults);
        }), catchError((error) => of(new CustomerSearchFail(normalizeHttpError(error, this.logger))))))));
        this.customerListCustomersSearch$ = createEffect(() => this.actions$.pipe(ofType(CUSTOMER_LIST_CUSTOMERS_SEARCH), map((action) => action.payload), switchMap((options) => this.asmConnector.customerSearch(options).pipe(map((customerListCustomersSearchResults) => {
            return new CustomerListCustomersSearchSuccess(customerListCustomersSearchResults);
        }), catchError((error) => of(new CustomerListCustomersSearchFail(normalizeHttpError(error, this.logger))))))));
    }
}
CustomerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEffects, deps: [{ token: i1$1.Actions }, { token: AsmConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: AsmConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [CustomerEffects];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = { collapsed: false };
function reducer(state = initialState, action) {
    switch (action.type) {
        case ASM_UI_UPDATE: {
            return Object.assign(Object.assign({}, state), action.payload);
        }
        default: {
            return state;
        }
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        customerSearchResult: StateUtils.loaderReducer(CUSTOMER_SEARCH_DATA),
        customerListCustomersSearchResult: StateUtils.loaderReducer(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA),
        asmUi: reducer,
    };
}
const reducerToken = new InjectionToken('AsmReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
function clearCustomerSupportAgentAsmState(reducer) {
    return function (state, action) {
        if (action.type === LOGOUT_CUSTOMER_SUPPORT_AGENT) {
            state = Object.assign(Object.assign({}, state), { customerSearchResult: {} });
        }
        return reducer(state, action);
    };
}
const metaReducers = [
    clearCustomerSupportAgentAsmState,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getAsmState = createFeatureSelector(ASM_FEATURE);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getAsmUi = createSelector(getAsmState, (state) => state.asmUi);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getCustomerSearchResultsLoaderState = createSelector(getAsmState, (state) => state.customerSearchResult);
const getCustomerSearchResults = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderValueSelector(state));
const getCustomerSearchResultsLoading = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderLoadingSelector(state));
const getCustomerListCustomersSearchResultsLoaderState = createSelector(getAsmState, (state) => state.customerListCustomersSearchResult);
const getCustomerListCustomersSearchResults = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderValueSelector(state));
const getCustomerListCustomersSearchResultsLoading = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderLoadingSelector(state));
const getCustomerListCustomersSearchResultsError = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderErrorSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var asmGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getAsmState: getAsmState,
    getAsmUi: getAsmUi,
    getCustomerListCustomersSearchResults: getCustomerListCustomersSearchResults,
    getCustomerListCustomersSearchResultsError: getCustomerListCustomersSearchResultsError,
    getCustomerListCustomersSearchResultsLoaderState: getCustomerListCustomersSearchResultsLoaderState,
    getCustomerListCustomersSearchResultsLoading: getCustomerListCustomersSearchResultsLoading,
    getCustomerSearchResults: getCustomerSearchResults,
    getCustomerSearchResultsLoaderState: getCustomerSearchResultsLoaderState,
    getCustomerSearchResultsLoading: getCustomerSearchResultsLoading
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
class AsmCustomerListService {
    constructor(queryService, asmConnector, store) {
        this.queryService = queryService;
        this.asmConnector = asmConnector;
        this.store = store;
        this.customerListQuery$ = this.queryService.create(() => this.asmConnector.customerLists(), {
            reloadOn: undefined,
            resetOn: undefined,
        });
    }
    getCustomerLists() {
        return this.customerListQuery$.get();
    }
    getCustomerListsState() {
        return this.customerListQuery$.getState();
    }
    /**
     * Search for customers in a customer list
     */
    customerListCustomersSearch(options) {
        this.store.dispatch(new CustomerListCustomersSearch(options));
    }
    /**
     * Returns the customer search result data for a customer list
     */
    getCustomerListCustomersSearchResults() {
        return this.store.pipe(select(getCustomerListCustomersSearchResults));
    }
    /**
     * Returns the customer list customers search result loading status.
     */
    getCustomerListCustomersSearchResultsLoading() {
        return this.store.pipe(select(getCustomerListCustomersSearchResultsLoading));
    }
    /**
     * Reset the customer list customers search result data to the initial state.
     */
    customerListCustomersSearchReset() {
        this.store.dispatch(new CustomerListCustomersSearchReset());
    }
    /**
     * Returns the customer list customers search result error status.
     */
    getCustomerListCustomersSearchResultsError() {
        return this.store.pipe(select(getCustomerListCustomersSearchResultsError));
    }
}
AsmCustomerListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService, deps: [{ token: i1.QueryService }, { token: AsmConnector }, { token: i1$2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomerListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.QueryService }, { type: AsmConnector }, { type: i1$2.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    AsmCustomerListService,
    {
        provide: AsmCustomerListFacade,
        useExisting: AsmCustomerListService,
    },
    AsmBindCartService,
    {
        provide: AsmBindCartFacade,
        useExisting: AsmBindCartService,
    },
    AsmCreateCustomerService,
    {
        provide: AsmCreateCustomerFacade,
        useExisting: AsmCreateCustomerService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Responsible for storing ASM state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
class AsmStatePersistenceService {
    constructor(statePersistenceService, store, authStorageService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.authStorageService = authStorageService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'asm';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAsmState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAsmState() {
        return combineLatest([
            this.store.pipe(
            // Since getAsmState() may be called while the module is lazy loded
            // The asm state slice may not exist yet in the first store emissions.
            filter((store) => !!store.asm), select(getAsmUi)),
            of(this.authStorageService.getEmulatedUserToken()),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([ui, emulatedUserToken, tokenTarget]) => {
            let emulatedToken = emulatedUserToken;
            if (emulatedToken) {
                emulatedToken = Object.assign({}, emulatedUserToken);
                // To minimize risk of user account hijacking we don't persist emulated user refresh_token
                delete emulatedToken.refresh_token;
            }
            return {
                ui,
                emulatedUserToken: emulatedToken,
                tokenTarget,
            };
        }));
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        if (state) {
            if (state.ui) {
                this.store.dispatch(new AsmUiUpdate(state.ui));
            }
            if (state.emulatedUserToken) {
                this.authStorageService.setEmulatedUserToken(state.emulatedUserToken);
            }
            if (state.tokenTarget) {
                this.authStorageService.setTokenTarget(state.tokenTarget);
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i1$2.Store }, { token: i3$1.AsmAuthStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i1$2.Store }, { type: i3$1.AsmAuthStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmStoreModule {
}
AsmStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmStoreModule, imports: [CommonModule,
        StateModule, i1$2.StoreFeatureModule, i1$1.EffectsFeatureModule] });
AsmStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStoreModule, providers: [reducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
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
function asmStatePersistenceFactory(asmStatePersistenceService) {
    const result = () => asmStatePersistenceService.initSync();
    return result;
}
class AsmCoreModule {
}
AsmCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, imports: [CommonModule, AsmStoreModule] });
AsmCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, providers: [
        AsmConnector,
        {
            provide: MODULE_INITIALIZER,
            useFactory: asmStatePersistenceFactory,
            deps: [AsmStatePersistenceService],
            multi: true,
        },
        ...facadeProviders,
    ], imports: [CommonModule, AsmStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmStoreModule],
                    providers: [
                        AsmConnector,
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: asmStatePersistenceFactory,
                            deps: [AsmStatePersistenceService],
                            multi: true,
                        },
                        ...facadeProviders,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Search for customers
     * @param options
     */
    customerSearch(options) {
        this.store.dispatch(new CustomerSearch(options));
    }
    /**
     * Reset the customer search result data to the initial state.
     */
    customerSearchReset() {
        this.store.dispatch(new CustomerSearchReset());
    }
    /**
     * Returns the customer search result data.
     */
    getCustomerSearchResults() {
        return this.store.pipe(select(getCustomerSearchResults));
    }
    /**
     * Returns the customer search result loading status.
     */
    getCustomerSearchResultsLoading() {
        return this.store.pipe(select(getCustomerSearchResultsLoading));
    }
    /**
     * Updates the state of the ASM UI
     */
    updateAsmUiState(asmUi) {
        this.store.dispatch(new AsmUiUpdate(asmUi));
    }
    /**
     * Get the state of the ASM UI
     */
    getAsmUiState() {
        return this.store.pipe(select(getAsmUi));
    }
}
AsmService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmService, deps: [{ token: i1$2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AsmService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.Store }]; } });

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
 * Use this pipe when you want to apply a (preferably) pure function (i.e. a function that doesn't use "this")
 *
 * Doing so is more efficient than directly calling the function in the template file because
 * the pipe will re-execute during a detection cycle only when the arguments have changed.
 *
 * ex:
 *
 * my-component.component.ts:
 * ```
 *   unfilteredArray = ['a', 'b', 'c', 'd', 'e']
 *   targetStrings = ['a', 'b', 'c'];
 *
 *    filterArrayByString(array: Array<string>, targetString: string): Array<string> {
 *     return array.filter((element) => element === targetString);
 *   }
 * ```
 *
 * my-component.component.html:
 * ```
 *   <div *ngFor="let targetString of targetStrings">
 *     <app-some-component [filteredArray]="filterArrayByString | cxArgs: unfilteredArray : targetString">
 *  </div>
 * ```
 */
class ArgsPipe {
    transform(projectionFunction, ...args) {
        return projectionFunction(...args);
    }
}
ArgsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ArgsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, name: "cxArgs" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxArgs' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ArgsModule {
}
ArgsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ArgsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ArgsModule, declarations: [ArgsPipe], exports: [ArgsPipe] });
ArgsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ArgsPipe],
                    exports: [ArgsPipe],
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
var SortOrder;
(function (SortOrder) {
    /** "Least" first */
    SortOrder[SortOrder["ASC"] = 1] = "ASC";
    /** "Greatest" first */
    SortOrder[SortOrder["DESC"] = -1] = "DESC";
})(SortOrder || (SortOrder = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sort using basic comparison. Ascending is true first
 */
function byBoolean(ordering = SortOrder.ASC) {
    return (a, b) => {
        if (a === b) {
            return 0;
        }
        const lesser = a === true;
        return ((lesser ? -1 : 1) * ordering);
    };
}
/**
 * True first
 */
const byBooleanTrueFirst = byBoolean(SortOrder.ASC);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sort using basic comparison. Ascending is smaller items first
 */
function byComparison(ordering = SortOrder.ASC) {
    return (a, b) => {
        if (a === b) {
            return 0;
        }
        const lesser = a < b;
        return ((lesser ? -1 : 1) * ordering);
    };
}
/**
 * Smaller objects first
 */
const byComparisonAscending = byComparison(SortOrder.ASC);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sorts based on items being nullish or not.  Ascending is nullish items first.
 */
function byNullish(ordering = SortOrder.ASC) {
    return (a, b) => {
        const aNullish = a === null || a === undefined;
        const bNullish = b === null || b === undefined;
        if (aNullish === bNullish) {
            return 0;
        }
        return ((aNullish ? -1 : 1) * ordering);
    };
}
const byNullishFirst = byNullish(SortOrder.ASC);
const byNullishLast = byNullish(SortOrder.DESC);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Compare numbers. Ascending is smaller numbers first
 */
function byNumber(ordering = SortOrder.ASC) {
    return (a, b) => {
        if (a === b) {
            return 0;
        }
        return ((a - b < 0 ? -1 : 1) * ordering);
    };
}
/**
 * Small numbers first
 */
const byNumberAscending = byNumber(SortOrder.ASC);
/**
 * Large numbers first
 */
const byNumberDescending = byNumber(SortOrder.DESC);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Compare strings using `String.localeCompare()`.  Ascending is alphabetical (a-z)
 *
 * Note: Nullish items are treated as an empty string.
 */
function byString(ordering = SortOrder.ASC, locales, opts) {
    return (a, b) => ((a !== null && a !== void 0 ? a : '').localeCompare(b !== null && b !== void 0 ? b : '', locales, opts) * ordering);
}
/**
 * Alphabetical a-z using `String.localeCompare()`
 *
 * Note: Nullish items are treated as an empty string.
 */
const byStringAscending = byString(SortOrder.ASC);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sort an object using multiple sort criteria
 */
function itemsWith(...fns) {
    return (a, b) => {
        for (const fn of fns) {
            const result = fn(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    };
}
/**
 * Allows you to compose multiple sort comparators
 */
const byMultiple = itemsWith;

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line no-redeclare
function property(prop1, prop2OrComparator, comparator) {
    if (typeof prop2OrComparator === 'function') {
        return (a, b) => prop2OrComparator(a[prop1], b[prop1]);
    }
    else {
        if (comparator) {
            return (a, b) => comparator(a[prop1][prop2OrComparator], b[prop1][prop2OrComparator]);
        }
        else {
            throw new Error('No comparator provided');
        }
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const isString = (x) => typeof x === 'string';
const isNumber = (x) => typeof x === 'number';
const isBoolean = (x) => typeof x === 'boolean';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Tests both values with type guard and uses comparator if both match the type.
 *
 * If either value fails the type guard, they values are considered equal.
 */
function whenType(typeGuard, comparator) {
    return (a, b) => {
        if (typeGuard(a) && typeGuard(b)) {
            return comparator(a, b);
        }
        return 0;
    };
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

/**
 * Generated bundle index. Do not edit.
 */

export { ASM_FEATURE, ArgsModule, ArgsPipe, customerGroup_actions as AsmActions, AsmAdapter, AsmConnector, AsmCoreModule, AsmCreateCustomerService, AsmCustomerListService, asmGroup_selectors as AsmSelectors, AsmService, AsmStatePersistenceService, CUSTOMER_LISTS_NORMALIZER, CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA, CUSTOMER_SEARCH_DATA, CUSTOMER_SEARCH_PAGE_NORMALIZER, SortOrder, asmStatePersistenceFactory, byBoolean, byBooleanTrueFirst, byComparison, byComparisonAscending, byMultiple, byNullish, byNullishFirst, byNullishLast, byNumber, byNumberAscending, byNumberDescending, byString, byStringAscending, isBoolean, isNumber, isString, itemsWith, property, whenType };
//# sourceMappingURL=spartacus-asm-core.mjs.map
