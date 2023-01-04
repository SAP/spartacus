/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CustomerTicketingConfig extends OccConfig {
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
  };
}

declare module '@spartacus/core' {
  interface Config extends CustomerTicketingConfig {}
}
