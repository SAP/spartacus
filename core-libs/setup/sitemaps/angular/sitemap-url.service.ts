/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SemanticPathService } from '@spartacus/core';

/**
 * Angular service for generating sitemap URLs.
 * Uses SemanticPathService to ensure URLs match the application's routing configuration.
 *
 * This service should be used on the server side (SSR) to generate sitemaps
 * that are consistent with the storefront's routing.
 */
@Injectable({ providedIn: 'root' })
export class SitemapUrlService {
  protected semanticPathService = inject(SemanticPathService);
  protected platformId = inject(PLATFORM_ID);

  /**
   * Checks if running on server (SSR)
   */
  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  /**
   * Generates a product URL using SemanticPathService.
   * This ensures the URL matches the application's routing configuration.
   *
   * @param productCode - Product code
   * @param productName - Optional product name for SEO-friendly URLs
   * @returns Array of URL segments (can be joined with '/')
   */
  getProductUrl(productCode: string, productName?: string): string[] {
    return this.semanticPathService.transform({
      cxRoute: 'product',
      params: { code: productCode, name: productName },
    });
  }

  /**
   * Generates a category URL using SemanticPathService.
   *
   * @param categoryCode - Category code
   * @returns Array of URL segments
   */
  getCategoryUrl(categoryCode: string): string[] {
    return this.semanticPathService.transform({
      cxRoute: 'category',
      params: { code: categoryCode },
    });
  }

  /**
   * Generates a search URL using SemanticPathService.
   *
   * @param query - Search query
   * @returns Array of URL segments
   */
  getSearchUrl(query: string): string[] {
    return this.semanticPathService.transform({
      cxRoute: 'search',
      params: { query },
    });
  }

  /**
   * Generates any route URL using SemanticPathService.
   *
   * @param routeName - Name of the route (e.g., 'product', 'category', 'home')
   * @param params - Route parameters
   * @returns Array of URL segments
   */
  getRouteUrl(routeName: string, params?: Record<string, string>): string[] {
    return this.semanticPathService.transform({
      cxRoute: routeName,
      params,
    });
  }

  /**
   * Converts URL segments to a full path string.
   *
   * @param segments - URL segments from getProductUrl, getCategoryUrl, etc.
   * @returns Full path string (e.g., '/product/123/camera')
   */
  segmentsToPath(segments: string[]): string {
    return segments.join('/').replace(/\/+/g, '/');
  }

  /**
   * Generates a full URL with base URL.
   *
   * @param baseUrl - Base URL of the site (e.g., 'https://example.com')
   * @param segments - URL segments
   * @returns Full URL string
   */
  getFullUrl(baseUrl: string, segments: string[]): string {
    const path = this.segmentsToPath(segments);
    return `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}

