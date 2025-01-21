/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { ApplePaySessionWrapperService } from './apple-pay-session/apple-pay-session-wrapper.service';
import { ApplePaySessionOrchestrator } from './apple-pay-session/apple-pay-session.orchestrator';
import { ApplePayService } from './apple-pay.service';

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
  let applePaySessionOrchestratorMock: jasmine.SpyObj<ApplePaySessionOrchestrator>;
  let applePaySessionWrapperServiceMock: jasmine.SpyObj<ApplePaySessionWrapperService>;
  let applePayObservableTestController: Subject<ApplePayJS.ApplePayPaymentAuthorizationResult>;
  let opfQuickBuyButtonsServiceMock: jasmine.SpyObj<OpfQuickBuyButtonsService>;
  let opfQuickBuyServiceMock: jasmine.SpyObj<OpfQuickBuyService>;

  beforeEach(() => {
    opfQuickBuyButtonsServiceMock = jasmine.createSpyObj(
      'OpfQuickBuyButtonsService',
      ['getQuickBuyProviderConfig']
    );

    applePaySessionWrapperServiceMock = jasmine.createSpyObj(
      'ApplePaySessionWrapperService',
      ['startApplePaySession']
    );
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentService', [
      'submitPayment',
    ]);
    opfQuickBuyServiceMock = jasmine.createSpyObj('OpfQuickBuyService', [
      'getApplePayWebSession',
    ]);
    applePaySessionOrchestratorMock = jasmine.createSpyObj(
      'ApplePaySessionOrchestrator',
      ['start']
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
        'handleCartGuestUser',
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
          provide: ApplePaySessionOrchestrator,
          useValue: applePaySessionOrchestratorMock,
        },
        {
          provide: ApplePaySessionWrapperService,
          useValue: applePaySessionWrapperServiceMock,
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
    applePaySessionOrchestratorMock.start.and.returnValue(
      applePayObservableTestController
    );
    opfQuickBuyTransactionServiceMock.handleCartGuestUser.and.returnValue(
      of(true)
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

    applePaySessionOrchestratorMock.start.and.returnValue(
      throwError(() => 'Error')
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
