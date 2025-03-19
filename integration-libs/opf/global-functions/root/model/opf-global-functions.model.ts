/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { OpfKeyValueMap } from '@spartacus/opf/base/root';

export enum OpfGlobalFunctionsDomain {
  CHECKOUT = 'checkout',
  GLOBAL = 'global',
  REDIRECT = 'redirect',
}

export interface OpfRegisterGlobalFunctionsInput {
  paymentSessionId: string;
  vcr?: ViewContainerRef;
  paramsMap?: Array<OpfKeyValueMap>;
  domain: OpfGlobalFunctionsDomain;
}
