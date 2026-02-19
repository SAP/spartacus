/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ComponentRef,
  ElementRef,
  InjectionToken,
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
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { defaultOpfErrorDialogOptions } from '@spartacus/opf/base/root';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentEventsService,
  OpfPaymentFacade,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { Address } from '@spartacus/core';
import { OpfMetadataModel } from '@spartacus/opf/base/root';
import {
  OpfPaymentSessionData,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
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

const mockBillingAddress: Address = {
  id: 'billing-address-id',
  firstName: 'Jane',
  lastName: 'Smith',
  line1: '789 Business Blvd',
  town: 'Los Angeles',
  postalCode: '90002',
  country: { isocode: 'US' },
  region: { isocodeShort: 'CA' },
};

const mockDeliveryAddress: Address = {
  id: 'delivery-address-id',
  firstName: 'John',
  lastName: 'Doe',
  line1: '123 Main St',
  town: 'City',
  postalCode: '12345',
  country: { isocode: 'US' },
};

const mockDeliveryMode = {
  code: 'standard',
  name: 'Standard Delivery',
};

const mockCart = {
  code: 'test-cart-id',
  sapBillingAddress: mockBillingAddress,
  deliveryAddress: mockDeliveryAddress,
  deliveryMode: mockDeliveryMode,
} as any;

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = jasmine
    .createSpy('getActiveCartId')
    .and.returnValue(of('test-cart-id'));
  getActive = jasmine.createSpy('getActive').and.returnValue(of(mockCart));
  takeActive = jasmine.createSpy('takeActive').and.returnValue(of(mockCart));
  // isStable emits false first (skipped by skip(1)), then true (accepted by filter)
  // This simulates: initial state (false, skipped) -> stable after reload (true, taken)
  isStable = jasmine.createSpy('isStable').and.returnValue(of(false, true));
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
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

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = jasmine.createSpy('getCart').and.returnValue(of(mockCart));
  reloadCart = jasmine.createSpy('reloadCart');
}

class MockOpfQuickBuyTransactionService
  implements Partial<OpfQuickBuyTransactionService>
{
  setDeliveryAddress = jasmine
    .createSpy('setDeliveryAddress')
    .and.returnValue(of('test-address-id'));
  getDeliveryAddress = jasmine.createSpy('getDeliveryAddress').and.returnValue(
    of({
      id: 'test-address-id',
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main St',
      town: 'City',
      postalCode: '12345',
      country: { isocode: 'US' },
    })
  );
  setBillingAddress = jasmine
    .createSpy('setBillingAddress')
    .and.returnValue(of(true));
  setDeliveryMode = jasmine
    .createSpy('setDeliveryMode')
    .and.returnValue(of(mockDeliveryMode));
  getSelectedDeliveryMode = jasmine
    .createSpy('getSelectedDeliveryMode')
    .and.returnValue(of(mockDeliveryMode));
  deleteUserAddresses = jasmine.createSpy('deleteUserAddresses');
  updateCartGuestUserEmail = jasmine
    .createSpy('updateCartGuestUserEmail')
    .and.returnValue(of(true));
  createCartGuestUser = jasmine
    .createSpy('createCartGuestUser')
    .and.returnValue(of(true));
}

