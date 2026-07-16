/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Server options
 */
export interface ServerOptions {
  /**
   * Specify a domain (origin) from which the HTTP requests are being made.
   * Should be without the trailing slash, e.g. "https://my.domain.com".
   *
   * In SSR mode, it will be automatically resolved from the express server,
   * therefore it doesn't have to be set via this option.
   * If explicitly set, this option will take precedence over the express server.
   *
   * It is _mandatory_ to provide it for the prerendering, as it can not be
   * automatically resolved.
   */
  serverRequestOrigin?: string;

  /**
   * Optional allowlist of trusted origins used as an additional (defense-in-depth)
   * check when the request origin is resolved from the incoming request
   * (i.e. from the `Host` / `X-Forwarded-Host` headers) in SSR mode.
   *
   * Each entry must be a full origin (`protocol://host`) without a trailing
   * slash, e.g. `"https://my.domain.com"`. Matching is case-insensitive.
   *
   * A `*` wildcard matches exactly one host label: it never crosses a dot and
   * never matches the apex domain. One or more wildcards are allowed, e.g.
   * `"https://*.my.domain.com"` matches `"https://shop.my.domain.com"` but
   * neither `"https://my.domain.com"` (apex) nor `"https://a.b.my.domain.com"`
   * (two labels).
   *
   * Entries are not validated or normalized: a malformed entry (wrong protocol,
   * trailing slash, etc.) is not rejected — it simply never matches, and such a
   * request falls back to the first entry (see below).
   *
   * ### Behavior
   * - **When NOT set (default), or set to an empty array:** Spartacus does _not_
   *   perform any host allowlisting. The resolved origin is trusted as delivered
   *   by the (trusted) reverse proxy, gated only by Express' `trust proxy`
   *   setting. This preserves the existing behavior and keeps trusting the CCv2
   *   reverse proxy.
   * - **When set to a non-empty array:** if the resolved origin does not match
   *   any entry, Spartacus falls back to the first entry in this list instead of
   *   reflecting the incoming (potentially spoofed) host. This mitigates Host
   *   header injection and shared-cache poisoning for deployments that _do_ know
   *   their set of valid domains. List the primary/canonical domain first, since
   *   it is used as the fallback.
   *
   * @remarks
   * This is intentionally opt-in. Spartacus can not know which hosts are valid
   * for a given deployment, so the allowlist must be provided by the operator.
   * It is _not_ a replacement for correctly configuring `trust proxy` and the
   * reverse proxy / edge — it is an extra guardrail at the point where the
   * origin is consumed.
   */
  allowedOrigins?: string[];
}
