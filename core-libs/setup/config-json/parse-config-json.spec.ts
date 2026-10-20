/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { parseConfigJson } from './parse-config-json';

describe('parseConfigJson', () => {
  it('should parse entries with "value" field', () => {
    const result = parseConfigJson({
      OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
      MEDIA_BASE_URL: { value: 'https://api.commerce.sap.com/medias' },
    });

    expect(result).toEqual({
      OCC_BASE_URL: 'https://api.commerce.sap.com',
      MEDIA_BASE_URL: 'https://api.commerce.sap.com/medias',
    });
  });

  it('should include secret entries when excludeSecrets is false', () => {
    const result = parseConfigJson(
      {
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        API_KEY: { value: 'sk-abc123', secret: 'true' },
      },
      { excludeSecrets: false }
    );

    expect(result).toEqual({
      OCC_BASE_URL: 'https://api.commerce.sap.com',
      API_KEY: 'sk-abc123',
    });
  });

  it('should exclude entries with secret: "true" (string) when excludeSecrets is true', () => {
    const result = parseConfigJson(
      {
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        API_KEY: { value: 'sk-abc123', secret: 'true' },
      },
      { excludeSecrets: true }
    );

    expect(result).toEqual({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
    expect(result).not.toHaveProperty('API_KEY');
  });

  it('should exclude entries with secret: true (boolean) when excludeSecrets is true', () => {
    const result = parseConfigJson(
      { API_KEY: { value: 'sk-abc123', secret: true } },
      { excludeSecrets: true }
    );

    expect(result).not.toHaveProperty('API_KEY');
  });

  it('should include entries with secret: "false" when excludeSecrets is true', () => {
    const result = parseConfigJson(
      {
        OCC_BASE_URL: {
          value: 'https://api.commerce.sap.com',
          secret: 'false',
        },
      },
      { excludeSecrets: true }
    );

    expect(result).toEqual({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
  });

  it('should return empty object for empty input', () => {
    expect(parseConfigJson({})).toEqual({});
  });

  it('should not mutate the input object', () => {
    const input = {
      OCC_BASE_URL: {
        value: 'https://api.commerce.sap.com',
        secret: 'true' as const,
      },
    };
    parseConfigJson(input, { excludeSecrets: true });
    expect(input.OCC_BASE_URL).toBeDefined();
  });
});
