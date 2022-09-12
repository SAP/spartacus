/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';
import { PaginationOptions } from '../pagination.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PaginationConfig {
  pagination?: PaginationOptions;
}

declare module '@commerce-storefront-toolset/core' {
  interface Config extends PaginationConfig {}
}
