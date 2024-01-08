/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { userGroupConfig } from '../../../../helpers/b2b/my-company/config/user-group';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

describe(`My Company - User Groups`, () => {
  testMyCompanyFeatureFromConfig(userGroupConfig, true);
});
