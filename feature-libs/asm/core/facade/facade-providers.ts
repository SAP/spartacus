/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { AsmCustomerListFacade } from '@spartacus/asm/root';
import { AsmCustomerListService } from './asm-customer-list.service';

export const facadeProviders: Provider[] = [
  AsmCustomerListService,
  {
    provide: AsmCustomerListFacade,
    useExisting: AsmCustomerListService,
  },
];
