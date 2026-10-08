/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { extractOccBaseUrlFromHtml } from './occ-base-url-extractor';

describe('extractOccBaseUrlFromHtml', () => {
  it('extracts content when name precedes content', () => {
    const html =
      '<meta name="occ-backend-base-url" content="https://api.example" />';

    expect(extractOccBaseUrlFromHtml(html)).toBe('https://api.example');
  });

  it('extracts content when content precedes name', () => {
    const html =
      '<meta content="https://api.example" data-source="deploy" name="occ-backend-base-url">';

    expect(extractOccBaseUrlFromHtml(html)).toBe('https://api.example');
  });

  it('matches attribute names and the configured meta name case-insensitively', () => {
    const html =
      "<META CONTENT='https://api.example' NAME='OCC-BACKEND-BASE-URL'>";

    expect(extractOccBaseUrlFromHtml(html)).toBe('https://api.example');
  });

  it('trims surrounding whitespace from content', () => {
    const html =
      '<meta name="occ-backend-base-url" content="  https://api.example/path  ">';

    expect(extractOccBaseUrlFromHtml(html)).toBe(
      'https://api.example/path'
    );
  });

  it('returns null when the tag is missing', () => {
    expect(
      extractOccBaseUrlFromHtml(
        '<meta name="media-backend-base-url" content="https://media.example">'
      )
    ).toBeNull();
  });

  it('returns null when content is empty', () => {
    expect(
      extractOccBaseUrlFromHtml(
        '<meta name="occ-backend-base-url" content="   ">'
      )
    ).toBeNull();
  });

  it('returns null for the unsubstituted deployment placeholder', () => {
    expect(
      extractOccBaseUrlFromHtml(
        '<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE">'
      )
    ).toBeNull();
  });
});