describe('OpfGlobalFunctionsService', () => {
  let service: OpfGlobalFunctionsService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let opfPaymentEventsServiceMock: jasmine.SpyObj<OpfPaymentEventsService>;
  let windowRef: WindowRef;
  opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
    'submitPayment',
    'submitCompletePayment',
    'getActiveConfigurationsState',
    'verifyPayment',
    'initiatePayment',
  ]);
  opfPaymentEventsServiceMock = jasmine.createSpyObj(
    'OpfPaymentEventsService',
    ['emitReinitiatePaymentEvent']
  );
  let componentRef: ComponentRef<TestContainerComponent>;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
      providers: [
        OpfGlobalFunctionsService,
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
        {
          provide: MultiCartFacade,
          useClass: MockMultiCartFacade,
        },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsService);
    windowRef = TestBed.inject(WindowRef);
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
    launchDialogService = TestBed.inject(LaunchDialogService);
    opfPaymentEventsServiceMock.emitReinitiatePaymentEvent.and.returnValue(
      undefined
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Global Functions in SSR', () => {
    const mockPaymentSessionId = 'mockSessionId';
    let windowOpf: any;

    it('should not register global functions for CHECKOUT in SSR', () => {
      spyOn<any>(service, 'registerSubmit').and.callThrough();
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
      });
      expect(service['registerSubmit']).not.toHaveBeenCalled();
    });

    it('should not remove global functions for CHECKOUT in SSR', () => {
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'];
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.CHECKOUT);
      expect(windowOpf?.['payments']?.['checkout']?.['submit']).toBeDefined();
    });
  });

  describe('should register global functions for CHECKOUT domain', () => {
    const mockPaymentSessionId = 'mockSessionId';
    let windowOpf: any;

    beforeEach(() => {
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;
    });

    it('should register global functions for CHECKOUT', () => {
      expect(windowOpf['payments']['checkout']['submit']).toBeDefined();
      expect(
        windowOpf['payments']['checkout']['throwPaymentError']
      ).toBeDefined();
      expect(
        windowOpf['payments']['checkout']['startLoadIndicator']
      ).toBeDefined();
      expect(
        windowOpf['payments']['checkout']['stopLoadIndicator']
      ).toBeDefined();
      expect(
        windowOpf['payments']['checkout']['reinitiatePaymentForm']
      ).toBeDefined();
    });

    it('should handle registerSubmit event', () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments['checkout'].submit({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
        paymentMethod: OpfQuickBuyProviderType.APPLE_PAY,
      });
      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });

    it('should handle registerSubmit event with submitCancel callback', () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const submitCancel = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments['checkout'].submit({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
        submitCancel,
        paymentMethod: OpfQuickBuyProviderType.APPLE_PAY,
      });
      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
      const callArgs =
        opfPaymentFacadeMock.submitPayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
    });

    it('should handle registerSubmitComplete event', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments['checkout'].submitComplete({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
        paymentMethod: OpfQuickBuyProviderType.APPLE_PAY,
      });
      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });

    it('should handle registerSubmitComplete event with submitCancel callback', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const submitCancel = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments['checkout'].submitComplete({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
        submitCancel,
      });
      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
      const callArgs =
        opfPaymentFacadeMock.submitCompletePayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
    });

    it('should handle throwPaymentError event', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));

      const dialog$: Observable<number> = of(1);
      const dialogSubscribeSpy = spyOn(dialog$, 'subscribe');
      spyOn(launchDialogService, 'openDialog').and.returnValue(dialog$);

      windowOpf.payments['checkout'].throwPaymentError(
        defaultOpfErrorDialogOptions
      );
      expect(launchDialogService.openDialog).toHaveBeenCalled();
      expect(dialogSubscribeSpy).toHaveBeenCalled();
    });

    it('should handle startLoadIndicator event', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      windowOpf.payments['checkout'].startLoadIndicator();
      expect(launchDialogService.launch).toHaveBeenCalled();

      windowOpf.payments['checkout'].startLoadIndicator();
      expect(launchDialogService.clear).toHaveBeenCalled();
    });

    it('should handle stopLoadIndicator event', () => {
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      windowOpf.payments['checkout'].startLoadIndicator();
      windowOpf.payments['checkout'].stopLoadIndicator();
      expect(launchDialogService.clear).toHaveBeenCalled();
    });

    it('should handle reinitiatePaymentForm event with payment option ID', async () => {
      const testPaymentOptionId = 123;

      const result = await (
        windowOpf.payments['checkout'] as any
      ).reinitiatePaymentForm(testPaymentOptionId);

      expect(
        opfPaymentEventsServiceMock.emitReinitiatePaymentEvent
      ).toHaveBeenCalledWith(testPaymentOptionId);
      expect(result).toBe(true);
    });

    it('should handle handle3DSRedirect event', async () => {
      const mockThreeDsURL = 'https://3ds.example.com/challenge';
      const mockReturnPath = 'https://test-url';
      const opfMetadataStoreService = TestBed.inject(OpfMetadataStoreService);

      const routingService = TestBed.inject(RoutingService);
      spyOn(routingService, 'getFullUrl').and.returnValue(mockReturnPath);

      const locationHrefSpy = jasmine.createSpy('locationHrefSetter');
      const mockLocation = {
        set href(url: string) {
          locationHrefSpy(url);
        },
        get href() {
          return '';
        },
      };
      const mockWindow = {
        location: mockLocation,
      } as any;

      spyOnProperty(windowRef, 'nativeWindow', 'get').and.returnValue(
        mockWindow
      );
      spyOn(windowRef, 'isBrowser').and.returnValue(true);

      const result =
        await windowOpf.payments['checkout'].handle3DSRedirect(mockThreeDsURL);

      expect(opfMetadataStoreService.updateOpfMetadata).toHaveBeenCalledWith({
        opfPaymentSessionId: mockPaymentSessionId,
        is3DSRedirect: true,
        opf3DSRedirectReturnPath: mockReturnPath,
      });
      expect(locationHrefSpy).toHaveBeenCalledWith(mockThreeDsURL);
      expect(result).toBeUndefined();
    });

    it('should remove global function for REDIRECT', () => {
      expect(
        windowOpf['payments'][OpfGlobalFunctionsDomain.CHECKOUT]
      ).toBeDefined();

      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.CHECKOUT);

      expect(
        windowOpf['payments'][OpfGlobalFunctionsDomain.CHECKOUT]
      ).not.toBeDefined();
    });
  });

  describe('should register global functions for GLOBAL domain', () => {
    const mockPaymentSessionId = 'mockSessionId';
    let windowOpf: any;

    beforeEach(() => {
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.GLOBAL,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;
    });

    it('should handle getCart event without cartId', async () => {
      const result = await windowOpf.payments['global'].getCart();

      const mockActiveCartFacade = TestBed.inject(
        ActiveCartFacade
      ) as jasmine.SpyObj<ActiveCartFacade>;
      expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(mockActiveCartFacade.isStable).toHaveBeenCalled();
      expect(mockActiveCartFacade.takeActive).toHaveBeenCalled();
      expect(result).toEqual(mockCart);
    });

    it('should handle getCart event with cartId', async () => {
      const mockMultiCartFacade = TestBed.inject(
        MultiCartFacade
      ) as jasmine.SpyObj<MultiCartFacade>;
      const cartId = 'specific-cart-id';
      const result = await windowOpf.payments['global'].getCart(cartId);

      expect(mockMultiCartFacade.reloadCart).toHaveBeenCalledWith(cartId);
      expect(mockMultiCartFacade.getCart).toHaveBeenCalledWith(cartId);
      expect(result).toEqual(mockCart);
    });

    it('should handle getBillingAddress event', async () => {
      const result = await windowOpf.payments['global'].getBillingAddress();

      const mockActiveCartFacade = TestBed.inject(
        ActiveCartFacade
      ) as jasmine.SpyObj<ActiveCartFacade>;
      expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(mockActiveCartFacade.isStable).toHaveBeenCalled();
      expect(mockActiveCartFacade.takeActive).toHaveBeenCalled();
      expect(result).toEqual(mockBillingAddress);
    });

    it('should handle setDeliveryAddress event', async () => {
      const mockAddress: Address = {
        id: 'test-address-id',
        firstName: 'John',
        lastName: 'Doe',
        line1: '123 Main St',
        town: 'City',
        postalCode: '12345',
        country: { isocode: 'US' },
      };

      const result =
        await windowOpf.payments['global'].setDeliveryAddress(mockAddress);

      expect(
        service['opfQuickBuyTransactionService'].setDeliveryAddress
      ).toHaveBeenCalledWith(mockAddress);
      expect(result).toBe('test-address-id');
    });

    it('should handle getDeliveryAddress event', async () => {
      const result = await windowOpf.payments['global'].getDeliveryAddress();

      const mockActiveCartFacade = TestBed.inject(
        ActiveCartFacade
      ) as jasmine.SpyObj<ActiveCartFacade>;
      expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(mockActiveCartFacade.isStable).toHaveBeenCalled();
      expect(mockActiveCartFacade.takeActive).toHaveBeenCalled();
      expect(result).toEqual(mockDeliveryAddress);
    });

    it('should handle setDeliveryMode event', async () => {
      const mockMode = 'standard';

      const result =
        await windowOpf.payments['global'].setDeliveryMode(mockMode);

      expect(
        service['opfQuickBuyTransactionService'].setDeliveryMode
      ).toHaveBeenCalledWith(mockMode);
      expect(result).toEqual(mockDeliveryMode);
    });

    it('should handle getDeliveryMode event', async () => {
      const result = await windowOpf.payments['global'].getDeliveryMode();

      const mockActiveCartFacade = TestBed.inject(
        ActiveCartFacade
      ) as jasmine.SpyObj<ActiveCartFacade>;
      expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(mockActiveCartFacade.isStable).toHaveBeenCalled();
      expect(mockActiveCartFacade.takeActive).toHaveBeenCalled();
      expect(result).toEqual(mockDeliveryMode);
    });

    it('should handle deleteAddress event', async () => {
      const mockAddressId = 'test-address-id';

      await windowOpf.payments['global'].deleteAddress(mockAddressId);

      expect(
        service['opfQuickBuyTransactionService'].deleteUserAddresses
      ).toHaveBeenCalledWith([mockAddressId]);
    });

    it('should handle verifyPayment event', async () => {
      const mockPaymentSessionId = 'test-session-id';
      const mockPayload: OpfPaymentVerificationPayload = {
        responseMap: [
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
        ],
      };
      const mockResponse: OpfPaymentVerificationResponse = {
        result: 'success',
      };

      opfPaymentFacadeMock.verifyPayment.and.returnValue(of(mockResponse));

      const result = await windowOpf.payments['global'].verifyPayment(
        mockPaymentSessionId,
        mockPayload
      );

      expect(opfPaymentFacadeMock.verifyPayment).toHaveBeenCalledWith(
        mockPaymentSessionId,
        mockPayload
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle updateCartGuestUserEmail event', async () => {
      const mockEmail = 'test@example.com';

      const result =
        await windowOpf.payments['global'].updateCartGuestUserEmail(mockEmail);

      expect(
        service['opfQuickBuyTransactionService'].updateCartGuestUserEmail
      ).toHaveBeenCalledWith(mockEmail);
      expect(result).toBe(true);
    });

    it('should handle createCartGuestUser event', async () => {
      const result = await windowOpf.payments['global'].createCartGuestUser();

      expect(
        service['opfQuickBuyTransactionService'].createCartGuestUser
      ).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle initiatePayment with string configurationId', async () => {
      const mockSessionData: OpfPaymentSessionData = {
        paymentSessionId: 'test-session-id',
      };
      opfPaymentFacadeMock.initiatePayment = jasmine
        .createSpy('initiatePayment')
        .and.returnValue(of(mockSessionData));

      const result = await windowOpf.payments['global'].initiatePayment('2301');

      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should handle initiatePayment with number configurationId', async () => {
      const mockSessionData: OpfPaymentSessionData = {
        paymentSessionId: 'test-session-id',
      };
      opfPaymentFacadeMock.initiatePayment = jasmine
        .createSpy('initiatePayment')
        .and.returnValue(of(mockSessionData));

      const result = await windowOpf.payments['global'].initiatePayment(2301);

      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should handle initiatePayment with PaymentConfig object', async () => {
      const mockSessionData: OpfPaymentSessionData = {
        paymentSessionId: 'test-session-id',
      };
      opfPaymentFacadeMock.initiatePayment = jasmine
        .createSpy('initiatePayment')
        .and.returnValue(of(mockSessionData));

      const result = await windowOpf.payments['global'].initiatePayment({
        configurationId: '2301',
        cartId: 'test-cart-id',
      });

      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should reject initiatePayment when configurationId is missing', async () => {
      await expectAsync(
        windowOpf.payments['global'].initiatePayment({
          cartId: 'test-cart-id',
        } as any)
      ).toBeRejectedWithError('configurationId is required');
    });

    it('should reject initiatePayment when cartId is missing', async () => {
      const mockActiveCartFacade = TestBed.inject(ActiveCartFacade) as any;
      mockActiveCartFacade.getActiveCartId.and.returnValue(of(undefined));

      // Re-register functions after updating the mock
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.GLOBAL,
        paymentSessionId: 'mockSessionId',
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;

      await expectAsync(
        windowOpf.payments['global'].initiatePayment('2301')
      ).toBeRejectedWithError('Cart ID is required. No active cart found.');
    });

    it('should handle submit when paymentSessionId is missing', async () => {
      const mockMetadataStore = TestBed.inject(OpfMetadataStoreService) as any;
      mockMetadataStore.opfMetadataState =
        new BehaviorSubject<OpfMetadataModel>({
          termsAndConditionsChecked: false,
          selectedPaymentOptionId: undefined,
          isPaymentInProgress: false,
          opfPaymentSessionId: undefined,
          isTermsAndConditionsAlertClosed: false,
        });

      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: '',
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;

      await expectAsync(
        windowOpf.payments['checkout'].submit({
          additionalData: [],
          submitSuccess: () => {},
          submitPending: () => {},
          submitFailure: () => {},
          paymentMethod: OpfQuickBuyProviderType.APPLE_PAY,
        })
      ).toBeRejectedWithError('paymentSessionId is required');
    });

    it('should handle submitComplete when paymentSessionId is missing', async () => {
      const mockMetadataStore = TestBed.inject(OpfMetadataStoreService) as any;
      mockMetadataStore.opfMetadataState =
        new BehaviorSubject<OpfMetadataModel>({
          termsAndConditionsChecked: false,
          selectedPaymentOptionId: undefined,
          isPaymentInProgress: false,
          opfPaymentSessionId: undefined,
          isTermsAndConditionsAlertClosed: false,
        });

      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: '',
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;

      await expectAsync(
        windowOpf.payments['checkout'].submitComplete({
          additionalData: [],
          submitSuccess: () => {},
          submitPending: () => {},
          submitFailure: () => {},
        })
      ).toBeRejectedWithError('paymentSessionId is required');
    });

    it('should extract OTP key from string response', () => {
      const result = service['extractOtpKey']('test-otp-key');
      expect(result).toBe('test-otp-key');
    });

    it('should extract OTP key from object with accessCode', () => {
      const result = service['extractOtpKey']({
        accessCode: 'test-access-code',
      });
      expect(result).toBe('test-access-code');
    });

    it('should extract OTP key from object without accessCode', () => {
      const result = service['extractOtpKey']({ other: 'value' });
      // When there's no accessCode, the fallback cast (response as string | undefined)
      // doesn't convert the value, so it returns the object itself at runtime
      expect(result).toBeDefined();
      expect(typeof result).not.toBe('string');
    });

    it('should normalize payment config from string', () => {
      const result = service['normalizePaymentConfig']('2301');
      expect(result).toEqual({ configurationId: '2301' });
    });

    it('should normalize payment config from number', () => {
      const result = service['normalizePaymentConfig'](2301);
      expect(result).toEqual({ configurationId: '2301' });
    });

    it('should normalize payment config from object', () => {
      const config = { configurationId: '2301', cartId: 'test-cart' };
      const result = service['normalizePaymentConfig'](config);
      expect(result).toEqual(config);
    });

    it('should handle initiatePayment with provided cartId', async () => {
      const mockSessionData: OpfPaymentSessionData = {
        paymentSessionId: 'test-session-id',
      };
      opfPaymentFacadeMock.initiatePayment = jasmine
        .createSpy('initiatePayment')
        .and.returnValue(of(mockSessionData));

      const result = await windowOpf.payments['global'].initiatePayment({
        configurationId: '2301',
        cartId: 'provided-cart-id',
      });

      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should handle submit with paymentSessionId from options', async () => {
      opfPaymentFacadeMock.submitPayment.and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.CHECKOUT,
        paymentSessionId: '',
        vcr: {} as ViewContainerRef,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;

      await windowOpf.payments['checkout'].submit({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
        paymentMethod: OpfQuickBuyProviderType.APPLE_PAY,
        paymentSessionId: 'options-session-id',
      });

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });
  });

  describe('should register global functions for REDIRECT domain', () => {
    const mockPaymentSessionId = 'mockSessionId';
    const paramsMap = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ];
    let windowOpf: any;
    beforeEach(() => {
      service.registerGlobalFunctions({
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
        paramsMap,
      });
      windowOpf = (windowRef.nativeWindow as any)?.['Opf'] as any;
    });

    it('should handle submitCompleteRedirect event', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments[
        OpfGlobalFunctionsDomain.REDIRECT
      ].submitCompleteRedirect({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
      });
      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });

    it('should handle submitCompleteRedirect event with submitCancel callback', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      const submitSuccess = (): void => {};
      const submitPending = (): void => {};
      const submitFailure = (): void => {};
      const submitCancel = (): void => {};
      const additionalData = [
        { key: 'returnUrl', value: 'https://returnUrl/' },
        { key: 'allow3DS2', value: 'true' },
        { key: 'originUrl', value: 'https://originUrl/' },
      ];
      const cartId = 'mock-cart';

      windowOpf.payments[
        OpfGlobalFunctionsDomain.REDIRECT
      ].submitCompleteRedirect({
        cartId,
        additionalData,
        submitSuccess,
        submitPending,
        submitFailure,
        submitCancel,
      });
      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
      const callArgs =
        opfPaymentFacadeMock.submitCompletePayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
      expect(callArgs.returnPath).toBe('opfCheckoutPaymentAndReview');
    });

    it('should handle getRedirectParams event', () => {
      const redirectParams =
        windowOpf.payments[
          OpfGlobalFunctionsDomain.REDIRECT
        ].getRedirectParams();
      expect(redirectParams).toEqual(paramsMap);
    });

    it('should remove global function for REDIRECT', () => {
      expect(
        windowOpf['payments'][OpfGlobalFunctionsDomain.REDIRECT][
          'submitCompleteRedirect'
        ]
      ).toBeDefined();
      expect(
        windowOpf['payments'][OpfGlobalFunctionsDomain.REDIRECT][
          'getRedirectParams'
        ]
      ).toBeDefined();

      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.REDIRECT);

      expect(
        windowOpf['payments'][OpfGlobalFunctionsDomain.REDIRECT]
      ).not.toBeDefined();
    });
  });
});
