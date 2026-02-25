/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageMetaConfig } from './page-meta.config';

export const defaultPageMetaConfig: PageMetaConfig = {
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
      },
      {
        property: 'image',
        method: 'resolveImage',
      },
      {
        property: 'robots',
        method: 'resolveRobots',
      },
      {
        property: 'canonicalUrl',
        method: 'resolveCanonicalUrl',
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
