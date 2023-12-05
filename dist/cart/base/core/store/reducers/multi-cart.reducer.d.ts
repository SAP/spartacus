import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { CartActions } from '../actions/index';
export declare const cartTypeIndexInitialState: {
    Active: string;
};
export declare function cartTypeIndexReducer(state: {
    [cartType: string]: string;
} | undefined, action: CartActions.MultiCartActions | CartActions.CartAction): {
    [cartType: string]: string;
};
export declare const cartEntitiesInitialState: undefined;
export declare function cartEntitiesReducer(state: Cart | undefined, action: StateUtils.LoaderAction): Cart | undefined;
