/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

interface B64EncodingOptions {
  /**
   * Set to `true` for Base 64 Encoding with URL and Filename Safe Alphabet
   *
   * See https://datatracker.ietf.org/doc/html/rfc4648#section-5
   */
  urlSafe?: boolean;
}

export function encodeBase64(
  value: string,
  options?: B64EncodingOptions
): string {
  const binaryString = Array.from(new TextEncoder().encode(value))
    .map((byte) => String.fromCharCode(byte))
    .join('');
  const base64String = btoa(binaryString);

  if (options?.urlSafe) {
    return toUrlSafe(base64String);
  }
  return base64String;
}

export function decodeBase64(
  b64String: string,
  options?: B64EncodingOptions
): string {
  if (options?.urlSafe) {
    b64String = fromUrlSafe(b64String);
  }

  const binaryString = atob(b64String);
  const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function fromUrlSafe(base64UrlString: string): string {
  return base64UrlString
    .replace(/-/g, '+') // restore unsafe characters '-' to '+' and '_' to '+'
    .replace(/_/g, '/')
    .padEnd(
      base64UrlString.length + ((4 - (base64UrlString.length % 4)) % 4),
      '='
    ); // restore = padding
}

function toUrlSafe(b64String: string): string {
  return b64String
    .replace(/\+/g, '-') // replace unsafe characters '+' to '-' and '/' to '_'
    .replace(/\//g, '_')
    .replace(/=/g, ''); // remove unsafe = padding
}
