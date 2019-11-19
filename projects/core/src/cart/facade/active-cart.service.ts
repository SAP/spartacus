import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { User } from '../../model/misc.model';
import { OrderEntry } from '../../model/order.model';
import { OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_GUEST } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process';
import { getProcessStateFactory } from '../../process/store/selectors/process.selectors';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { EMAIL_PATTERN } from '../../util/regex-pattern';
import { ADD_ENTRY_PROCESS_ID } from '../store';
import * as DeprecatedCartActions from '../store/actions/cart.action';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';
import { getCartIdByUserId } from '../utils/utils';
import { MultiCartService } from './multi-cart.service';

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
      if (this.userId !== OCC_USER_ID_ANONYMOUS) {
        if (this.isJustLoggedIn(userId)) {
          this.loadOrMerge(this.cartId);
        }
      }
      this.previousUserId = userId;
    });

    this.activeCartId$.subscribe(cartId => {
      this.cartId = cartId;
    });

    this.initActiveCart();
  }

  private initActiveCart() {
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

  /**
   * Returns active cart
   */
  getActive(): Observable<Cart> {
    return this.activeCart$;
  }

  /**
   * Returns active cart id
   */
  getActiveCartId(): Observable<string> {
    return this.activeCart$.pipe(
      map(cart => getCartIdByUserId(cart, this.userId)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns cart entries
   */
  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartId$.pipe(
      switchMap(cartId => this.multiCartService.getEntries(cartId))
    );
  }

  /**
   * Returns loaded flag (success or error)
   */
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
        new DeprecatedCartActions.MergeCart({
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

  /**
   * Returns loaded flag for add entry process (success)
   */
  getAddEntryLoaded() {
    return this.store.pipe(
      select(getProcessStateFactory(ADD_ENTRY_PROCESS_ID)),
      map(payload => !payload.loading && payload.success)
    );
  }

  private cartForGuestMerge() {
    let createInitialized = false;
    let attemptedLoad = false;

    return this.cartSelector$.pipe(
      filter(() => !createInitialized),
      switchMap(cartState => {
        if (!cartState.loading && this.isEmpty(cartState.value)) {
          if (!attemptedLoad && this.userId !== OCC_USER_ID_ANONYMOUS) {
            this.load(undefined);
            attemptedLoad = true;
            return of(cartState);
          }
          if (cartState.success || cartState.error) {
            createInitialized = true;
            return this.multiCartService.createCart({
              userId: this.userId,
              extraData: {
                active: true,
              },
            });
          }
        }
        return of(cartState);
      }),
      filter(
        cartState => !this.isGuestCart() && !this.isEmpty(cartState.value)
      ),
      take(1)
    );
  }

  private addEntriesGuestMerge(cartEntries: OrderEntry[]) {
    const entriesToAdd = cartEntries.map(entry => ({
      productCode: entry.product.code,
      quantity: entry.quantity,
    }));
    this.multiCartService.initAddEntryProcess();
    this.cartForGuestMerge().subscribe(cartState => {
      this.multiCartService.addEntries(
        this.userId,
        getCartIdByUserId(cartState.value, this.userId),
        entriesToAdd
      );
    });
  }

  private cartForAddEntry() {
    let createInitialized = false;
    let attemptedLoad = false;

    return this.cartSelector$.pipe(
      filter(() => !createInitialized),
      switchMap(cartState => {
        if (this.isEmpty(cartState.value) && !cartState.loading) {
          // why we load? We want to have only one active cart. So before creating new one make sure there are no active cart already.
          if (!attemptedLoad && this.userId !== OCC_USER_ID_ANONYMOUS) {
            this.load(undefined);
            attemptedLoad = true;
            return of(cartState);
          }
          if (
            this.userId === OCC_USER_ID_ANONYMOUS ||
            (cartState.success || cartState.error)
          ) {
            createInitialized = true;
            return this.multiCartService.createCart({
              userId: this.userId,
              extraData: {
                active: true,
              },
            });
          }
        }
        return of(cartState);
      }),
      filter(cartState => !this.isEmpty(cartState.value)),
      take(1)
    );
  }

  /**
   * Add entry to active cart
   *
   * @param productCode
   * @param quantity
   */
  addEntry(productCode: string, quantity: number): void {
    // In case there is no new cart trying to load current cart cause flicker in loaders (loader, pause and then loader again)
    // That's why add entry process was used instead of relying on loading flag from entity
    this.entriesToAdd.push({ productCode, quantity });
    if (!this.addEntrySub) {
      this.multiCartService.initAddEntryProcess();
      this.addEntrySub = this.cartForAddEntry().subscribe(cartState => {
        this.multiCartService.addEntries(
          this.userId,
          getCartIdByUserId(cartState.value, this.userId),
          this.entriesToAdd
        );
        this.entriesToAdd = [];
        setTimeout(() => {
          this.addEntrySub = undefined;
        });
      });
    }
  }

  /**
   * Remove entry
   *
   * @param entry
   */
  removeEntry(entry: OrderEntry): void {
    this.multiCartService.removeEntry(
      this.userId,
      this.cartId,
      entry.entryNumber
    );
  }

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   */
  updateEntry(entryNumber: number, quantity: number): void {
    this.multiCartService.updateEntry(
      this.userId,
      this.cartId,
      entryNumber,
      quantity
    );
  }

  /**
   * Returns cart entry
   *
   * @param productCode
   */
  getEntry(productCode: string): Observable<OrderEntry> {
    return this.activeCartId$.pipe(
      switchMap(cartId => this.multiCartService.getEntry(cartId, productCode))
    );
  }

  /**
   * Assign email to cart
   *
   * @param email
   */
  addEmail(email: string): void {
    this.multiCartService.assignEmail(this.cartId, this.userId, email);
  }

  /**
   * Get assigned user to cart
   */
  getAssignedUser(): Observable<User> {
    return this.getActive().pipe(map(cart => cart.user));
  }

  /**
   * Returns true for guest cart
   */
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
   *
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  addEntries(cartEntries: OrderEntry[]): void {
    cartEntries.forEach(entry => {
      this.addEntry(entry.product.code, entry.quantity);
    });
  }

  private isEmail(str: string): boolean {
    if (str) {
      return str.match(EMAIL_PATTERN) ? true : false;
    }
    return false;
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

    this.multiCartService.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);

    this.addEntriesGuestMerge(cartEntries);
  }

  private isEmpty(cart: Cart): boolean {
    return (
      !cart || (typeof cart === 'object' && Object.keys(cart).length === 0)
    );
  }

  private isJustLoggedIn(userId: string): boolean {
    return (
      this.previousUserId !== userId && // *just* logged in
      this.previousUserId !== this.PREVIOUS_USER_ID_INITIAL_VALUE // not app initialization
    );
  }
}
