/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { environment } from 'projects/storefrontapp/src/environments/environment';
import { CdsConfig } from './cds-config';

export function defaultCdsConfigFactory(): CdsConfig {
  
  const sciEnabled = environment.sciEnabled;
  
  return {
    cds: {
      tenant: '',
      baseUrl: '',
      endpoints: {
        strategyProducts: sciEnabled
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
        sciEnabled: sciEnabled,
      },
    },
  };
}