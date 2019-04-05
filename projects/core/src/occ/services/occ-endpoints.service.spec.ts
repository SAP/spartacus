import { TestBed } from '@angular/core/testing';

import { OccEndpointsService } from './occ-endpoints.service';
import { OccConfig } from '@spartacus/core';

describe('OccEndpointsService', () => {
  const mockOccConfig: OccConfig = {
    backend: {
      occ: {
        baseUrl: 'test-baseUrl',
        prefix: '/test-occPrefix',
        endpoints: {
          endpoint1: 'configured-endpoint1/${test}?fields=abc',
        },
      },
    },
    site: {
      baseSite: '/test-baseSite',
    },
  };

  const baseEndpoint = 'test-baseUrl/test-occPrefix/test-baseSite';

  let service: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OccConfig, useValue: mockOccConfig }],
    });
    service = TestBed.get(OccEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBaseEndpoint should return base endpoint', () => {
    expect(service.getBaseEndpoint()).toEqual(baseEndpoint);
  });

  it('getEndpoint should return base endpoint + added endpoint', () => {
    expect(service.getEndpoint('test-endpoint')).toEqual(
      baseEndpoint + '/test-endpoint'
    );
  });

  describe('getUrl', () => {
    it('should return endpoint from config', () => {
      const url = service.getUrl('endpoint1');

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/${test}?fields=abc'
      );
    });

    it('should apply parameters to configured endpoint', () => {
      const url = service.getUrl('endpoint1', { test: 'test-value' });

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=abc'
      );
    });

    it('should add query parameters to configured endpoint', () => {
      const url = service.getUrl(
        'endpoint1',
        { test: 'test-value' },
        { param: 'test-param' }
      );

      expect(url).toEqual(
        baseEndpoint +
          '/configured-endpoint1/test-value?fields=abc&param=test-param'
      );
    });

    it('should allow to redefine preconfigured query parameters', () => {
      const url = service.getUrl(
        'endpoint1',
        { test: 'test-value' },
        { fields: 'xyz' }
      );

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=xyz'
      );
    });

    it('should allow to remove preconfigured query parameters', () => {
      const url = service.getUrl(
        'endpoint1',
        { test: 'test-value' },
        { fields: null }
      );

      expect(url).toEqual(baseEndpoint + '/configured-endpoint1/test-value');
    });
  });
});
