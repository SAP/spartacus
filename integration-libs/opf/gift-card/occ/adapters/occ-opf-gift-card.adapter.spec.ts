/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  LoggerService,
  OccEndpointsService,
  UserIdService,
} from '@spartacus/core';
import {
  SAPGiftCardBalanceRequest,
  SAPGiftCardResponse,
} from '@spartacus/opf/gift-card/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OccOpfGiftCardAdapter } from './occ-opf-gift-card.adapter';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('OccOpfGiftCardAdapter', () => {
  let adapter: OccOpfGiftCardAdapter;
  let httpMock: HttpTestingController;
  let mockLogger: jasmine.SpyObj<LoggerService>;
  let mockOccEndpoints: jasmine.SpyObj<OccEndpointsService>;
  let mockActiveCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let mockUserIdService: jasmine.SpyObj<UserIdService>;

  const mockGiftCardResponse: SAPGiftCardResponse = {
    id: 'gc-123',
    maskedNumber: '****1111',
    balance: { currencyIso: 'USD', formattedValue: '$100', value: 100 },
    appliedAmount: { currencyIso: 'USD', formattedValue: '$20', value: 20 },
    remainingBalance: {
      currencyIso: 'USD',
      formattedValue: '$80',
      value: 80,
    },
  };

  beforeEach(() => {
    mockLogger = jasmine.createSpyObj('LoggerService', ['debug', 'error']);
    mockOccEndpoints = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);
    mockActiveCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'getActiveCartId',
    ]);
    mockUserIdService = jasmine.createSpyObj('UserIdService', ['getUserId']);

    mockOccEndpoints.buildUrl.and.callFake((endpoint: string , config: any) => {
      if (endpoint === 'applyGiftCard') {
        return `/rest/v2/users/${config.urlParams?.userId}/carts/${config.urlParams?.cartId}/giftCards`;
      } else if (endpoint === 'removeGiftCard') {
        return `/rest/v2/users/${config.urlParams?.userId}/carts/${config.urlParams?.cartId}/giftCards/${config.urlParams?.giftCardId}`;
      }
      return '';
    });

    mockActiveCartFacade.getActiveCartId.and.returnValue(of('cart-123'));
    mockUserIdService.getUserId.and.returnValue(of('user-123'));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOpfGiftCardAdapter,
        { provide: LoggerService, useValue: mockLogger },
        { provide: OccEndpointsService, useValue: mockOccEndpoints },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: UserIdService, useValue: mockUserIdService },
      ],
    });

    adapter = TestBed.inject(OccOpfGiftCardAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('applyGiftCard', () => {
    it('should send POST request with gift card details', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
    });

    it('should include correct headers', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
    });

    it('should return gift card response', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let result: SAPGiftCardResponse | undefined;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        next: (response) => {
          result = response;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.flush(mockGiftCardResponse);

      expect(result).toEqual(mockGiftCardResponse);
    });

    it('should build correct endpoint URL', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter.applyGiftCard('user-456', 'cart-456', mockRequest).subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-456/carts/cart-456/giftCards'
      );
      expect(mockOccEndpoints.buildUrl).toHaveBeenCalledWith('applyGiftCard', {
        urlParams: { userId: 'user-456', cartId: 'cart-456' },
      });
      req.flush(mockGiftCardResponse);
    });

    it('should handle HTTP errors', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorResult: any;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          errorResult = error;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.error(new ErrorEvent('Network error'), { status: 500 });

      expect(errorResult).toBeTruthy();
    });

    it('should handle 400 Bad Request', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorResult: any;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          errorResult = error;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.flush('Invalid gift card', {
        status: 400,
        statusText: 'Bad Request',
      });

      expect(errorResult).toBeTruthy();
    });

    it('should handle 404 Not Found', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorResult: any;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          errorResult = error;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.flush('Not found', { status: 404, statusText: 'Not Found' });

      expect(errorResult).toBeTruthy();
    });

    it('should validate user ID in endpoint', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter
        .applyGiftCard('special-user-id', 'cart-123', mockRequest)
        .subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/special-user-id/carts/cart-123/giftCards'
      );
      req.flush(mockGiftCardResponse);
    });

    it('should validate cart ID in endpoint', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter
        .applyGiftCard('user-123', 'special-cart-id', mockRequest)
        .subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/special-cart-id/giftCards'
      );
      req.flush(mockGiftCardResponse);
    });
  });

  describe('removeGiftCard', () => {
    it('should send DELETE request for gift card removal', () => {
      adapter.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards/gc-123'
      );
      expect(req.request.method).toBe('DELETE');
    });

    it('should build correct removal endpoint URL', () => {
      adapter.removeGiftCard('user-456', 'cart-456', 'gc-456').subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-456/carts/cart-456/giftCards/gc-456'
      );
      expect(mockOccEndpoints.buildUrl).toHaveBeenCalledWith('removeGiftCard', {
        urlParams: {
          userId: 'user-456',
          cartId: 'cart-456',
          giftCardId: 'gc-456',
        },
      });
      req.flush(null);
    });

    it('should handle successful removal', () => {
      let completed = false;
      adapter.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        next: () => {
          completed = true;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards/gc-123'
      );
      req.flush(null);

      expect(completed).toBeTruthy();
    });

    it('should handle HTTP errors on removal', () => {
      let errorResult: any;
      adapter.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        error: (error) => {
          errorResult = error;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards/gc-123'
      );
      req.error(new ErrorEvent('Network error'), { status: 500 });

      expect(errorResult).toBeTruthy();
    });

    it('should handle 404 on removal', () => {
      let errorResult: any;
      adapter
        .removeGiftCard('user-123', 'cart-123', 'gc-nonexistent')
        .subscribe({
          error: (error) => {
            errorResult = error;
          },
        });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards/gc-nonexistent'
      );
      req.flush('Gift card not found', {
        status: 404,
        statusText: 'Not Found',
      });

      expect(errorResult).toBeTruthy();
    });

    it('should include giftCardId in removal endpoint', () => {
      adapter
        .removeGiftCard('user-123', 'cart-123', 'unique-gc-id')
        .subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards/unique-gc-id'
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle different user and cart combinations', () => {
      adapter.removeGiftCard('user-789', 'cart-789', 'gc-789').subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-789/carts/cart-789/giftCards/gc-789'
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Endpoint Building', () => {
    it('should correctly build apply gift card endpoint', () => {
      adapter['getApplyGiftCardEndpoint']('user-123', 'cart-456');

      expect(mockOccEndpoints.buildUrl).toHaveBeenCalledWith('applyGiftCard', {
        urlParams: { userId: 'user-123', cartId: 'cart-456' },
      });
    });

    it('should correctly build remove gift card endpoint', () => {
      adapter['getRemoveGiftCardEndpoint']('user-123', 'cart-456', 'gc-789');

      expect(mockOccEndpoints.buildUrl).toHaveBeenCalledWith('removeGiftCard', {
        urlParams: {
          userId: 'user-123',
          cartId: 'cart-456',
          giftCardId: 'gc-789',
        },
      });
    });
  });

  describe('Error Handling', () => {
    it('should normalize and throw HTTP errors', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorThrown = false;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: () => {
          errorThrown = true;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.error(new ErrorEvent('Network error'));

      expect(errorThrown).toBeTruthy();
    });

    it('should handle server errors (500)', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorThrown = false;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: () => {
          errorThrown = true;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.flush('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      expect(errorThrown).toBeTruthy();
    });

    it('should handle unauthorized errors (401)', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      let errorThrown = false;
      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: () => {
          errorThrown = true;
        },
      });

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(errorThrown).toBeTruthy();
    });
  });

  describe('Headers', () => {
    it('should have Content-Type header set to application/json', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      adapter.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe();

      const req = httpMock.expectOne(
        '/rest/v2/users/user-123/carts/cart-123/giftCards'
      );
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockGiftCardResponse);
    });
  });
});
