/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** General example robots.txt content for a Spartacus storefront. */
export const EXAMPLE_ROBOTS_TXT = `# SAP Spartacus example robots.txt.
# Adapt paths to your storefront's routing and URL prefixes.
# This example permits all crawlers, including AI crawlers, on other paths.

User-agent: *

# Cart: the page, its subpaths, and URLs with query parameters.
Disallow: /cart$
Disallow: /cart/
Disallow: /cart?

# Cart under a base-site prefix.
Disallow: /*/cart$
Disallow: /*/cart/
Disallow: /*/cart?

# Checkout.
Disallow: /checkout$
Disallow: /checkout/
Disallow: /checkout?

# Customer account.
Disallow: /my-account$
Disallow: /my-account/
Disallow: /my-account?

# All customer-account pages under a base-site prefix.
Disallow: /*/my-account$
Disallow: /*/my-account/
Disallow: /*/my-account?
`;
