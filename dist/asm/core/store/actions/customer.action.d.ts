import { CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
export declare const CUSTOMER_SEARCH = "[Asm] Customer Search";
export declare const CUSTOMER_SEARCH_FAIL = "[Asm] Customer Search Fail";
export declare const CUSTOMER_SEARCH_SUCCESS = "[Asm] Customer Search Success";
export declare const CUSTOMER_SEARCH_RESET = "[Asm] Customer Search Reset";
export declare const CUSTOMER_LIST_CUSTOMERS_SEARCH = "[Asm] Customer List Customers Search";
export declare const CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL = "[Asm] Customer List Customers Search Fail";
export declare const CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS = "[Asm] Customer List Customers Search Success";
export declare const CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET = "[Asm] Customer List Customers Search Reset";
export declare class CustomerSearch extends StateUtils.LoaderLoadAction {
    payload: CustomerSearchOptions;
    readonly type = "[Asm] Customer Search";
    constructor(payload: CustomerSearchOptions);
}
export declare class CustomerSearchFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Asm] Customer Search Fail";
    constructor(payload: any);
}
export declare class CustomerSearchSuccess extends StateUtils.LoaderSuccessAction {
    payload: CustomerSearchPage;
    readonly type = "[Asm] Customer Search Success";
    constructor(payload: CustomerSearchPage);
}
export declare class CustomerSearchReset extends StateUtils.LoaderResetAction {
    readonly type = "[Asm] Customer Search Reset";
    constructor();
}
export declare class CustomerListCustomersSearch extends StateUtils.LoaderLoadAction {
    payload: CustomerSearchOptions;
    readonly type = "[Asm] Customer List Customers Search";
    constructor(payload: CustomerSearchOptions);
}
export declare class CustomerListCustomersSearchFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Asm] Customer List Customers Search Fail";
    constructor(payload: any);
}
export declare class CustomerListCustomersSearchSuccess extends StateUtils.LoaderSuccessAction {
    payload: CustomerSearchPage;
    readonly type = "[Asm] Customer List Customers Search Success";
    constructor(payload: CustomerSearchPage);
}
export declare class CustomerListCustomersSearchReset extends StateUtils.LoaderResetAction {
    readonly type = "[Asm] Customer List Customers Search Reset";
    constructor();
}
export type CustomerAction = CustomerSearch | CustomerSearchFail | CustomerSearchSuccess | CustomerSearchReset | CustomerListCustomersSearch | CustomerListCustomersSearchFail | CustomerListCustomersSearchSuccess | CustomerListCustomersSearchReset;
