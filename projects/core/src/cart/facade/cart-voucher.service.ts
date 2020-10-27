import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserIdService } from '../../auth/index';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { CartActions } from '../store/actions/index';
import { ADD_VOUCHER_PROCESS_ID } from '../store/multi-cart-state';
import { ActiveCartService } from './active-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartVoucherService {
  constructor(
    protected store: Store<fromProcessStore.StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService
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

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process error flag
   * @deprecated since 2.0
   */
  getAddVoucherResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process success flag
   * @deprecated since 2.0
   */
  getAddVoucherResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process loading flag
   * @deprecated since 2.0
   */
  getAddVoucherResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(ADD_VOUCHER_PROCESS_ID))
    );
  }

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Reset add voucher process
   * @deprecated since 2.0
   */
  resetAddVoucherProcessingState(): void {
    this.store.dispatch(new CartActions.CartResetAddVoucher());
  }

  private combineUserAndCartId(cartId: string): Observable<[string, string]> {
    if (cartId) {
      return this.userIdService.getUserId().pipe(
        take(1),
        map((userId) => [userId, cartId])
      );
    } else {
      return combineLatest([
        this.userIdService.getUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(take(1));
    }
  }
}
