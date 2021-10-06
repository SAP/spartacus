import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  DeleteSavedCartEvent,
  SavedCartFacade,
} from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  EventService,
  getWishlistName,
  isSelectiveCart,
  MultiCartService,
  ProcessSelectors,
  StateUtils,
  StateWithMultiCart,
  StateWithProcess,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { combineLatest, EMPTY, Observable, queueScheduler } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  observeOn,
  pluck,
  shareReplay,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import {
  SAVED_CART_CLONE_CART_PROCESS_ID,
  SAVED_CART_LIST_PROCESS_ID,
  SAVED_CART_RESTORE_CART_PROCESS_ID,
  SAVED_CART_SAVE_CART_PROCESS_ID,
} from '../store/saved-cart-constants';

@Injectable()
export class SavedCartService implements SavedCartFacade {
  constructor(
    protected store: Store<StateWithMultiCart | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected userService: UserService,
    protected multiCartService: MultiCartService,
    protected eventService: EventService
  ) {}

  /**
   * Loads a single saved cart
   */
  loadSavedCart(cartId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.LoadSavedCart({ userId, cartId })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Gets a single saved cart
   * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
   *
   * @param cartId
   * @returns observable with cart
   */
  get(cartId: string): Observable<Cart | undefined> {
    return this.getSavedCart(cartId).pipe(
      observeOn(queueScheduler),
      withLatestFrom(
        this.eventService.get(DeleteSavedCartEvent).pipe(startWith({}))
      ),
      filter(([state, _event]) => !!state),
      tap(([state, event]) => {
        if (Object.keys(event).length > 0) {
          return EMPTY;
        }

        if (!(state.loading || state.success || state.error)) {
          this.loadSavedCart(cartId);
        }
      }),
      filter(([state]) => state.success || !!state.error),
      map(([state]) => state.value)
    );
  }

  /**
   * Gets the selected cart state
   *
   * @param cartId
   * @returns observable of selected cart with loader state
   */
  getSavedCart(
    cartId: string
  ): Observable<StateUtils.ProcessesLoaderState<Cart>> {
    return this.multiCartService.getCartEntity(cartId);
  }

  /**
   * Returns true when there are no operations on that in progress and it is not currently loading
   *
   * @param cartId
   */
  isStable(cartId: string): Observable<boolean> {
    return this.multiCartService.isStable(cartId);
  }

  /**
   * Loads a list of saved carts
   */
  loadSavedCarts(): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.LoadSavedCarts({ userId })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Gets a list of saved carts
   *
   * @returns observable with list of saved carts
   */
  getList(): Observable<Cart[]> {
    return this.getSavedCartList().pipe(
      withLatestFrom(this.getSavedCartListProcess()),
      tap(([_, state]) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadSavedCarts();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Gets a list of saved carts from all carts in the state
   * by filtering through the carts that are not wishlist and not saved cart
   *
   * @returns observable with list of saved carts
   */
  getSavedCartList(): Observable<Cart[]> {
    return combineLatest([
      this.multiCartService.getCarts(),
      this.userService.get(),
    ]).pipe(
      distinctUntilChanged(),
      map(([carts, user]) =>
        carts.filter(
          (cart) =>
            (user?.customerId !== undefined
              ? cart?.name !== getWishlistName(user?.customerId)
              : true) &&
            !isSelectiveCart(cart?.code) &&
            cart?.saveTime
        )
      )
    );
  }

  /**
   * Gets the loading flag of getting a list of saved carts
   *
   * @returns observable with boolean of the loading state
   */
  getSavedCartListProcessLoading(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(SAVED_CART_LIST_PROCESS_ID)
      )
    );
  }

  /**
   * Gets the loading state of getting a list of saved carts
   *
   * @returns observable with boolean of the loader state
   */
  getSavedCartListProcess(): Observable<StateUtils.LoaderState<any>> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SAVED_CART_LIST_PROCESS_ID)
      )
    );
  }

  /**
   * Clears the process state of performing a saved cart
   */
  clearSavedCarts(): void {
    this.store.dispatch(new SavedCartActions.ClearSavedCarts());
  }

  /**
   * Triggers a restore saved cart
   *
   * @param cartId
   */
  restoreSavedCart(cartId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.RestoreSavedCart({
            userId,
            cartId,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Gets the loading state of restoring saved cart
   *
   * @returns observable with boolean of the loading state
   */
  getRestoreSavedCartProcessLoading(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          SAVED_CART_RESTORE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the success state of restoring saved cart
   *
   * @returns observable with boolean of the success state
   */
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          SAVED_CART_RESTORE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the error state of restoring saved cart
   *
   * @returns observable with boolean of the error state
   */
  getRestoreSavedCartProcessError(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(
          SAVED_CART_RESTORE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Clears the process state of performing a restore saved cart
   */
  clearRestoreSavedCart(): void {
    this.store.dispatch(new SavedCartActions.ClearRestoreSavedCart());
  }

  /**
   * Triggers delete saved cart
   * @param cartId
   */
  deleteSavedCart(cartId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.multiCartService.deleteCart(cartId, userId);
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Triggers a saved cart
   *
   */
  saveCart({
    cartId,
    saveCartName,
    saveCartDescription,
  }: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.SaveCart({
            userId,
            cartId,
            saveCartName,
            saveCartDescription,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Gets the loading state of saving a cart
   *
   * @returns observable with boolean of the loading state
   */
  getSaveCartProcessLoading(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          SAVED_CART_SAVE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the success state of saving a cart
   *
   * @returns observable with boolean of the success state
   */
  getSaveCartProcessSuccess(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          SAVED_CART_SAVE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the error state of saving a cart
   *
   * @returns observable with boolean of the error state
   */
  getSaveCartProcessError(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(SAVED_CART_SAVE_CART_PROCESS_ID)
      )
    );
  }

  /**
   * Clears the process state of performing a save cart
   */
  clearSaveCart(): void {
    this.store.dispatch(new SavedCartActions.ClearSaveCart());
  }

  /**
   * Triggers an edit saved cart
   *
   */
  editSavedCart({
    cartId,
    saveCartName,
    saveCartDescription,
  }: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.EditSavedCart({
            userId,
            cartId,
            saveCartName,
            saveCartDescription,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Triggers a clone saved cart
   *
   * @param cartId
   */
  cloneSavedCart(cartId: string, saveCartName?: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.CloneSavedCart({ userId, cartId, saveCartName })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Gets the loading state of cloning a saved cart
   *
   * @returns observable with boolean of the loading state
   */
  getCloneSavedCartProcessLoading(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          SAVED_CART_CLONE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the success state of cloning a saved cart
   *
   * @returns observable with boolean of the success state
   */
  getCloneSavedCartProcessSuccess(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          SAVED_CART_CLONE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Gets the error state of cloning a saved cart
   *
   * @returns observable with boolean of the error state
   */
  getCloneSavedCartProcessError(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(
          SAVED_CART_CLONE_CART_PROCESS_ID
        )
      )
    );
  }

  /**
   * Clears the process state of cloning a saved cart
   */
  clearCloneSavedCart(): void {
    this.store.dispatch(new SavedCartActions.ClearCloneSavedCart());
  }
}
