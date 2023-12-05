/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { isSelectiveCart } from '@spartacus/cart/base/core';
import { DeleteCartEvent as DeleteSavedCartEvent, } from '@spartacus/cart/base/root';
import { ProcessSelectors, } from '@spartacus/core';
import { combineLatest, EMPTY, queueScheduler } from 'rxjs';
import { distinctUntilChanged, filter, map, observeOn, shareReplay, startWith, tap, withLatestFrom, } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import { SAVED_CART_CLONE_CART_PROCESS_ID, SAVED_CART_LIST_PROCESS_ID, SAVED_CART_RESTORE_CART_PROCESS_ID, SAVED_CART_SAVE_CART_PROCESS_ID, } from '../store/saved-cart-constants';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/user/account/root";
import * as i4 from "@spartacus/cart/base/root";
export class SavedCartService {
    constructor(store, userIdService, userAccountFacade, multiCartService, eventService) {
        this.store = store;
        this.userIdService = userIdService;
        this.userAccountFacade = userAccountFacade;
        this.multiCartService = multiCartService;
        this.eventService = eventService;
    }
    /**
     * Loads a single saved cart
     */
    loadSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.LoadSavedCart({ userId, cartId }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets a single saved cart
     * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
     *
     * @param cartId
     * @returns observable with cart
     */
    get(cartId) {
        return this.getSavedCart(cartId).pipe(observeOn(queueScheduler), withLatestFrom(this.eventService.get(DeleteSavedCartEvent).pipe(startWith({}))), filter(([state, _event]) => !!state), tap(([state, event]) => {
            if (Object.keys(event).length > 0) {
                return EMPTY;
            }
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCart(cartId);
            }
        }), filter(([state]) => state.success || !!state.error), map(([state]) => state.value));
    }
    /**
     * Gets the selected cart state
     *
     * @param cartId
     * @returns observable of selected cart with loader state
     */
    getSavedCart(cartId) {
        return this.multiCartService.getCartEntity(cartId);
    }
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId) {
        return this.multiCartService.isStable(cartId);
    }
    /**
     * Loads a list of saved carts
     */
    loadSavedCarts() {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.LoadSavedCarts({ userId }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets a list of saved carts
     *
     * @returns observable with list of saved carts
     */
    getList() {
        return this.getSavedCartList().pipe(withLatestFrom(this.getSavedCartListProcess()), tap(([_, state]) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCarts();
            }
        }), map(([savedCartList, _]) => savedCartList), shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Gets a list of saved carts from all carts in the state
     * by filtering through the carts that are not wishlist and not saved cart
     *
     * @returns observable with list of saved carts
     */
    getSavedCartList() {
        return combineLatest([
            this.multiCartService.getCarts(),
            this.userAccountFacade.get(),
        ]).pipe(distinctUntilChanged(), map(([carts, user]) => carts.filter((cart) => (user?.customerId !== undefined
            ? cart?.name !== `wishlist${user?.customerId}`
            : true) &&
            !isSelectiveCart(cart?.code) &&
            cart?.saveTime)));
    }
    /**
     * Gets the loading flag of getting a list of saved carts
     *
     * @returns observable with boolean of the loading state
     */
    getSavedCartListProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Gets the loading state of getting a list of saved carts
     *
     * @returns observable with boolean of the loader state
     */
    getSavedCartListProcess() {
        return this.store.pipe(select(ProcessSelectors.getProcessStateFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a saved cart
     */
    clearSavedCarts() {
        this.store.dispatch(new SavedCartActions.ClearSavedCarts());
    }
    /**
     * Triggers a restore saved cart
     *
     * @param cartId
     */
    restoreSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.RestoreSavedCart({
                    userId,
                    cartId,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of restoring saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getRestoreSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of restoring saved cart
     *
     * @returns observable with boolean of the success state
     */
    getRestoreSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of restoring saved cart
     *
     * @returns observable with boolean of the error state
     */
    getRestoreSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a restore saved cart
     */
    clearRestoreSavedCart() {
        this.store.dispatch(new SavedCartActions.ClearRestoreSavedCart());
    }
    /**
     * Triggers delete saved cart
     * @param cartId
     */
    deleteSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.multiCartService.deleteCart(cartId, userId);
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Triggers a saved cart
     *
     */
    saveCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.SaveCart({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of saving a cart
     *
     * @returns observable with boolean of the loading state
     */
    getSaveCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of saving a cart
     *
     * @returns observable with boolean of the success state
     */
    getSaveCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of saving a cart
     *
     * @returns observable with boolean of the error state
     */
    getSaveCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a save cart
     */
    clearSaveCart() {
        this.store.dispatch(new SavedCartActions.ClearSaveCart());
    }
    /**
     * Triggers an edit saved cart
     *
     */
    editSavedCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.EditSavedCart({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Triggers a clone saved cart
     *
     * @param cartId
     */
    cloneSavedCart(cartId, saveCartName) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SavedCartActions.CloneSavedCart({ userId, cartId, saveCartName }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of cloning a saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getCloneSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of cloning a saved cart
     *
     * @returns observable with boolean of the success state
     */
    getCloneSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of cloning a saved cart
     *
     * @returns observable with boolean of the error state
     */
    getCloneSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of cloning a saved cart
     */
    clearCloneSavedCart() {
        this.store.dispatch(new SavedCartActions.ClearCloneSavedCart());
    }
}
SavedCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3.UserAccountFacade }, { token: i4.MultiCartFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3.UserAccountFacade }, { type: i4.MultiCartFacade }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb3JlL2ZhY2FkZS9zYXZlZC1jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFzQixNQUFNLDJCQUEyQixDQUFDO0FBQ2hGLE9BQU8sRUFFTCxlQUFlLElBQUksb0JBQW9CLEdBRXhDLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUVMLGdCQUFnQixHQUlqQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFDTCxnQ0FBZ0MsRUFDaEMsMEJBQTBCLEVBQzFCLGtDQUFrQyxFQUNsQywrQkFBK0IsR0FDaEMsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7O0FBR3ZDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDWSxLQUF5RCxFQUN6RCxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsZ0JBQWlDLEVBQ2pDLFlBQTBCO1FBSjFCLFVBQUssR0FBTCxLQUFLLENBQW9EO1FBQ3pELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIs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LENBQUMsQ0FBQztJQUNsRSxDQUFDOzs2R0FoYlUsZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBpc1NlbGVjdGl2ZUNhcnQsIFN0YXRlV2l0aE11bHRpQ2FydCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FydCxcbiAgRGVsZXRlQ2FydEV2ZW50IGFzIERlbGV0ZVNhdmVkQ2FydEV2ZW50LFxuICBNdWx0aUNhcnRGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQge1xuICBFdmVudFNlcnZpY2UsXG4gIFByb2Nlc3NTZWxlY3RvcnMsXG4gIFN0YXRlVXRpbHMsXG4gIFN0YXRlV2l0aFByb2Nlc3MsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgRU1QVFksIE9ic2VydmFibGUsIHF1ZXVlU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIG9ic2VydmVPbixcbiAgc2hhcmVSZXBsYXksXG4gIHN0YXJ0V2l0aCxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgU0FWRURfQ0FSVF9DTE9ORV9DQVJUX1BST0NFU1NfSUQsXG4gIFNBVkVEX0NBUlRfTElTVF9QUk9DRVNTX0lELFxuICBTQVZFRF9DQVJUX1JFU1RPUkVfQ0FSVF9QUk9DRVNTX0lELFxuICBTQVZFRF9DQVJUX1NBVkVfQ0FSVF9QUk9DRVNTX0lELFxufSBmcm9tICcuLi9zdG9yZS9zYXZlZC1jYXJ0LWNvbnN0YW50cyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTYXZlZENhcnRTZXJ2aWNlIGltcGxlbWVudHMgU2F2ZWRDYXJ0RmFjYWRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxTdGF0ZVdpdGhNdWx0aUNhcnQgfCBTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+PixcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckFjY291bnRGYWNhZGU6IFVzZXJBY2NvdW50RmFjYWRlLFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRTZXJ2aWNlOiBNdWx0aUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogTG9hZHMgYSBzaW5nbGUgc2F2ZWQgY2FydFxuICAgKi9cbiAgbG9hZFNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBTYXZlZENhcnRBY3Rpb25zLkxvYWRTYXZlZENhcnQoeyB1c2VySWQsIGNhcnRJZCB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBzaW5nbGUgc2F2ZWQgY2FydFxuICAgKiBpdCB3b24ndCBlbWl0IGlmIHRoZSBkZWxldGUgc2F2ZWQgY2FydCBldmVudCBnZXRzIHRyaWdnZXJlZCB0byBhdm9pZCByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIGFjdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggY2FydFxuICAgKi9cbiAgZ2V0KGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxDYXJ0IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2F2ZWRDYXJ0KGNhcnRJZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlciksXG4gICAgICB3aXRoTGF0ZXN0RnJvbShcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KERlbGV0ZVNhdmVkQ2FydEV2ZW50KS5waXBlKHN0YXJ0V2l0aCh7fSkpXG4gICAgICApLFxuICAgICAgZmlsdGVyKChbc3RhdGUsIF9ldmVudF0pID0+ICEhc3RhdGUpLFxuICAgICAgdGFwKChbc3RhdGUsIGV2ZW50XSkgPT4ge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZXZlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShzdGF0ZS5sb2FkaW5nIHx8IHN0YXRlLnN1Y2Nlc3MgfHwgc3RhdGUuZXJyb3IpKSB7XG4gICAgICAgICAgdGhpcy5sb2FkU2F2ZWRDYXJ0KGNhcnRJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKChbc3RhdGVdKSA9PiBzdGF0ZS5zdWNjZXNzIHx8ICEhc3RhdGUuZXJyb3IpLFxuICAgICAgbWFwKChbc3RhdGVdKSA9PiBzdGF0ZS52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlbGVjdGVkIGNhcnQgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIG9mIHNlbGVjdGVkIGNhcnQgd2l0aCBsb2FkZXIgc3RhdGVcbiAgICovXG4gIGdldFNhdmVkQ2FydChcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q2FydCB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUNhcnRTZXJ2aWNlLmdldENhcnRFbnRpdHkoY2FydElkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiB0aGVyZSBhcmUgbm8gb3BlcmF0aW9ucyBvbiB0aGF0IGluIHByb2dyZXNzIGFuZCBpdCBpcyBub3QgY3VycmVudGx5IGxvYWRpbmdcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgaXNTdGFibGUoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUNhcnRTZXJ2aWNlLmlzU3RhYmxlKGNhcnRJZCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBsb2FkU2F2ZWRDYXJ0cygpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCh0cnVlKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKHVzZXJJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5Mb2FkU2F2ZWRDYXJ0cyh7IHVzZXJJZCB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBnZXRMaXN0KCk6IE9ic2VydmFibGU8Q2FydFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2F2ZWRDYXJ0TGlzdCgpLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldFNhdmVkQ2FydExpc3RQcm9jZXNzKCkpLFxuICAgICAgdGFwKChbXywgc3RhdGVdKSA9PiB7XG4gICAgICAgIGlmICghKHN0YXRlLmxvYWRpbmcgfHwgc3RhdGUuc3VjY2VzcyB8fCBzdGF0ZS5lcnJvcikpIHtcbiAgICAgICAgICB0aGlzLmxvYWRTYXZlZENhcnRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKChbc2F2ZWRDYXJ0TGlzdCwgX10pID0+IHNhdmVkQ2FydExpc3QpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2Ygc2F2ZWQgY2FydHMgZnJvbSBhbGwgY2FydHMgaW4gdGhlIHN0YXRlXG4gICAqIGJ5IGZpbHRlcmluZyB0aHJvdWdoIHRoZSBjYXJ0cyB0aGF0IGFyZSBub3Qgd2lzaGxpc3QgYW5kIG5vdCBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBnZXRTYXZlZENhcnRMaXN0KCk6IE9ic2VydmFibGU8Q2FydFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5tdWx0aUNhcnRTZXJ2aWNlLmdldENhcnRzKCksXG4gICAgICB0aGlzLnVzZXJBY2NvdW50RmFjYWRlLmdldCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgbWFwKChbY2FydHMsIHVzZXJdKSA9PlxuICAgICAgICBjYXJ0cy5maWx0ZXIoXG4gICAgICAgICAgKGNhcnQpID0+XG4gICAgICAgICAgICAodXNlcj8uY3VzdG9tZXJJZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gY2FydD8ubmFtZSAhPT0gYHdpc2hsaXN0JHt1c2VyPy5jdXN0b21lcklkfWBcbiAgICAgICAgICAgICAgOiB0cnVlKSAmJlxuICAgICAgICAgICAgIWlzU2VsZWN0aXZlQ2FydChjYXJ0Py5jb2RlKSAmJlxuICAgICAgICAgICAgY2FydD8uc2F2ZVRpbWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBmbGFnIG9mIGdldHRpbmcgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBnZXRTYXZlZENhcnRMaXN0UHJvY2Vzc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnkoU0FWRURfQ0FSVF9MSVNUX1BST0NFU1NfSUQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsb2FkaW5nIHN0YXRlIG9mIGdldHRpbmcgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBsb2FkZXIgc3RhdGVcbiAgICovXG4gIGdldFNhdmVkQ2FydExpc3RQcm9jZXNzKCk6IE9ic2VydmFibGU8U3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxhbnk+PiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzU3RhdGVGYWN0b3J5KFNBVkVEX0NBUlRfTElTVF9QUk9DRVNTX0lEKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBwcm9jZXNzIHN0YXRlIG9mIHBlcmZvcm1pbmcgYSBzYXZlZCBjYXJ0XG4gICAqL1xuICBjbGVhclNhdmVkQ2FydHMoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5DbGVhclNhdmVkQ2FydHMoKSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSByZXN0b3JlIHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgcmVzdG9yZVNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBTYXZlZENhcnRBY3Rpb25zLlJlc3RvcmVTYXZlZENhcnQoe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiByZXN0b3Jpbmcgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0UmVzdG9yZVNhdmVkQ2FydFByb2Nlc3NMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc0xvYWRpbmdGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfUkVTVE9SRV9DQVJUX1BST0NFU1NfSURcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc3VjY2VzcyBzdGF0ZSBvZiByZXN0b3Jpbmcgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgc3VjY2VzcyBzdGF0ZVxuICAgKi9cbiAgZ2V0UmVzdG9yZVNhdmVkQ2FydFByb2Nlc3NTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfUkVTVE9SRV9DQVJUX1BST0NFU1NfSURcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZXJyb3Igc3RhdGUgb2YgcmVzdG9yaW5nIHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGVycm9yIHN0YXRlXG4gICAqL1xuICBnZXRSZXN0b3JlU2F2ZWRDYXJ0UHJvY2Vzc0Vycm9yKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc0Vycm9yRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX1JFU1RPUkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcHJvY2VzcyBzdGF0ZSBvZiBwZXJmb3JtaW5nIGEgcmVzdG9yZSBzYXZlZCBjYXJ0XG4gICAqL1xuICBjbGVhclJlc3RvcmVTYXZlZENhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5DbGVhclJlc3RvcmVTYXZlZENhcnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgZGVsZXRlIHNhdmVkIGNhcnRcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgZGVsZXRlU2F2ZWRDYXJ0KGNhcnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlDYXJ0U2VydmljZS5kZWxldGVDYXJ0KGNhcnRJZCwgdXNlcklkKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHNhdmVkIGNhcnRcbiAgICpcbiAgICovXG4gIHNhdmVDYXJ0KHtcbiAgICBjYXJ0SWQsXG4gICAgc2F2ZUNhcnROYW1lLFxuICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gIH06IHtcbiAgICBjYXJ0SWQ6IHN0cmluZztcbiAgICBzYXZlQ2FydE5hbWU/OiBzdHJpbmc7XG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbj86IHN0cmluZztcbiAgfSk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBTYXZlZENhcnRBY3Rpb25zLlNhdmVDYXJ0KHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgIHNhdmVDYXJ0TmFtZSxcbiAgICAgICAgICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsb2FkaW5nIHN0YXRlIG9mIHNhdmluZyBhIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGxvYWRpbmcgc3RhdGVcbiAgICovXG4gIGdldFNhdmVDYXJ0UHJvY2Vzc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnkoXG4gICAgICAgICAgU0FWRURfQ0FSVF9TQVZFX0NBUlRfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzdWNjZXNzIHN0YXRlIG9mIHNhdmluZyBhIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIHN1Y2Nlc3Mgc3RhdGVcbiAgICovXG4gIGdldFNhdmVDYXJ0UHJvY2Vzc1N1Y2Nlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzU3VjY2Vzc0ZhY3RvcnkoXG4gICAgICAgICAgU0FWRURfQ0FSVF9TQVZFX0NBUlRfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBlcnJvciBzdGF0ZSBvZiBzYXZpbmcgYSBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgZ2V0U2F2ZUNhcnRQcm9jZXNzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzRXJyb3JGYWN0b3J5KFNBVkVEX0NBUlRfU0FWRV9DQVJUX1BST0NFU1NfSUQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHByb2Nlc3Mgc3RhdGUgb2YgcGVyZm9ybWluZyBhIHNhdmUgY2FydFxuICAgKi9cbiAgY2xlYXJTYXZlQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTYXZlZENhcnRBY3Rpb25zLkNsZWFyU2F2ZUNhcnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYW4gZWRpdCBzYXZlZCBjYXJ0XG4gICAqXG4gICAqL1xuICBlZGl0U2F2ZWRDYXJ0KHtcbiAgICBjYXJ0SWQsXG4gICAgc2F2ZUNhcnROYW1lLFxuICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gIH06IHtcbiAgICBjYXJ0SWQ6IHN0cmluZztcbiAgICBzYXZlQ2FydE5hbWU/OiBzdHJpbmc7XG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbj86IHN0cmluZztcbiAgfSk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBTYXZlZENhcnRBY3Rpb25zLkVkaXRTYXZlZENhcnQoe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgc2F2ZUNhcnROYW1lLFxuICAgICAgICAgICAgc2F2ZUNhcnREZXNjcmlwdGlvbixcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgY2xvbmUgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqL1xuICBjbG9uZVNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZywgc2F2ZUNhcnROYW1lPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IFNhdmVkQ2FydEFjdGlvbnMuQ2xvbmVTYXZlZENhcnQoeyB1c2VySWQsIGNhcnRJZCwgc2F2ZUNhcnROYW1lIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiBjbG9uaW5nIGEgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX0NMT05FX0NBUlRfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzdWNjZXNzIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBzdWNjZXNzIHN0YXRlXG4gICAqL1xuICBnZXRDbG9uZVNhdmVkQ2FydFByb2Nlc3NTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfQ0xPTkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzRXJyb3JGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfQ0xPTkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcHJvY2VzcyBzdGF0ZSBvZiBjbG9uaW5nIGEgc2F2ZWQgY2FydFxuICAgKi9cbiAgY2xlYXJDbG9uZVNhdmVkQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTYXZlZENhcnRBY3Rpb25zLkNsZWFyQ2xvbmVTYXZlZENhcnQoKSk7XG4gIH1cbn1cbiJdfQ==