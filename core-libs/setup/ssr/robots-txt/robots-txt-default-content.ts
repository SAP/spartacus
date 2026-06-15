/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Default robots.txt content for Spartacus storefronts.
 *
 * Disallows transactional/session-specific paths for all crawlers.
 * Includes explicit entries for major AI crawlers.
 *
 * Merchants should override this to set their own AI crawler policy
 * (e.g. disallowing GPTBot for training, adding Content-Signal directives).
 */
export const DEFAULT_ROBOTS_TXT_CONTENT = `# Spartacus default robots.txt

User-agent: *
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /order/
Disallow: /admin/
Disallow: /*?*facet=
Disallow: /*?*currentPage=
Disallow: /*?*sortCode=

# AI search / grounding crawlers

User-agent: OAI-SearchBot
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /order/

User-agent: ChatGPT-User
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/

User-agent: PerplexityBot
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /order/

User-agent: Claude-SearchBot
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/

# AI training crawlers

User-agent: GPTBot
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /order/

User-agent: ClaudeBot
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/

User-agent: Google-Extended
Allow: /

Sitemap: /sitemap.xml
`;
