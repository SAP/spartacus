/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { OPF_BASE_FEATURE } from '../feature-name';

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
   * Endpoint to register global functions used in Hosted-Fields pattern
   *
   * @param paymentSessionId
   * @param vcr
   */
  abstract registerGlobalFunctions(
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void;

  abstract removeGlobalFunctions(): void;
}
