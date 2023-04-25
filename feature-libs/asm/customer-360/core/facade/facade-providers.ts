/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';

import { Customer360Facade } from '@spartacus/asm/customer-360/root';
import { Customer360Service } from '../services';

export const facadeProviders: Provider[] = [
  Customer360Service,
  {
    provide: Customer360Facade,
    useExisting: Customer360Service,
  },
];
