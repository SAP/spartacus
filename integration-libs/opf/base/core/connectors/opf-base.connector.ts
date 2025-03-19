/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OpfBaseAdapter } from './opf-base.adapter';

@Injectable()
export class OpfBaseConnector {
  protected adapter = inject(OpfBaseAdapter);

  public getActiveConfigurations(
    query?: OpfActiveConfigurationsQuery
  ): Observable<OpfActiveConfigurationsResponse> {
    return this.adapter.getActiveConfigurations(query);
  }
}
