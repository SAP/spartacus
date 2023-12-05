import { StateUtils } from '@spartacus/core';
import { Action } from '@ngrx/store';
export declare const VIEW_ALL_STORES = "[StoreFinder] View All Stores";
export declare const VIEW_ALL_STORES_FAIL = "[StoreFinder] View All Stores Fail";
export declare const VIEW_ALL_STORES_SUCCESS = "[StoreFinder] View All Stores Success";
export declare const CLEAR_STORE_FINDER_DATA = "[StoreFinder] Clear Data";
export declare class ViewAllStores extends StateUtils.LoaderLoadAction {
    readonly type = "[StoreFinder] View All Stores";
    constructor();
}
export declare class ViewAllStoresFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[StoreFinder] View All Stores Fail";
    constructor(payload: any);
}
export declare class ViewAllStoresSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[StoreFinder] View All Stores Success";
    constructor(payload: any);
}
export declare class ClearStoreFinderData implements Action {
    readonly type = "[StoreFinder] Clear Data";
}
export type ViewAllStoresAction = ViewAllStores | ViewAllStoresFail | ViewAllStoresSuccess | ClearStoreFinderData;
