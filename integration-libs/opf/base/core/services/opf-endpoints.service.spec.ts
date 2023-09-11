/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BaseSiteService, Config, StringTemplate } from '@spartacus/core';
import { OpfEndpointsService } from './opf-endpoints.service';

describe('OpfEndpointsService', () => {
  let service: OpfEndpointsService;
  let configServiceMock: Partial<Config>;
  let baseSiteServiceMock: any;

  beforeEach(() => {
    configServiceMock = {
      opf: {
        baseUrl: 'https://elec-spa.com/opf',
      },
      backend: {
        occ: {
          endpoints: {
            product: 'product',
          },
        },
      },
    };

    baseSiteServiceMock = {
      getActive: () => of('electronics-spa'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Config, useValue: configServiceMock },
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
      (service['config'] as any) = undefined;
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });

    it('should return an empty string when opf is undefined', () => {
      service['config'] = {};
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });

    it('should return an empty string when baseUrl is undefined', () => {
      service['config'] = { opf: {} };
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });

    it('should return an empty string when baseUrl is empty', () => {
      service['config'] = { opf: { baseUrl: '' } };
      const result = service['getBaseEndpoint']();
      expect(result).toEqual('');
    });
  });

  describe('getEndpointFromContext()', () => {
    it('should return the endpoint configuration when it is defined', () => {
      const endpoint = 'product';

      const result = service['getEndpointFromContext'](endpoint);

      expect(result).toEqual('product');
    });

    it('should return empty string when endpointsConfig is undefined', () => {
      (service['config'] as any).backend.occ.endpoints = undefined;
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

  describe('buildUrl', () => {
    it('should build a URL with active base site and resolved endpoint', () => {
      const endpoint = 'product';

      const result = service.buildUrl(endpoint, {});

      const expectedUrl = 'https://elec-spa.com/opf/electronics-spa/product';
      expect(result).toEqual(expectedUrl);
    });

    it('should not call StringTemplate resolve() when there are no urlParams', () => {
      const endpoint = 'product';
      const spy = spyOn(StringTemplate, 'resolve').and.callThrough();

      service.buildUrl(endpoint, {});

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call StringTemplate resolve() when there are urlParams', () => {
      const endpoint = 'product';
      const attributes = {
        urlParams: { param1: 'value1' },
      };

      const spy = spyOn(StringTemplate, 'resolve').and.callThrough();

      service.buildUrl(endpoint, attributes);

      expect(spy).toHaveBeenCalledWith('product', attributes.urlParams, true);
    });
  });
});
