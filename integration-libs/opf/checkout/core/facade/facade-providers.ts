/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfCheckoutFacade, OpfOtpFacade } from '@spartacus/opf/checkout/root';

import { OpfCheckoutService } from './opf-checkout.service';

import { OpfOtpService } from './opf-otp.service';

export const facadeProviders: Provider[] = [
  OpfCheckoutService,

  OpfOtpService,
  {
    provide: OpfCheckoutFacade,
    useExisting: OpfCheckoutService,
  },
  {
    provide: OpfOtpFacade,
    useExisting: OpfOtpService,
  },
];
