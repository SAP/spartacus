/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from './occ-config';

export function occConfigValidator(config: OccConfig) {
  if (
    config.backend === undefined ||
    config.backend.occ === undefined ||
    config.backend.occ.baseUrl === undefined
  ) {
    return 'Please configure backend.occ.baseUrl before using storefront library!';
  }
}
