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
export abstract class SeoConfig {
  seo?: SeoOptions;
}

export interface SeoOptions {
  structuredData?: StructuredData;
}

export interface StructuredData {
  disableInDevMode?: boolean;
}

declare module '@commerce-storefront-toolset/core' {
  interface Config extends SeoConfig {}
}
