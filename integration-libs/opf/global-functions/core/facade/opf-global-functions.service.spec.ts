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
import { WindowRef } from '@spartacus/core';
import { defaultOpfErrorDialogOptions } from '@spartacus/opf/base/root';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';
export const WINDOW = new InjectionToken<Window>('window');
@Component({
  template: '',
  standalone: false,
})
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

describe('OpfGlobalFunctionsService', () => {
  let service: OpfGlobalFunctionsService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let windowRef: WindowRef;
  opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
    'submitPayment',
    'submitCompletePayment',
    'getActiveConfigurationsState',
  ]);
  let componentRef: ComponentRef<TestContainerComponent>;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent],
      providers: [
        OpfGlobalFunctionsService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsService);
    windowRef = TestBed.inject(WindowRef);
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
    launchDialogService = TestBed.inject(LaunchDialogService);
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
      windowOpf = windowRef.nativeWindow['Opf'];
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      service.unregisterGlobalFunctions(OpfGlobalFunctionsDomain.CHECKOUT);
      expect(windowOpf['payments']['checkout']['submit']).toBeDefined();
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
      windowOpf = windowRef.nativeWindow['Opf'];
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
      windowOpf = windowRef.nativeWindow['Opf'];
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
