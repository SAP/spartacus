/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';
// Imported for side effects (module augmentation)
import '@commerce-storefront-toolset/storefront';

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

declare module '@commerce-storefront-toolset/core' {
  interface Config extends CartConfig {}
}
