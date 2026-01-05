/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';
import {
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
} from '../model';

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
  abstract getActiveConfigurationsState(
    query?: OpfActiveConfigurationsQuery
  ): Observable<QueryState<OpfActiveConfigurationsResponse | undefined>>;
}
