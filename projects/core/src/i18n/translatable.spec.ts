/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Translatable, isTranslatable } from './translatable';

describe('isTranslatable', () => {
  it('should return true for an object with a key property', () => {
    const input: Translatable = { key: 'someKey' };

    expect(isTranslatable(input)).toBe(true);
  });

  it('should return true for an object with a raw property', () => {
    const input: Translatable = { raw: 'some raw string' };

    expect(isTranslatable(input)).toBe(true);
  });

  it('should return true for an object with both key and raw properties', () => {
    const input: Translatable = { key: 'someKey', raw: 'some raw string' };

    expect(isTranslatable(input)).toBe(true);
  });

  it('should return false for an object without key or raw properties', () => {
    const input = { param: 'value' };

    expect(isTranslatable(input)).toBe(false);
  });

  it('should return false for a non-object input', () => {
    expect(isTranslatable('string')).toBe(false);
    expect(isTranslatable(123)).toBe(false);
    expect(isTranslatable(null)).toBe(false);
    expect(isTranslatable(undefined)).toBe(false);
    expect(isTranslatable([])).toBe(false);
  });

  it('should return false for an empty object', () => {
    const input = {};

    expect(isTranslatable(input)).toBe(false);
  });
});
