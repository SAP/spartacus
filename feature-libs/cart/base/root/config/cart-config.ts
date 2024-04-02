/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
// Imported for side effects (module augmentation)
import '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartConfig {
  cart?: {
    selectiveCart?: {
      enabled?: boolean;
    };
    validation?: {
      enabled?: boolean;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}
