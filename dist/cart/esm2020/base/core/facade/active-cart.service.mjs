/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Optional } from '@angular/core';
import { CartType, } from '@spartacus/cart/base/root';
import { OAUTH_REDIRECT_FLOW_KEY, OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_GUEST, getLastValueSync, } from '@spartacus/core';
import { Subscription, combineLatest, of, using } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, shareReplay, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { getCartIdByUserId, isEmail, isEmpty, isJustLoggedIn, isTempCartId, } from '../utils/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class ActiveCartService {
    constructor(multiCartFacade, userIdService, winRef) {
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.winRef = winRef;
        this.subscription = new Subscription();
        // This stream is used for referencing carts in API calls.
        this.activeCartId$ = this.userIdService.getUserId().pipe(
        // We want to wait the initialization of cartId until the userId is initialized
        // We have take(1) to not trigger this stream, when userId changes.
        take(1), switchMap(() => this.multiCartFacade.getCartIdByType(CartType.ACTIVE)), 
        // We also wait until we initialize cart from localStorage
        filter((cartId) => cartId !== undefined), 
        // fallback to current when we don't have particular cart id
        map((cartId) => (cartId === '' ? OCC_CART_ID_CURRENT : cartId)));
        // Stream with active cart entity
        this.cartEntity$ = this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getCartEntity(cartId)));
        // Flag to prevent cart loading when logged in with code flow
        // Instead of loading cart will run loadOrMerge method
        this.shouldLoadCartOnCodeFlow = true;
        // When the function `requireLoadedCart` is first called, the init cart loading for login user may not be done
        this.checkInitLoad = undefined;
        this.initActiveCart();
        this.detectUserChange();
    }
    initActiveCart() {
        // Stream for getting the cart value
        const cartValue$ = this.cartEntity$.pipe(map((cartEntity) => {
            return {
                cart: cartEntity.value,
                isStable: !cartEntity.loading && cartEntity.processesCount === 0,
                loaded: Boolean((cartEntity.error || cartEntity.success) && !cartEntity.loading),
            };
        }), 
        // we want to emit empty carts even if those are not stable
        // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
        // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
        filter(({ isStable, cart }) => isStable || isEmpty(cart)));
        // Responsible for loading cart when it does not exist (eg. app initialization when we have only cartId)
        const loading = cartValue$.pipe(withLatestFrom(this.activeCartId$, this.userIdService.getUserId()), tap(([{ cart, loaded, isStable }, cartId, userId]) => {
            if (isStable &&
                isEmpty(cart) &&
                !loaded &&
                !isTempCartId(cartId) &&
                this.shouldLoadCartOnCodeFlow) {
                this.load(cartId, userId);
            }
        }));
        this.activeCart$ = using(() => loading.subscribe(), () => cartValue$).pipe(
        // Normalization for empty cart value returned as empty object.
        map(({ cart }) => (cart ? cart : {})), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));
    }
    detectUserChange() {
        // Any changes of userId is interesting for us, because we have to merge/load/switch cart in those cases.
        this.subscription.add(this.userIdService
            .getUserId()
            .pipe(
        // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId.
        pairwise(), 
        // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
        withLatestFrom(this.activeCartId$))
            .subscribe(([[previousUserId, userId], cartId]) => {
            // Only change of user and not logout (current userId !== anonymous) should trigger loading mechanism
            if (isJustLoggedIn(userId, previousUserId)) {
                this.loadOrMerge(cartId, userId, previousUserId);
            }
        }));
        // Detect user logged in with code flow.
        if (this.isLoggedInWithCodeFlow()) {
            // Prevent loading cart while merging.
            this.shouldLoadCartOnCodeFlow = false;
            this.subscription.add(this.userIdService
                .getUserId()
                .pipe(withLatestFrom(this.activeCartId$))
                .subscribe(([userId, cartId]) => {
                this.loadOrMerge(cartId, userId, OCC_USER_ID_ANONYMOUS);
                this.winRef?.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
            }));
        }
    }
    /**
     * Returns active cart
     */
    getActive() {
        return this.activeCart$;
    }
    /**
     * Waits for the cart to be stable before returning the active cart.
     */
    takeActive() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActive()), filter((cart) => !!cart), take(1));
    }
    /**
     * Returns active cart id
     */
    getActiveCartId() {
        return this.activeCart$.pipe(withLatestFrom(this.userIdService.getUserId()), map(([cart, userId]) => getCartIdByUserId(cart, userId)), distinctUntilChanged());
    }
    /**
     * Waits for the cart to be stable before returning the active cart's ID.
     */
    takeActiveCartId() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActiveCartId()), filter((cartId) => !!cartId), take(1));
    }
    /**
     * Returns cart entries
     */
    getEntries() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntries(cartId)), distinctUntilChanged());
    }
    /**
     * Returns last cart entry for provided product code.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param productCode
     */
    getLastEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getLastEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Returns cart loading state
     */
    getLoading() {
        return this.cartEntity$.pipe(map((cartEntity) => Boolean(cartEntity.loading)), distinctUntilChanged());
    }
    /**
     * Returns true when cart is stable (not loading and not pending processes on cart)
     */
    isStable() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.isStable(cartId)));
    }
    /**
     * Loads cart in every case except anonymous user and current cart combination
     */
    load(cartId, userId) {
        if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    /**
     * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
     * cartId will be defined (not '', null, undefined)
     */
    loadOrMerge(cartId, userId, previousUserId) {
        if (cartId === OCC_CART_ID_CURRENT ||
            // It covers the case when you are logged in and then asm user login, you don't want to merge, but only load emulated user cart
            // Similarly when you are logged in as asm user and you logout and want to resume previous user session
            previousUserId !== OCC_USER_ID_ANONYMOUS) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
        else if (Boolean(getLastValueSync(this.isGuestCart()))) {
            this.guestCartMerge(cartId);
        }
        else {
            // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
            this.multiCartFacade.mergeToCurrentCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    // TODO: Remove once backend is updated
    /**
     * Temporary method to merge guest cart with user cart because of backend limitation
     * This is for an edge case
     */
    guestCartMerge(cartId) {
        this.getEntries()
            .pipe(take(1))
            .subscribe((entries) => {
            this.multiCartFacade.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
            this.addEntriesGuestMerge(entries);
        });
    }
    /**
     * Adds entries from guest cart to user cart
     */
    addEntriesGuestMerge(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart(true)
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
        });
    }
    isCartCreating(cartState, cartId) {
        // cart creating is always represented with loading flags
        // when all loading flags are false it means that we restored wrong cart id
        // could happen on context change or reload right in the middle on cart create call
        return (isTempCartId(cartId) &&
            (cartState.loading || cartState.success || cartState.error));
    }
    /**
     * Check if user is just logged in with code flow
     */
    isLoggedInWithCodeFlow() {
        return !!this.winRef?.localStorage?.getItem(OAUTH_REDIRECT_FLOW_KEY);
    }
    requireLoadedCart(forGuestMerge = false) {
        this.checkInitLoad = this.checkInitLoad === undefined;
        // For guest cart merge we want to filter guest cart in the whole stream
        // We have to wait with load/create/addEntry after guest cart will be deleted.
        const cartSelector$ = (forGuestMerge
            ? this.cartEntity$.pipe(filter(() => !Boolean(getLastValueSync(this.isGuestCart()))))
            : this.cartEntity$).pipe(filter((cartState) => !cartState.loading || !!this.checkInitLoad));
        return this.activeCartId$
            .pipe(
        // Avoid load/create call when there are new cart creating at the moment
        withLatestFrom(cartSelector$), filter(([cartId, cartState]) => !this.isCartCreating(cartState, cartId)), map(([, cartState]) => cartState), take(1))
            .pipe(withLatestFrom(this.userIdService.getUserId()), tap(([cartState, userId]) => {
            // Try to load the cart, because it might have been created on another device between our login and add entry call
            if (isEmpty(cartState.value) &&
                userId !== OCC_USER_ID_ANONYMOUS &&
                !cartState.loading) {
                this.load(OCC_CART_ID_CURRENT, userId);
            }
            this.checkInitLoad = false;
        }), switchMap(() => cartSelector$), 
        // create cart can happen to anonymous user if it is empty or to any other user if it is loaded and empty
        withLatestFrom(this.userIdService.getUserId()), filter(([cartState, userId]) => Boolean(userId === OCC_USER_ID_ANONYMOUS ||
            cartState.success ||
            cartState.error)), take(1))
            .pipe(tap(([cartState, userId]) => {
            if (isEmpty(cartState.value)) {
                this.multiCartFacade.createCart({
                    userId,
                    extraData: {
                        active: true,
                    },
                });
            }
        }), switchMap(() => cartSelector$), filter((cartState) => Boolean(cartState.success || cartState.error)), 
        // wait for active cart id to point to code/guid to avoid some work on temp cart entity
        withLatestFrom(this.activeCartId$), filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)), map(([cartState]) => cartState.value), filter((cart) => !isEmpty(cart)), take(1));
    }
    /**
     * Add entry to active cart
     *
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(productCode, quantity, pickupStore) {
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntry(userId, getCartIdByUserId(cart, userId), productCode, quantity, pickupStore);
        });
    }
    /**
     * Remove entry
     *
     * @param entry
     */
    removeEntry(entry) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.removeEntry(userId, cartId, entry.entryNumber);
        });
    }
    /**
     * Update entry
     *
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(entryNumber, quantity, pickupStore, pickupToDelivery = false) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.updateEntry(userId, cartId, entryNumber, quantity, pickupStore, pickupToDelivery);
        });
    }
    /**
     * Returns cart entry
     *
     * @param productCode
     */
    getEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Assign email to cart
     *
     * @param email
     */
    addEmail(email) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.assignEmail(cartId, userId, email);
        });
    }
    /**
     * Get assigned user to cart
     */
    getAssignedUser() {
        return this.activeCart$.pipe(map((cart) => cart.user));
    }
    // TODO: Make cart required param in 4.0
    /**
     * Returns observable of true for guest cart
     */
    isGuestCart(cart) {
        return cart
            ? of(this.isCartUserGuest(cart))
            : this.activeCart$.pipe(map((activeCart) => this.isCartUserGuest(activeCart)), distinctUntilChanged());
    }
    isCartUserGuest(cart) {
        const cartUser = cart.user;
        return Boolean(cartUser &&
            (cartUser.name === OCC_USER_ID_GUEST ||
                isEmail(cartUser.uid?.split('|').slice(1).join('|'))));
    }
    /**
     * Add multiple entries to a cart
     *
     * @param cartEntries : list of entries to add (OrderEntry[])
     */
    addEntries(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            if (cart) {
                this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
            }
        });
    }
    /**
     * Reloads active cart
     */
    reloadActiveCart() {
        combineLatest([this.getActiveCartId(), this.userIdService.takeUserId()])
            .pipe(take(1), map(([cartId, userId]) => {
            this.multiCartFacade.loadCart({
                cartId,
                userId,
                extraData: { active: true },
            });
        }))
            .subscribe();
    }
    hasPickupItems() {
        return this.getActive().pipe(map((cart) => cart.pickupItemsQuantity ? cart.pickupItemsQuantity > 0 : false));
    }
    hasDeliveryItems() {
        return this.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ? cart.deliveryItemsQuantity > 0 : false));
    }
    getPickupEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService !== undefined)));
    }
    getDeliveryEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService === undefined)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ActiveCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService, deps: [{ token: i1.MultiCartFacade }, { token: i2.UserIdService }, { token: i2.WindowRef, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MultiCartFacade }, { type: i2.UserIdService }, { type: i2.WindowRef, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9mYWNhZGUvYWN0aXZlLWNhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUdMLFFBQVEsR0FHVCxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQixpQkFBaUIsRUFLakIsZ0JBQWdCLEdBQ2pCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLFlBQVksRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsUUFBUSxFQUNSLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxPQUFPLEVBQ1AsY0FBYyxFQUNkLFlBQVksR0FDYixNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3hCLE1BQU0sT0FBTyxpQkFBaUI7SUFvQzVCLFlBQ1ksZUFBZ0MsRUFDaEMsYUFBNEIsRUFDaEIsTUFBa0I7UUFGOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFyQ2hDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QywwREFBMEQ7UUFDaEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNB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RSxDQUNYLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUNwRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQUMsQ0FDdEUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FBQyxDQUN0RSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OEdBM2tCVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVOzswQkF3Q04sUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcnQsXG4gIENhcnRUeXBlLFxuICBNdWx0aUNhcnRGYWNhZGUsXG4gIE9yZGVyRW50cnksXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgT0FVVEhfUkVESVJFQ1RfRkxPV19LRVksXG4gIE9DQ19DQVJUX0lEX0NVUlJFTlQsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgT0NDX1VTRVJfSURfR1VFU1QsXG4gIFN0YXRlVXRpbHMsXG4gIFVzZXIsXG4gIFVzZXJJZFNlcnZpY2UsXG4gIFdpbmRvd1JlZixcbiAgZ2V0TGFzdFZhbHVlU3luYyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCwgb2YsIHVzaW5nIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBnZXRDYXJ0SWRCeVVzZXJJZCxcbiAgaXNFbWFpbCxcbiAgaXNFbXB0eSxcbiAgaXNKdXN0TG9nZ2VkSW4sXG4gIGlzVGVtcENhcnRJZCxcbn0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aXZlQ2FydFNlcnZpY2UgaW1wbGVtZW50cyBBY3RpdmVDYXJ0RmFjYWRlLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgYWN0aXZlQ2FydCQ6IE9ic2VydmFibGU8Q2FydD47XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLy8gVGhpcyBzdHJlYW0gaXMgdXNlZCBmb3IgcmVmZXJlbmNpbmcgY2FydHMgaW4gQVBJIGNhbGxzLlxuICBwcm90ZWN0ZWQgYWN0aXZlQ2FydElkJCA9IHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKS5waXBlKFxuICAgIC8vIFdlIHdhbnQgdG8gd2FpdCB0aGUgaW5pdGlhbGl6YXRpb24gb2YgY2FydElkIHVudGlsIHRoZSB1c2VySWQgaXMgaW5pdGlhbGl6ZWRcbiAgICAvLyBXZSBoYXZlIHRha2UoMSkgdG8gbm90IHRyaWdnZXIgdGhpcyBzdHJlYW0sIHdoZW4gdXNlcklkIGNoYW5nZXMuXG4gICAgdGFrZSgxKSxcbiAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0Q2FydElkQnlUeXBlKENhcnRUeXBlLkFDVElWRSkpLFxuICAgIC8vIFdlIGFsc28gd2FpdCB1bnRpbCB3ZSBpbml0aWFsaXplIGNhcnQgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICBmaWx0ZXIoKGNhcnRJZCkgPT4gY2FydElkICE9PSB1bmRlZmluZWQpLFxuICAgIC8vIGZhbGxiYWNrIHRvIGN1cnJlbnQgd2hlbiB3ZSBkb24ndCBoYXZlIHBhcnRpY3VsYXIgY2FydCBpZFxuICAgIG1hcCgoY2FydElkKSA9PiAoY2FydElkID09PSAnJyA/IE9DQ19DQVJUX0lEX0NVUlJFTlQgOiBjYXJ0SWQpKVxuICApO1xuXG4gIC8vIFN0cmVhbSB3aXRoIGFjdGl2ZSBjYXJ0IGVudGl0eVxuICBwcm90ZWN0ZWQgY2FydEVudGl0eSQgPSB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0Q2FydEVudGl0eShjYXJ0SWQpKVxuICApO1xuXG4gIC8vIEZsYWcgdG8gcHJldmVudCBjYXJ0IGxvYWRpbmcgd2hlbiBsb2dnZWQgaW4gd2l0aCBjb2RlIGZsb3dcbiAgLy8gSW5zdGVhZCBvZiBsb2FkaW5nIGNhcnQgd2lsbCBydW4gbG9hZE9yTWVyZ2UgbWV0aG9kXG4gIHByb3RlY3RlZCBzaG91bGRMb2FkQ2FydE9uQ29kZUZsb3cgPSB0cnVlO1xuXG4gIC8vIFRPRE8oQ1hTUEEtMzA2OCk6IG1ha2UgV2luZG93UmVmIGEgcmVxdWlyZWQgZGVwZW5kZW5jeVxuICBjb25zdHJ1Y3RvcihcbiAgICBtdWx0aUNhcnRGYWNhZGU6IE11bHRpQ2FydEZhY2FkZSxcbiAgICB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgd2luUmVmOiBXaW5kb3dSZWZcbiAgKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDYuMVxuICAgKi9cbiAgY29uc3RydWN0b3IobXVsdGlDYXJ0RmFjYWRlOiBNdWx0aUNhcnRGYWNhZGUsIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UpO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbXVsdGlDYXJ0RmFjYWRlOiBNdWx0aUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIHdpblJlZj86IFdpbmRvd1JlZlxuICApIHtcbiAgICB0aGlzLmluaXRBY3RpdmVDYXJ0KCk7XG4gICAgdGhpcy5kZXRlY3RVc2VyQ2hhbmdlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdEFjdGl2ZUNhcnQoKSB7XG4gICAgLy8gU3RyZWFtIGZvciBnZXR0aW5nIHRoZSBjYXJ0IHZhbHVlXG4gICAgY29uc3QgY2FydFZhbHVlJCA9IHRoaXMuY2FydEVudGl0eSQucGlwZShcbiAgICAgIG1hcCgoY2FydEVudGl0eSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNhcnQ6IGNhcnRFbnRpdHkudmFsdWUsXG4gICAgICAgICAgaXNTdGFibGU6ICFjYXJ0RW50aXR5LmxvYWRpbmcgJiYgY2FydEVudGl0eS5wcm9jZXNzZXNDb3VudCA9PT0gMCxcbiAgICAgICAgICBsb2FkZWQ6IEJvb2xlYW4oXG4gICAgICAgICAgICAoY2FydEVudGl0eS5lcnJvciB8fCBjYXJ0RW50aXR5LnN1Y2Nlc3MpICYmICFjYXJ0RW50aXR5LmxvYWRpbmdcbiAgICAgICAgICApLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICAvLyB3ZSB3YW50IHRvIGVtaXQgZW1wdHkgY2FydHMgZXZlbiBpZiB0aG9zZSBhcmUgbm90IHN0YWJsZVxuICAgICAgLy8gb24gbWVyZ2UgY2FydCBhY3Rpb24gd2Ugd2FudCB0byBzd2l0Y2ggdG8gZW1wdHkgY2FydCBzbyBubyBvbmUgd291bGQgdXNlIG9sZCBjYXJ0SWQgd2hpY2ggY2FuIGJlIGFscmVhZHkgb2Jzb2xldGVcbiAgICAgIC8vIHNvIG9uIG1lcmdlIGFjdGlvbiB0aGUgcmVzdWx0aW5nIHN0cmVhbSBsb29rcyBsaWtlIHRoaXM6IG9sZF9jYXJ0IC0+IHt9IC0+IG5ld19jYXJ0XG4gICAgICBmaWx0ZXIoKHsgaXNTdGFibGUsIGNhcnQgfSkgPT4gaXNTdGFibGUgfHwgaXNFbXB0eShjYXJ0KSlcbiAgICApO1xuXG4gICAgLy8gUmVzcG9uc2libGUgZm9yIGxvYWRpbmcgY2FydCB3aGVuIGl0IGRvZXMgbm90IGV4aXN0IChlZy4gYXBwIGluaXRpYWxpemF0aW9uIHdoZW4gd2UgaGF2ZSBvbmx5IGNhcnRJZClcbiAgICBjb25zdCBsb2FkaW5nID0gY2FydFZhbHVlJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5hY3RpdmVDYXJ0SWQkLCB0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgdGFwKChbeyBjYXJ0LCBsb2FkZWQsIGlzU3RhYmxlIH0sIGNhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNTdGFibGUgJiZcbiAgICAgICAgICBpc0VtcHR5KGNhcnQpICYmXG4gICAgICAgICAgIWxvYWRlZCAmJlxuICAgICAgICAgICFpc1RlbXBDYXJ0SWQoY2FydElkKSAmJlxuICAgICAgICAgIHRoaXMuc2hvdWxkTG9hZENhcnRPbkNvZGVGbG93XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubG9hZChjYXJ0SWQsIHVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuYWN0aXZlQ2FydCQgPSB1c2luZyhcbiAgICAgICgpID0+IGxvYWRpbmcuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiBjYXJ0VmFsdWUkXG4gICAgKS5waXBlKFxuICAgICAgLy8gTm9ybWFsaXphdGlvbiBmb3IgZW1wdHkgY2FydCB2YWx1ZSByZXR1cm5lZCBhcyBlbXB0eSBvYmplY3QuXG4gICAgICBtYXAoKHsgY2FydCB9KSA9PiAoY2FydCA/IGNhcnQgOiB7fSkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRldGVjdFVzZXJDaGFuZ2UoKSB7XG4gICAgLy8gQW55IGNoYW5nZXMgb2YgdXNlcklkIGlzIGludGVyZXN0aW5nIGZvciB1cywgYmVjYXVzZSB3ZSBoYXZlIHRvIG1lcmdlL2xvYWQvc3dpdGNoIGNhcnQgaW4gdGhvc2UgY2FzZXMuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgIC5nZXRVc2VySWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBXZSBuZXZlciB0cmlnZ2VyIGNhcnQgbWVyZ2UvbG9hZCBvbiBhcHAgaW5pdGlhbGl6YXRpb24gaGVyZSBhbmQgdGhhdCdzIHdoeSB3ZSB3YWl0IHdpdGggcGFpcndpc2UgZm9yIGEgY2hhbmdlIG9mIHVzZXJJZC5cbiAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgIC8vIFdlIG5lZWQgY2FydElkIG9uY2Ugd2UgaGF2ZSB0aGUgcHJldmlvdXMgYW5kIGN1cnJlbnQgdXNlcklkLiBXZSBkb24ndCB3YW50IHRvIHN1YnNjcmliZSB0byBjYXJ0SWQgc3RyZWFtIGJlZm9yZS5cbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRJZCQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoW1twcmV2aW91c1VzZXJJZCwgdXNlcklkXSwgY2FydElkXSkgPT4ge1xuICAgICAgICAgIC8vIE9ubHkgY2hhbmdlIG9mIHVzZXIgYW5kIG5vdCBsb2dvdXQgKGN1cnJlbnQgdXNlcklkICE9PSBhbm9ueW1vdXMpIHNob3VsZCB0cmlnZ2VyIGxvYWRpbmcgbWVjaGFuaXNtXG4gICAgICAgICAgaWYgKGlzSnVzdExvZ2dlZEluKHVzZXJJZCwgcHJldmlvdXNVc2VySWQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRPck1lcmdlKGNhcnRJZCwgdXNlcklkLCBwcmV2aW91c1VzZXJJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBEZXRlY3QgdXNlciBsb2dnZWQgaW4gd2l0aCBjb2RlIGZsb3cuXG4gICAgaWYgKHRoaXMuaXNMb2dnZWRJbldpdGhDb2RlRmxvdygpKSB7XG4gICAgICAvLyBQcmV2ZW50IGxvYWRpbmcgY2FydCB3aGlsZSBtZXJnaW5nLlxuICAgICAgdGhpcy5zaG91bGRMb2FkQ2FydE9uQ29kZUZsb3cgPSBmYWxzZTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRJZCQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKFt1c2VySWQsIGNhcnRJZF0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZE9yTWVyZ2UoY2FydElkLCB1c2VySWQsIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyk7XG4gICAgICAgICAgICB0aGlzLndpblJlZj8ubG9jYWxTdG9yYWdlPy5yZW1vdmVJdGVtKE9BVVRIX1JFRElSRUNUX0ZMT1dfS0VZKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhY3RpdmUgY2FydFxuICAgKi9cbiAgZ2V0QWN0aXZlKCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhaXRzIGZvciB0aGUgY2FydCB0byBiZSBzdGFibGUgYmVmb3JlIHJldHVybmluZyB0aGUgYWN0aXZlIGNhcnQuXG4gICAqL1xuICB0YWtlQWN0aXZlKCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmlzU3RhYmxlKCkucGlwZShcbiAgICAgIGZpbHRlcigoaXNTdGFibGUpID0+IGlzU3RhYmxlKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdldEFjdGl2ZSgpKSxcbiAgICAgIGZpbHRlcigoY2FydCkgPT4gISFjYXJ0KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWN0aXZlIGNhcnQgaWRcbiAgICovXG4gIGdldEFjdGl2ZUNhcnRJZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgbWFwKChbY2FydCwgdXNlcklkXSkgPT4gZ2V0Q2FydElkQnlVc2VySWQoY2FydCwgdXNlcklkKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhcnQgdG8gYmUgc3RhYmxlIGJlZm9yZSByZXR1cm5pbmcgdGhlIGFjdGl2ZSBjYXJ0J3MgSUQuXG4gICAqL1xuICB0YWtlQWN0aXZlQ2FydElkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTdGFibGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChpc1N0YWJsZSkgPT4gaXNTdGFibGUpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuZ2V0QWN0aXZlQ2FydElkKCkpLFxuICAgICAgZmlsdGVyKChjYXJ0SWQpID0+ICEhY2FydElkKSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyaWVzXG4gICAqL1xuICBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydElkJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjYXJ0SWQpID0+IHRoaXMubXVsdGlDYXJ0RmFjYWRlLmdldEVudHJpZXMoY2FydElkKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxhc3QgY2FydCBlbnRyeSBmb3IgcHJvdmlkZWQgcHJvZHVjdCBjb2RlLlxuICAgKiBOZWVkZWQgdG8gY292ZXIgcHJvY2Vzc2VzIHdoZXJlIG11bHRpcGxlIGVudHJpZXMgY2FuIHNoYXJlIHRoZSBzYW1lIHByb2R1Y3QgY29kZVxuICAgKiAoZS5nLiBwcm9tb3Rpb25zIG9yIGNvbmZpZ3VyYWJsZSBwcm9kdWN0cylcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBnZXRMYXN0RW50cnkocHJvZHVjdENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8T3JkZXJFbnRyeSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PlxuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5nZXRMYXN0RW50cnkoY2FydElkLCBwcm9kdWN0Q29kZSlcbiAgICAgICksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0RW50aXR5JC5waXBlKFxuICAgICAgbWFwKChjYXJ0RW50aXR5KSA9PiBCb29sZWFuKGNhcnRFbnRpdHkubG9hZGluZykpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gY2FydCBpcyBzdGFibGUgKG5vdCBsb2FkaW5nIGFuZCBub3QgcGVuZGluZyBwcm9jZXNzZXMgb24gY2FydClcbiAgICovXG4gIGlzU3RhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PiB0aGlzLm11bHRpQ2FydEZhY2FkZS5pc1N0YWJsZShjYXJ0SWQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgY2FydCBpbiBldmVyeSBjYXNlIGV4Y2VwdCBhbm9ueW1vdXMgdXNlciBhbmQgY3VycmVudCBjYXJ0IGNvbWJpbmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9hZChjYXJ0SWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoISh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiBjYXJ0SWQgPT09IE9DQ19DQVJUX0lEX0NVUlJFTlQpKSB7XG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgY2FydCB1cG9uIGxvZ2luLCB3aGVuZXZlciB0aGVyZSdzIGFuIGV4aXN0aW5nIGNhcnQsIG1lcmdlIGl0IGludG8gdGhlIGN1cnJlbnQgdXNlciBjYXJ0XG4gICAqIGNhcnRJZCB3aWxsIGJlIGRlZmluZWQgKG5vdCAnJywgbnVsbCwgdW5kZWZpbmVkKVxuICAgKi9cbiAgcHJvdGVjdGVkIGxvYWRPck1lcmdlKFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHByZXZpb3VzVXNlcklkOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2FydElkID09PSBPQ0NfQ0FSVF9JRF9DVVJSRU5UIHx8XG4gICAgICAvLyBJdCBjb3ZlcnMgdGhlIGNhc2Ugd2hlbiB5b3UgYXJlIGxvZ2dlZCBpbiBhbmQgdGhlbiBhc20gdXNlciBsb2dpbiwgeW91IGRvbid0IHdhbnQgdG8gbWVyZ2UsIGJ1dCBvbmx5IGxvYWQgZW11bGF0ZWQgdXNlciBjYXJ0XG4gICAgICAvLyBTaW1pbGFybHkgd2hlbiB5b3UgYXJlIGxvZ2dlZCBpbiBhcyBhc20gdXNlciBhbmQgeW91IGxvZ291dCBhbmQgd2FudCB0byByZXN1bWUgcHJldmlvdXMgdXNlciBzZXNzaW9uXG4gICAgICBwcmV2aW91c1VzZXJJZCAhPT0gT0NDX1VTRVJfSURfQU5PTllNT1VTXG4gICAgKSB7XG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKEJvb2xlYW4oZ2V0TGFzdFZhbHVlU3luYyh0aGlzLmlzR3Vlc3RDYXJ0KCkpKSkge1xuICAgICAgdGhpcy5ndWVzdENhcnRNZXJnZShjYXJ0SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBoYXZlIHBhcnRpY3VsYXIgY2FydCBsb2NhbGx5LCBidXQgd2UgbG9nZ2VkIGluLCBzbyB3ZSBuZWVkIHRvIGNvbWJpbmUgdGhpcyB3aXRoIGN1cnJlbnQgY2FydCBvciBtYWtlIGl0IG91cnMuXG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5tZXJnZVRvQ3VycmVudENhcnQoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogUmVtb3ZlIG9uY2UgYmFja2VuZCBpcyB1cGRhdGVkXG4gIC8qKlxuICAgKiBUZW1wb3JhcnkgbWV0aG9kIHRvIG1lcmdlIGd1ZXN0IGNhcnQgd2l0aCB1c2VyIGNhcnQgYmVjYXVzZSBvZiBiYWNrZW5kIGxpbWl0YXRpb25cbiAgICogVGhpcyBpcyBmb3IgYW4gZWRnZSBjYXNlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ3Vlc3RDYXJ0TWVyZ2UoY2FydElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmdldEVudHJpZXMoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGVudHJpZXMpID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuZGVsZXRlQ2FydChjYXJ0SWQsIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyk7XG4gICAgICAgIHRoaXMuYWRkRW50cmllc0d1ZXN0TWVyZ2UoZW50cmllcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGVudHJpZXMgZnJvbSBndWVzdCBjYXJ0IHRvIHVzZXIgY2FydFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZEVudHJpZXNHdWVzdE1lcmdlKGNhcnRFbnRyaWVzOiBPcmRlckVudHJ5W10pIHtcbiAgICBjb25zdCBlbnRyaWVzVG9BZGQgPSBjYXJ0RW50cmllcy5tYXAoKGVudHJ5KSA9PiAoe1xuICAgICAgcHJvZHVjdENvZGU6IGVudHJ5LnByb2R1Y3Q/LmNvZGUgPz8gJycsXG4gICAgICBxdWFudGl0eTogZW50cnkucXVhbnRpdHkgPz8gMCxcbiAgICB9KSk7XG4gICAgdGhpcy5yZXF1aXJlTG9hZGVkQ2FydCh0cnVlKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmFkZEVudHJpZXMoXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGdldENhcnRJZEJ5VXNlcklkKGNhcnQsIHVzZXJJZCksXG4gICAgICAgICAgZW50cmllc1RvQWRkXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NhcnRDcmVhdGluZyhcbiAgICBjYXJ0U3RhdGU6IFN0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q2FydCB8IHVuZGVmaW5lZD4sXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKSB7XG4gICAgLy8gY2FydCBjcmVhdGluZyBpcyBhbHdheXMgcmVwcmVzZW50ZWQgd2l0aCBsb2FkaW5nIGZsYWdzXG4gICAgLy8gd2hlbiBhbGwgbG9hZGluZyBmbGFncyBhcmUgZmFsc2UgaXQgbWVhbnMgdGhhdCB3ZSByZXN0b3JlZCB3cm9uZyBjYXJ0IGlkXG4gICAgLy8gY291bGQgaGFwcGVuIG9uIGNvbnRleHQgY2hhbmdlIG9yIHJlbG9hZCByaWdodCBpbiB0aGUgbWlkZGxlIG9uIGNhcnQgY3JlYXRlIGNhbGxcbiAgICByZXR1cm4gKFxuICAgICAgaXNUZW1wQ2FydElkKGNhcnRJZCkgJiZcbiAgICAgIChjYXJ0U3RhdGUubG9hZGluZyB8fCBjYXJ0U3RhdGUuc3VjY2VzcyB8fCBjYXJ0U3RhdGUuZXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB1c2VyIGlzIGp1c3QgbG9nZ2VkIGluIHdpdGggY29kZSBmbG93XG4gICAqL1xuICBwcm90ZWN0ZWQgaXNMb2dnZWRJbldpdGhDb2RlRmxvdygpIHtcbiAgICByZXR1cm4gISF0aGlzLndpblJlZj8ubG9jYWxTdG9yYWdlPy5nZXRJdGVtKE9BVVRIX1JFRElSRUNUX0ZMT1dfS0VZKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIGZ1bmN0aW9uIGByZXF1aXJlTG9hZGVkQ2FydGAgaXMgZmlyc3QgY2FsbGVkLCB0aGUgaW5pdCBjYXJ0IGxvYWRpbmcgZm9yIGxvZ2luIHVzZXIgbWF5IG5vdCBiZSBkb25lXG4gIHByaXZhdGUgY2hlY2tJbml0TG9hZDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICByZXF1aXJlTG9hZGVkQ2FydChmb3JHdWVzdE1lcmdlID0gZmFsc2UpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICB0aGlzLmNoZWNrSW5pdExvYWQgPSB0aGlzLmNoZWNrSW5pdExvYWQgPT09IHVuZGVmaW5lZDtcblxuICAgIC8vIEZvciBndWVzdCBjYXJ0IG1lcmdlIHdlIHdhbnQgdG8gZmlsdGVyIGd1ZXN0IGNhcnQgaW4gdGhlIHdob2xlIHN0cmVhbVxuICAgIC8vIFdlIGhhdmUgdG8gd2FpdCB3aXRoIGxvYWQvY3JlYXRlL2FkZEVudHJ5IGFmdGVyIGd1ZXN0IGNhcnQgd2lsbCBiZSBkZWxldGVkLlxuICAgIGNvbnN0IGNhcnRTZWxlY3RvciQgPSAoXG4gICAgICBmb3JHdWVzdE1lcmdlXG4gICAgICAgID8gdGhpcy5jYXJ0RW50aXR5JC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICFCb29sZWFuKGdldExhc3RWYWx1ZVN5bmModGhpcy5pc0d1ZXN0Q2FydCgpKSkpXG4gICAgICAgICAgKVxuICAgICAgICA6IHRoaXMuY2FydEVudGl0eSRcbiAgICApLnBpcGUoZmlsdGVyKChjYXJ0U3RhdGUpID0+ICFjYXJ0U3RhdGUubG9hZGluZyB8fCAhIXRoaXMuY2hlY2tJbml0TG9hZCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydElkJFxuICAgICAgLnBpcGUoXG4gICAgICAgIC8vIEF2b2lkIGxvYWQvY3JlYXRlIGNhbGwgd2hlbiB0aGVyZSBhcmUgbmV3IGNhcnQgY3JlYXRpbmcgYXQgdGhlIG1vbWVudFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbShjYXJ0U2VsZWN0b3IkKSxcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgIChbY2FydElkLCBjYXJ0U3RhdGVdKSA9PiAhdGhpcy5pc0NhcnRDcmVhdGluZyhjYXJ0U3RhdGUsIGNhcnRJZClcbiAgICAgICAgKSxcbiAgICAgICAgbWFwKChbLCBjYXJ0U3RhdGVdKSA9PiBjYXJ0U3RhdGUpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgICAgdGFwKChbY2FydFN0YXRlLCB1c2VySWRdKSA9PiB7XG4gICAgICAgICAgLy8gVHJ5IHRvIGxvYWQgdGhlIGNhcnQsIGJlY2F1c2UgaXQgbWlnaHQgaGF2ZSBiZWVuIGNyZWF0ZWQgb24gYW5vdGhlciBkZXZpY2UgYmV0d2VlbiBvdXIgbG9naW4gYW5kIGFkZCBlbnRyeSBjYWxsXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXNFbXB0eShjYXJ0U3RhdGUudmFsdWUpICYmXG4gICAgICAgICAgICB1c2VySWQgIT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJlxuICAgICAgICAgICAgIWNhcnRTdGF0ZS5sb2FkaW5nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQoT0NDX0NBUlRfSURfQ1VSUkVOVCwgdXNlcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jaGVja0luaXRMb2FkID0gZmFsc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gY2FydFNlbGVjdG9yJCksXG4gICAgICAgIC8vIGNyZWF0ZSBjYXJ0IGNhbiBoYXBwZW4gdG8gYW5vbnltb3VzIHVzZXIgaWYgaXQgaXMgZW1wdHkgb3IgdG8gYW55IG90aGVyIHVzZXIgaWYgaXQgaXMgbG9hZGVkIGFuZCBlbXB0eVxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgICBmaWx0ZXIoKFtjYXJ0U3RhdGUsIHVzZXJJZF0pID0+XG4gICAgICAgICAgQm9vbGVhbihcbiAgICAgICAgICAgIHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTIHx8XG4gICAgICAgICAgICAgIGNhcnRTdGF0ZS5zdWNjZXNzIHx8XG4gICAgICAgICAgICAgIGNhcnRTdGF0ZS5lcnJvclxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoW2NhcnRTdGF0ZSwgdXNlcklkXSkgPT4ge1xuICAgICAgICAgIGlmIChpc0VtcHR5KGNhcnRTdGF0ZS52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmNyZWF0ZUNhcnQoe1xuICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgIGV4dHJhRGF0YToge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBjYXJ0U2VsZWN0b3IkKSxcbiAgICAgICAgZmlsdGVyKChjYXJ0U3RhdGUpID0+IEJvb2xlYW4oY2FydFN0YXRlLnN1Y2Nlc3MgfHwgY2FydFN0YXRlLmVycm9yKSksXG4gICAgICAgIC8vIHdhaXQgZm9yIGFjdGl2ZSBjYXJ0IGlkIHRvIHBvaW50IHRvIGNvZGUvZ3VpZCB0byBhdm9pZCBzb21lIHdvcmsgb24gdGVtcCBjYXJ0IGVudGl0eVxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRJZCQpLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKFtjYXJ0U3RhdGUsIGNhcnRJZF0pID0+ICF0aGlzLmlzQ2FydENyZWF0aW5nKGNhcnRTdGF0ZSwgY2FydElkKVxuICAgICAgICApLFxuICAgICAgICBtYXAoKFtjYXJ0U3RhdGVdKSA9PiBjYXJ0U3RhdGUudmFsdWUpLFxuICAgICAgICBmaWx0ZXIoKGNhcnQpOiBjYXJ0IGlzIENhcnQgPT4gIWlzRW1wdHkoY2FydCkpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBlbnRyeSB0byBhY3RpdmUgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICogQHBhcmFtIHF1YW50aXR5XG4gICAqIEBwYXJhbSBwaWNrdXBTdG9yZVxuICAgKi9cbiAgYWRkRW50cnkocHJvZHVjdENvZGU6IHN0cmluZywgcXVhbnRpdHk6IG51bWJlciwgcGlja3VwU3RvcmU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVpcmVMb2FkZWRDYXJ0KClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKSkpXG4gICAgICAuc3Vic2NyaWJlKChbY2FydCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5hZGRFbnRyeShcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgZ2V0Q2FydElkQnlVc2VySWQoY2FydCwgdXNlcklkKSxcbiAgICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICBwaWNrdXBTdG9yZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVxuICAgKi9cbiAgcmVtb3ZlRW50cnkoZW50cnk6IE9yZGVyRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUNhcnRJZCRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKSksIHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChbY2FydElkLCB1c2VySWRdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLnJlbW92ZUVudHJ5KFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgZW50cnkuZW50cnlOdW1iZXIgYXMgbnVtYmVyXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5TnVtYmVyXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKiBAcGFyYW0gcGlja3VwU3RvcmVcbiAgICogQHBhcmFtIHBpY2t1cFRvRGVsaXZlcnlcbiAgICovXG4gIHVwZGF0ZUVudHJ5KFxuICAgIGVudHJ5TnVtYmVyOiBudW1iZXIsXG4gICAgcXVhbnRpdHk/OiBudW1iZXIsXG4gICAgcGlja3VwU3RvcmU/OiBzdHJpbmcsXG4gICAgcGlja3VwVG9EZWxpdmVyeTogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydElkJFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSwgdGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUudXBkYXRlRW50cnkoXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICBlbnRyeU51bWJlcixcbiAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICBwaWNrdXBTdG9yZSxcbiAgICAgICAgICBwaWNrdXBUb0RlbGl2ZXJ5XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBnZXRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydElkJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjYXJ0SWQpID0+IHRoaXMubXVsdGlDYXJ0RmFjYWRlLmdldEVudHJ5KGNhcnRJZCwgcHJvZHVjdENvZGUpKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbiBlbWFpbCB0byBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKi9cbiAgYWRkRW1haWwoZW1haWw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydElkJFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSwgdGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuYXNzaWduRW1haWwoY2FydElkLCB1c2VySWQsIGVtYWlsKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhc3NpZ25lZCB1c2VyIHRvIGNhcnRcbiAgICovXG4gIGdldEFzc2lnbmVkVXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0JC5waXBlKG1hcCgoY2FydCkgPT4gY2FydC51c2VyIGFzIFVzZXIpKTtcbiAgfVxuXG4gIC8vIFRPRE86IE1ha2UgY2FydCByZXF1aXJlZCBwYXJhbSBpbiA0LjBcbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSBvZiB0cnVlIGZvciBndWVzdCBjYXJ0XG4gICAqL1xuICBpc0d1ZXN0Q2FydChjYXJ0PzogQ2FydCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjYXJ0XG4gICAgICA/IG9mKHRoaXMuaXNDYXJ0VXNlckd1ZXN0KGNhcnQpKVxuICAgICAgOiB0aGlzLmFjdGl2ZUNhcnQkLnBpcGUoXG4gICAgICAgICAgbWFwKChhY3RpdmVDYXJ0KSA9PiB0aGlzLmlzQ2FydFVzZXJHdWVzdChhY3RpdmVDYXJ0KSksXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ2FydFVzZXJHdWVzdChjYXJ0OiBDYXJ0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2FydFVzZXIgPSBjYXJ0LnVzZXI7XG4gICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICBjYXJ0VXNlciAmJlxuICAgICAgICAoY2FydFVzZXIubmFtZSA9PT0gT0NDX1VTRVJfSURfR1VFU1QgfHxcbiAgICAgICAgICBpc0VtYWlsKGNhcnRVc2VyLnVpZD8uc3BsaXQoJ3wnKS5zbGljZSgxKS5qb2luKCd8JykpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG11bHRpcGxlIGVudHJpZXMgdG8gYSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0RW50cmllcyA6IGxpc3Qgb2YgZW50cmllcyB0byBhZGQgKE9yZGVyRW50cnlbXSlcbiAgICovXG4gIGFkZEVudHJpZXMoY2FydEVudHJpZXM6IE9yZGVyRW50cnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IGVudHJpZXNUb0FkZCA9IGNhcnRFbnRyaWVzLm1hcCgoZW50cnkpID0+ICh7XG4gICAgICBwcm9kdWN0Q29kZTogZW50cnkucHJvZHVjdD8uY29kZSA/PyAnJyxcbiAgICAgIHF1YW50aXR5OiBlbnRyeS5xdWFudGl0eSA/PyAwLFxuICAgIH0pKTtcbiAgICB0aGlzLnJlcXVpcmVMb2FkZWRDYXJ0KClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKSkpXG4gICAgICAuc3Vic2NyaWJlKChbY2FydCwgdXNlcklkXSkgPT4ge1xuICAgICAgICBpZiAoY2FydCkge1xuICAgICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmFkZEVudHJpZXMoXG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBnZXRDYXJ0SWRCeVVzZXJJZChjYXJ0LCB1c2VySWQpLFxuICAgICAgICAgICAgZW50cmllc1RvQWRkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2FkcyBhY3RpdmUgY2FydFxuICAgKi9cbiAgcmVsb2FkQWN0aXZlQ2FydCgpIHtcbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLmdldEFjdGl2ZUNhcnRJZCgpLCB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpXSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBtYXAoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBleHRyYURhdGE6IHsgYWN0aXZlOiB0cnVlIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBoYXNQaWNrdXBJdGVtcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmUoKS5waXBlKFxuICAgICAgbWFwKChjYXJ0KSA9PlxuICAgICAgICBjYXJ0LnBpY2t1cEl0ZW1zUXVhbnRpdHkgPyBjYXJ0LnBpY2t1cEl0ZW1zUXVhbnRpdHkgPiAwIDogZmFsc2VcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgaGFzRGVsaXZlcnlJdGVtcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmUoKS5waXBlKFxuICAgICAgbWFwKChjYXJ0KSA9PlxuICAgICAgICBjYXJ0LmRlbGl2ZXJ5SXRlbXNRdWFudGl0eSA/IGNhcnQuZGVsaXZlcnlJdGVtc1F1YW50aXR5ID4gMCA6IGZhbHNlXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldFBpY2t1cEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbnRyaWVzKCkucGlwZShcbiAgICAgIG1hcCgoZW50cmllcykgPT5cbiAgICAgICAgZW50cmllcy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5kZWxpdmVyeVBvaW50T2ZTZXJ2aWNlICE9PSB1bmRlZmluZWQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldERlbGl2ZXJ5RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldEVudHJpZXMoKS5waXBlKFxuICAgICAgbWFwKChlbnRyaWVzKSA9PlxuICAgICAgICBlbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LmRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2UgPT09IHVuZGVmaW5lZClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19