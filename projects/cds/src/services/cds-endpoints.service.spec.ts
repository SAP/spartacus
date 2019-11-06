import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CdsConfig } from '../cds-config';
import { CdsEndpointsService } from './cds-endpoints.service';

describe('CdsEndpointsService', () => {

  const strategyProductsEndpointKey = 'strategyProducts';
  const strategyId = 'test-strategy-id';

  const mockCdsConfig: CdsConfig = {
    cds: {
      tenant: 'merchandising-strategy-adapter-test-tenant',
      baseUrl: 'http://some-cds-base-url',
      endpoints: {
        strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products'
      },
      profileTag: {
        configUrl: 'http://some-profile-tag-config-url',
        javascriptUrl: 'http://some-profile-tag-js-url'
      }
    }
  };

  const fullyCalculatedUrl = `${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/${strategyId}/products`;

  let cdsEndpointsService: CdsEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CdsConfig, useValue: mockCdsConfig }],
    });

    cdsEndpointsService = TestBed.get(CdsEndpointsService as Type<CdsEndpointsService>);
  });

  it('should be created', () => {
    expect(cdsEndpointsService).toBeTruthy();
  });

  describe('getUrl', () => {
    it('should prepend a known endpoint with the base url, but not replace palceholders when none are provided', () => {
      expect(cdsEndpointsService.getUrl(strategyProductsEndpointKey))
        .toBe(`${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/\${strategyId}/products`);
    });

    it('should prepend a known endpoint with the base url and replace provided placeholders', () => {
      expect(cdsEndpointsService.getUrl(strategyProductsEndpointKey, { strategyId })).toBe(fullyCalculatedUrl);
    });

    it('should allow the tenant path parameter to be overridden', () => {
      const alternativeTenant = 'some-other-tenant';
      expect(cdsEndpointsService.getUrl(strategyProductsEndpointKey, { strategyId, tenant: alternativeTenant }))
        .toBe(`${mockCdsConfig.cds.baseUrl}/strategy/${alternativeTenant}/strategies/${strategyId}/products`);
    });

    it('should not replace provided placeholders that are not in the endpoint pattern', () => {
      expect(cdsEndpointsService.getUrl(strategyProductsEndpointKey, { strategyId, someOtherField: 'someOtherField' })).toBe(fullyCalculatedUrl);
    });

    it('should not prepend an unkonwn endpoint with the base url', () => {
      const unknownEndpointKey = '/some-other-url-with-placeholders/${placeHolder1}/${placeHolder2}';
      expect(cdsEndpointsService.getUrl(unknownEndpointKey, { placeHolder1: 'value1', placeHolder2: 'value2' }))
        .toBe(`${mockCdsConfig.cds.baseUrl}/some-other-url-with-placeholders/value1/value2`);
    });

    it('should not prepend an endpoint that already has the configured base url with the configured base url', () => {
      expect(cdsEndpointsService.getUrl(fullyCalculatedUrl)).toBe(fullyCalculatedUrl);
    });

    it('should not prepend an endpoint that already has the configured base url with the configured base url, but should replace placeholders', () => {
      expect(cdsEndpointsService.getUrl(`${mockCdsConfig.cds.baseUrl}${mockCdsConfig.cds.endpoints.strategyProducts}`, { strategyId }))
        .toBe(fullyCalculatedUrl);
    });

    it('should escape special characters passed in url params', () => {
      expect(cdsEndpointsService.getUrl(strategyProductsEndpointKey, { strategyId: 'ąćę$%'}))
        .toBe(`${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/%C4%85%C4%87%C4%99%24%25/products`);
    });
  });
});