import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
import { LowLevelCartService } from './low-level-cart.service';
import { LoaderState } from '../../state/utils/loader/loader-state';
import {
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
} from '../../occ/utils/occ-constants';
import { getCartIdByUserId } from '../utils/utils';

// TODO document methods

@Injectable()
export class ActiveCartService {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private _activeCart$: Observable<Cart>;

  private userId = OCC_USER_ID_ANONYMOUS;
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
    protected authService: AuthService,
    protected lowLevelCartService: LowLevelCartService
  ) {
    this.authService.getUserToken().subscribe(token => {
      if (token && token.userId) {
        this.userId = OCC_USER_ID_CURRENT;
        if (this.isJustLoggedIn(token.userId)) {
          this.loadOrMerge(this.cartId);
        }
      } else {
        this.userId = OCC_USER_ID_ANONYMOUS;
      }
      this.previousUserId = token.userId;
    });

    this.activeCartId.subscribe(cartId => {
      this.cartId = cartId;
    });

    this._activeCart$ = this.cartSelector.pipe(
      withLatestFrom(this.activeCartId),
      map(([cartEntity, activeCartId]: [LoaderState<Cart>, string]): [
        Cart,
        string,
        boolean,
        boolean
      ] => [
        cartEntity.value,
        activeCartId,
        cartEntity.loading,
        (cartEntity.error || cartEntity.success) && !cartEntity.loading,
      ]),
      filter(([, , loading]) => !loading),
      tap(([cart, activeCartId, , loaded]) => {
        if (this.isEmpty(cart) && !loaded) {
          this.load(activeCartId);
        }
      }),
      map(([cart]) => (cart ? cart : {})),
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

  private loadOrMerge(cartId: string): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!cartId) {
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
      this.lowLevelCartService.loadCart({
        userId: this.userId,
        cartId: cartId ? cartId : 'current',
        extraData: {
          active: true,
        },
      });
    } else if (cartId) {
      this.lowLevelCartService.loadCart({
        userId: this.userId,
        cartId: cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  addEntry(productCode: string, quantity: number): void {
    let createInitialized = false;
    let attemptedLoad = false;
    this.cartSelector
      .pipe(
        filter(() => !createInitialized),
        switchMap(cartState => {
          if (this.isEmpty(cartState.value) && !cartState.loading) {
            // In case there is no new cart trying to load current cart cause flicker in loaders (loader, pause and then loader again)
            if (!attemptedLoad && this.userId !== OCC_USER_ID_ANONYMOUS) {
              this.load(undefined);
              attemptedLoad = true;
              return of(cartState);
            }
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
        filter(cartState => !this.isEmpty(cartState.value)),
        take(1)
      )
      .subscribe(cartState => {
        this.lowLevelCartService.addEntry(
          this.userId,
          getCartIdByUserId(cartState.value, this.userId),
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
