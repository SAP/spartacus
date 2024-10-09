/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { CdsConfig } from './cds-config';
import { FeatureToggles } from '@spartacus/core';

export function defaultCdsConfigFactory(): CdsConfig {
  const featureToggles = inject(FeatureToggles);
  return {
    cds: {
      tenant: '',
      baseUrl: '',
      endpoints: {
        strategyProducts: featureToggles.cdsCasEnabled
        ? '/strategy/v1/sites/${baseSite}/strategies/${strategyId}/products'
        : '/strategy/${tenant}/strategies/${strategyId}/products',
        searchIntelligence:
        '/search-intelligence/v1/sites/${cdsSiteId}/trendingSearches',
      },
      merchandising: {
        defaultCarouselViewportThreshold: 80,
      },
      consentTemplateId: 'PROFILE',
      profileTag: {
        allowInsecureCookies: false,
      },
    },
  }
};
