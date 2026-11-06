/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { encodeBase64 } from '@spartacus/core';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContextSerializerService } from './federated-login-context-serializer.service';

const mockOriginMap: Record<string, string> = {
  shop1: 'https://shop1.example.com',
  shop2: 'https://shop2.example.com',
};

function encode(str: string) {
  return encodeBase64(str, { urlSafe: true });
}

describe('FederatedLoginContextSerializerService', () => {
  let service: FederatedLoginContextSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FederatedLoginConfig,
          useValue: {
            federatedLogin: {
              contextParameterName: 'cx',
              loginDomains: ['login.example.com'],
              originMap: mockOriginMap,
            },
          },
        },
      ],
    });

    service = TestBed.inject(FederatedLoginContextSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('serializeContext()', () => {
    it('should return empty string when origin is not provided', () => {
      const result = service.serializeContext({});
      expect(result).toBe('');
    });

    it('should return "<key>:<language>" when origin maps to a known key', () => {
      const expected = encode('shop1:en');
      const result = service.serializeContext({
        origin: 'https://shop1.example.com',
        language: 'en',
      });
      expect(result).toBe(expected);
    });

    it('should return empty string when origin is not found in originMap', () => {
      const result = service.serializeContext({
        origin: 'https://unknown.example.com',
        language: 'en',
      });
      expect(result).toBe('');
    });

    it('should include an empty language segment when language is not provided', () => {
      const expected = encode('shop1:');
      const result = service.serializeContext({
        origin: 'https://shop1.example.com',
      });
      expect(result).toBe(expected);
    });

    it('should return empty string when context is undefined', () => {
      const result = service.serializeContext(undefined);
      expect(result).toBe('');
    });

    it('should use the correct key for a different originMap entry', () => {
      const expected = encode('shop2:de');
      const result = service.serializeContext({
        origin: 'https://shop2.example.com',
        language: 'de',
      });
      expect(result).toBe(expected);
    });
  });

  describe('deserializeContext()', () => {
    it('should return origin and language for a valid serialized string', () => {
      const input = encode('shop1:en');
      const result = service.deserializeContext(input);
      expect(result).toEqual({
        origin: 'https://shop1.example.com',
        language: 'en',
      });
    });

    it('should return only language when domain segment is empty', () => {
      const input = encode(':en');
      const result = service.deserializeContext(input);
      expect(result).toEqual({ language: 'en' });
    });

    it('should return only origin when language segment is absent', () => {
      const input = encode('shop1:');
      const result = service.deserializeContext(input);
      expect(result).toEqual({ origin: 'https://shop1.example.com' });
    });

    it('should return only origin when there are no separators', () => {
      const input = encode('shop1');
      const result = service.deserializeContext(input);
      expect(result).toEqual({ origin: 'https://shop1.example.com' });
    });

    it('should split on only the last separator', () => {
      mockOriginMap['shop1:postfix'] = 'https://shop3.example.com';
      const input = encode('shop1:postfix:en');
      const result = service.deserializeContext(input);
      expect(result).toEqual({
        origin: 'https://shop3.example.com',
        language: 'en',
      });
    });

    it('should return empty object when serialized context is an empty string', () => {
      const result = service.deserializeContext('');
      expect(result).toEqual({});
    });

    it('should return empty object when serialized context is null', () => {
      const result = service.deserializeContext(null);
      expect(result).toEqual({});
    });

    it('should return empty object when serialized context is undefined', () => {
      const result = service.deserializeContext(undefined);
      expect(result).toEqual({});
    });

    it('should return origin as undefined when domain key is not in originMap', () => {
      const input = encode('unknown:en');
      const result = service.deserializeContext(input);
      expect(result).toEqual({ origin: undefined, language: 'en' });
    });
  });

  describe('round-trip (serialize -> deserialize)', () => {
    it('should recover the original context with origin and language', () => {
      const original = {
        origin: 'https://shop1.example.com',
        language: 'en',
      };
      const serialized = service.serializeContext(original);
      const actualDeserialized = service.deserializeContext(serialized);
      expect(actualDeserialized).toEqual(original);
    });

    it('should recover only origin when no language is provided', () => {
      const original = { origin: 'https://shop1.example.com' };
      const serialized = service.serializeContext(original);
      const actualDeserialized = service.deserializeContext(serialized);
      expect(actualDeserialized).toEqual(original);
    });
  });
});
