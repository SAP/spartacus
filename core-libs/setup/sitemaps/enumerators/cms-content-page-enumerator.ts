/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';
import { SitemapConfig } from '../config/sitemap-config';

/**
 * Route parameter enumerator for CMS content pages.
 *
 * ## The CMS Page Discovery Problem
 *
 * OCC does not provide a "list all content pages" API. Content pages
 * are loaded on-demand via `/pages?pageLabelOrId=xxx&pageType=ContentPage`.
 * This means we cannot automatically discover all CMS content pages.
 *
 * ## Solution: Explicit Configuration
 *
 * Customers must list their CMS content page labels in the config:
 *
 * ```typescript
 * provideConfig({
 *   sitemap: {
 *     routes: {
 *       cmsContentPageLabels: ['/faq', '/about', '/contact', '/terms'],
 *     },
 *   },
 * } as SitemapConfig)
 * ```
 *
 * This enumerator then generates sitemap entries for each label.
 * CMS content pages typically map to the `content` cxRoute
 * (or are matched by Angular's wildcard route).
 *
 * ## Why not auto-discover?
 *
 * 1. OCC has no bulk content page listing endpoint
 * 2. Content pages in SAP Commerce are often mixed with system pages
 *    (error pages, preview pages) that shouldn't be in sitemaps
 * 3. Customers know their content pages — explicit config is more reliable
 *
 * ## Alternative: Backend Extension
 *
 * For customers who want automatic discovery, they can:
 * 1. Create an OCC extension that lists content pages
 * 2. Create a custom enumerator that calls that extension
 *
 * ```typescript
 * @Injectable()
 * export class CustomCmsPageEnumerator extends RouteParamsEnumerator {
 *   readonly cxRoute = 'content';
 *   async enumerate(ctx) {
 *     const pages = await fetch(`${ctx.occBaseUrl}/my-custom-api/content-pages`);
 *     return { params: pages.map(p => ({ label: p.label })) };
 *   }
 * }
 * ```
 */
@Injectable()
export class CmsContentPageEnumerator extends RouteParamsEnumerator {
  /**
   * Handles the 'content' cxRoute (CMS content pages).
   * Note: Many Spartacus setups don't have a dedicated 'content' route —
   * CMS pages are often served via wildcard routing. In that case,
   * this enumerator won't match any route automatically.
   * The URLs from `cmsContentPageLabels` are still added as static paths.
   */
  readonly cxRoute = '__cms_content_pages__';

  /**
   * CMS page URLs are typically not language-dependent in the path itself
   * (the page label stays the same, only content changes).
   */
  override readonly languageDependent = false;

  protected sitemapConfig = inject(SitemapConfig);

  async enumerate(
    _context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    const labels = this.sitemapConfig.sitemap?.routes?.cmsContentPageLabels ?? [];

    console.log(
      `[Sitemap] CmsContentPageEnumerator: ${labels.length} configured CMS page labels`
    );

    // Each label becomes a param object with a 'label' property.
    // The RoutesDiscoveryService will handle the actual URL construction.
    return {
      params: labels.map((label) => ({ label })),
    };
  }
}

