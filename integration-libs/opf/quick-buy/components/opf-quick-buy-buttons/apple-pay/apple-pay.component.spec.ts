/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Add unit tests...

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Product } from '@spartacus/core';
// import {
//   OpfCartHandlerService,
//   OpfPaymentErrorHandlerService,
// } from '@spartacus/opf/base/core';
// import {
//   ActiveConfiguration,
//   DigitalWalletQuickBuy,
//   OpfProviderType,
//   OpfQuickBuyLocation,
// } from '@spartacus/opf/base/root';
// import {
//   CurrentProductService,
//   ItemCounterService,
// } from '@spartacus/storefront';
// import { of } from 'rxjs';
// import { OpfQuickBuyService } from '../opf-quick-buy.service';
// import { ApplePaySessionFactory } from './apple-pay-session';
// import { ApplePayComponent } from './apple-pay.component';
// import { ApplePayService } from './apple-pay.service';

// const mockProduct: Product = {
//   name: 'mockProduct',
//   code: 'code1',
//   stock: {
//     stockLevel: 333,
//     stockLevelStatus: 'inStock',
//   },
// };

// const mockActiveConfiguration: ActiveConfiguration = {
//   digitalWalletQuickBuy: [
//     {
//       merchantId: 'merchant.com.adyen.upscale.test',
//       provider: OpfProviderType.APPLE_PAY,
//       countryCode: 'US',
//     },
//     { merchantId: 'merchant.test.example' },
//   ],
// };

// describe('ApplePayComponent', () => {
//   let component: ApplePayComponent;
//   let fixture: ComponentFixture<ApplePayComponent>;
//   let mockApplePayService: jasmine.SpyObj<ApplePayService>;
//   let mockCurrentProductService: jasmine.SpyObj<CurrentProductService>;
//   let mockItemCounterService: jasmine.SpyObj<ItemCounterService>;
//   let mockCartHandlerService: jasmine.SpyObj<OpfCartHandlerService>;
//   let mockApplePaySessionFactory: jasmine.SpyObj<ApplePaySessionFactory>;
//   let mockOpfPaymentErrorHandlerService: jasmine.SpyObj<OpfPaymentErrorHandlerService>;
//   let mockOpfQuickBuyService: jasmine.SpyObj<OpfQuickBuyService>;
//   const mockCountryCode = 'US';
//   const mockCounter = 2;

//   beforeEach(() => {
//     mockApplePayService = jasmine.createSpyObj('ApplePayService', ['start']);
//     mockCurrentProductService = jasmine.createSpyObj('CurrentProductService', [
//       'getProduct',
//     ]);
//     mockItemCounterService = jasmine.createSpyObj('ItemCounterService', [
//       'getCounter',
//     ]);
//     mockCartHandlerService = jasmine.createSpyObj('OpfCartHandlerService', [
//       'checkStableCart',
//       'blockMiniCartComponentUpdate',
//     ]);
//     mockApplePaySessionFactory = jasmine.createSpyObj(
//       'ApplePaySessionFactory',
//       ['isApplePaySupported$']
//     );
//     mockOpfPaymentErrorHandlerService = jasmine.createSpyObj(
//       'OpfPaymentErrorHandlerService',
//       ['handlePaymentError']
//     );
//     mockOpfQuickBuyService = jasmine.createSpyObj('OpfQuickBuyService', [
//       'getQuickBuyLocationContext',
//     ]);

//     TestBed.configureTestingModule({
//       declarations: [ApplePayComponent],
//       providers: [
//         { provide: ApplePayService, useValue: mockApplePayService },
//         { provide: CurrentProductService, useValue: mockCurrentProductService },
//         { provide: ItemCounterService, useValue: mockItemCounterService },
//         { provide: OpfCartHandlerService, useValue: mockCartHandlerService },
//         {
//           provide: ApplePaySessionFactory,
//           useValue: mockApplePaySessionFactory,
//         },
//         {
//           provide: OpfPaymentErrorHandlerService,
//           useValue: mockOpfPaymentErrorHandlerService,
//         },
//         {
//           provide: OpfQuickBuyService,
//           useValue: mockOpfQuickBuyService,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ApplePayComponent);
//     component = fixture.componentInstance;

//     const mockProductObservable = of(mockProduct);
//     const mockCartCheckObservable = of(true);

//     mockCurrentProductService.getProduct.and.returnValue(mockProductObservable);
//     mockItemCounterService.getCounter.and.returnValue(mockCounter);
//     mockCartHandlerService.checkStableCart.and.returnValue(
//       mockCartCheckObservable
//     );
//     mockOpfQuickBuyService.getQuickBuyLocationContext.and.returnValue(
//       of(OpfQuickBuyLocation.PRODUCT)
//     );
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize isApplePaySupported$ provider is Apple pay', () => {
//     const digitalWallet: DigitalWalletQuickBuy = {
//       provider: OpfProviderType.APPLE_PAY,
//       countryCode: mockCountryCode,
//       merchantId: 'merchant.com.adyen.upscale.test',
//     };
//     component.activeConfiguration = { digitalWalletQuickBuy: [digitalWallet] };

//     const mockObservable = of(true);
//     mockApplePaySessionFactory.isApplePaySupported$.and.returnValue(
//       mockObservable
//     );

//     fixture.detectChanges();
//     expect(component.isApplePaySupported$).toBe(mockObservable);
//   });

//   it('should not initialize isApplePaySupported$ provider is not Apple pay', () => {
//     const digitalWallet: DigitalWalletQuickBuy = {
//       provider: OpfProviderType.GOOGLE_PAY,
//       countryCode: mockCountryCode,
//       merchantId: 'merchant.com.adyen.upscale.test',
//     };
//     component.activeConfiguration = { digitalWalletQuickBuy: [digitalWallet] };

//     const mockObservable = of(true);
//     mockApplePaySessionFactory.isApplePaySupported$.and.returnValue(
//       mockObservable
//     );

//     fixture.detectChanges();
//     expect(
//       mockApplePaySessionFactory.isApplePaySupported$
//     ).not.toHaveBeenCalled();
//   });

//   it('should start applePayService', () => {
//     mockApplePayService.start.and.returnValue(
//       of(<ApplePayJS.ApplePayPaymentAuthorizationResult>{ status: 1 })
//     );
//     component.activeConfiguration = {
//       digitalWalletQuickBuy: [
//         {
//           provider: OpfProviderType.APPLE_PAY,
//           countryCode: mockCountryCode,
//           merchantId: 'merchant.com.adyen.upscale.test',
//         },
//       ],
//     };
//     component.activeConfiguration = mockActiveConfiguration;
//     fixture.detectChanges();

//     component.initTransaction();
//     expect(
//       mockOpfPaymentErrorHandlerService.handlePaymentError
//     ).not.toHaveBeenCalled();
//   });
// });
