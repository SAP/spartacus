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
import { WindowRef } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import {
  OpfPaymentFacade,
  OpfPaymentMethod,
} from '@spartacus/opf/payment/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { OpfGlobalFunctionsSharedService } from './opf-global-functions-shared.service';
import { UserIdService } from '@spartacus/core';

@Component({ template: '' })
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

const mockPaymentMethod =
  OpfQuickBuyProviderType.APPLE_PAY as unknown as OpfPaymentMethod;

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = jasmine
    .createSpy('getActiveCartId')
    .and.returnValue(of('test-cart-id'));
}

class MockCartAccessCodeFacade implements Partial<CartAccessCodeFacade> {
  getCartAccessCode(_userId: string, _cartId: string) {
    return of('test-access-code');
  }
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId() {
    return of('test-user-id');
  }
}

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
    termsAndConditionsChecked: false,
    selectedPaymentOptionId: undefined,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  });
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
  openDialogAndSubscribe() {
    return EMPTY;
  }
  launch() {
    return EMPTY;
  }
  clear(_caller?: LAUNCH_CALLER) {}
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

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

describe('OpfGlobalFunctionsSharedService', () => {
  let service: OpfGlobalFunctionsSharedService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let launchDialogService: LaunchDialogService;
  let componentRef: ComponentRef<TestContainerComponent>;

  const mockPaymentSessionId = 'mockSessionId';
  const submitOptions = {
    additionalData: [
      { key: 'returnUrl', value: 'https://returnUrl/' },
      { key: 'allow3DS2', value: 'true' },
      { key: 'originUrl', value: 'https://originUrl/' },
    ],
    submitSuccess: (): void => {},
    submitPending: (): void => {},
    submitFailure: (): void => {},
    paymentMethod: mockPaymentMethod,
  };

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
      providers: [
        OpfGlobalFunctionsSharedService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsSharedService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requirePaymentSessionId', () => {
    it('should throw when paymentSessionId is missing', () => {
      const metadataStore = TestBed.inject(OpfMetadataStoreService) as any;
      metadataStore.opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
        termsAndConditionsChecked: false,
        selectedPaymentOptionId: undefined,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });

      expect(() => service.requirePaymentSessionId()).toThrowError(
        'paymentSessionId is required'
      );
    });

    it('should resolve paymentSessionId from metadata store', () => {
      const metadataStore = TestBed.inject(OpfMetadataStoreService) as any;
      metadataStore.opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
        termsAndConditionsChecked: false,
        selectedPaymentOptionId: undefined,
        isPaymentInProgress: false,
        opfPaymentSessionId: 'metadata-session-id',
        isTermsAndConditionsAlertClosed: false,
      });

      expect(service.requirePaymentSessionId()).toBe('metadata-session-id');
    });
  });

  describe('submit', () => {
    it('should call submitPayment on facade', async () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      await service.submit(
        { ...submitOptions, cartId: 'mock-cart' },
        mockPaymentSessionId,
        {} as ViewContainerRef
      );

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });

    it('should pass submitCancel callback to facade', async () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));

      const submitCancel = (): void => {};
      await service.submit(
        { ...submitOptions, cartId: 'mock-cart', submitCancel },
        mockPaymentSessionId
      );

      const callArgs =
        opfPaymentFacadeMock.submitPayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
    });

    it('should use paymentSessionId from options when provided', async () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));

      await service.submit(
        { ...submitOptions, paymentSessionId: 'options-session-id' },
        ''
      );

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
      const callArgs =
        opfPaymentFacadeMock.submitPayment.calls.mostRecent().args[0];
      expect(callArgs.paymentSessionId).toBe('options-session-id');
    });

    it('should use default callbacks when none are provided', async () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));

      await service.submit(
        {
          additionalData: [],
          paymentMethod: mockPaymentMethod,
        } as any,
        mockPaymentSessionId
      );

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });
  });

  describe('submitComplete', () => {
    it('should call submitCompletePayment on facade', async () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));

      await service.submitComplete(
        { ...submitOptions, cartId: 'mock-cart' },
        mockPaymentSessionId,
        {} as ViewContainerRef
      );

      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });

    it('should pass submitCancel callback to facade', async () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      const submitCancel = (): void => {};
      await service.submitComplete(
        { ...submitOptions, cartId: 'mock-cart', submitCancel },
        mockPaymentSessionId
      );

      const callArgs =
        opfPaymentFacadeMock.submitCompletePayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
    });

    it('should use default callbacks when none are provided', async () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      await service.submitComplete(
        {
          additionalData: [],
        } as any,
        mockPaymentSessionId
      );

      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });
  });

  describe('loader spinner', () => {
    it('should start loader spinner via LaunchDialogService', () => {
      const launchSpy = spyOn(launchDialogService, 'launch').and.returnValue(
        EMPTY
      );

      service.startLoaderSpinner(componentRef.instance.vcr);

      expect(launchSpy).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        componentRef.instance.vcr
      );
    });

    it('should stop loader spinner by clearing and destroying component', () => {
      const clearSpy = spyOn(launchDialogService, 'clear').and.callThrough();
      const destroySpy = jasmine.createSpy('destroy');
      const overlayedSpinner$ = of({ destroy: destroySpy } as any);

      service.stopLoaderSpinner(overlayedSpinner$);

      expect(clearSpy).toHaveBeenCalledWith(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('update payment transaction error helpers', () => {
    it('should create helpful error message from nested details', () => {
      const error = (service as any).createUpdatePaymentTransactionError({
        details: [{ message: 'boom' }],
      });
      expect(error.message).toBe('Failed to update payment transaction: boom');
    });

    it('should fallback to generic error message', () => {
      const error = (service as any).createUpdatePaymentTransactionError({});
      expect(error.message).toBe('Failed to update payment transaction');
    });
  });

  describe('updatePaymentTransaction', () => {
    it('should wrap errors with a helpful message', async () => {
      const activeCartFacade = TestBed.inject(ActiveCartFacade) as any;
      activeCartFacade.getActiveCartId.and.returnValue(of(undefined));

      await expectAsync(
        service.updatePaymentTransaction({ paymentSessionId: 's' } as any)
      ).toBeRejectedWithError(
        'Failed to update payment transaction: Cart ID is required. No active cart found.'
      );
    });
  });

  describe('extractOtpKey', () => {
    it('should extract OTP key from string response', () => {
      expect(service.extractOtpKey('test-otp-key')).toBe('test-otp-key');
    });

    it('should extract OTP key from object with accessCode', () => {
      expect(service.extractOtpKey({ accessCode: 'test-access-code' })).toBe(
        'test-access-code'
      );
    });

    it('should return object when accessCode is missing', () => {
      const response = { other: 'value' };
      const result = service.extractOtpKey(response);
      expect(result).toBeDefined();
      expect(typeof result).not.toBe('string');
    });
  });
});
