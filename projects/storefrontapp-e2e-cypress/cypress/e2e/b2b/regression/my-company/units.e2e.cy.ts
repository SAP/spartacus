/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { unitConfig } from '../../../../helpers/b2b/my-company/config/unit';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

testMyCompanyFeatureFromConfig(unitConfig, true);
