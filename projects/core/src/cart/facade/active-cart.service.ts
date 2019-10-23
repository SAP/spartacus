import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  take,
  tap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import { CartActions } from '../store/actions/index';
import { MultiCartSelectors } from '../store/selectors/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartService } from './multi-cart.service';
import { LoaderState } from '../../state/utils/loader/loader-state';
import {
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_GUEST,
} from '../../occ/utils/occ-constants';
import { getCartIdByUserId } from '../utils/utils';
import { StateWithProcess } from '../../process';
import { ADD_ENTRY_PROCESS_ID } from '../store';
import { getProcessStateFactory } from '../../process/store/selectors/process.selectors';
import { User } from '../../model/misc.model';
import { EMAIL_PATTERN } from '../../util/regex-pattern';

// TODO document methods

@Injectable()
export class ActiveCartService {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private activeCart$: Observable<Cart>;

  private userId = OCC_USER_ID_ANONYMOUS;
  private cartId;
  private cartUser: User;
  private addEntrySub: Subscription;
  private entriesToAdd: Array<{ productCode: string; quantity: number }> = [];

  private activeCartId$ = this.store.pipe(
    select(MultiCartSelectors.getActiveCartId)
  );
  private cartSelector$ = this.activeCartId$.pipe(
    switchMap(cartId => {
      if (!cartId) {
        return this.multiCartService.getCartEntity(OCC_CART_ID_CURRENT);
      }
      return this.multiCartService.getCartEntity(cartId);
    })
  );

