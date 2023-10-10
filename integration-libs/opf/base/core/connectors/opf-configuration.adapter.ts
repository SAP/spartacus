/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';

export abstract class OpfConfigurationAdapter {
  /**
   * Abstract method used to get payment
   * active configurations
   */
  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;
}
