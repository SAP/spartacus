import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import * as fromAction from '../store/actions';
import { StateWithCart } from '../store/cart-state';
import * as fromSelector from '../store/selectors';
import { ANONYMOUS_USERID, CartDataService } from './cart-data.service';
import { CartUtilService } from './cart-util.service';

@Injectable()
export class CartService {
  prevCartUserId;
  private _activeCart$;

  constructor(
    protected store: Store<StateWithCart>,
    protected cartData: CartDataService,
    protected authService: AuthService
  ) {
    this._activeCart$ = combineLatest(
      this.store.select(fromSelector.getCartContent),
      this.store.select(fromSelector.getCartLoading),
      this.authService.getUserToken()
    ).pipe(
      // combineLatest emits multiple times on each property update instead of one emit
      // additionally dispatching actions that changes selectors used here needs to happen in order
      // for this asyncScheduler is used here
      debounceTime(1, asyncScheduler),
      tap(([cart, loading, userToken]) => {
        if (
          // we are only interested in case when we switch from not logged user to logged
          // check for undefined is used to ignore this action on logout
          this.prevCartUserId !== userToken.userId &&
          typeof userToken.userId !== 'undefined' &&
          !loading
        ) {
          this.loadOrMerge();
        }
        if (!loading && !CartUtilService.isLoaded(cart)) {
          this.loadDetails();
        }
        this.prevCartUserId = userToken.userId;
      }),
      map(([cart]) => cart),
      filter(
        cart =>
          (CartUtilService.isLoaded(cart) && CartUtilService.isCreated(cart)) ||
          !CartUtilService.isCreated(cart)
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getActive(): Observable<Cart> {
    return this._activeCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.store.pipe(select(fromSelector.getCartEntries));
  }

  getCartMergeComplete(): Observable<boolean> {
    return this.store.pipe(select(fromSelector.getCartMergeComplete));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromSelector.getCartLoaded));
  }

  protected loadOrMerge(): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (this.cartData.userId !== ANONYMOUS_USERID) {
      if (!CartUtilService.isCreated(this.cartData.cart)) {
        this.store.dispatch(
          new fromAction.LoadCart({
            userId: this.cartData.userId,
            cartId: 'current',
            details: true,
          })
        );
      } else {
        this.store.dispatch(
          new fromAction.MergeCart({
            userId: this.cartData.userId,
            cartId: this.cartData.cart.guid,
            details: true,
          })
        );
      }
    }
  }

  loadDetails(): void {
    if (this.cartData.userId !== ANONYMOUS_USERID) {
      this.store.dispatch(
        new fromAction.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId ? this.cartData.cartId : 'current',
          details: true,
        })
      );
    } else if (this.cartData.cartId) {
      this.store.dispatch(
        new fromAction.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          details: true,
        })
      );
    }
  }

  addEntry(productCode: string, quantity: number): void {
    // SPIKE NEW:
    if (!CartUtilService.isCreated(this.cartData.cart)) {
      this.store.dispatch(
        new fromAction.CreateCart({ userId: this.cartData.userId })
      );
      const sub = this.getActive().subscribe(cart => {
        if (CartUtilService.isLoaded(cart)) {
          this.store.dispatch(
            new fromAction.AddEntry({
              userId: this.cartData.userId,
              cartId: this.cartData.cartId,
              productCode: productCode,
              quantity: quantity,
            })
          );
          sub.unsubscribe();
        }
      });
    } else {
      this.store.dispatch(
        new fromAction.AddEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          productCode: productCode,
          quantity: quantity,
        })
      );
    }

    // SPIKE OLD:

    // this.store
    //   .pipe(
    //     select(fromSelector.getActiveCartState),
    //     tap(cartState => {
    //       if (!this.isCreated(cartState.value.content) && !cartState.loading) {
    //         this.store.dispatch(
    //           new fromAction.CreateCart({ userId: this.cartData.userId })
    //         );
    //       }
    //     }),
    //     filter(cartState => this.isCreated(cartState.value.content)),
    //     take(1)
    //   )
    //   .subscribe(_ => {
    //     this.store.dispatch(
    //       new fromAction.AddEntry({
    //         userId: this.cartData.userId,
    //         cartId: this.cartData.cartId,
    //         productCode: productCode,
    //         quantity: quantity,
    //       })
    //     );
    //   });
  }

  removeEntry(entry: OrderEntry): void {
    this.store.dispatch(
      new fromAction.RemoveEntry({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        entry: entry.entryNumber,
      })
    );
  }

  updateEntry(entryNumber: string, quantity: number): void {
    if (quantity > 0) {
      this.store.dispatch(
        new fromAction.UpdateEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          entry: entryNumber,
          qty: quantity,
        })
      );
    } else {
      this.store.dispatch(
        new fromAction.RemoveEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          entry: entryNumber,
        })
      );
    }
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.store.pipe(
      select(fromSelector.getCartEntrySelectorFactory(productCode))
    );
  }
}
