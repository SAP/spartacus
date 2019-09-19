import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { LowLevelCartService } from './low-level-cart.service';
import { UserService } from '../../user';
import { AuthService } from '../../auth';
import { OCC_USER_ID_CURRENT, OCC_USER_ID_ANONYMOUS } from '../../occ';
import { Observable, of } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { map, filter, tap, shareReplay, switchMap, take } from 'rxjs/operators';
import { OrderEntry } from '../../model/order.model';

@Injectable()
export class SelectiveCartService {
  _customerId: string;
  _userId: string;
  _cartId: string;
  _selectiveCart$: Observable<Cart>;

  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;

  private cartSelector = this.lowLevelCartService.getCartEntity(this._cartId);

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userService: UserService,
    protected authService: AuthService,
    protected lowLevelCartService: LowLevelCartService
  ) {
    this.userService.get().subscribe(user => {
      if (user && user.customerId) {
        this._customerId = user.customerId;
        this._cartId = `selectivecart${this._customerId}`;
      }
    });

    this.authService.getUserToken().subscribe(userToken => {
      if (userToken && userToken.userId) {
        this._userId = OCC_USER_ID_CURRENT;
        if (this.isJustLoggedIn(userToken.userId)) {
          this.load();
        }
      } else {
        this._userId = OCC_USER_ID_ANONYMOUS;
      }
      this.previousUserId = userToken.userId;
    });

    this._selectiveCart$ = this.cartSelector.pipe(
      map((cartEntity: LoaderState<Cart>): [Cart, boolean, boolean] => [
        cartEntity.value,
        cartEntity.loading,
        (cartEntity.error || cartEntity.success) && !cartEntity.loading,
      ]),
      filter(([, , loading]) => !loading),
      tap(([cart, , loaded]) => {
        if (this.isEmpty(cart) && !loaded) {
          this.load();
        }
      }),
      map(cart => (cart ? cart : {})),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getCart(): Observable<Cart> {
    return this._selectiveCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.lowLevelCartService.getEntries(this._cartId);
  }

  getLoaded(): Observable<boolean> {
    return this.cartSelector.pipe(
      map(cart => (cart.success || cart.error) && !cart.loading)
    );
  }

  private load() {
    this.lowLevelCartService.loadCart({
      userId: this._userId,
      cartId: this._cartId,
    });
  }

  addEntry(productCode: string, quantity: number): void {
    let createInitialized = false;
    this.cartSelector
      .pipe(
        filter(() => !createInitialized),
        switchMap(cartState => {
          if (this.isEmpty(cartState.value) && !cartState.loading) {
            createInitialized = true;
            this.load();
          }
          return of(cartState);
        }),
        filter(cartState => !this.isEmpty(cartState.value)),
        take(1)
      )
      .subscribe(_ => {
        this.lowLevelCartService.addEntry(
          this._userId,
          this._cartId,
          productCode,
          quantity
        );
      });
  }

  removeEntry(entry: OrderEntry): void {
    this.lowLevelCartService.removeEntry(
      this._userId,
      this._cartId,
      entry.entryNumber
    );
  }

  updateEntry(entryNumber: number, quantity: number): void {
    if (quantity > 0) {
      this.lowLevelCartService.updateEntry(
        this._userId,
        this._cartId,
        entryNumber,
        quantity
      );
    } else {
      this.lowLevelCartService.removeEntry(
        this._userId,
        this._cartId,
        entryNumber
      );
    }
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.lowLevelCartService.getEntry(this._cartId, productCode)
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