  constructor(
    protected store: Store<StateWithMultiCart | StateWithProcess<void>>,
    protected authService: AuthService,
    protected multiCartService: MultiCartService
  ) {
    this.authService.getOccUserId().subscribe(userId => {
      this.userId = userId;
      if (this.userId === OCC_USER_ID_CURRENT) {
        if (this.isJustLoggedIn(userId)) {
          this.loadOrMerge(this.cartId);
        }
      }
      this.previousUserId = userId;
    });

    this.activeCartId$.subscribe(cartId => {
      this.cartId = cartId;
    });

    this.activeCart$ = this.cartSelector$.pipe(
      withLatestFrom(this.activeCartId$),
      map(([cartEntity, activeCartId]: [LoaderState<Cart>, string]): {
        cart: Cart;
        cartId: string;
        loading: boolean;
        loaded: boolean;
      } => {
        return {
          cart: cartEntity.value,
          cartId: activeCartId,
          loading: cartEntity.loading,
          loaded:
            (cartEntity.error || cartEntity.success) && !cartEntity.loading,
        };
      }),
      filter(({ loading }) => !loading),
      tap(({ cart, cartId, loaded }) => {
        if (this.isEmpty(cart) && !loaded) {
          this.load(cartId);
        }
      }),
      map(({ cart }) => (cart ? cart : {})),
      tap(cart => {
        if (cart) {
          this.cartUser = cart.user;
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getActive(): Observable<Cart> {
    return this.activeCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartId$.pipe(
      switchMap(cartId => this.multiCartService.getEntries(cartId))
    );
  }
  getLoaded(): Observable<boolean> {
    return this.cartSelector$.pipe(
      map(cart => (cart.success || cart.error) && !cart.loading)
    );
  }

  private loadOrMerge(cartId: string): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!cartId) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    } else if (this.isGuestCart()) {
      this.guestCartMerge(cartId);
    } else {
      this.store.dispatch(
        new CartActions.MergeCart({
          userId: this.userId,
          cartId: cartId,
          extraData: {
            active: true,
          },
        })
      );
    }
  }

  private load(cartId: string): void {
    if (this.userId !== OCC_USER_ID_ANONYMOUS) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: cartId ? cartId : OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    } else if (cartId) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  getAddEntryLoaded() {
    return this.store.pipe(
      select(getProcessStateFactory(ADD_ENTRY_PROCESS_ID)),
      map(payload => !payload.loading && payload.success)
    );
  }

  addEntry(
    productCode: string,
    quantity: number,
    guestMerge: boolean = false
  ): void {
    let createInitialized = false;
    let attemptedLoad = false;
    this.multiCartService.initAddEntryProcess();
    this.entriesToAdd.push({ productCode, quantity });
    if (!this.addEntrySub) {
      this.addEntrySub = this.cartSelector$
        .pipe(
          filter(() => !createInitialized),
          switchMap(cartState => {
            if (
              (this.isEmpty(cartState.value) && !cartState.loading) ||
              (guestMerge && this.isGuestCart() && !cartState.loading)
            ) {
              // In case there is no new cart trying to load current cart cause flicker in loaders (loader, pause and then loader again)
              if (!attemptedLoad && this.userId !== OCC_USER_ID_ANONYMOUS) {
                this.load(undefined);
                attemptedLoad = true;
                return of(cartState);
              }
              createInitialized = true;
              return this.multiCartService.createCart({
                userId: this.userId,
                extraData: {
                  active: true,
                },
              });
            }
            return of(cartState);
          }),
          filter(
            cartState =>
              (!guestMerge && !this.isEmpty(cartState.value)) ||
              (guestMerge &&
                !this.isGuestCart() &&
                !this.isEmpty(cartState.value))
          ),
          take(1)
        )
        .subscribe(cartState => {
          this.multiCartService.addEntries(
            this.userId,
            getCartIdByUserId(cartState.value, this.userId),
            this.entriesToAdd
          );
          this.entriesToAdd = [];
          setTimeout(() => {
            this.addEntrySub.unsubscribe();
            this.addEntrySub = undefined;
          });
        });
    }
  }

  removeEntry(entry: OrderEntry): void {
    this.multiCartService.removeEntry(
      this.userId,
      this.cartId,
      entry.entryNumber
    );
  }

  updateEntry(entryNumber: number, quantity: number): void {
    this.multiCartService.updateEntry(
      this.userId,
      this.cartId,
      entryNumber,
      quantity
    );
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.activeCartId$.pipe(
      switchMap(cartId => this.multiCartService.getEntry(cartId, productCode))
    );
  }

  addEmail(email: string): void {
    this.store.dispatch(
      new CartActions.AddEmailToCart({
        userId: this.userId,
        cartId: this.cartId,
        email,
      })
    );
  }

  getAssignedUser(): Observable<User> {
    return this.getActive().pipe(map(cart => cart.user));
  }

  private isEmail(str: string): boolean {
    if (str) {
      return str.match(EMAIL_PATTERN) ? true : false;
    }
    return false;
  }

  isGuestCart(): boolean {
    return (
      this.cartUser &&
      (this.cartUser.name === OCC_USER_ID_GUEST ||
        this.isEmail(
          this.cartUser.uid
            .split('|')
            .slice(1)
            .join('|')
        ))
    );
  }

  /**
   * Add multiple entries to a cart
   * Requires a created cart
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  addEntries(cartEntries: OrderEntry[], guestMerge: boolean = false): void {
    cartEntries.forEach(entry => {
      this.addEntry(entry.product.code, entry.quantity, guestMerge);
    });
  }

  // TODO: Remove once backend is updated
  /**
   * Temporary method to merge guest cart with user cart because of backend limitation
   * This is for an edge case
   */
  private guestCartMerge(cartId: string): void {
    let cartEntries: OrderEntry[];
    this.getEntries()
      .pipe(take(1))
      .subscribe(entries => {
        cartEntries = entries;
      });

    this.store.dispatch(
      new CartActions.DeleteCart({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
      })
    );

    this.addEntries(cartEntries, true);
  }

  private isEmpty(cart: Cart): boolean {
    return (
      !cart || (typeof cart === 'object' && Object.keys(cart).length === 0)
    );
  }

  private isJustLoggedIn(userId: string): boolean {
    return (
      this.isLoggedIn(userId) &&
      this.previousUserId !== userId && // *just* logged in
      this.previousUserId !== this.PREVIOUS_USER_ID_INITIAL_VALUE // not app initialization
    );
  }

  private isLoggedIn(userId: string): boolean {
    return typeof userId !== 'undefined';
  }
}
