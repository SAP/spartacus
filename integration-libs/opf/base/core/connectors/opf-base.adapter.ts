/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';

export abstract class OpfBaseAdapter {
  /**
   * Abstract method used to get payment active configurations
   */
  abstract getActiveConfigurations(
    query?: OpfActiveConfigurationsQuery
  ): Observable<OpfActiveConfigurationsResponse>;
}
