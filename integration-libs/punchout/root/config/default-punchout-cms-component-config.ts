/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig } from '@spartacus/core';
import { PUNCHOUT_FEATURE } from '../feature-name';

export const defaultPunchoutCmsComponentsConfig: CmsConfig = {
  featureModules: {
    [PUNCHOUT_FEATURE]: {
      cmsComponents: [
        'PunchoutSessionComponent',
        'PunchoutErrorComponent',
        'PunchoutButtonsComponent',
        'PunchoutRequisitionComponent',
        'PunchoutCloseSessionComponent',
        'PunchoutInspectCartComponent',
      ],
    },
  },
};
