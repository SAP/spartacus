/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  ActiveCartFacade,
  CartValidationFacade,
  CartVoucherFacade,
  MultiCartFacade,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { ActiveCartService } from './active-cart.service';
import { CartValidationService } from './cart-validation.service';
import { CartVoucherService } from './cart-voucher.service';
import { MultiCartService } from './multi-cart.service';
import { SelectiveCartService } from './selective-cart.service';

export const facadeProviders: Provider[] = [
  ActiveCartService,
  {
    provide: ActiveCartFacade,
    useExisting: ActiveCartService,
  },
  CartVoucherService,
  {
    provide: CartVoucherFacade,
    useExisting: CartVoucherService,
  },
  MultiCartService,
  {
    provide: MultiCartFacade,
    useExisting: MultiCartService,
  },
  SelectiveCartService,
  {
    provide: SelectiveCartFacade,
    useExisting: SelectiveCartService,
  },
  CartValidationService,
  {
    provide: CartValidationFacade,
    useExisting: CartValidationService,
  },
];
