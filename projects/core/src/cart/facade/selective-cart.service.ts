import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartService } from './multi-cart.service';
import { UserService } from '../../user/facade/user.service';
import { AuthService } from '../../auth/facade/auth.service';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { map, filter, tap, shareReplay, switchMap, take } from 'rxjs/operators';
import { OrderEntry } from '../../model/order.model';
import { Consignment } from 'projects/backend/occ-client/lib/models/mappers';

// ! Do not expose in public API
// It is a prototype service for selective cart/save for later that can change when implementing that feature

// TODO: Add unit tests, doc comments for that when working on this feature
@Injectable()
export class SelectiveCartService {
  private customerId: string;
  private userId: string;
  private cartId: string;
  private selectiveCart$: Observable<Cart>;
  private cartId$: BehaviorSubject<string> = new BehaviorSubject<string>(
    undefined
  );

  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;

  private cartSelector$ = this.cartId$.pipe(
    switchMap(cartId => {
      console.log('cartSelector$ cartId: ' + cartId);
      this.cartId = cartId;
      const selector: any = this.multiCartService.getCartEntity(cartId);
      selector.pipe(
        map(entry => {
          console.log('cartSelector$ selector: ' + entry);
        })
      );

      return this.multiCartService.getCartEntity(cartId);
    })
  );

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userService: UserService,
    protected authService: AuthService,
    protected multiCartService: MultiCartService
  ) {
    console.log('constructor!!!!');

    this.userService.get().subscribe(user => {
      console.log('this.userService.get()!');
      if (user && user.customerId) {
        this.customerId = user.customerId;
        this.cartId$.next(`selectivecart${this.customerId}`);
      } else if (user && !user.customerId) {
        this.cartId$.next(undefined);
      }
      console.log('this.userService.get() => CustomerId: ' + this.customerId);
    });

    this.authService.getOccUserId().subscribe(userId => {
      console.log('this.authService.getOccUserId()');
      this.userId = userId;
      if (this.userId !== OCC_USER_ID_ANONYMOUS) {
        if (this.isJustLoggedIn(userId)) {
          this.load();
        }
      }
      this.previousUserId = userId;
      console.log('this.authService.getOccUserId() => userId: ' + this.userId);
      console.log(
        'this.authService.getOccUserId() => previousUserId: ' +
          this.previousUserId
      );
    });

    this.selectiveCart$ = this.cartSelector$.pipe(
      map((cartEntity: LoaderState<Cart>): {
        cart: Cart;
        loading: boolean;
        loaded: boolean;
      } => {
        console.log(
          'selectiveCart$ => cartSelector' + JSON.stringify(cartEntity)
        );
        return {
          cart: cartEntity.value,
          loading: cartEntity.loading,
          loaded:
            (cartEntity.error || cartEntity.success) && !cartEntity.loading,
        };
      }),
      filter(({ loading }) => !loading),
      tap(({ cart, loaded }) => {
        console.log('CURRENT STATE:');
        console.log('cartID: ' + this.cartId);
        console.log('customerID: ' + this.customerId);
        console.log('userId: ' + this.userId);
        if (this.cartId && this.isEmpty(cart) && !loaded) {
          console.log('before selectiveCart$ load');
          this.load();
        }
      }),
      map(({ cart }) => (cart ? cart : {})),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.selectiveCart$.pipe(
      map(cart => {
        console.log('this.selectiveCart$ => finish!!!!!!!!!' + cart);
      })
    );
  }

  getCart(): Observable<Cart> {
    console.log('SelectiveCartService getCart');
    return this.selectiveCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    console.log('SelectiveCartService getEntries');
    return this.multiCartService.getEntries(this.cartId);
  }

  getLoaded(): Observable<boolean> {
    console.log('SelectiveCartService getLoaded');
    return this.cartSelector$.pipe(
      map(cart => (cart.success || cart.error) && !cart.loading)
    );
  }

  private load() {
    console.log('SelectiveCartService load');
    console.log('SelectiveCartService userId ' + this.userId);
    console.log('SelectiveCartService cartId ' + this.cartId);
    this.multiCartService.loadCart({
      userId: this.userId,
      cartId: this.cartId,
    });
  }

  addEntry(productCode: string, quantity: number): void {
    console.log('SelectiveCartService addEntry');
    let createInitialized = false;
    this.cartSelector$
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
        this.multiCartService.addEntry(
          this.userId,
          this.cartId,
          productCode,
          quantity
        );
      });
  }

  removeEntry(entry: OrderEntry): void {
    console.log('addEntry removeEntry');
    this.multiCartService.removeEntry(
      this.userId,
      this.cartId,
      entry.entryNumber
    );
  }

  updateEntry(entryNumber: number, quantity: number): void {
    console.log('addEntry updateEntry');
    this.multiCartService.updateEntry(
      this.userId,
      this.cartId,
      entryNumber,
      quantity
    );
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    console.log('addEntry 1 Param updateEntry');
    return this.multiCartService.getEntry(this.cartId, productCode);
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
