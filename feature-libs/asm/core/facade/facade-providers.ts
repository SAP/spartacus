/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  Asm360Facade,
  AsmBindCartFacade,
  AsmCustomerListFacade,
} from '@spartacus/asm/root';
import { Asm360Service } from './asm-360.service';
import { AsmBindCartService } from './asm-bind-cart.service';
import { AsmCustomerListService } from './asm-customer-list.service';

export const facadeProviders: Provider[] = [
  AsmCustomerListService,
  {
    provide: AsmCustomerListFacade,
    useExisting: AsmCustomerListService,
  },
  AsmBindCartService,
  {
    provide: AsmBindCartFacade,
    useExisting: AsmBindCartService,
  },
  Asm360Service,
  {
    provide: Asm360Facade,
    useExisting: Asm360Service,
  },
];
