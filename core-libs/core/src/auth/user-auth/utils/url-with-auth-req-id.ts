/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Appends auth_req_id as a query parameter to a URL, supporting both absolute
 * and relative URLs as well as path-against-base resolution.
 *
 * When called with two arguments the first is treated as an absolute or relative
 * URL and the second as the auth_req_id value to append. When called with three
 * arguments the first is a path, the second is the base URL to resolve it against
 * (mirroring the two-argument form of the native URL constructor), and the third
 * is the auth_req_id value.
 *
 * The native URL constructor throws a TypeError for relative URLs and for
 * malformed base values. Relative CSRF endpoints are valid in deployments where
 * auth.baseUrl or backend.occ.baseUrl is not configured as an absolute URL, so
 * a string-concatenation fallback is used in that case. For the path-against-base
 * form a null return signals that the base was malformed, allowing the caller to
 * fall back to a safe alternative rather than navigating to a broken URL.
 *
 * @param urlOrPath an absolute or relative URL, or a path to resolve against base
 * @param baseOrId the auth_req_id value in the two-argument form, or the base URL
 *   against which urlOrPath is resolved in the three-argument form
 * @param authReqId the auth_req_id value in the three-argument form
 * @returns the URL string with auth_req_id appended, or null if the base URL is
 *   malformed in the three-argument form
 */
export function appendAuthReqId(
  urlOrPath: string,
  baseOrId: string,
  authReqId?: string
): string | null {
  if (authReqId === undefined) {
    // Single-argument form: baseOrId IS the auth_req_id.
    return appendToSingleUrl(urlOrPath, baseOrId);
  }
  // Two-argument form: resolve path against base, then append.
  try {
    const resolved = new URL(urlOrPath, baseOrId);
    resolved.searchParams.set('auth_req_id', authReqId);
    return resolved.href;
  } catch {
    // base is malformed — cannot resolve a safe URL.
    return null;
  }
}

function appendToSingleUrl(rawUrl: string, id: string): string {
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.set('auth_req_id', id);
    return parsed.toString();
  } catch {
    // rawUrl is relative — new URL() requires an absolute URL.
    // Append the parameter manually so relative CSRF endpoints still work.
    const sep = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${sep}auth_req_id=${encodeURIComponent(id)}`;
  }
}
