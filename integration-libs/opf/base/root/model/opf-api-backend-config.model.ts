/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiEndpoints } from './opf-api-endpoints.model';

export interface OpfApiBackendConfig {
  opfApi?: {
    endpoints?: OpfApiEndpoints;
  };
}
