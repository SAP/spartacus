/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BaseSiteService, StringTemplate } from '@spartacus/core';
import { OpfApiConfig, OpfConfig } from '@spartacus/opf/base/root';
import { OpfEndpointsService } from './opf-endpoints.service';

describe('OpfEndpointsService', () => {
  let service: OpfEndpointsService;
  let opfConfigMock: Partial<OpfConfig>;
  let opfApiConfigMock: Partial<OpfApiConfig>;
  let baseSiteServiceMock: any;

  beforeEach(() => {
    opfConfigMock = {
      opf: {
        opfBaseUrl: 'https://elec-spa.com/opf',
      },
    };
    opfApiConfigMock = {
      backend: {
        opfApi: {
          endpoints: {
            getActiveConfigurations: 'getActiveConfigurations',
          },
        },
      },
    };

    baseSiteServiceMock = {
      getActive: () => of('electronics-spa'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OpfConfig, useValue: opfConfigMock },
        { provide: OpfApiConfig, useValue: opfApiConfigMock },
        { provide: BaseSiteService, useValue: baseSiteServiceMock },
      ],
    });

    service = TestBed.inject(OpfEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBaseEndpoint()', () => {
    it('should return the base URL when it is defined', () => {
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('https://elec-spa.com/opf');
    });

    it('should return an empty string when config is undefined', () => {
      (service['opfConfig'] as any) = undefined;
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });

    it('should return an empty string when baseUrl is undefined', () => {
      service['opfConfig'] = { opf: {} };
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });

    it('should return an empty string when baseUrl is empty', () => {
      service['opfConfig'] = { opf: { opfBaseUrl: '' } };
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });
  });

  describe('getEndpointFromContext()', () => {
    it('should return the endpoint configuration when it is defined', () => {
      const endpoint = 'getActiveConfigurations';

      const result = service['getEndpointFromContext'](endpoint);

      expect(result).toEqual('getActiveConfigurations');
    });

    it('should return empty string when endpointsConfig is undefined', () => {
      (service['opfApiConfig'] as any).backend.opfApi.endpoints = undefined;
      const endpoint = 'sampleEndpoint';

      const result = service['getEndpointFromContext'](endpoint);

      expect(result).toBe('');
    });

    it('should return undefined when endpoint is not found', () => {
      const endpoint = 'nonExistentEndpoint';

      const result = service['getEndpointFromContext'](endpoint);

      expect(result).toBeUndefined();
    });
  });

  describe('buildUrl()', () => {
    it('should build a URL with active base site and resolved endpoint', () => {
      const endpoint = 'getActiveConfigurations';

      const result = service.buildUrl(endpoint, {});

      const expectedUrl =
        'https://elec-spa.com/opf/electronics-spa/getActiveConfigurations';
      expect(result).toEqual(expectedUrl);
    });

    it('should not call StringTemplate resolve() when there are no urlParams', () => {
      const endpoint = 'getActiveConfigurations';
      const spy = spyOn(StringTemplate, 'resolve').and.callThrough();

      service.buildUrl(endpoint, {});

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call StringTemplate resolve() when there are urlParams', () => {
      const endpoint = 'getActiveConfigurations';
      const attributes = {
        urlParams: { param1: 'value1' },
      };

      const spy = spyOn(StringTemplate, 'resolve').and.callThrough();

      service.buildUrl(endpoint, attributes);

      expect(spy).toHaveBeenCalledWith(
        'getActiveConfigurations',
        attributes.urlParams,
        true
      );
    });
  });
});
