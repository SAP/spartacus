/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';
import { ActiveConfiguration } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfBaseFacade,
      feature: OPF_BASE_FEATURE,
      methods: ['getActiveConfigurationsState'],
    }),
})
export abstract class OpfBaseFacade {
  /**
   * Get payment active configurations
   */
  abstract getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  >;
}
