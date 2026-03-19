/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Configuration for Organization UI features.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OrganizationUIConfig {
  organizationUI?: {
    /**
     * Configuration for list search functionality.
     */
    listSearch?: {
      /**
       * Minimum number of characters required to trigger a search.
       * Default: 3
       */
      minCharacters?: number;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends OrganizationUIConfig {}
}
