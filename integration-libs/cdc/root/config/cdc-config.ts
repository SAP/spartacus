/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CdcConfig {
  cdc?: {
    baseSite: string;
    javascriptUrl: string;
    sessionExpiration: number;
  }[];
}

declare module '@commerce-storefront-toolset/core' {
  interface Config extends CdcConfig {}
}
