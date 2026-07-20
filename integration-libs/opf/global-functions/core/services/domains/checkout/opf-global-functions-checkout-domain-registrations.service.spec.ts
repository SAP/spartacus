/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ComponentRef,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoutingService, UserIdService, WindowRef } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentEventsService,
  OpfPaymentFacade,
  OpfPaymentMethod,
} from '@spartacus/opf/payment/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsCheckoutDomainRegistrationsService } from './opf-global-functions-checkout-domain-registrations.service';
import { facadeProviders } from '../../../facade/facade-providers';

@Component({ template: '' })
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

const mockPaymentMethod =
  OpfQuickBuyProviderType.APPLE_PAY as unknown as OpfPaymentMethod;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
  openDialogAndSubscribe() {
    return of(undefined as any);
  }
  launch() {
    return of(undefined as any);
  }
  clear() {}
  openDialog(_caller: any, _openElement?: ElementRef, _vcr?: ViewContainerRef) {
    return of(1);
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
  });
  updateOpfMetadata = jasmine.createSpy('updateOpfMetadata');
  getOpfMetadataState = jasmine.createSpy('getOpfMetadataState');
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

class MockUserIdService implements Partial<UserIdService> {
  getUserId() {
    return of('test-user-id');
  }
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

describe('OpfGlobalFunctionsCheckoutDomainRegistrationsService', () => {
  let service: OpfGlobalFunctionsCheckoutDomainRegistrationsService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let launchDialogService: LaunchDialogService;
  let container: OpfPaymentGlobalMethods;
  let componentRef: ComponentRef<TestContainerComponent>;

  const mockPaymentSessionId = 'mockSessionId';

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
      providers: [
        ...facadeProviders,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        {
          provide: OpfPaymentEventsService,
          useValue: jasmine.createSpyObj('OpfPaymentEventsService', [
            'emitReinitiatePaymentEvent',
          ]),
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
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
      ],
    });
    service = TestBed.inject(
      OpfGlobalFunctionsCheckoutDomainRegistrationsService
    );
    launchDialogService = TestBed.inject(LaunchDialogService);
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
    container = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerAll', () => {
    beforeEach(() => {
      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: mockPaymentSessionId,
        vcr: componentRef.instance.vcr,
      });
    });

    it('should register all checkout global functions on container', () => {
      expect(container.submit).toBeDefined();
      expect(container.submitComplete).toBeDefined();
      expect(container.throwPaymentError).toBeDefined();
      expect(container.startLoadIndicator).toBeDefined();
      expect(container.stopLoadIndicator).toBeDefined();
      expect(container.reinitiatePaymentForm).toBeDefined();
      expect(container.handle3DSRedirect).toBeDefined();
      expect(container.updatePaymentTransaction).toBeDefined();
    });

    it('should handle submit through registered function', () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));

      container.submit?.({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
        paymentMethod: mockPaymentMethod,
      });

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });

    it('should handle submitComplete through registered function', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));

      container.submitComplete?.({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
      });

      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });
  });
});
