/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfCheckoutFacade } from '@spartacus/opf/root';
import { OpfCheckoutService } from './opf-checkout.service';

export const facadeProviders: Provider[] = [
  OpfCheckoutService,
  {
    provide: OpfCheckoutFacade,
    useExisting: OpfCheckoutService,
  },
];
