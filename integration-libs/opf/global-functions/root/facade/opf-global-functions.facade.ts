/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { OPF_GLOBAL_FUNCTIONS_FEATURE } from '../feature-name';
import {
  OpfGlobalFunctionsDomain,
  OpfRegisterGlobalFunctionsInput,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfGlobalFunctionsFacade,
      feature: OPF_GLOBAL_FUNCTIONS_FEATURE,
      methods: ['registerGlobalFunctions', 'unregisterGlobalFunctions'],
    }),
})
export abstract class OpfGlobalFunctionsFacade {
  /**
   * Abstract method to register global functions used in Hosted-Fields pattern.
   * Optional vcr ViewcontainerRef param is used to display an overlayed loader spinner.
   *
   * @param {string} paymentSessionId
   * @param {ViewContainerRef} vcr
   */
  abstract registerGlobalFunctions(
    gfInput: OpfRegisterGlobalFunctionsInput
  ): void;

  /**
   * Abstract method to remove global functions used in Hosted-Fields pattern
   */
  abstract unregisterGlobalFunctions(domain: OpfGlobalFunctionsDomain): void;
}
