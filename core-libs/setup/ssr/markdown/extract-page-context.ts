/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { decodeHTML } from 'entities';
import {
  findAllElements,
  findFirstElement,
  getAttribute,
  getTextContent,
  type HtmlNode,
  parseDocument,
} from './html-dom';

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
 * Relies on stable Spartacus/SEO landmarks, not heuristics. The HTML is
 * parsed once with parse5; parse5 decodes HTML entities in element text and
 * attribute values, so only `<script>` JSON-LD (raw text) is decoded manually.
 */
export function extractPageContext(html: string): PageContext {
  const doc = parseDocument(html);
  const jsonLd = extractJsonLd(doc);
  return {
    siteName: extractSiteName(doc, jsonLd),
    title: extractTitle(doc),
    canonicalUrl: extractCanonical(doc),
    breadcrumb: extractBreadcrumb(doc, jsonLd),
    description: extractDescription(doc),
    jsonLd,
  };
}

function extractTitle(doc: HtmlNode): string | undefined {
  const el = findFirstElement(doc, 'title');
  return el ? getTextContent(el).trim() || undefined : undefined;
}

function extractCanonical(doc: HtmlNode): string | undefined {
  const link = findAllElements(doc, 'link').find(
    (l) => getAttribute(l, 'rel') === 'canonical'
  );
  // parse5 already decodes character references in attribute values.
  return link ? getAttribute(link, 'href') : undefined;
}

function metaContent(
  doc: HtmlNode,
  attr: 'name' | 'property',
  value: string
): string | undefined {
  const meta = findAllElements(doc, 'meta').find(
    (m) => getAttribute(m, attr) === value
  );
  const content = meta && getAttribute(meta, 'content');
  return content ? content.trim() || undefined : undefined;
}

function extractDescription(doc: HtmlNode): string | undefined {
  return metaContent(doc, 'name', 'description');
}

function extractOgSiteName(doc: HtmlNode): string | undefined {
  return metaContent(doc, 'property', 'og:site_name');
}

function extractBreadcrumb(
  doc: HtmlNode,
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  return breadcrumbFromParsedJsonLd(jsonLd) ?? breadcrumbFromDom(doc);
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

function breadcrumbFromDom(doc: HtmlNode): string | undefined {
  const container = findFirstElement(doc, 'cx-breadcrumb');
  if (!container) {
    return undefined;
  }
  // Label text is taken verbatim (parse5 decodes HTML entities, nested tags
  // drop out as non-text nodes). Percent sequences are left literal.
  const names = findAllElements(container, 'a')
    .map((a) => getTextContent(a).trim())
    .filter((n) => n.length > 0);
  return names.length ? names.join(' / ') : undefined;
}

function extractSiteName(
  doc: HtmlNode,
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  return extractOgSiteName(doc) ?? extractJsonLdSiteName(jsonLd);
}

function extractJsonLdSiteName(
  jsonLd?: Record<string, unknown>[]
): string | undefined {
  const site = jsonLd?.find(
    (item) => item['@type'] === 'WebSite' && typeof item['name'] === 'string'
  );
  return site ? (site['name'] as string).trim() || undefined : undefined;
}

function extractJsonLd(doc: HtmlNode): Record<string, unknown>[] | undefined {
  const scripts = findAllElements(doc, 'script').filter(
    (s) => getAttribute(s, 'id') === 'json-ld'
  );
  const results = scripts.flatMap((script) => {
    try {
      // `<script>` content is raw text in HTML, so parse5 does not decode its
      // entities — the SSR output HTML-escapes the JSON, decode it back first.
      const raw = decodeHTML(getTextContent(script)).trim();
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
