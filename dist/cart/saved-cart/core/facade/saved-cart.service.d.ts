import { Store } from '@ngrx/store';
import { StateWithMultiCart } from '@spartacus/cart/base/core';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { EventService, StateUtils, StateWithProcess, UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SavedCartService implements SavedCartFacade {
    protected store: Store<StateWithMultiCart | StateWithProcess<void>>;
    protected userIdService: UserIdService;
    protected userAccountFacade: UserAccountFacade;
    protected multiCartService: MultiCartFacade;
    protected eventService: EventService;
    constructor(store: Store<StateWithMultiCart | StateWithProcess<void>>, userIdService: UserIdService, userAccountFacade: UserAccountFacade, multiCartService: MultiCartFacade, eventService: EventService);
    /**
     * Loads a single saved cart
     */
    loadSavedCart(cartId: string): void;
    /**
     * Gets a single saved cart
     * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
     *
     * @param cartId
     * @returns observable with cart
     */
    get(cartId: string): Observable<Cart | undefined>;
    /**
     * Gets the selected cart state
     *
     * @param cartId
     * @returns observable of selected cart with loader state
     */
    getSavedCart(cartId: string): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>;
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId: string): Observable<boolean>;
    /**
     * Loads a list of saved carts
     */
    loadSavedCarts(): void;
    /**
     * Gets a list of saved carts
     *
     * @returns observable with list of saved carts
     */
    getList(): Observable<Cart[]>;
    /**
     * Gets a list of saved carts from all carts in the state
     * by filtering through the carts that are not wishlist and not saved cart
     *
     * @returns observable with list of saved carts
     */
    getSavedCartList(): Observable<Cart[]>;
    /**
     * Gets the loading flag of getting a list of saved carts
     *
     * @returns observable with boolean of the loading state
     */
    getSavedCartListProcessLoading(): Observable<boolean>;
    /**
     * Gets the loading state of getting a list of saved carts
     *
     * @returns observable with boolean of the loader state
     */
    getSavedCartListProcess(): Observable<StateUtils.LoaderState<any>>;
    /**
     * Clears the process state of performing a saved cart
     */
    clearSavedCarts(): void;
    /**
     * Triggers a restore saved cart
     *
     * @param cartId
     */
    restoreSavedCart(cartId: string): void;
    /**
     * Gets the loading state of restoring saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getRestoreSavedCartProcessLoading(): Observable<boolean>;
    /**
     * Gets the success state of restoring saved cart
     *
     * @returns observable with boolean of the success state
     */
    getRestoreSavedCartProcessSuccess(): Observable<boolean>;
    /**
     * Gets the error state of restoring saved cart
     *
     * @returns observable with boolean of the error state
     */
    getRestoreSavedCartProcessError(): Observable<boolean>;
    /**
     * Clears the process state of performing a restore saved cart
     */
    clearRestoreSavedCart(): void;
    /**
     * Triggers delete saved cart
     * @param cartId
     */
    deleteSavedCart(cartId: string): void;
    /**
     * Triggers a saved cart
     *
     */
    saveCart({ cartId, saveCartName, saveCartDescription, }: {
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    }): void;
    /**
     * Gets the loading state of saving a cart
     *
     * @returns observable with boolean of the loading state
     */
    getSaveCartProcessLoading(): Observable<boolean>;
    /**
     * Gets the success state of saving a cart
     *
     * @returns observable with boolean of the success state
     */
    getSaveCartProcessSuccess(): Observable<boolean>;
    /**
     * Gets the error state of saving a cart
     *
     * @returns observable with boolean of the error state
     */
    getSaveCartProcessError(): Observable<boolean>;
    /**
     * Clears the process state of performing a save cart
     */
    clearSaveCart(): void;
    /**
     * Triggers an edit saved cart
     *
     */
    editSavedCart({ cartId, saveCartName, saveCartDescription, }: {
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    }): void;
    /**
     * Triggers a clone saved cart
     *
     * @param cartId
     */
    cloneSavedCart(cartId: string, saveCartName?: string): void;
    /**
     * Gets the loading state of cloning a saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getCloneSavedCartProcessLoading(): Observable<boolean>;
    /**
     * Gets the success state of cloning a saved cart
     *
     * @returns observable with boolean of the success state
     */
    getCloneSavedCartProcessSuccess(): Observable<boolean>;
    /**
     * Gets the error state of cloning a saved cart
     *
     * @returns observable with boolean of the error state
     */
    getCloneSavedCartProcessError(): Observable<boolean>;
    /**
     * Clears the process state of cloning a saved cart
     */
    clearCloneSavedCart(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartService>;
}
