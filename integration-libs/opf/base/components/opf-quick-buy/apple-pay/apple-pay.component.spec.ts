/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ApplePayComponent } from './apple-pay.component';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { ApplePayService } from './apple-pay.service';
import { ApplePaySessionFactory } from './apple-pay-session';
import {
  OpfCartHandlerService,
  OpfPaymentErrorHandlerService,
} from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  DigitalWalletQuickBuy,
  OpfPaymentError,
  OpfProviderType,
} from '@spartacus/opf/base/root';
import { of, throwError } from 'rxjs';
import { Product } from '@spartacus/core';

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: {
    stockLevel: 333,
    stockLevelStatus: 'inStock',
  },
};

const mockActiveConfiguration: ActiveConfiguration = {
  digitalWalletQuickBuy: [
    {
      merchantId: 'merchant.com.adyen.upscale.test',
      provider: OpfProviderType.APPLE_PAY,
      countryCode: 'US',
    },
    { merchantId: 'merchant.test.example' },
  ],
};

describe('ApplePayComponent', () => {
  let component: ApplePayComponent;
  let fixture: ComponentFixture<ApplePayComponent>;
  let mockApplePayService: jasmine.SpyObj<ApplePayService>;
  let mockCurrentProductService: jasmine.SpyObj<CurrentProductService>;
  let mockItemCounterService: jasmine.SpyObj<ItemCounterService>;
  let mockCartHandlerService: jasmine.SpyObj<OpfCartHandlerService>;
  let mockApplePaySessionFactory: jasmine.SpyObj<ApplePaySessionFactory>;
  let mockOpfPaymentErrorHandlerService: jasmine.SpyObj<OpfPaymentErrorHandlerService>;
  const mockCountryCode = 'US';
  const mockCounter = 2;

  beforeEach(() => {
    mockApplePayService = jasmine.createSpyObj('ApplePayService', ['start']);
    mockCurrentProductService = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);
    mockItemCounterService = jasmine.createSpyObj('ItemCounterService', [
      'getCounter',
    ]);
    mockCartHandlerService = jasmine.createSpyObj('OpfCartHandlerService', [
      'checkStableCart',
    ]);
    mockApplePaySessionFactory = jasmine.createSpyObj(
      'ApplePaySessionFactory',
      ['isApplePaySupported$']
    );
    mockOpfPaymentErrorHandlerService = jasmine.createSpyObj(
      'OpfPaymentErrorHandlerService',
      ['handlePaymentError']
    );

    TestBed.configureTestingModule({
      declarations: [ApplePayComponent],
      providers: [
        { provide: ApplePayService, useValue: mockApplePayService },
        { provide: CurrentProductService, useValue: mockCurrentProductService },
        { provide: ItemCounterService, useValue: mockItemCounterService },
        { provide: OpfCartHandlerService, useValue: mockCartHandlerService },
        {
          provide: ApplePaySessionFactory,
          useValue: mockApplePaySessionFactory,
        },
        {
          provide: OpfPaymentErrorHandlerService,
          useValue: mockOpfPaymentErrorHandlerService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplePayComponent);
    component = fixture.componentInstance;

    const mockProductObservable = of(mockProduct);
    const mockCartCheckObservable = of(true);

    mockCurrentProductService.getProduct.and.returnValue(mockProductObservable);
    mockItemCounterService.getCounter.and.returnValue(mockCounter);
    mockCartHandlerService.checkStableCart.and.returnValue(
      mockCartCheckObservable
    );
  });
  afterEach(() => {
    component.ngOnDestroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isApplePaySupported$ provider is Apple pay', () => {
    const digitalWallet: DigitalWalletQuickBuy = {
      provider: OpfProviderType.APPLE_PAY,
      countryCode: mockCountryCode,
      merchantId: 'merchant.com.adyen.upscale.test',
    };
    component.activeConfiguration = { digitalWalletQuickBuy: [digitalWallet] };

    const mockObservable = of(true);
    mockApplePaySessionFactory.isApplePaySupported$.and.returnValue(
      mockObservable
    );

    fixture.detectChanges();
    expect(component.isApplePaySupported$).toBe(mockObservable);
  });

  it('should not initialize isApplePaySupported$ provider is not Apple pay', () => {
    const digitalWallet: DigitalWalletQuickBuy = {
      provider: OpfProviderType.GOOGLE_PAY,
      countryCode: mockCountryCode,
      merchantId: 'merchant.com.adyen.upscale.test',
    };
    component.activeConfiguration = { digitalWalletQuickBuy: [digitalWallet] };

    const mockObservable = of(true);
    mockApplePaySessionFactory.isApplePaySupported$.and.returnValue(
      mockObservable
    );

    fixture.detectChanges();
    expect(
      mockApplePaySessionFactory.isApplePaySupported$
    ).not.toHaveBeenCalled();
  });

  it('should start applePayService', () => {
    mockApplePayService.start.and.returnValue(
      of(<ApplePayJS.ApplePayPaymentAuthorizationResult>{ status: 1 })
    );
    component.activeConfiguration = {
      digitalWalletQuickBuy: [
        {
          provider: OpfProviderType.APPLE_PAY,
          countryCode: mockCountryCode,
          merchantId: 'merchant.com.adyen.upscale.test',
        },
      ],
    };
    component.activeConfiguration = mockActiveConfiguration;
    fixture.detectChanges();

    component.quickBuyProduct();
    expect(
      mockOpfPaymentErrorHandlerService.handlePaymentError
    ).not.toHaveBeenCalled();
  });

  it('should call applePayService with correct parameters', () => {
    const mockError: OpfPaymentError = { message: 'Payment error' };
    mockApplePayService.start.and.returnValue(throwError(mockError));

    component.activeConfiguration = {
      digitalWalletQuickBuy: [
        {
          provider: OpfProviderType.APPLE_PAY,
          countryCode: mockCountryCode,
          merchantId: 'merchant.com.adyen.upscale.test',
        },
      ],
    };
    component.activeConfiguration = mockActiveConfiguration;
    fixture.detectChanges();

    component.quickBuyProduct();
    expect(mockCurrentProductService.getProduct).toHaveBeenCalled();
    expect(mockItemCounterService.getCounter).toHaveBeenCalled();
    expect(mockCartHandlerService.checkStableCart).toHaveBeenCalled();
    expect(mockApplePayService.start).toHaveBeenCalledWith(
      mockProduct,
      mockCounter,
      mockCountryCode
    );
    expect(
      mockOpfPaymentErrorHandlerService.handlePaymentError
    ).toHaveBeenCalledWith(mockError);
  });
});
