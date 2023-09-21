/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { OPF_BASE_FEATURE } from '../feature-name';
import { GlobalFunctionsInput } from '../model/opf.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfGlobalFunctionsFacade,
      feature: OPF_BASE_FEATURE,
      methods: ['registerGlobalFunctions', 'removeGlobalFunctions'],
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
  abstract registerGlobalFunctions(gfInput: GlobalFunctionsInput): void;

  /**
   * Abstract method to remove global functions used in Hosted-Fields pattern
   */
  abstract removeGlobalFunctions(): void;
}
