import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, shareReplay, take, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import { CartActions } from '../store/actions/index';
import { MultiCartSelectors } from '../store/selectors/index';
import { CartDataService } from './cart-data.service';
import { StateWithMultiCart } from '../store/cart-state';
import { LowLevelCartService } from './low-level-cart.service';
import { LoaderState } from '../../state/utils/loader/loader-state';
import {
  USERID_CURRENT,
  USERID_ANONYMOUS,
} from '../../occ/utils/occ-constants';

@Injectable()
export class ActiveCartService {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private _activeCart$: Observable<Cart>;

  private userId = USERID_ANONYMOUS;
  private cartId;

  private activeCartId = this.store.pipe(
    select(MultiCartSelectors.getActiveCartId)
  );
  private cartSelector = this.activeCartId.pipe(
    switchMap(cartId => {
      if (!cartId) {
        return this.lowLevelCartService.getCartEntity('current');
      }
      return this.lowLevelCartService.getCartEntity(cartId);
    })
  );

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected cartData: CartDataService,
    protected authService: AuthService,
    protected lowLevelCartService: LowLevelCartService
  ) {
    this.authService.getUserToken().subscribe(token => {
      if (token && token.userId) {
        this.userId = USERID_CURRENT;
      } else {
        this.userId = USERID_ANONYMOUS;
      }
    });

    this.activeCartId.subscribe(cartId => {
      this.cartId = cartId;
    });

    this._activeCart$ = combineLatest([
      this.cartSelector,
      this.authService.getUserToken(),
    ]).pipe(
      map(([cartEntity, userToken]: [LoaderState<Cart>, any]) => [
        cartEntity.value,
        cartEntity.loading,
        userToken,
        (cartEntity.error || cartEntity.success) && !cartEntity.loading,
      ]),
      filter(([, loading]) => !loading),
      tap(([cart, , userToken, loaded]) => {
        if (this.isJustLoggedIn(userToken.userId)) {
          this.loadOrMerge(cart);
        } else if (
          this.isEmpty(cart) ||
          (this.isLoggedIn(userToken.userId) && !this.isEmpty(cart) && !loaded) // try to load current cart for logged in user (loaded flag to prevent infinite loop when user doesn't have cart)
        ) {
          this.load(cart);
        }

        this.previousUserId = userToken.userId;
      }),
      filter(([cart]) => !this.isEmpty(cart)),
      map(([cart]) => cart),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getActive(): Observable<Cart> {
    return this._activeCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartId.pipe(
      switchMap(cartId => this.lowLevelCartService.getEntries(cartId))
    );
  }
  getLoaded(): Observable<boolean> {
    return this.cartSelector.pipe(
      map(cart => (cart.success || cart.error) && !cart.loading)
    );
  }

  private loadOrMerge(cart: Cart): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!this.isEmpty(cart)) {
      this.lowLevelCartService.loadCart({
        userId: this.userId,
        cartId: 'current',
        extraData: {
          active: true,
        },
      });
    } else {
      this.store.dispatch(
        new CartActions.MergeCart({
          userId: this.userId,
          cartId: cart.guid,
          extraData: {
            active: true,
          },
        })
      );
    }
  }

  private load(cart: Cart): void {
    if (this.userId !== USERID_ANONYMOUS) {
      this.lowLevelCartService.loadCart({
        userId: this.userId,
        cartId: cart && cart.code ? cart.code : 'current',
        extraData: {
          active: true,
        },
      });
    } else {
      this.lowLevelCartService.loadCart({
        userId: this.userId,
        cartId: cart.guid,
        extraData: {
          active: true,
        },
      });
    }
  }

  addEntry(productCode: string, quantity: number): void {
    let createInitialized = false;
    this.cartSelector
      .pipe(
        filter(() => !createInitialized),
        switchMap(cartState => {
          if (!this.isEmpty(cartState.value) && !cartState.loading) {
            createInitialized = true;
            return this.lowLevelCartService.createCart({
              userId: this.userId,
              extraData: {
                active: true,
              },
            });
          }
          return of(cartState);
        }),
        filter(cartState => this.isEmpty(cartState.value)),
        take(1)
      )
      .subscribe(_ => {
        this.lowLevelCartService.addEntry(
          this.userId,
          this.cartId,
          productCode,
          quantity
        );
      });
  }

  removeEntry(entry: OrderEntry): void {
    this.lowLevelCartService.removeEntry(
      this.userId,
      this.cartId,
      entry.entryNumber
    );
  }

  updateEntry(entryNumber: number, quantity: number): void {
    if (quantity > 0) {
      this.lowLevelCartService.updateEntry(
        this.userId,
        this.cartId,
        entryNumber,
        quantity
      );
    } else {
      this.lowLevelCartService.removeEntry(
        this.userId,
        this.cartId,
        entryNumber
      );
    }
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.activeCartId.pipe(
      switchMap(cartId =>
        this.lowLevelCartService.getEntry(cartId, productCode)
      )
    );
  }

  private isEmpty(cart: Cart): boolean {
    return cart && Object.keys(cart).length === 0;
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
