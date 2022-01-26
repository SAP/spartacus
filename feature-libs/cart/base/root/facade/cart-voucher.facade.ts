import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartVoucherFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: [
        'addVoucher',
        'removeVoucher',
        'getAddVoucherResultError',
        'getAddVoucherResultSuccess',
        'getAddVoucherResultLoading',
        'resetAddVoucherProcessingState',
      ],
      async: true,
    }),
})
export abstract class CartVoucherFacade {
  abstract addVoucher(voucherId: string, cartId?: string): void;

  abstract removeVoucher(voucherId: string, cartId?: string): void;

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process error flag
   * @deprecated since 2.0
   */
  abstract getAddVoucherResultError(): Observable<boolean>;

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process success flag
   * @deprecated since 2.0
   */
  abstract getAddVoucherResultSuccess(): Observable<boolean>;

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Get add voucher process loading flag
   * @deprecated since 2.0
   */
  abstract getAddVoucherResultLoading(): Observable<boolean>;

  // TODO(#7241): Remove when switching to event system for add voucher
  /**
   * Reset add voucher process
   * @deprecated since 2.0
   */
  abstract resetAddVoucherProcessingState(): void;
}
