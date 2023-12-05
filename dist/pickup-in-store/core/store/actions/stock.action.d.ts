import { StateUtils, Stock, StoreFinderStockSearchPage } from '@spartacus/core';
import { StockLocationSearchParams } from '@spartacus/pickup-in-store/root';
export declare const STOCK_LEVEL = "[Stock] Get Stock Level";
export declare const STOCK_LEVEL_ON_HOLD = "[Stock] On Hold";
export declare const STOCK_LEVEL_FAIL = "[Stock] Get Stock Level Fail";
export declare const STOCK_LEVEL_SUCCESS = "[Stock] Get Stock Level Success";
export declare const CLEAR_STOCK_DATA = "[Stock] Clear Data";
export declare const STOCK_LEVEL_AT_STORE = "[Stock] Get Stock Level at Store";
export declare const STOCK_LEVEL_AT_STORE_SUCCESS = "[Stock] Get Stock Level at Store Success";
export declare class StockLevel extends StateUtils.LoaderLoadAction {
    payload: StockLocationSearchParams;
    readonly type = "[Stock] Get Stock Level";
    constructor(payload: StockLocationSearchParams);
}
export declare class StockLevelOnHold extends StateUtils.LoaderLoadAction {
    readonly type = "[Stock] On Hold";
    constructor();
}
export declare class StockLevelFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Stock] Get Stock Level Fail";
    constructor(payload: any);
}
export type StockLevelSuccessPayload = {
    productCode: string;
    stockLevels: StoreFinderStockSearchPage;
};
export declare class StockLevelSuccess extends StateUtils.LoaderSuccessAction {
    payload: StockLevelSuccessPayload;
    readonly type = "[Stock] Get Stock Level Success";
    constructor(payload: StockLevelSuccessPayload);
}
export declare class ClearStockData extends StateUtils.LoaderResetAction {
    readonly type = "[Stock] Clear Data";
    constructor();
}
export type StockLevelAction = StockLevel | StockLevelOnHold | StockLevelFail | StockLevelSuccess | ClearStockData;
type StockLevelAtStorePayload = {
    productCode: string;
    storeName: string;
};
/**
 * Add a proposed pickup location for a product code.
 */
export declare const StockLevelAtStore: import("@ngrx/store").ActionCreator<"[Stock] Get Stock Level at Store", (props: {
    payload: StockLevelAtStorePayload;
}) => {
    payload: StockLevelAtStorePayload;
} & import("@ngrx/store/src/models").TypedAction<"[Stock] Get Stock Level at Store">>;
export type StockLevelAtStoreAction = ReturnType<typeof StockLevelAtStore>;
type StockLevelAtStoreSuccessPayload = StockLevelAtStorePayload & {
    stockLevel: Stock;
};
/**
 * Add the stock level for a product at a store.
 */
export declare const StockLevelAtStoreSuccess: import("@ngrx/store").ActionCreator<"[Stock] Get Stock Level at Store Success", (props: {
    payload: StockLevelAtStoreSuccessPayload;
}) => {
    payload: StockLevelAtStoreSuccessPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Stock] Get Stock Level at Store Success">>;
export {};
