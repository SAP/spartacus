/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { OccCartGuestUserAdapter } from './occ-cart-guest-user.adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const userId = 'userId';
const cartId = 'cartId';

class MockOccEndpointsService {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

const endpointName = 'cartGuestUser';

describe('OccCartGuestUserAdapter', () => {
  let occCartGuestUserAdapter: OccCartGuestUserAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OccCartGuestUserAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    occCartGuestUserAdapter = TestBed.inject(OccCartGuestUserAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('create a cart guest user', () => {
    it('should be able to create a new guest user for a given cart id', () => {
      occCartGuestUserAdapter.createCartGuestUser(userId, cartId).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === endpointName;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(endpointName, {
        urlParams: { userId, cartId },
      });
    });
  });

  describe('update a cart guest user', () => {
    it('should be able to update a guest user for a given cart id', () => {
      occCartGuestUserAdapter
        .updateCartGuestUser(userId, cartId, { email: 'test@sap.com' })
        .subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'PATCH' && req.url === endpointName;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(endpointName, {
        urlParams: { userId, cartId },
      });
    });
  });
});
