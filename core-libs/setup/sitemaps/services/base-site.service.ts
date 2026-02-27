/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Language configuration from OCC basesites API
 */
export interface BaseSiteLanguage {
  isocode: string;
  name?: string;
  nativeName?: string;
  active?: boolean;
}

/**
 * Currency configuration from OCC basesites API
 */
export interface BaseSiteCurrency {
  isocode: string;
  name?: string;
  symbol?: string;
  active?: boolean;
}

/**
 * Store configuration from OCC basesites API
 */
export interface BaseSiteStore {
  languages?: BaseSiteLanguage[];
  currencies?: BaseSiteCurrency[];
  defaultLanguage?: BaseSiteLanguage;
  defaultCurrency?: BaseSiteCurrency;
}

/**
 * Base site configuration from OCC basesites API
 */
export interface BaseSite {
  uid: string;
  name?: string;
  channel?: string;
  defaultLanguage?: BaseSiteLanguage;
  defaultPreviewCatalogId?: string;
  urlPatterns?: string[];
  urlEncodingAttributes?: string[];
  /**
   * Stores contain language and currency configuration
   */
  stores?: BaseSiteStore[];
  theme?: string;
}

/**
 * OCC basesites API response
 */
export interface BaseSitesResponse {
  baseSites?: BaseSite[];
}

/**
 * Service for fetching base site configuration from OCC API.
 * Provides information about available languages, currencies, and URL patterns.
 *
 * Note: Languages and currencies are stored in stores[0], not directly on baseSite.
 */
export class BaseSiteService {
  protected cachedBaseSites: BaseSite[] | null = null;

  constructor(protected occBaseUrl: string) {}

  /**
   * Fetches all base sites from OCC API.
   * Results are cached after first call.
   */
  async getBaseSites(): Promise<BaseSite[]> {
    if (this.cachedBaseSites) {
      return this.cachedBaseSites;
    }

    const url = `${this.occBaseUrl}/occ/v2/basesites?fields=FULL`;

    try {
      console.log(`[Sitemap] BaseSiteService: Fetching base sites from ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`[Sitemap] BaseSiteService: Failed to fetch base sites. Status: ${response.status}`);
        return [];
      }

      const data: BaseSitesResponse = await response.json();
      this.cachedBaseSites = data.baseSites || [];

      console.log(`[Sitemap] BaseSiteService: Found ${this.cachedBaseSites.length} base site(s)`);

      return this.cachedBaseSites;
    } catch (error) {
      console.error(`[Sitemap] BaseSiteService: Error fetching base sites:`, error);
      return [];
    }
  }

  /**
   * Gets a specific base site by UID.
   */
  async getBaseSite(siteUid: string): Promise<BaseSite | undefined> {
    const sites = await this.getBaseSites();
    return sites.find((site) => site.uid === siteUid);
  }

  /**
   * Gets the first store for a base site.
   * Languages and currencies are typically on the store, not the site.
   */
  protected async getFirstStore(siteUid: string): Promise<BaseSiteStore | undefined> {
    const site = await this.getBaseSite(siteUid);
    return site?.stores?.[0];
  }

  /**
   * Gets all active languages for a base site.
   * Languages are stored in stores[0].languages.
   */
  async getLanguages(siteUid: string): Promise<BaseSiteLanguage[]> {
    const store = await this.getFirstStore(siteUid);
    if (!store?.languages) {
      console.warn(`[Sitemap] BaseSiteService: No languages found in stores[0] for site '${siteUid}'`);
      return [];
    }

    const activeLanguages = store.languages.filter((lang) => lang.active !== false);
    console.log(`[Sitemap] BaseSiteService: Found ${activeLanguages.length} active language(s) for '${siteUid}': ${activeLanguages.map(l => l.isocode).join(', ')}`);

    return activeLanguages;
  }

  /**
   * Gets all active currencies for a base site.
   * Currencies are stored in stores[0].currencies.
   */
  async getCurrencies(siteUid: string): Promise<BaseSiteCurrency[]> {
    const store = await this.getFirstStore(siteUid);
    if (!store?.currencies) {
      return [];
    }

    return store.currencies.filter((curr) => curr.active !== false);
  }

  /**
   * Gets the default language for a base site.
   */
  async getDefaultLanguage(siteUid: string): Promise<string> {
    const store = await this.getFirstStore(siteUid);
    return store?.defaultLanguage?.isocode || 'en';
  }

  /**
   * Gets the default currency for a base site.
   */
  async getDefaultCurrency(siteUid: string): Promise<string> {
    const store = await this.getFirstStore(siteUid);
    return store?.defaultCurrency?.isocode || 'USD';
  }

  /**
   * Gets URL encoding attributes for a base site.
   * This determines how language/currency are encoded in URLs.
   */
  async getUrlEncodingAttributes(siteUid: string): Promise<string[]> {
    const site = await this.getBaseSite(siteUid);
    return site?.urlEncodingAttributes || [];
  }

  /**
   * Clears cached base sites (useful for testing or refresh).
   */
  clearCache(): void {
    this.cachedBaseSites = null;
  }
}


