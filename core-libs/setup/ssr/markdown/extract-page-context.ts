/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Compact "where are we" context extracted from a rendered SSR page.
 */
export interface PageContext {
  /** Site/brand name from `og:site_name` meta or a `WebSite` JSON-LD entry. */
  siteName?: string;
  title?: string;
  canonicalUrl?: string;
  breadcrumb?: string;
  /** Value of the `<meta name="description">` tag. */
  description?: string;
  /** All JSON-LD objects found in `<script id="json-ld">` (parsed, decoded). */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Extracts page-context landmarks from a rendered SSR HTML string.
 * Relies on stable Spartacus/SEO landmarks, not heuristics.
 */
export function extractPageContext(html: string): PageContext {
  const jsonLd = extractJsonLd(html);
  return {
    siteName: extractSiteName(html, jsonLd),
    title: extractTitle(html),
    canonicalUrl: extractCanonical(html),
    breadcrumb: extractBreadcrumb(html, jsonLd),
    description: extractDescription(html),
    jsonLd,
  };
}

function extractTitle(html: string): string | undefined {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return match ? decodeEntities(match[1]).trim() || undefined : undefined;
}

function extractCanonical(html: string): string | undefined {
  const link = /<link\b[^>]*\brel=["']canonical["'][^>]*>/i.exec(html);
  if (!link) {
    return undefined;
  }
  const href = /\bhref=["']([^"']*)["']/i.exec(link[0]);
  return href ? href[1] : undefined;
}

function extractBreadcrumb(
  html: string,
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  return breadcrumbFromParsedJsonLd(jsonLd) ?? breadcrumbFromDom(html);
}

interface BreadcrumbList extends Record<string, unknown> {
  '@type': string;
  itemListElement: Array<{ name?: string; item?: { name?: string } }>;
}

function breadcrumbFromParsedJsonLd(
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  const list = jsonLd?.find(
    (n): n is BreadcrumbList =>
      n['@type'] === 'BreadcrumbList' && Array.isArray(n['itemListElement'])
  );
  const names = (list?.itemListElement ?? [])
    .map((el) => el?.name ?? el?.item?.name)
    .filter((n): n is string => typeof n === 'string' && n.length > 0);
  return names.length ? names.join(' / ') : undefined;
}

function breadcrumbFromDom(html: string): string | undefined {
  const container = /<cx-breadcrumb\b[^>]*>([\s\S]*?)<\/cx-breadcrumb>/i.exec(
    html
  );
  if (!container) {
    return undefined;
  }
  const anchors = [...container[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  const names = anchors
    .map((m) => {
      const raw = decodeEntities(stripTags(m[1])).trim();
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    })
    .filter((n) => n.length > 0);
  return names.length ? names.join(' / ') : undefined;
}

function extractSiteName(
  html: string,
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  return extractOgSiteName(html) ?? extractJsonLdSiteName(jsonLd);
}

function extractOgSiteName(html: string): string | undefined {
  const ogTag = /<meta\b[^>]*\bproperty=["']og:site_name["'][^>]*>/i.exec(html);
  const content = ogTag
    ? /\bcontent=["']([^"']*)["']/i.exec(ogTag[0])
    : null;
  return content ? decodeEntities(content[1]).trim() || undefined : undefined;
}

function extractJsonLdSiteName(
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  const site = jsonLd?.find(
    (item) =>
      item['@type'] === 'WebSite' && typeof item['name'] === 'string'
  );
  return site ? (site['name'] as string).trim() || undefined : undefined;
}

function extractDescription(html: string): string | undefined {
  const tag = /<meta\b[^>]*\bname=["']description["'][^>]*>/i.exec(html);
  if (!tag) {
    return undefined;
  }
  const content = /\bcontent=["']([^"']*)["']/i.exec(tag[0]);
  return content ? decodeEntities(content[1]).trim() || undefined : undefined;
}

function extractJsonLd(html: string): Record<string, unknown>[] | undefined {
  const matches = [
    ...html.matchAll(
      /<script\b[^>]*id=["']json-ld["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];
  const results = matches.flatMap((match) => {
    try {
      const raw = decodeEntities(match[1]).trim();
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed as Record<string, unknown>[];
      }
      if (parsed && typeof parsed === 'object') {
        return [parsed as Record<string, unknown>];
      }
    } catch {
      // skip malformed JSON-LD
    }
    return [];
  });
  return results.length ? results : undefined;
}

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

function decodeEntities(input: string): string {
  return input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}
