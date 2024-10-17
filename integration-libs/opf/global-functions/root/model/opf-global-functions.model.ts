/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { KeyValuePair } from '@spartacus/opf/base/root';

export enum GlobalFunctionsDomain {
  CHECKOUT = 'checkout',
  GLOBAL = 'global',
  REDIRECT = 'redirect',
}

export interface GlobalFunctionsInput {
  paymentSessionId: string;
  vcr?: ViewContainerRef;
  paramsMap?: Array<KeyValuePair>;
  domain: GlobalFunctionsDomain;
}
