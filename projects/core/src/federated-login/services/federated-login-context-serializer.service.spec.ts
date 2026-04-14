/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContextSerializerService } from './federated-login-context-serializer.service';

const mockOriginMap: Record<string, string> = {
  shop1: 'https://shop1.example.com',
  shop2: 'https://shop2.example.com',
};

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
      const result = service.serializeContext({
        origin: 'https://shop1.example.com',
        language: 'en',
      });
      expect(result).toBe('shop1:en');
    });

    it('should return empty string when origin is not found in originMap', () => {
      const result = service.serializeContext({
        origin: 'https://unknown.example.com',
        language: 'en',
      });
      expect(result).toBe('');
    });

    it('should include an empty language segment when language is not provided', () => {
      const result = service.serializeContext({
        origin: 'https://shop1.example.com',
      });
      expect(result).toBe('shop1:');
    });

    it('should return empty string when context is undefined', () => {
      const result = service.serializeContext(undefined);
      expect(result).toBe('');
    });

    it('should use the correct key for a different originMap entry', () => {
      const result = service.serializeContext({
        origin: 'https://shop2.example.com',
        language: 'de',
      });
      expect(result).toBe('shop2:de');
    });
  });

  describe('deserializeContext()', () => {
    it('should return origin and language for a valid serialized string', () => {
      const result = service.deserializeContext('shop1:en');
      expect(result).toEqual({
        origin: 'https://shop1.example.com',
        language: 'en',
      });
    });

    it('should return only language when domain segment is empty', () => {
      const result = service.deserializeContext(':en');
      expect(result).toEqual({ language: 'en' });
    });

    it('should return only origin when language segment is absent', () => {
      const result = service.deserializeContext('shop1:');
      expect(result).toEqual({ origin: 'https://shop1.example.com' });
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
      const result = service.deserializeContext('unknown:en');
      expect(result).toEqual({ origin: undefined, language: 'en' });
    });

    it('should include currency when a third segment is present', () => {
      const result = service.deserializeContext('shop1:en:USD');
      expect(result).toEqual({
        origin: 'https://shop1.example.com',
        language: 'en',
        currency: 'USD',
      });
    });

    it('should ignore segments beyond the third', () => {
      const result = service.deserializeContext('shop1:en:USD:extra');
      expect(result).toEqual({
        origin: 'https://shop1.example.com',
        language: 'en',
        currency: 'USD',
      });
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

    it('should recover only origin when n language is provided', () => {
      const original = { origin: 'https://shop1.example.com' };
      const serialized = service.serializeContext(original);
      const actualDeserialized = service.deserializeContext(serialized);
      expect(actualDeserialized).toEqual(original);
    });
  });
});
