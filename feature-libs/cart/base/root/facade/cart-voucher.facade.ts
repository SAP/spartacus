/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

  /**
   * Get add voucher process error flag
   */
  abstract getAddVoucherResultError(): Observable<boolean>;

  /**
   * Get add voucher process success flag
   */
  abstract getAddVoucherResultSuccess(): Observable<boolean>;

  /**
   * Get add voucher process loading flag
   */
  abstract getAddVoucherResultLoading(): Observable<boolean>;

  /**
   * Reset add voucher process
   */
  abstract resetAddVoucherProcessingState(): void;
}
