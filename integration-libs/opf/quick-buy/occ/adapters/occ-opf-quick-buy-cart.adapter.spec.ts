/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  ConverterService,
  LoggerService,
  Occ,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/checkout/base/core';
import { OccOpfQuickBuyCartAdapter } from './occ-opf-quick-buy-cart.adapter';

const userId = 'current';
const cartId = 'cart-1';

const mockOccConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        quickBuyCreateDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        quickBuySetBillingAddress:
          'users/${userId}/carts/${cartId}/addresses/billing',
        quickBuyDeliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
        quickBuySetDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        quickBuySelectedDeliveryMode:
          'users/${userId}/carts/${cartId}?fields=deliveryMode(FULL)',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('OccOpfQuickBuyCartAdapter', () => {
  let adapter: OccOpfQuickBuyCartAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOpfQuickBuyCartAdapter,
        { provide: OccConfig, useValue: mockOccConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccOpfQuickBuyCartAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create delivery address', () => {
    const address = { firstName: 'John', lastName: 'Doe' };
    const occAddress: Occ.Address = {
      ...address,
      id: 'address-1',
    };

    converter.convert(address, ADDRESS_SERIALIZER);
    converter.pipeable(ADDRESS_NORMALIZER);

    adapter
      .createDeliveryAddress(userId, cartId, address)
      .subscribe((result) => {
        expect(result.id).toBe('address-1');
      });

    const req = httpMock.expectOne((request) =>
      request.url.includes(`users/${userId}/carts/${cartId}/addresses/delivery`)
    );
    expect(req.request.method).toBe('POST');
    req.flush(occAddress);
  });

  it('should set billing address', () => {
    const address = { firstName: 'John', lastName: 'Doe' };

    adapter.setBillingAddress(userId, cartId, address).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url.includes(`users/${userId}/carts/${cartId}/addresses/billing`)
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should get supported delivery modes', () => {
    const deliveryModes: DeliveryMode[] = [
      { code: 'standard', name: 'Standard Delivery' },
    ];

    converter.pipeableMany(DELIVERY_MODE_NORMALIZER);

    adapter.getSupportedDeliveryModes(userId, cartId).subscribe((result) => {
      expect(result).toEqual(deliveryModes);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(`users/${userId}/carts/${cartId}/deliverymodes`)
    );
    expect(req.request.method).toBe('GET');
    req.flush({ deliveryModes });
  });

  it('should set delivery mode', () => {
    adapter.setDeliveryMode(userId, cartId, 'standard').subscribe();

    const req = httpMock.expectOne((request) =>
      request.url.includes(`users/${userId}/carts/${cartId}/deliverymode`)
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should get selected delivery mode', () => {
    const deliveryMode: DeliveryMode = {
      code: 'express',
      name: 'Express Delivery',
    };

    spyOn(converter, 'convert').and.returnValue(deliveryMode);

    adapter.getSelectedDeliveryMode(userId, cartId).subscribe((result) => {
      expect(result).toEqual(deliveryMode);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(
        `users/${userId}/carts/${cartId}?fields=deliveryMode(FULL)`
      )
    );
    expect(req.request.method).toBe('GET');
    req.flush({ deliveryMode });
  });
});
