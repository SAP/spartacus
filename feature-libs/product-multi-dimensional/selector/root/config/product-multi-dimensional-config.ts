/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config, VariantQualifier } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export class ProductMultiDimensionalConfig {
  multiDimensional?: {
    imageFormat?: VariantQualifier;
  };
}

declare module '@spartacus/core' {
  interface Config extends ProductMultiDimensionalConfig {}
}
