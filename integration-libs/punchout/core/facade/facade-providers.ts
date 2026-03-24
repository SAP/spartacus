/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { PunchoutFacade } from '@spartacus/punchout/root';
import { PunchoutService } from './punchout.service';

export const facadeProviders: Provider[] = [
  PunchoutService,
  {
    provide: PunchoutFacade,
    useExisting: PunchoutService,
  },
];
