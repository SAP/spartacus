import { ProductInterestSearchResult, ProductInterestEntryRelation, NotificationType } from '../../../model/product-interest.model';
import { LoaderLoadAction, LoaderFailAction, LoaderSuccessAction, LoaderResetAction } from '../../../state/utils/loader/loader.action';
import { EntityFailAction, EntityLoadAction, EntitySuccessAction, EntityLoaderResetAction } from '../../../state/utils/entity-loader/entity-loader.action';
export declare const LOAD_PRODUCT_INTERESTS = "Load Product Interests";
export declare const LOAD_PRODUCT_INTERESTS_FAIL = "Load Product Interests Fail";
export declare const LOAD_PRODUCT_INTERESTS_SUCCESS = "Load Product Interests Success";
export declare const REMOVE_PRODUCT_INTEREST = "Remove Product Interest";
export declare const REMOVE_PRODUCT_INTEREST_SUCCESS = "Remove Product Interest Success";
export declare const REMOVE_PRODUCT_INTEREST_FAIL = "Remove Product Interest Fail";
export declare const ADD_PRODUCT_INTEREST = "Add Product Interest";
export declare const ADD_PRODUCT_INTEREST_FAIL = "Add Product Interest Fail";
export declare const ADD_PRODUCT_INTEREST_SUCCESS = "Add Product Interest Success";
export declare const ADD_PRODUCT_INTEREST_RESET = "Add Product Interest Reset";
export declare const REMOVE_PRODUCT_INTEREST_RESET = "Remove Product Interest Reset";
export declare const CLEAR_PRODUCT_INTERESTS = "Clear Product Interests";
export declare class LoadProductInterests extends LoaderLoadAction {
    payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        productCode?: string;
        notificationType?: NotificationType;
    };
    readonly type = "Load Product Interests";
    constructor(payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        productCode?: string;
        notificationType?: NotificationType;
    });
}
export declare class LoadProductInterestsFail extends LoaderFailAction {
    payload: any;
    readonly type = "Load Product Interests Fail";
    constructor(payload: any);
}
export declare class LoadProductInterestsSuccess extends LoaderSuccessAction {
    payload: ProductInterestSearchResult;
    readonly type = "Load Product Interests Success";
    constructor(payload: ProductInterestSearchResult);
}
export declare class RemoveProductInterest extends EntityLoadAction {
    payload: {
        userId: string;
        item: ProductInterestEntryRelation;
        singleDelete?: boolean;
    };
    readonly type = "Remove Product Interest";
    constructor(payload: {
        userId: string;
        item: ProductInterestEntryRelation;
        singleDelete?: boolean;
    });
}
export declare class RemoveProductInterestSuccess extends EntitySuccessAction {
    payload: any;
    readonly type = "Remove Product Interest Success";
    constructor(payload: any);
}
export declare class RemoveProductInterestFail extends EntityFailAction {
    payload: any;
    readonly type = "Remove Product Interest Fail";
    constructor(payload: any);
}
export declare class AddProductInterest extends EntityLoadAction {
    payload: {
        userId: string;
        productCode: string;
        notificationType: NotificationType;
    };
    readonly type = "Add Product Interest";
    constructor(payload: {
        userId: string;
        productCode: string;
        notificationType: NotificationType;
    });
}
export declare class AddProductInterestSuccess extends EntitySuccessAction {
    payload: any;
    readonly type = "Add Product Interest Success";
    constructor(payload: any);
}
export declare class AddProductInterestFail extends EntityFailAction {
    payload: any;
    readonly type = "Add Product Interest Fail";
    constructor(payload: any);
}
export declare class ResetAddInterestState extends EntityLoaderResetAction {
    readonly type = "Add Product Interest Reset";
    constructor();
}
export declare class ResetRemoveInterestState extends EntityLoaderResetAction {
    readonly type = "Remove Product Interest Reset";
    constructor();
}
export declare class ClearProductInterests extends LoaderResetAction {
    readonly type = "Clear Product Interests";
    constructor();
}
export type ProductInterestsAction = LoadProductInterests | LoadProductInterestsFail | LoadProductInterestsSuccess | RemoveProductInterest | RemoveProductInterestSuccess | RemoveProductInterestFail | AddProductInterest | AddProductInterestFail | AddProductInterestSuccess | ResetAddInterestState | ResetRemoveInterestState | ClearProductInterests;
