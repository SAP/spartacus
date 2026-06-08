/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  InjectionToken,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoutingService, WindowRef } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import {
  OpfPaymentEventsService,
  OpfPaymentFacade,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { OpfGlobalFunctionsCheckoutDomainRegistrationsService } from '../services/domains/checkout/opf-global-functions-checkout-domain-registrations.service';
import { OpfGlobalFunctionsGlobalDomainRegistrationsService } from '../services/domains/global/opf-global-functions-global-domain-registrations.service';
import { OpfGlobalFunctionsRedirectDomainRegistrationsService } from '../services/domains/redirect/opf-global-functions-redirect-domain-registrations.service';
import { facadeProviders } from './facade-providers';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';

export const WINDOW = new InjectionToken<Window>('window');

@Component({ template: '' })
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
  openDialogAndSubscribe() {
    return EMPTY;
  }
  launch() {}
  clear() {}
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  getFullUrl(_options?: any): string {
    return 'https://test-url';
  }
}

class MockOpfCtaFacade implements Partial<OpfCtaFacade> {}

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
    termsAndConditionsChecked: false,
    selectedPaymentOptionId: undefined,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
    is3DSRedirect: false,
    opf3DSRedirectReturnPath: undefined,
  });
  updateOpfMetadata = jasmine
    .createSpy('updateOpfMetadata')
    .and.callFake((payload: Partial<OpfMetadataModel>) => {
      this.opfMetadataState.next({
        ...this.opfMetadataState.value,
        ...payload,
      });
    });
  getOpfMetadataState = jasmine
    .createSpy('getOpfMetadataState')
    .and.returnValue(this.opfMetadataState.asObservable());
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = jasmine
    .createSpy('getActiveCartId')
    .and.returnValue(of('test-cart-id'));
  getActive = jasmine.createSpy('getActive').and.returnValue(of({} as any));
  takeActive = jasmine.createSpy('takeActive').and.returnValue(of({} as any));
  isStable = jasmine.createSpy('isStable').and.returnValue(of(false, true));
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = jasmine.createSpy('getCart').and.returnValue(of({} as any));
  reloadCart = jasmine.createSpy('reloadCart');
}

class MockCartAccessCodeFacade implements Partial<CartAccessCodeFacade> {
  getCartAccessCode(_userId: string, _cartId: string) {
    return of('test-access-code');
  }
}

class MockOpfQuickBuyTransactionService
  implements Partial<OpfQuickBuyTransactionService> {}

function createOpfPaymentFacadeMock(): jasmine.SpyObj<OpfPaymentFacade> {
  return jasmine.createSpyObj('OpfPaymentFacade', [
    'submitPayment',
    'submitCompletePayment',
    'getActiveConfigurationsState',
    'verifyPayment',
    'initiatePayment',
    'updatePaymentTransaction',
  ]);
}

function createOpfPaymentEventsServiceMock(): jasmine.SpyObj<OpfPaymentEventsService> {
  return jasmine.createSpyObj('OpfPaymentEventsService', [
    'emitReinitiatePaymentEvent',
  ]);
}

function getWindowOpfPayments(windowRef: WindowRef, domain: string): any {
  return (windowRef.nativeWindow as any)?.['Opf']?.['payments']?.[domain];
}

describe('OpfGlobalFunctionsService', () => {
  let service: OpfGlobalFunctionsService;
  let windowRef: WindowRef;
  let checkoutDomain: OpfGlobalFunctionsCheckoutDomainRegistrationsService;
  let globalDomain: OpfGlobalFunctionsGlobalDomainRegistrationsService;
  let redirectDomain: OpfGlobalFunctionsRedirectDomainRegistrationsService;

  const mockPaymentSessionId = 'mockSessionId';
  const registerInput = {
    domain: OpfGlobalFunctionsDomain.CHECKOUT,
    paymentSessionId: mockPaymentSessionId,
    vcr: {} as ViewContainerRef,
  };

  beforeEach(() => {
    const opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    const opfPaymentEventsServiceMock = createOpfPaymentEventsServiceMock();

    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
      providers: [
        ...facadeProviders,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        {
          provide: OpfPaymentEventsService,
          useValue: opfPaymentEventsServiceMock,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OpfCtaFacade, useClass: MockOpfCtaFacade },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsService);
    windowRef = TestBed.inject(WindowRef);
    checkoutDomain = TestBed.inject(
      OpfGlobalFunctionsCheckoutDomainRegistrationsService
    );
    globalDomain = TestBed.inject(
      OpfGlobalFunctionsGlobalDomainRegistrationsService
    );
    redirectDomain = TestBed.inject(
      OpfGlobalFunctionsRedirectDomainRegistrationsService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('SSR guard', () => {
    it('should not register global functions in SSR', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      spyOn(checkoutDomain, 'registerAll');

      service.registerGlobalFunctions(registerInput);

      expect(checkoutDomain.registerAll).not.toHaveBeenCalled();
    });

    it('should not unregister global functions in SSR', () => {
      service.registerGlobalFunctions(registerInput);
      const windowOpf = getWindowOpfPayments(
        windowRef,
        OpfGlobalFunctionsDomain.CHECKOUT
      );

      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.CHECKOUT);

      expect(windowOpf?.['submit']).toBeDefined();
    });
  });

  describe('registerGlobalFunctions', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
    });

    it('should delegate CHECKOUT registration to checkout domain service', () => {
      spyOn(checkoutDomain, 'registerAll').and.callThrough();

      service.registerGlobalFunctions(registerInput);

      expect(checkoutDomain.registerAll).toHaveBeenCalled();
      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.CHECKOUT)?.[
          'submit'
        ]
      ).toBeDefined();
    });

    it('should delegate GLOBAL registration to global domain service', () => {
      spyOn(globalDomain, 'registerAll').and.callThrough();

      service.registerGlobalFunctions({
        ...registerInput,
        domain: OpfGlobalFunctionsDomain.GLOBAL,
      });

      expect(globalDomain.registerAll).toHaveBeenCalled();
      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.GLOBAL)?.[
          'getCart'
        ]
      ).toBeDefined();
    });

    it('should delegate REDIRECT registration to redirect domain service', () => {
      spyOn(redirectDomain, 'registerAll').and.callThrough();

      service.registerGlobalFunctions({
        ...registerInput,
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paramsMap: [{ key: 'key1', value: 'value1' }],
      });

      expect(redirectDomain.registerAll).toHaveBeenCalled();
      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.REDIRECT)?.[
          'getRedirectParams'
        ]
      ).toBeDefined();
    });
  });

  describe('unregisterGlobalFunctions', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
    });

    it('should remove CHECKOUT domain from window.Opf.payments', () => {
      service.registerGlobalFunctions(registerInput);
      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.CHECKOUT)
      ).toBeDefined();

      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.CHECKOUT);

      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.CHECKOUT)
      ).not.toBeDefined();
    });

    it('should remove REDIRECT domain from window.Opf.payments', () => {
      service.registerGlobalFunctions({
        ...registerInput,
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paramsMap: [],
      });

      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.REDIRECT);

      expect(
        getWindowOpfPayments(windowRef, OpfGlobalFunctionsDomain.REDIRECT)
      ).not.toBeDefined();
    });
  });
});
