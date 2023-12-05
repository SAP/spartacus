import { GeoPoint, SearchConfig, StateUtils } from '@spartacus/core';
export declare const FIND_STORES_ON_HOLD = "[StoreFinder] On Hold";
export declare const FIND_STORES = "[StoreFinder] Find Stores";
export declare const FIND_STORES_FAIL = "[StoreFinder] Find Stores Fail";
export declare const FIND_STORES_SUCCESS = "[StoreFinder] Find Stores Success";
export declare const FIND_STORE_BY_ID = "[StoreFinder] Find a Store by Id";
export declare const FIND_STORE_BY_ID_FAIL = "[StoreFinder] Find a Store by Id Fail";
export declare const FIND_STORE_BY_ID_SUCCESS = "[StoreFinder] Find a Store by Id Success";
export declare class FindStoresOnHold extends StateUtils.LoaderLoadAction {
    readonly type = "[StoreFinder] On Hold";
    constructor();
}
export declare class FindStores extends StateUtils.LoaderLoadAction {
    payload: {
        queryText: string;
        searchConfig?: SearchConfig;
        longitudeLatitude?: GeoPoint;
        useMyLocation?: boolean;
        countryIsoCode?: string;
        radius?: number;
    };
    readonly type = "[StoreFinder] Find Stores";
    constructor(payload: {
        queryText: string;
        searchConfig?: SearchConfig;
        longitudeLatitude?: GeoPoint;
        useMyLocation?: boolean;
        countryIsoCode?: string;
        radius?: number;
    });
}
export declare class FindStoresFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[StoreFinder] Find Stores Fail";
    constructor(payload: any);
}
export declare class FindStoresSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[StoreFinder] Find Stores Success";
    constructor(payload: any);
}
export declare class FindStoreById extends StateUtils.LoaderLoadAction {
    payload: {
        storeId: string;
    };
    readonly type = "[StoreFinder] Find a Store by Id";
    constructor(payload: {
        storeId: string;
    });
}
export declare class FindStoreByIdFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[StoreFinder] Find a Store by Id Fail";
    constructor(payload: any);
}
export declare class FindStoreByIdSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[StoreFinder] Find a Store by Id Success";
    constructor(payload: any);
}
export type FindStoresAction = FindStoresOnHold | FindStores | FindStoresFail | FindStoresSuccess | FindStoreById | FindStoreByIdFail | FindStoreByIdSuccess;
