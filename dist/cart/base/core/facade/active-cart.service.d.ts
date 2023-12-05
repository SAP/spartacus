import { OnDestroy } from '@angular/core';
import { ActiveCartFacade, Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils, User, UserIdService, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ActiveCartService implements ActiveCartFacade, OnDestroy {
    protected multiCartFacade: MultiCartFacade;
    protected userIdService: UserIdService;
    protected winRef?: WindowRef | undefined;
    protected activeCart$: Observable<Cart>;
    protected subscription: Subscription;
    protected activeCartId$: Observable<string>;
    protected cartEntity$: Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>;
    protected shouldLoadCartOnCodeFlow: boolean;
    constructor(multiCartFacade: MultiCartFacade, userIdService: UserIdService, winRef: WindowRef);
    /**
     * @deprecated since 6.1
     */
    constructor(multiCartFacade: MultiCartFacade, userIdService: UserIdService);
    protected initActiveCart(): void;
    protected detectUserChange(): void;
    /**
     * Returns active cart
     */
    getActive(): Observable<Cart>;
    /**
     * Waits for the cart to be stable before returning the active cart.
     */
    takeActive(): Observable<Cart>;
    /**
     * Returns active cart id
     */
    getActiveCartId(): Observable<string>;
    /**
     * Waits for the cart to be stable before returning the active cart's ID.
     */
    takeActiveCartId(): Observable<string>;
    /**
     * Returns cart entries
     */
    getEntries(): Observable<OrderEntry[]>;
    /**
     * Returns last cart entry for provided product code.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param productCode
     */
    getLastEntry(productCode: string): Observable<OrderEntry | undefined>;
    /**
     * Returns cart loading state
     */
    getLoading(): Observable<boolean>;
    /**
     * Returns true when cart is stable (not loading and not pending processes on cart)
     */
    isStable(): Observable<boolean>;
    /**
     * Loads cart in every case except anonymous user and current cart combination
     */
    protected load(cartId: string, userId: string): void;
    /**
     * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
     * cartId will be defined (not '', null, undefined)
     */
    protected loadOrMerge(cartId: string, userId: string, previousUserId: string): void;
    /**
     * Temporary method to merge guest cart with user cart because of backend limitation
     * This is for an edge case
     */
    protected guestCartMerge(cartId: string): void;
    /**
     * Adds entries from guest cart to user cart
     */
    protected addEntriesGuestMerge(cartEntries: OrderEntry[]): void;
    protected isCartCreating(cartState: StateUtils.ProcessesLoaderState<Cart | undefined>, cartId: string): boolean | undefined;
    /**
     * Check if user is just logged in with code flow
     */
    protected isLoggedInWithCodeFlow(): boolean;
    private checkInitLoad;
    requireLoadedCart(forGuestMerge?: boolean): Observable<Cart>;
    /**
     * Add entry to active cart
     *
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(productCode: string, quantity: number, pickupStore?: string): void;
    /**
     * Remove entry
     *
     * @param entry
     */
    removeEntry(entry: OrderEntry): void;
    /**
     * Update entry
     *
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(entryNumber: number, quantity?: number, pickupStore?: string, pickupToDelivery?: boolean): void;
    /**
     * Returns cart entry
     *
     * @param productCode
     */
    getEntry(productCode: string): Observable<OrderEntry | undefined>;
    /**
     * Assign email to cart
     *
     * @param email
     */
    addEmail(email: string): void;
    /**
     * Get assigned user to cart
     */
    getAssignedUser(): Observable<User>;
    /**
     * Returns observable of true for guest cart
     */
    isGuestCart(cart?: Cart): Observable<boolean>;
    protected isCartUserGuest(cart: Cart): boolean;
    /**
     * Add multiple entries to a cart
     *
     * @param cartEntries : list of entries to add (OrderEntry[])
     */
    addEntries(cartEntries: OrderEntry[]): void;
    /**
     * Reloads active cart
     */
    reloadActiveCart(): void;
    hasPickupItems(): Observable<boolean>;
    hasDeliveryItems(): Observable<boolean>;
    getPickupEntries(): Observable<OrderEntry[]>;
    getDeliveryEntries(): Observable<OrderEntry[]>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActiveCartService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActiveCartService>;
}
