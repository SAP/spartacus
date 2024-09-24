/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureToggles, PageMetaConfig } from '@spartacus/core';
import { inject } from '@angular/core';

export function defaultPageMetaFactory(): PageMetaConfig {
  const featureToggles = inject(FeatureToggles);

  return {
    pageMeta: {
      resolvers: [
        {
          property: 'title',
          method: 'resolveTitle',
        },
        {
          property: 'heading',
          method: 'resolveHeading',
        },
        {
          property: 'breadcrumbs',
          method: 'resolveBreadcrumbs',
        },
        {
          property: 'description',
          method: 'resolveDescription',
          disabledInCsr:
            !featureToggles.enableByDefaultMetaDescriptionAndCanonicalUrlInCsr,
        },
        {
          property: 'image',
          method: 'resolveImage',
          disabledInCsr: true,
        },
        {
          property: 'robots',
          method: 'resolveRobots',
          disabledInCsr: true,
        },
        {
          property: 'canonicalUrl',
          method: 'resolveCanonicalUrl',
          disabledInCsr:
            !featureToggles.enableByDefaultMetaDescriptionAndCanonicalUrlInCsr,
        },
      ],
      canonicalUrl: {
        forceHttps: true,
        forceWww: false,
        removeQueryParams: true,
        forceTrailingSlash: true,
      },
    },
  };
}
