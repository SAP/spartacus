/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccOpfPaymentAdapter } from './occ-opf-payment.adapter';
import { of, throwError } from 'rxjs';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { ConverterService } from '@spartacus/core';

describe('OccOpfPaymentAdapter', () => {
  let adapter: OccOpfPaymentAdapter;
  let httpClient: HttpClient;
  let occEndpoints: OccEndpointsService;
  let converter: ConverterService;

  const mockCart = { code: 'test-cart' };
  const userId = 'test-user';
  const cartId = 'test-cart';
  const sapPaymentOptionId = 'test-payment-option';
  const purchaseOrderNumber = 'test-po';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOpfPaymentAdapter,
        {
          provide: HttpClient,
          useValue: {
            put: jasmine.createSpy('put').and.returnValue(of(mockCart)),
          },
        },
        {
          provide: OccEndpointsService,
          useValue: {
            buildUrl: jasmine.createSpy('buildUrl').and.returnValue('test-url'),
          },
        },
        {
          provide: ConverterService,
          useValue: {
            pipeable: jasmine
              .createSpy('pipeable')
              .and.returnValue((source: any) => source),
          },
        },
      ],
    });

    adapter = TestBed.inject(OccOpfPaymentAdapter);
    httpClient = TestBed.inject(HttpClient);
    occEndpoints = TestBed.inject(OccEndpointsService);
    converter = TestBed.inject(ConverterService);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('setCartPaymentOption', () => {
    it('should set cart payment option successfully', () => {
      adapter
        .setCartPaymentOption(userId, cartId, sapPaymentOptionId)
        .subscribe((result) => {
          expect(result).toEqual(mockCart);
        });

      expect(occEndpoints.buildUrl).toHaveBeenCalledWith(
        'setCartPaymentOption',
        {
          urlParams: { userId, cartId },
          queryParams: { fields: 'DEFAULT' },
        }
      );

      expect(httpClient.put).toHaveBeenCalledWith(
        'test-url',
        JSON.stringify({
          sapPaymentOptionId: sapPaymentOptionId,
          purchaseOrderNumber: undefined,
        }),
        {
          headers: jasmine.any(HttpHeaders),
        }
      );

      expect(converter.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });

    it('should set cart payment option with purchase order number', () => {
      adapter
        .setCartPaymentOption(
          userId,
          cartId,
          sapPaymentOptionId,
          purchaseOrderNumber
        )
        .subscribe((result) => {
          expect(result).toEqual(mockCart);
        });

      expect(httpClient.put).toHaveBeenCalledWith(
        'test-url',
        JSON.stringify({
          sapPaymentOptionId: sapPaymentOptionId,
          purchaseOrderNumber: purchaseOrderNumber,
        }),
        {
          headers: jasmine.any(HttpHeaders),
        }
      );
    });

    it('should handle HTTP error', () => {
      const error = new Error('Test error');
      (httpClient.put as jasmine.Spy).and.returnValue(throwError(() => error));

      adapter
        .setCartPaymentOption(userId, cartId, sapPaymentOptionId)
        .subscribe({
          error: (err) => {
            expect(err).toBeTruthy();
          },
        });
    });
  });
});
