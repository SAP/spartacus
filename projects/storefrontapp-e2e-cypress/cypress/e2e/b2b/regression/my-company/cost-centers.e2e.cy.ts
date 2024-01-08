/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { costCenterConfig } from '../../../../helpers/b2b/my-company/config/cost-center.config';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

testMyCompanyFeatureFromConfig(costCenterConfig, true);
