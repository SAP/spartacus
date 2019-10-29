import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { CartActions } from '../store/actions/index';
import { ADD_VOUCHER_PROCESS_ID, StateWithCart } from '../store/cart-state';
import { CartSelectors } from '../store/selectors/index';
import { Cart, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';

@Injectable()
export class CartVoucherService {
  constructor(
    protected store: Store<
      StateWithCart | fromProcessStore.StateWithProcess<void>
    >,
    protected authService: AuthService
  ) {}

  addVoucher(voucherId: string, cartId?: string): void {
    this.combineUserAndCartId(cartId).subscribe(([occUserId, cartIdentifier]) =>
      this.store.dispatch(
        new CartActions.CartAddVoucher({
          userId: occUserId,
          cartId: cartIdentifier,
          voucherId: voucherId,
        })
      )
    );
  }

  removeVoucher(voucherId: string, cartId?: string): void {
    this.combineUserAndCartId(cartId).subscribe(([occUserId, cartIdentifier]) =>
      this.store.dispatch(
        new CartActions.CartRemoveVoucher({
          userId: occUserId,
          cartId: cartIdentifier,
          voucherId: voucherId,
        })
      )
    );
  }

  getAddVoucherResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  getAddVoucherResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  getAddVoucherResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  resetAddVoucherProcessingState(): void {
    this.store.dispatch(new CartActions.CartResetAddVoucher());
  }

  private combineUserAndCartId(cartId: string): Observable<[string, string]> {
    const userId$ = this.authService.getOccUserId();
    return combineLatest([
      userId$,
      cartId
        ? of(cartId)
        : this.store.pipe(
            select(CartSelectors.getCartContent),
            map(cart => this.getCartId(cart, userId$))
          ),
    ]).pipe(take(1));
  }

  private getCartId(cart: Cart, userId$: Observable<string>): string {
    let cartId = cart.code;
    userId$.subscribe(userId => {
      if (userId === OCC_USER_ID_ANONYMOUS) {
        cartId = cart.guid;
      }
    });
    return cartId;
  }
}
