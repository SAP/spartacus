import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccEndpointsService } from './occ-endpoints.service';

describe('OccEndpointsService', () => {
  let mockOccConfig: OccConfig;
  const baseEndpoint = 'test-baseUrl/test-occPrefix/test-baseSite';

  let service: OccEndpointsService;

  beforeEach(() => {
    mockOccConfig = {
      backend: {
        occ: {
          baseUrl: 'test-baseUrl',
          prefix: '/test-occPrefix',
          endpoints: {
            regions:
              '/countries/${isoCode}/regions?fields=regions(name,isocode,isocodeShort)',
            product: {
              default: 'configured-endpoint1/${test}?fields=abc',
              test: 'configured-endpoint1/${test}?fields=test',
            },
          },
        },
      },
      context: {
        baseSite: ['/test-baseSite'],
      },
    };

    TestBed.configureTestingModule({
      providers: [{ provide: OccConfig, useValue: mockOccConfig }],
    });
    service = TestBed.inject(OccEndpointsService);
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
    expect(service.getRawEndpoint('regions')).toEqual(
      occ.baseUrl + occ.endpoints['regions']
    );
  });

  it('should return raw endpoint value', () => {
    const occ = mockOccConfig.backend.occ;
    expect(service.getRawEndpointValue('regions')).toEqual(
      occ.endpoints['regions'].toString()
    );
  });

  it('should return occ endpoint', () => {
    const occ = mockOccConfig.backend.occ;
    expect(service.getOccEndpoint('regions')).toEqual(
      occ.baseUrl + occ.prefix + occ.endpoints['regions']
    );
  });

  it('should be immune to late baseSite default value in config', () => {
    const config = TestBed.inject(OccConfig);
    expect(service.getBaseEndpoint()).toEqual(baseEndpoint);
    // we are modifying config as it can happen before app initialization in config initializer
    config.context.baseSite = ['/final-baseSite'];
    expect(service.getBaseEndpoint()).toEqual(
      'test-baseUrl/test-occPrefix/final-baseSite'
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
        const config = TestBed.inject(OccConfig);
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
        const config = TestBed.inject(OccConfig);
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

  describe('getBaseUrl', () => {
    it('should return base endpoint by default', () => {
      expect(service.getBaseUrl()).toEqual(baseEndpoint);
    });

    it('should be immune to late baseSite default value in config', () => {
      const config = TestBed.inject(OccConfig);
      expect(service.getBaseUrl()).toEqual(baseEndpoint);
      // we are modifying config as it can happen before app initialization in config initializer
      config.context.baseSite = ['/final-baseSite'];
      expect(service.getBaseUrl()).toEqual(
        'test-baseUrl/test-occPrefix/final-baseSite'
      );
    });

    it('should return the base url based on the provided parameters', () => {
      expect(service.getBaseUrl({ prefix: false })).toEqual(
        'test-baseUrl/test-baseSite'
      );
      expect(service.getBaseUrl({ prefix: false, baseSite: true })).toEqual(
        'test-baseUrl/test-baseSite'
      );
      expect(service.getBaseUrl({ baseSite: false })).toEqual(
        'test-baseUrl/test-occPrefix'
      );
    });
  });

  describe('buildUrl', () => {
    it('should return endpoint from config', () => {
      const url = service.buildUrl('product');

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/${test}?fields=abc'
      );
    });

    describe('using scope', () => {
      it('should return endpoint from config', () => {
        const url = service.buildUrl('product', {
          scope: 'test',
        });

        expect(url).toEqual(
          baseEndpoint + '/configured-endpoint1/${test}?fields=test'
        );
      });

      it('should fallback to default scope', () => {
        const url = service.buildUrl('product', {
          scope: 'test-non-existing',
        });

        expect(url).toEqual(
          baseEndpoint + '/configured-endpoint1/${test}?fields=abc'
        );
      });

      it('should not resolve endpoint for missing scope when no default is specified', () => {
        const config = TestBed.inject(OccConfig);
        delete config.backend.occ.endpoints.product;

        const url = service.buildUrl('product', {
          scope: 'test-non-existing',
        });

        expect(url).toBe('test-baseUrl/test-occPrefix/test-baseSite/product');
      });

      it('should use string configuration for backward compatibility', () => {
        const config = TestBed.inject(OccConfig);
        config.backend.occ.endpoints.product =
          'configured-endpoint1/${test}?fields=fallback';

        const url = service.buildUrl('product', {
          scope: 'test-non-existing',
        });

        expect(url).toBe(
          'test-baseUrl/test-occPrefix/test-baseSite/configured-endpoint1/${test}?fields=fallback'
        );
      });
    });

    it('should apply parameters to configured endpoint', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'test-value' },
      });
      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=abc'
      );
    });

    it('should add query parameters to configured endpoint', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'test-value' },
        queryParams: { param: 'test-param' },
      });

      expect(url).toEqual(
        baseEndpoint +
          '/configured-endpoint1/test-value?fields=abc&param=test-param'
      );
    });

    it('should allow to redefine preconfigured query parameters', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'test-value' },
        queryParams: { fields: 'xyz' },
      });

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/test-value?fields=xyz'
      );
    });

    it('should allow to remove preconfigured query parameters', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'test-value' },
        queryParams: { fields: null },
      });

      expect(url).toEqual(baseEndpoint + '/configured-endpoint1/test-value');
    });

    it('should escape special characters passed in url params', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'ąćę$%' },
        queryParams: { fields: null },
      });

      expect(url).toEqual(
        baseEndpoint + '/configured-endpoint1/%C4%85%C4%87%C4%99%24%25'
      );
    });

    it('should escape query parameters', () => {
      const url = service.buildUrl('product', {
        urlParams: { test: 'test-value' },
        queryParams: { fields: '+./.\\.,.?' },
      });

      expect(url).toEqual(
        baseEndpoint +
          '/configured-endpoint1/test-value?fields=%2B.%2F.%5C.%2C.%3F'
      );
    });
  });
});
