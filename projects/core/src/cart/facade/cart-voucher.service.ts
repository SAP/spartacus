import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  filter,
} from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { CartActions } from '../store/actions/index';
import { ADD_VOUCHER_PROCESS_ID, StateWithCart } from '../store/cart-state';
import { CartSelectors } from '../store/selectors/index';

@Injectable()
export class CartVoucherService {
  private _userId = OCC_USER_ID_ANONYMOUS;
  private _cart: Cart;

  constructor(
    protected store: Store<
      StateWithCart | fromProcessStore.StateWithProcess<void>
    >,
    protected authService: AuthService
  ) {
    this.authService
      .getUserToken()
      .pipe(filter(userToken => this._userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this._userId = userToken.userId;
        } else {
          this._userId = OCC_USER_ID_ANONYMOUS;
        }
      });

    this.store.pipe(select(CartSelectors.getCartContent)).subscribe(cart => {
      this._cart = cart;
    });
  }
  get userId(): string {
    return this._userId;
  }

  get cart(): Cart {
    return this._cart;
  }

  addVoucher(voucherId: string): void {
    this.store.dispatch(
      new CartActions.CartAddVoucher({
        userId: this.userId,
        cartId: this.cart.code,
        voucherId: voucherId,
      })
    );
  }

  removeVoucher(voucherId: string): void {
    this.store.dispatch(
      new CartActions.CartRemoveVoucher({
        userId: this.userId,
        cartId: this.cart.code,
        voucherId: voucherId,
      })
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
}
