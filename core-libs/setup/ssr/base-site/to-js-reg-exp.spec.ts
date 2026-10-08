/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { toJsRegExp } from './to-js-reg-exp';

describe('toJsRegExp', () => {
  it('should convert a plain pattern with no modifiers', () => {
    const result = toJsRegExp('electronics-spa');
    expect(result).toEqual(/electronics-spa/);
    expect(result?.flags).toBe('');
  });

  it('should extract a single Java modifier into JS flags', () => {
    const result = toJsRegExp('(?i)electronics-spa');
    expect(result?.source).toBe('electronics-spa');
    expect(result?.flags).toBe('i');
  });

  it('should extract multiple combined Java modifiers', () => {
    const result = toJsRegExp('(?im)^electronics');
    expect(result?.source).toBe('^electronics');
    expect(result?.flags).toContain('i');
    expect(result?.flags).toContain('m');
  });

  it('should match a request path against a converted site pattern', () => {
    const regExp = toJsRegExp('(?i)^https?://[^/]+/electronics-spa(/|$)');
    expect(regExp?.test('https://shop.example.com/electronics-spa')).toBe(true);
    expect(regExp?.test('https://shop.example.com/apparel-uk-spa')).toBe(false);
  });

  it('should return null for a modifier unsupported in JavaScript', () => {
    // `x` (comments mode) is a valid Java modifier but not a JS flag.
    expect(toJsRegExp('(?x)electronics')).toBeNull();
  });

  it('should return null for syntax invalid in JavaScript', () => {
    // Unclosed group is invalid in both, must fail safely.
    expect(toJsRegExp('(unclosed')).toBeNull();
  });

  it('should treat an empty pattern as a valid empty RegExp', () => {
    const result = toJsRegExp('');
    expect(result).toEqual(new RegExp(''));
  });
});
