import { Store } from '@ngrx/store';
import { Cart, CartType, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StateWithMultiCart } from '../store/multi-cart-state';
import * as i0 from "@angular/core";
export declare class MultiCartService implements MultiCartFacade {
    protected store: Store<StateWithMultiCart>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithMultiCart>, userIdService: UserIdService);
    /**
     * Returns cart from store as an observable
     *
     * @param cartId
     */
    getCart(cartId: string): Observable<Cart>;
    /**
     * Returns a list of carts from store as an observable
     *
     */
    getCarts(): Observable<Cart[]>;
    /**
     * Returns cart entity from store (cart with loading, error, success flags) as an observable
     *
     * @param cartId
     */
    getCartEntity(cartId: string): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>;
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId: string): Observable<boolean>;
    /**
     * Simple random temp cart id generator
     */
    protected generateTempCartId(): string;
    /**
     * Create or merge cart
     *
     * @param params Object with userId, oldCartId, toMergeCartGuid and extraData
     */
    createCart({ userId, oldCartId, toMergeCartGuid, extraData, }: {
        userId: string;
        oldCartId?: string;
        toMergeCartGuid?: string;
        extraData?: {
            active?: boolean;
        };
    }): Observable<Cart>;
    /**
     * Merge provided cart to current user cart
     *
     * @param params Object with userId, cartId and extraData
     */
    mergeToCurrentCart({ userId, cartId, extraData, }: {
        userId: string;
        cartId: string;
        extraData?: {
            active?: boolean;
        };
    }): void;
    /**
     * Load cart
     *
     * @param params Object with userId, cartId and extraData
     */
    loadCart({ cartId, userId, extraData, }: {
        cartId: string;
        userId: string;
        extraData?: any;
    }): void;
    /**
     * Get cart entries as an observable
     * @param cartId
     */
    getEntries(cartId: string): Observable<OrderEntry[]>;
    /**
     * Get last entry for specific product code from cart.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param cartId
     * @param productCode
     */
    getLastEntry(cartId: string, productCode: string): Observable<OrderEntry | undefined>;
    /**
     * Add entry to cart
     *
     * @param userId
     * @param cartId
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(userId: string, cartId: string, productCode: string, quantity: number, pickupStore?: string): void;
    /**
     * Add multiple entries to cart
     *
     * @param userId
     * @param cartId
     * @param products Array with items (productCode and quantity)
     */
    addEntries(userId: string, cartId: string, products: Array<{
        productCode: string;
        quantity: number;
    }>): void;
    /**
     * Remove entry from cart
     *
     * @param userId
     * @param cartId
     * @param entryNumber
     */
    removeEntry(userId: string, cartId: string, entryNumber: number): void;
    /**
     * Update entry in cart. For quantity = 0 it removes entry
     *
     * @param userId
     * @param cartId
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(userId: string, cartId: string, entryNumber: number, quantity?: number, pickupStore?: string, pickupToDelivery?: boolean): void;
    /**
     * Get first entry from cart matching the specified product code
     *
     * @param cartId
     * @param productCode
     */
    getEntry(cartId: string, productCode: string): Observable<OrderEntry | undefined>;
    /**
     * Assign email to the cart
     *
     * @param cartId
     * @param userId
     * @param email
     */
    assignEmail(cartId: string, userId: string, email: string): void;
    removeCart(cartId: string): void;
    /**
     * Delete cart
     *
     * @param cartId
     * @param userId
     */
    deleteCart(cartId: string, userId: string): void;
    /**
     * Reloads the cart with specified id.
     *
     * @param cartId
     * @param extraData
     */
    reloadCart(cartId: string, extraData?: {
        active: boolean;
    }): void;
    /**
     * Get the cart id based on cart type
     *
     * @param cartType
     */
    getCartIdByType(cartType: CartType): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartService>;
}
