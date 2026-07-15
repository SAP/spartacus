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
   * Each entry must be a full origin without a trailing slash, e.g.
   * `"https://my.domain.com"`. A single leading-label wildcard is supported to
   * match subdomains, e.g. `"https://*.my.domain.com"`.
   *
   * ### Behavior
   * - **When NOT set (default):** Spartacus does _not_ perform any host
   *   allowlisting. The resolved origin is trusted as delivered by the
   *   (trusted) reverse proxy, gated only by Express' `trust proxy` setting.
   *   This preserves the existing behavior and keeps trusting the CCv2
   *   reverse proxy.
   * - **When set:** if the resolved origin does not match any entry, Spartacus
   *   falls back to the first entry in this list instead of reflecting the
   *   incoming (potentially spoofed) host. This mitigates Host header injection
   *   and shared-cache poisoning for deployments that _do_ know their set of
   *   valid domains.
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
