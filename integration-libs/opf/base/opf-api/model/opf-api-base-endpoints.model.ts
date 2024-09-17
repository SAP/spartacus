/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiEndpoint } from './opf-api-endpoint.model';

export interface OpfApiEndpoints {
  /**
   * Endpoint to get active payment configurations
   */
  getActiveConfigurations?: string | OpfApiEndpoint;
}
