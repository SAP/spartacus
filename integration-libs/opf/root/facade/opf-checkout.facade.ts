/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_CORE_FEATURE } from '../feature-name';
import { ActiveConfiguration } from '../model/opf-checkout.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCheckoutFacade,
      feature: OPF_CORE_FEATURE,
      methods: ['getActiveConfigurationsState', 'getActiveConfigurations'],
    }),
})
export abstract class OpfCheckoutFacade {
  /**
   * Get checkout payment active configurations
   */
  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;
  /**
   * Get checkout payment active configurations
   */
  abstract getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  >;
}
