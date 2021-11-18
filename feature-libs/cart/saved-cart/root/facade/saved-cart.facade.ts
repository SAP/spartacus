import { Injectable } from '@angular/core';
import { Cart, facadeFactory, StateUtils } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_SAVED_CART_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SavedCartFacade,
      feature: CART_SAVED_CART_CORE_FEATURE,
      methods: [
        'editSavedCart',
        'deleteSavedCart',
        'getSavedCart',
        'getSavedCartList',
        'loadSavedCart',
        'clearCloneSavedCart',
        'clearRestoreSavedCart',
        'clearSaveCart',
        'clearSavedCarts',
        'get',
        'getList',
        'getCloneSavedCartProcessError',
        'getCloneSavedCartProcessLoading',
        'getCloneSavedCartProcessSuccess',
        'getRestoreSavedCartProcessError',
        'getRestoreSavedCartProcessLoading',
        'getRestoreSavedCartProcessSuccess',
        'getSaveCartProcessError',
        'getSaveCartProcessLoading',
        'getSaveCartProcessSuccess',
        'getSavedCartListProcess',
        'getSavedCartListProcessLoading',
        'isStable',
        'cloneSavedCart',
        'loadSavedCarts',
        'restoreSavedCart',
        'saveCart',
      ],
      async: true,
    }),
})
export abstract class SavedCartFacade {
  /**
   * Loads a single saved cart
   */
  abstract loadSavedCart(cartId: string): void;

  /**
   * Gets a single saved cart
   * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
   *
   * @param cartId
   * @returns observable with cart
   */
  abstract get(cartId: string): Observable<Cart | undefined>;

  /**
   * Gets the selected cart state
   *
   * @param cartId
   * @returns observable of selected cart with loader state
   */
  abstract getSavedCart(
    cartId: string
  ): Observable<StateUtils.ProcessesLoaderState<Cart>>;

  /**
   * Returns true when there are no operations on that in progress and it is not currently loading
   *
   * @param cartId
   */
  abstract isStable(cartId: string): Observable<boolean>;

  /**
   * Loads a list of saved carts
   */
  abstract loadSavedCarts(): void;

  /**
   * Gets a list of saved carts
   *
   * @returns observable with list of saved carts
   */
  abstract getList(): Observable<Cart[]>;

  /**
   * Gets a list of saved carts from all carts in the state
   * by filtering through the carts that are not wishlist and not saved cart
   *
   * @returns observable with list of saved carts
   */
  abstract getSavedCartList(): Observable<Cart[]>;

  /**
   * Gets the loading flag of getting a list of saved carts
   *
   * @returns observable with boolean of the loading state
   */
  abstract getSavedCartListProcessLoading(): Observable<boolean>;

  /**
   * Gets the loading state of getting a list of saved carts
   *
   * @returns observable with boolean of the loader state
   */
  abstract getSavedCartListProcess(): Observable<StateUtils.LoaderState<any>>;

  /**
   * Clears the process state of performing a saved cart
   */
  abstract clearSavedCarts(): void;

  /**
   * Triggers a restore saved cart
   *
   * @param cartId
   */
  abstract restoreSavedCart(cartId: string): void;

  /**
   * Gets the loading state of restoring saved cart
   *
   * @returns observable with boolean of the loading state
   */
  abstract getRestoreSavedCartProcessLoading(): Observable<boolean>;

  /**
   * Gets the success state of restoring saved cart
   *
   * @returns observable with boolean of the success state
   */
  abstract getRestoreSavedCartProcessSuccess(): Observable<boolean>;

  /**
   * Gets the error state of restoring saved cart
   *
   * @returns observable with boolean of the error state
   */
  abstract getRestoreSavedCartProcessError(): Observable<boolean>;

  /**
   * Clears the process state of performing a restore saved cart
   */
  abstract clearRestoreSavedCart(): void;

  /**
   * Triggers delete saved cart
   * @param cartId
   */
  abstract deleteSavedCart(cartId: string): void;

  /**
   * Triggers a saved cart
   *
   */
  abstract saveCart({
    cartId,
    saveCartName,
    saveCartDescription,
  }: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void;

  /**
   * Gets the loading state of saving a cart
   *
   * @returns observable with boolean of the loading state
   */
  abstract getSaveCartProcessLoading(): Observable<boolean>;

  /**
   * Gets the success state of saving a cart
   *
   * @returns observable with boolean of the success state
   */
  abstract getSaveCartProcessSuccess(): Observable<boolean>;

  /**
   * Gets the error state of saving a cart
   *
   * @returns observable with boolean of the error state
   */
  abstract getSaveCartProcessError(): Observable<boolean>;

  /**
   * Clears the process state of performing a save cart
   */
  abstract clearSaveCart(): void;

  /**
   * Triggers an edit saved cart
   *
   */
  abstract editSavedCart({
    cartId,
    saveCartName,
    saveCartDescription,
  }: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void;

  /**
   * Triggers a clone saved cart
   *
   * @param cartId
   */
  abstract cloneSavedCart(cartId: string, saveCartName?: string): void;

  /**
   * Gets the loading state of cloning a saved cart
   *
   * @returns observable with boolean of the loading state
   */
  abstract getCloneSavedCartProcessLoading(): Observable<boolean>;

  /**
   * Gets the success state of cloning a saved cart
   *
   * @returns observable with boolean of the success state
   */
  abstract getCloneSavedCartProcessSuccess(): Observable<boolean>;

  /**
   * Gets the error state of cloning a saved cart
   *
   * @returns observable with boolean of the error state
   */
  abstract getCloneSavedCartProcessError(): Observable<boolean>;

  /**
   * Clears the process state cloning a saved cart
   */
  abstract clearCloneSavedCart(): void;
}
