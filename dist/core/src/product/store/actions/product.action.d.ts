import { Action } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { EntityLoaderMeta } from '../../../state/utils/entity-loader/entity-loader.action';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
export declare const LOAD_PRODUCT = "[Product] Load Product Data";
export declare const LOAD_PRODUCT_FAIL = "[Product] Load Product Data Fail";
export declare const LOAD_PRODUCT_SUCCESS = "[Product] Load Product Data Success";
export declare const CLEAR_PRODUCT_PRICE = "[Product] Clear Product PRICE";
export interface ProductMeta extends EntityLoaderMeta {
    scope?: string;
}
export interface EntityScopedLoaderAction extends Action {
    readonly payload?: any;
    readonly meta?: ProductMeta;
}
export declare class LoadProduct extends EntityScopedLoaderActions.EntityScopedLoadAction {
    payload: string;
    readonly type = "[Product] Load Product Data";
    constructor(payload: string, scope?: string);
}
export declare class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction {
    payload: any;
    readonly type = "[Product] Load Product Data Fail";
    constructor(productCode: string, payload: any, scope?: string);
}
export declare class LoadProductSuccess extends EntityScopedLoaderActions.EntityScopedSuccessAction {
    payload: Product;
    readonly type = "[Product] Load Product Data Success";
    constructor(payload: Product, scope?: string);
}
export declare class ClearProductPrice extends EntityScopedLoaderActions.EntityScopedResetAction {
    readonly type = "[Product] Clear Product PRICE";
    constructor();
}
export type ProductAction = LoadProduct | LoadProductFail | LoadProductSuccess | ClearProductPrice;
