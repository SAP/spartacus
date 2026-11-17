/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Product, WindowRef } from '@spartacus/core';
import { OpfPaymentService } from '@spartacus/opf/payment/core';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import {
  OpfQuickBuyService,
  OpfQuickBuyTransactionService,
} from '@spartacus/opf/quick-buy/core';
import {
  defaultOpfQuickBuyConfig,
  OpfQuickBuyConfig,
  OpfQuickBuyDeliveryType,
} from '@spartacus/opf/quick-buy/root';
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
  let opfPaymentFacadeMock: any;
  let opfQuickBuyTransactionServiceMock: any;
  let applePaySessionOrchestratorMock: any;
  let applePaySessionWrapperServiceMock: any;
  let applePayObservableTestController: Subject<ApplePayJS.ApplePayPaymentAuthorizationResult>;
  let opfQuickBuyButtonsServiceMock: any;
  let opfQuickBuyServiceMock: any;

  beforeEach(() => {
    opfQuickBuyButtonsServiceMock = { getQuickBuyProviderConfig: vi.fn() };

    applePaySessionWrapperServiceMock = { startApplePaySession: vi.fn() };
    opfPaymentFacadeMock = { submitPayment: vi.fn() };
    opfQuickBuyServiceMock = { getApplePayWebSession: vi.fn() };
    applePaySessionOrchestratorMock = { start: vi.fn() };
    opfQuickBuyTransactionServiceMock = { deleteUserAddresses: vi.fn(), getTransactionLocationContext: vi.fn(), getTransactionDeliveryInfo: vi.fn(), getMerchantName: vi.fn(), checkStableCart: vi.fn(), getSupportedDeliveryModes: vi.fn(), setDeliveryAddress: vi.fn(), setBillingAddress: vi.fn(), getDeliveryAddress: vi.fn(), getCurrentCart: vi.fn(), getCurrentCartId: vi.fn(), getCurrentCartTotalPrice: vi.fn(), setDeliveryMode: vi.fn(), getSelectedDeliveryMode: vi.fn(), handleCartGuestUser: vi.fn() };

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
        {
          provide: OpfQuickBuyConfig,
          useValue: defaultOpfQuickBuyConfig,
        },
      ],
    });
    service = TestBed.inject(ApplePayService);

    applePayObservableTestController = new Subject();
    applePaySessionOrchestratorMock.start.mockReturnValue(
      applePayObservableTestController
    );
    opfQuickBuyTransactionServiceMock.handleCartGuestUser.mockReturnValue(
      of(true)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle errors during ApplePay session start', () => {
    service = TestBed.inject(ApplePayService);
    const merchantNameMock = 'Nakano';
    opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
      of({
        type: OpfQuickBuyDeliveryType.SHIPPING,
      })
    );

    applePaySessionOrchestratorMock.start.mockReturnValue(
      throwError(() => 'Error')
    );

    opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
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
