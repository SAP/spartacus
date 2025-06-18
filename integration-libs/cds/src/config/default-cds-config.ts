/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdsConfig } from './cds-config';

export function defaultCdsConfigFactory(): CdsConfig {
  return {
    cds: {
      tenant: '',
      baseUrl: '',
      merchandising: {
        defaultCarouselViewportThreshold: 80,
      },
      consentTemplateId: 'PROFILE',
      profileTag: {
        allowInsecureCookies: false,
      },
    },
  };
}
