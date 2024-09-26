/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Product, WindowRef } from '@spartacus/core';
import { OpfPaymentService } from '@spartacus/opf/payment/core';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import {
  OpfQuickBuyService,
  OpfQuickBuyTransactionService,
} from '@spartacus/opf/quick-buy/core';
import { OpfQuickBuyDeliveryType } from '@spartacus/opf/quick-buy/root';
import { Subject, of, throwError } from 'rxjs';
import { OpfQuickBuyButtonsService } from '../opf-quick-buy-buttons.service';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayService } from './apple-pay.service';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

const mockProduct: Product = {
  name: 'Product Name',
  code: 'PRODUCT_CODE',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'url',
        altText: 'alt',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
    value: 1.5,
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

const MockWindowRef = {
  nativeWindow: {
    location: {
      hostname: 'testHost',
    },
  },
};

describe('ApplePayService', () => {
  let service: ApplePayService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentService>;
  let opfQuickBuyTransactionServiceMock: jasmine.SpyObj<OpfQuickBuyTransactionService>;
  let applePayObservableFactoryMock: jasmine.SpyObj<ApplePayObservableFactory>;
  let applePaySessionFactoryMock: jasmine.SpyObj<ApplePaySessionFactory>;
  let applePayObservableTestController: Subject<ApplePayJS.ApplePayPaymentAuthorizationResult>;
  let opfQuickBuyButtonsServiceMock: jasmine.SpyObj<OpfQuickBuyButtonsService>;
  let opfQuickBuyServiceMock: jasmine.SpyObj<OpfQuickBuyService>;

  beforeEach(() => {
    opfQuickBuyButtonsServiceMock = jasmine.createSpyObj(
      'OpfQuickBuyButtonsService',
      ['getQuickBuyProviderConfig']
    );

    applePaySessionFactoryMock = jasmine.createSpyObj(
      'ApplePaySessionFactory',
      ['startApplePaySession']
    );
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentService', [
      'submitPayment',
    ]);
    opfQuickBuyServiceMock = jasmine.createSpyObj('OpfQuickBuyService', [
      'getApplePayWebSession',
    ]);
    applePayObservableFactoryMock = jasmine.createSpyObj(
      'ApplePayObservableFactory',
      ['initApplePayEventsHandler']
    );
    opfQuickBuyTransactionServiceMock = jasmine.createSpyObj(
      'OpfQuickBuyTransactionService',
      [
        'deleteUserAddresses',
        'getTransactionLocationContext',
        'getTransactionDeliveryInfo',
        'getMerchantName',
        'checkStableCart',
        'getSupportedDeliveryModes',
        'setDeliveryAddress',
        'setBillingAddress',
        'getDeliveryAddress',
        'getCurrentCart',
        'getCurrentCartId',
        'getCurrentCartTotalPrice',
        'setDeliveryMode',
        'getSelectedDeliveryMode',
        'deleteUserAddresses',
      ]
    );

    TestBed.configureTestingModule({
      providers: [
        ApplePayService,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: WindowRef, useValue: MockWindowRef },
        {
          provide: OpfQuickBuyTransactionService,
          useValue: opfQuickBuyTransactionServiceMock,
        },
        {
          provide: ApplePayObservableFactory,
          useValue: applePayObservableFactoryMock,
        },
        {
          provide: ApplePaySessionFactory,
          useValue: applePaySessionFactoryMock,
        },
        {
          provide: OpfQuickBuyButtonsService,
          useValue: opfQuickBuyButtonsServiceMock,
        },
        {
          provide: OpfQuickBuyService,
          useValue: opfQuickBuyServiceMock,
        },
      ],
    });
    service = TestBed.inject(ApplePayService);

    applePayObservableTestController = new Subject();
    applePayObservableFactoryMock.initApplePayEventsHandler.and.returnValue(
      applePayObservableTestController
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle errors during ApplePay session start', () => {
    service = TestBed.inject(ApplePayService);
    const merchantNameMock = 'Nakano';
    opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.and.returnValue(
      of({
        type: OpfQuickBuyDeliveryType.SHIPPING,
      })
    );

    applePayObservableFactoryMock.initApplePayEventsHandler.and.returnValue(
      throwError('Error')
    );

    opfQuickBuyTransactionServiceMock.getMerchantName.and.returnValue(
      of(merchantNameMock)
    );

    service
      .start({ product: mockProduct, quantity: 1, countryCode: 'us' })
      .subscribe({
        error: (err: any) => {
          expect(err).toBe('Error');
        },
      });
  });
});
