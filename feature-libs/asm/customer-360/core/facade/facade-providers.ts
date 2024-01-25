/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';

import { AsmCustomer360Facade } from '@spartacus/asm/customer-360/root';
import { AsmCustomer360Service } from '../services';

export const facadeProviders: Provider[] = [
  AsmCustomer360Service,
  {
    provide: AsmCustomer360Facade,
    useExisting: AsmCustomer360Service,
  },
];
