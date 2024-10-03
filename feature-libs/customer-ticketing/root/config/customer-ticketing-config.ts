/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CustomerTicketingConfig {
  customerTicketing?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    attachmentRestrictions?: {
      maxSize?: number;
      allowedTypes?: string[];
    };
    inputCharactersLimit?: number;
    inputCharactersLimitForSubject?: number;
    listViewPageSize?: number;
  };
}

declare module '@spartacus/core' {
  interface Config extends CustomerTicketingConfig {}
}
