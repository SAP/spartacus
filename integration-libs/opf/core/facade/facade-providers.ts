/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfCheckoutFacade,
  OpfOrderFacade,
  OpfOtpFacade,
} from '@spartacus/opf/root';
import { OpfCheckoutService } from './opf-checkout.service';
import { OpfOrderService } from './opf-order.service';
import { OpfOtpService } from './opf-otp.service';

export const facadeProviders: Provider[] = [
  OpfCheckoutService,
  OpfOrderService,
  OpfOtpService,
  {
    provide: OpfCheckoutFacade,
    useExisting: OpfCheckoutService,
  },
  {
    provide: OpfOtpFacade,
    useExisting: OpfOtpService,
  },
  {
    provide: OpfOrderFacade,
    useExisting: OpfOrderService,
  },
];
