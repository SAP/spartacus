/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdsConfig } from './cds-config';

export const DEFAULT_CDS_CONFIG: CdsConfig = {
  cds: {
    tenant: '',
    baseUrl: '',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    consentTemplateId: 'PROFILE',
    profileTag: {
      allowInsecureCookies: false,
    },
  },
};
