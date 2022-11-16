/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, StaticProvider } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { TransferServerErrors } from './transfer-server-errors';

export const TRANSFER_SERVER_ERRORS_PROVIDERS: StaticProvider[] = [
  {
    provide: BEFORE_APP_SERIALIZED,
    useFactory: () => {
      const transferServerErrors = inject(TransferServerErrors);
      return () => transferServerErrors.transferErrors();
    },
    multi: true,
  },
];
