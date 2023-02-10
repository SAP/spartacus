/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';

import { Asm360Facade } from './asm-360.facade';
import { Asm360Service } from './asm-360.service';

export const facadeProviders: Provider[] = [
  Asm360Service,
  {
    provide: Asm360Facade,
    useExisting: Asm360Service,
  },
];
