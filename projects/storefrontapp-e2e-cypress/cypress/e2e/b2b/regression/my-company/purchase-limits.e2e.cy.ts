/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { purchaseLimitConfigs } from '../../../../helpers/b2b/my-company/config/purchase-limit';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

purchaseLimitConfigs.forEach((config) => {
  testMyCompanyFeatureFromConfig(config, true);
});
