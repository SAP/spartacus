/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  CommandService,
  Query,
  QueryService,
  QueryState,
} from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfConfigurationFacade,
} from '@spartacus/opf/base/root';

import { Observable } from 'rxjs';
import { OpfConfigurationConnector } from '../connectors';

@Injectable()
export class OpfConfigurationService implements OpfConfigurationFacade {
  protected activeConfigurationsQuery: Query<ActiveConfiguration[]> =
    this.queryService.create<ActiveConfiguration[]>(() =>
      this.opfConfigurationConnector.getActiveConfigurations()
    );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfConfigurationConnector: OpfConfigurationConnector
  ) {}

  getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  > {
    return this.activeConfigurationsQuery.getState();
  }
}
