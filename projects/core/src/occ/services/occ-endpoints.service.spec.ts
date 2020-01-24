import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccEndpointsService } from './occ-endpoints.service';

describe('OccEndpointsService', () => {
  const mockOccConfig: OccConfig = {
    backend: {
      occ: {
        baseUrl: 'test-baseUrl',
        prefix: '/test-occPrefix',
        endpoints: {
          login: '/authorizationserver/oauth/token',
          product: 'configured-endpoint1/${test}?fields=abc',
          product_scopes: {
            test: 'configured-endpoint1/${test}?fields=test',
          },
        },
      },
    },
    context: {
      baseSite: ['/test-baseSite'],
    },
  };

  const baseEndpoint = 'test-baseUrl/test-occPrefix/test-baseSite';

  let service: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OccConfig, useValue: mockOccConfig }],
    });
    service = TestBed.get(OccEndpointsService as Type<OccEndpointsService>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base endpoint', () => {
    expect(service.getBaseEndpoint()).toEqual(baseEndpoint);
  });

  it('should return base endpoint + added endpoint', () => {
    expect(service.getEndpoint('test-endpoint')).toEqual(
      baseEndpoint + '/test-endpoint'
    );
  });

  it('should return raw endpoint', () => {
    const occ = mockOccConfig.backend.occ;
    expect(service.getRawEndpoint('login')).toEqual(
      occ.baseUrl + occ.endpoints['login']
    );
  });

  describe('getUrl', () => {
    it('should return endpoint from config', () => {
      const url = service.getUrl('product');

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/${test}?fields=abc'
      );
    });

    describe('using scope', () => {
      it('should return endpoint from config', () => {
        const url = service.getUrl('product', undefined, undefined, 'test');

        expect(url).toEqual(
          baseEndpoint + '/configured-endpoint1/${test}?fields=test'
        );
      });

      it('should fallback to default scope', () => {
        const url = service.getUrl(
          'product',
          undefined,
          undefined,
          'test-non-existing'
        );

        expect(url).toEqual(
          baseEndpoint + '/configured-endpoint1/${test}?fields=abc'
        );
      });

      it('should not resolve endpoint for missing scope when no default is specified', () => {
        const config = TestBed.get(OccConfig);
        delete config.backend.occ.endpoints.product;

        const url = service.getUrl(
          'product',
          undefined,
          undefined,
          'test-non-existing'
        );

        expect(url).toBe('test-baseUrl/test-occPrefix/test-baseSite/product');
      });

      it('should use string configuration for backward compatibility', () => {
        const config = TestBed.get(OccConfig);
        config.backend.occ.endpoints.product =
          'configured-endpoint1/${test}?fields=fallback';

        const url = service.getUrl(
          'product',
          undefined,
          undefined,
          'test-non-existing'
        );

        expect(url).toBe(
          'test-baseUrl/test-occPrefix/test-baseSite/configured-endpoint1/${test}?fields=fallback'
        );
      });
    });

    it('should apply parameters to configured endpoint', () => {
      const url = service.getUrl('product', { test: 'test-value' });
      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=abc'
      );
    });

    it('should add query parameters to configured endpoint', () => {
      const url = service.getUrl(
        'product',
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
        'product',
        { test: 'test-value' },
        { fields: 'xyz' }
      );

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=xyz'
      );
    });

    it('should allow to remove preconfigured query parameters', () => {
      const url = service.getUrl(
        'product',
        { test: 'test-value' },
        { fields: null }
      );

      expect(url).toEqual(baseEndpoint + '/configured-endpoint1/test-value');
    });

    it('should escape special characters passed in url params', () => {
      const url = service.getUrl(
        'product',
        { test: 'ąćę$%' },
        { fields: null }
      );

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/%C4%85%C4%87%C4%99%24%25'
      );
    });

    it('should escape query parameters', () => {
      const url = service.getUrl(
        'product',
        { test: 'test-value' },
        { fields: '+./.\\.,.?' }
      );

      expect(url).toEqual(
        baseEndpoint +
          '/configured-endpoint1/test-value?fields=%2B.%2F.%5C.%2C.%3F'
      );
    });
  });
});
