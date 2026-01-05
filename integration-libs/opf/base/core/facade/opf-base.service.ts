/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CommandService, QueryService, QueryState } from '@spartacus/core';
import {
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OpfBaseConnector } from '../connectors/opf-base.connector';

@Injectable()
export class OpfBaseService implements OpfBaseFacade {
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected opfBaseConnector = inject(OpfBaseConnector);

  protected activeConfigurationsQuery = (
    query?: OpfActiveConfigurationsQuery
  ) =>
    this.queryService.create<OpfActiveConfigurationsResponse>(() =>
      this.opfBaseConnector.getActiveConfigurations(query)
    );

  getActiveConfigurationsState(
    query?: OpfActiveConfigurationsQuery
  ): Observable<QueryState<OpfActiveConfigurationsResponse | undefined>> {
    return this.activeConfigurationsQuery(query).getState();
  }
}
