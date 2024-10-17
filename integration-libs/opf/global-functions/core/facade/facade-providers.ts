/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';

export const facadeProviders: Provider[] = [
  OpfGlobalFunctionsService,
  {
    provide: OpfGlobalFunctionsFacade,
    useExisting: OpfGlobalFunctionsService,
  },
];
