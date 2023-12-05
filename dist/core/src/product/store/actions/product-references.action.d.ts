import { Action } from '@ngrx/store';
import { ErrorModel } from '../../../model/misc.model';
import { ProductReference } from '../../../model/product.model';
export declare const LOAD_PRODUCT_REFERENCES = "[Product] Load Product References Data";
export declare const LOAD_PRODUCT_REFERENCES_FAIL = "[Product] Load Product References Data Fail";
export declare const LOAD_PRODUCT_REFERENCES_SUCCESS = "[Product] Load Product References Data Success";
export declare const CLEAN_PRODUCT_REFERENCES = "[Product] Clean Product References";
export declare class LoadProductReferences implements Action {
    payload: {
        productCode: string;
        referenceType?: string;
        pageSize?: number;
    };
    readonly type = "[Product] Load Product References Data";
    constructor(payload: {
        productCode: string;
        referenceType?: string;
        pageSize?: number;
    });
}
export declare class LoadProductReferencesFail implements Action {
    payload?: ErrorModel | undefined;
    readonly type = "[Product] Load Product References Data Fail";
    constructor(payload?: ErrorModel | undefined);
}
export declare class LoadProductReferencesSuccess implements Action {
    payload: {
        productCode: string;
        list: ProductReference[];
    };
    readonly type = "[Product] Load Product References Data Success";
    constructor(payload: {
        productCode: string;
        list: ProductReference[];
    });
}
export declare class CleanProductReferences implements Action {
    readonly type = "[Product] Clean Product References";
}
export type ProductReferencesAction = LoadProductReferences | LoadProductReferencesFail | LoadProductReferencesSuccess | CleanProductReferences;
