/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared state between Angular SSR and Express server for sitemap generation.
 *
 * ## How it works
 *
 * Angular generates complete sitemap XML files during SSR bootstrap
 * and stores the result here. Express middleware reads this state
 * to serve pre-generated sitemaps.
 *
 * This is a singleton in Node.js process memory, accessible from
 * both Angular SSR context and Express middleware.
 */
export interface SitemapSharedState {
  /**
   * Whether sitemaps have been generated.
   */
  isReady: boolean;

  /**
   * Whether generation is currently in progress.
   */
  isGenerating: boolean;

  /**
   * Timestamp of last successful generation.
   */
  lastUpdated: number | null;

  /**
   * Generated sitemap XML content, keyed by filename.
   * e.g., { 'sitemap.xml': '<?xml ...', 'sitemap-products-en.xml': '<?xml ...' }
   */
  sitemaps: Record<string, string>;

  /**
   * List of generated sitemap filenames (excluding the index).
   */
  sitemapFiles: string[];

  /**
   * Total number of URLs across all sitemaps.
   */
  totalUrls: number;

  /**
   * URLs per language statistics.
   */
  urlsByLanguage: Record<string, number>;

  /**
   * Error message if generation failed.
   */
  error: string | null;

  /**
   * Subscribers waiting for the state to be ready.
   */
  _subscribers: Array<(state: SitemapSharedState) => void>;
}

/**
 * Global shared state instance.
 * Accessible from both Angular and Express contexts.
 */
export const SITEMAP_SHARED_STATE: SitemapSharedState = {
  isReady: false,
  isGenerating: false,
  lastUpdated: null,
  sitemaps: {},
  sitemapFiles: [],
  totalUrls: 0,
  urlsByLanguage: {},
  error: null,
  _subscribers: [],
};

/**
 * Waits for sitemaps to be generated.
 * Resolves immediately if already ready, otherwise waits for Angular to generate them.
 *
 * @param timeout - Maximum time to wait in milliseconds (default: 60000)
 * @returns Promise that resolves with the shared state
 */
export function waitForSitemapReady(timeout = 60000): Promise<SitemapSharedState> {
  if (SITEMAP_SHARED_STATE.isReady) {
    return Promise.resolve(SITEMAP_SHARED_STATE);
  }

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const index = SITEMAP_SHARED_STATE._subscribers.indexOf(resolve);
      if (index > -1) {
        SITEMAP_SHARED_STATE._subscribers.splice(index, 1);
      }
      reject(new Error(`Sitemap generation timed out after ${timeout}ms. Ensure at least one SSR render has completed.`));
    }, timeout);

    SITEMAP_SHARED_STATE._subscribers.push((state) => {
      clearTimeout(timeoutId);
      resolve(state);
    });
  });
}

/**
 * Updates the shared state with generated sitemap data.
 * Called from Angular context after sitemap generation completes.
 *
 * @param sitemaps - Map of filename to XML content
 * @param sitemapFiles - List of sitemap filenames
 * @param totalUrls - Total URL count
 * @param urlsByLanguage - URLs per language
 */
export function updateSitemapState(
  sitemaps: Record<string, string>,
  sitemapFiles: string[],
  totalUrls: number,
  urlsByLanguage: Record<string, number>,
): void {
  SITEMAP_SHARED_STATE.sitemaps = sitemaps;
  SITEMAP_SHARED_STATE.sitemapFiles = sitemapFiles;
  SITEMAP_SHARED_STATE.totalUrls = totalUrls;
  SITEMAP_SHARED_STATE.urlsByLanguage = urlsByLanguage;
  SITEMAP_SHARED_STATE.isReady = true;
  SITEMAP_SHARED_STATE.isGenerating = false;
  SITEMAP_SHARED_STATE.lastUpdated = Date.now();
  SITEMAP_SHARED_STATE.error = null;

  // Notify all subscribers
  const subscribers = [...SITEMAP_SHARED_STATE._subscribers];
  SITEMAP_SHARED_STATE._subscribers = [];
  subscribers.forEach((fn) => fn(SITEMAP_SHARED_STATE));

  console.log(`[Sitemap] Shared state updated: ${sitemapFiles.length} sitemaps, ${totalUrls} URLs`);
}

/**
 * Marks generation as started.
 */
export function markSitemapGenerating(): void {
  SITEMAP_SHARED_STATE.isGenerating = true;
}

/**
 * Marks generation as failed.
 */
export function markSitemapError(error: string): void {
  SITEMAP_SHARED_STATE.isGenerating = false;
  SITEMAP_SHARED_STATE.error = error;
}

/**
 * Resets the shared state. Useful for testing.
 */
export function resetSitemapState(): void {
  SITEMAP_SHARED_STATE.isReady = false;
  SITEMAP_SHARED_STATE.isGenerating = false;
  SITEMAP_SHARED_STATE.lastUpdated = null;
  SITEMAP_SHARED_STATE.sitemaps = {};
  SITEMAP_SHARED_STATE.sitemapFiles = [];
  SITEMAP_SHARED_STATE.totalUrls = 0;
  SITEMAP_SHARED_STATE.urlsByLanguage = {};
  SITEMAP_SHARED_STATE.error = null;
  SITEMAP_SHARED_STATE._subscribers = [];
}
