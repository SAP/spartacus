import { MemoizedSelector } from '@ngrx/store';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MultiCartState, StateWithMultiCart } from '../multi-cart-state';
export declare const getMultiCartState: MemoizedSelector<StateWithMultiCart, MultiCartState>;
export declare const getMultiCartEntities: MemoizedSelector<StateWithMultiCart, StateUtils.EntityProcessesLoaderState<Cart | undefined>>;
export declare const getCartEntitySelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, StateUtils.ProcessesLoaderState<Cart | undefined>>;
export declare const getCartSelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, Cart>;
export declare const getCartIsStableSelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, boolean>;
export declare const getCartHasPendingProcessesSelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, boolean>;
export declare const getCartEntriesSelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, OrderEntry[]>;
export declare const getCartEntrySelectorFactory: (cartId: string, productCode: string) => MemoizedSelector<StateWithMultiCart, OrderEntry | undefined>;
export declare const getCartsSelectorFactory: MemoizedSelector<StateWithMultiCart, Cart[]>;
export declare const getCartTypeIndex: MemoizedSelector<StateWithMultiCart, {
    [cartType: string]: string;
}>;
export declare const getCartIdByTypeFactory: (type: string) => MemoizedSelector<StateWithMultiCart, string>;
