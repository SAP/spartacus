/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { RoutesConfig } from '../services/url-path.service';
import { RoutingConfig } from '@spartacus/core';

/**
 * Shared state between Angular SSR and Express server.
 * This allows Angular to export its routing configuration
 * to be used by Express for sitemap generation.
 *
 * This is a singleton that exists in the Node.js process memory,
 * accessible from both Angular SSR context and Express middleware.
 */
export interface SitemapSharedState {
  /**
   * Routing configuration extracted from Angular's RoutingConfig.
   * Contains route paths and parameter mappings.
   */
  routingConfig: RoutingConfig | null;

  /**
   * URL encoding parameters (e.g., ['baseSite', 'language', 'currency'])
   * extracted from SiteContextParamsService.
   */
  urlEncodingParams: string[] | null;

  /**
   * Whether the state has been initialized by Angular.
   */
  isReady: boolean;

  /**
   * Timestamp of last update.
   */
  lastUpdated: number | null;

  /**
   * Subscribers waiting for the state to be ready.
   */
  subscribers: Array<(state: SitemapSharedState) => void>;
}

/**
 * Global shared state instance.
 * Accessible from both Angular and Express contexts.
 */
export const SITEMAP_SHARED_STATE: SitemapSharedState = {
  routingConfig: null,
  urlEncodingParams: null,
  isReady: false,
  lastUpdated: null,
  subscribers: [],
};

/**
 * Waits for the sitemap state to be ready.
 * Resolves immediately if already ready, otherwise waits for Angular to initialize it.
 *
 * @param timeout - Maximum time to wait in milliseconds (default: 30000)
 * @returns Promise that resolves with the shared state
 */
export function waitForSitemapState(timeout = 30000): Promise<SitemapSharedState> {
  if (SITEMAP_SHARED_STATE.isReady) {
    return Promise.resolve(SITEMAP_SHARED_STATE);
  }

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const index = SITEMAP_SHARED_STATE.subscribers.indexOf(resolve);
      if (index > -1) {
        SITEMAP_SHARED_STATE.subscribers.splice(index, 1);
      }
      reject(new Error(`Sitemap state initialization timed out after ${timeout}ms`));
    }, timeout);

    SITEMAP_SHARED_STATE.subscribers.push((state) => {
      clearTimeout(timeoutId);
      resolve(state);
    });
  });
}

/**
 * Updates the shared state with routing configuration.
 * Called from Angular context after bootstrap.
 *
 * @param config - Routing configuration from RoutingConfig
 * @param urlEncodingParams - URL encoding parameters
 */
export function updateSitemapState(
  config: RoutingConfig | undefined,
  urlEncodingParams: string[] | undefined
): void {
  SITEMAP_SHARED_STATE.routingConfig = config ?? null;
  SITEMAP_SHARED_STATE.urlEncodingParams = urlEncodingParams ?? null;
  SITEMAP_SHARED_STATE.isReady = true;
  SITEMAP_SHARED_STATE.lastUpdated = Date.now();

  // Notify all subscribers
  const subscribers = [...SITEMAP_SHARED_STATE.subscribers];
  SITEMAP_SHARED_STATE.subscribers = [];
  subscribers.forEach((fn) => fn(SITEMAP_SHARED_STATE));

  console.log('[Sitemap] Shared state updated from Angular context');
  console.log(`[Sitemap] Routes: ${Object.keys(config ?? {}).join(', ')}`);
  console.log(`[Sitemap] URL params: ${urlEncodingParams?.join(', ') ?? 'none'}`);
}

/**
 * Resets the shared state. Useful for testing.
 */
export function resetSitemapState(): void {
  SITEMAP_SHARED_STATE.routingConfig = null;
  SITEMAP_SHARED_STATE.urlEncodingParams = null;
  SITEMAP_SHARED_STATE.isReady = false;
  SITEMAP_SHARED_STATE.lastUpdated = null;
  SITEMAP_SHARED_STATE.subscribers = [];
}

