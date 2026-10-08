/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  DefaultBaseSiteResolverOptions,
  OccUnavailableError,
} from './base-site-resolver';
import { toJsRegExp } from './to-js-reg-exp';

interface OccBaseSite {
  uid?: string;
  urlPatterns?: string[];
}

interface FetchedBaseSites {
  sites: OccBaseSite[];
  cacheable: boolean;
}

export class DefaultBaseSiteResolver implements BaseSiteResolver {
  private readonly occUrl: string;
  private readonly defaultBaseSite: string | null;
  private readonly cacheTtlMs: number;
  private readonly concurrencyLimit: number;
  private readonly timeoutMs: number;

  private cachedSites: OccBaseSite[] | null = null;
  private cachedAt = 0;
  private initPromise: Promise<FetchedBaseSites> | null = null;
  private inFlight = 0;

  constructor(options: DefaultBaseSiteResolverOptions) {
    const baseUrl = options.occBaseUrl.replace(/\/+$/, '');
    const prefix = (options.occApiPrefix ?? '/occ/v2').replace(
      /^\/+|\/+$/g,
      ''
    );
    this.occUrl = `${baseUrl}/${prefix}/basesites?fields=FULL`;
    this.defaultBaseSite = options.defaultBaseSite ?? null;
    this.cacheTtlMs = options.cacheTtlMs ?? 60_000;
    this.concurrencyLimit = options.concurrencyLimit ?? 10;
    this.timeoutMs = options.timeoutMs ?? 3_000;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    const sites = await this.getSites();
    const matchedSite = sites.find((site) =>
      site.urlPatterns?.some(
        (pattern) => toJsRegExp(pattern)?.test(requestUrl) ?? false
      )
    );

    return matchedSite?.uid ?? this.defaultBaseSite;
  }

  private async getSites(): Promise<OccBaseSite[]> {
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
      if (!this.initPromise) {
        this.initPromise = this.fetchSites()
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
      }
      return (await this.initPromise).sites;
    } finally {
      this.inFlight--;
    }
  }

  private async fetchSites(): Promise<FetchedBaseSites> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.occUrl, {
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
      if (!isRecord(body)) {
        throw malformedOccResponse();
      }
      const baseSites = body['baseSites'];
      if (baseSites === undefined) {
        return { sites: [], cacheable: false };
      }
      if (!Array.isArray(baseSites) || !baseSites.every(isOccBaseSite)) {
        throw malformedOccResponse();
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isOccBaseSite(value: unknown): value is OccBaseSite {
  if (!isRecord(value)) {
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

function malformedOccResponse(): OccUnavailableError {
  return new OccUnavailableError('OCC base-sites response is malformed');
}
