/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfBaseFacade } from '@spartacus/opf/base/root';
import { OpfBaseService } from './opf-base.service';

export const facadeProviders: Provider[] = [
  OpfBaseService,
  {
    provide: OpfBaseFacade,
    useExisting: OpfBaseService,
  },
];
