/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { convertRegExpJavaToJs } from '@spartacus/core';
import {
  BaseSiteResolver,
  BaseSiteResolverOptions,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { extractOccBaseUrlFromHtml } from './occ-base-url-extractor';

const DEFAULT_CACHE_TTL_MS = 60_000;
const DEFAULT_TIMEOUT_MS = 3_000;

interface OccBaseSite {
  uid?: string;
  urlPatterns?: string[];
}

interface FetchedBaseSites {
  sites: OccBaseSite[];
  cacheable: boolean;
}

export class DefaultBaseSiteResolver implements BaseSiteResolver {
  public readonly supportsOccResolution: boolean;

  protected readonly uidSet: Set<string>;
  protected readonly occUrl: string | null;
  protected readonly cacheTtlMs: number;
  protected readonly concurrencyLimit: number;
  protected readonly timeoutMs: number;
  protected cachedSites: OccBaseSite[] | null = null;
  protected cachedAt = 0;
  protected initPromise: Promise<FetchedBaseSites> | null = null;
  protected inFlight = 0;

  public constructor(options: BaseSiteResolverOptions) {
    const occBaseUrl =
      extractOccBaseUrlFromHtml(options.indexHtml) ?? options.occBaseUrl;

    this.uidSet = new Set(options.pathBaseSiteIds ?? []);
    this.occUrl = this.createOccBaseSitesUrl(occBaseUrl);
    this.supportsOccResolution = this.uidSet.size === 0;
    this.cacheTtlMs = options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
    this.concurrencyLimit = options.concurrencyLimit ?? 10;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  public resolveFromPath(requestUrl: string): string | null {
    const { pathname } = new URL(requestUrl);
    const segment = pathname.split('/').find((s) => s.length > 0) ?? null;
    return segment !== null && this.uidSet.has(segment) ? segment : null;
  }

  public async resolveFromOcc(
    requestUrl: string,
    pathBaseSiteId?: string
  ): Promise<string | null> {
    const sites = await this.getSites();
    const matchedSite = sites.find((site) =>
      (pathBaseSiteId === undefined || site.uid === pathBaseSiteId) &&
      site.urlPatterns?.some(
        (pattern) => convertRegExpJavaToJs(pattern)?.test(requestUrl) ?? false
      )
    );
    return matchedSite?.uid ?? null;
  }

  protected createOccBaseSitesUrl(baseUrl?: string): string | null {
    return baseUrl
      ? `${baseUrl.replace(/\/+$/, '')}/occ/v2/basesites?fields=FULL`
      : null;
  }

  protected isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  protected isOccBaseSite(value: unknown): value is OccBaseSite {
    if (!this.isRecord(value)) {
      return false;
    }

    const uid = value['uid'];
    const urlPatterns = value['urlPatterns'];
    return (
      (uid === undefined || typeof uid === 'string') &&
      (urlPatterns === undefined ||
        (Array.isArray(urlPatterns) &&
          urlPatterns.every((pattern) => typeof pattern === 'string')))
    );
  }

  protected malformedOccResponse(): OccUnavailableError {
    return new OccUnavailableError('OCC base-sites response is malformed');
  }

  protected async getSites(): Promise<OccBaseSite[]> {
    if (
      this.cachedSites !== null &&
      Date.now() - this.cachedAt < this.cacheTtlMs
    ) {
      return this.cachedSites;
    }

    if (this.inFlight >= this.concurrencyLimit) {
      throw new ConcurrencyLimitError();
    }
    this.inFlight++;

    try {
      this.initPromise ??= this.fetchSites()
        .then((result) => {
          if (result.cacheable) {
            this.cachedSites = result.sites;
            this.cachedAt = Date.now();
          }
          return result;
        })
        .finally(() => {
          this.initPromise = null;
        });
      return (await this.initPromise).sites;
    } finally {
      this.inFlight--;
    }
  }

  protected async fetchSites(): Promise<FetchedBaseSites> {
    const occUrl = this.occUrl;
    if (!occUrl) {
      throw new OccUnavailableError('OCC base URL is not configured');
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(occUrl, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) {
        try {
          await response.body?.cancel();
        } catch {
          // Preserve the HTTP status failure when body cleanup also fails.
        }
        throw new OccUnavailableError(
          `OCC base-sites request failed with status ${response.status}`
        );
      }
      const body = (await response.json()) as unknown;
      if (!this.isRecord(body)) {
        throw this.malformedOccResponse();
      }
      const baseSites = body['baseSites'];
      if (baseSites === undefined) {
        return { sites: [], cacheable: false };
      }
      if (
        !Array.isArray(baseSites) ||
        !baseSites.every((baseSite) => this.isOccBaseSite(baseSite))
      ) {
        throw this.malformedOccResponse();
      }
      return {
        sites: baseSites.map(({ uid, urlPatterns }) => ({ uid, urlPatterns })),
        cacheable: true,
      };
    } catch (error) {
      if (error instanceof OccUnavailableError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new OccUnavailableError(
          `OCC base-sites request timed out after ${this.timeoutMs} ms`,
          { cause: error }
        );
      }
      throw new OccUnavailableError('OCC base-sites request failed', {
        cause: error,
      });
    } finally {
      clearTimeout(timeout);
    }
  }
}
