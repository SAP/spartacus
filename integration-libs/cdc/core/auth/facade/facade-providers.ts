/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CdcAuthFacade } from '@spartacus/cdc/root';
import { CdcAuthService } from './cdc-auth.service';

export const facadeProviders: Provider[] = [
  CdcAuthService,
  {
    provide: CdcAuthFacade,
    useExisting: CdcAuthService,
  },
];
