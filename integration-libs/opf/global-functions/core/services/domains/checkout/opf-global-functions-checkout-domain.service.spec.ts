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
} from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
  defaultOpfErrorDialogOptions,
} from '@spartacus/opf/base/root';
import {
  OpfPaymentEventsService,
  OpfPaymentFacade,
} from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { OpfGlobalFunctionsCheckoutDomainService } from './opf-global-functions-checkout-domain.service';

@Component({ template: '' })
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
  openDialogAndSubscribe() {
    return EMPTY;
  }
  launch() {
    return EMPTY;
  }
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
  updateOpfMetadata = jasmine.createSpy('updateOpfMetadata');
  getOpfMetadataState = jasmine
    .createSpy('getOpfMetadataState')
    .and.returnValue(this.opfMetadataState.asObservable());
}

describe('OpfGlobalFunctionsCheckoutDomainService', () => {
  let service: OpfGlobalFunctionsCheckoutDomainService;
  let launchDialogService: LaunchDialogService;
  let opfPaymentEventsService: OpfPaymentEventsService;
  let windowRef: WindowRef;
  let componentRef: ComponentRef<TestContainerComponent>;

  const mockPaymentSessionId = 'mockSessionId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
      providers: [
        OpfGlobalFunctionsCheckoutDomainService,
        OpfGlobalFunctionsSharedService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: createOpfPaymentFacadeMock() },
        {
          provide: OpfPaymentEventsService,
          useValue: jasmine.createSpyObj('OpfPaymentEventsService', [
            'emitReinitiatePaymentEvent',
          ]),
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsCheckoutDomainService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    opfPaymentEventsService = TestBed.inject(OpfPaymentEventsService);
    windowRef = TestBed.inject(WindowRef);
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('throwPaymentError', () => {
    it('should open error dialog', () => {
      const dialog$: Observable<number> = of(1);
      const dialogSubscribeSpy = spyOn(dialog$, 'subscribe');
      spyOn(launchDialogService, 'openDialog').and.returnValue(dialog$);

      service.throwPaymentError(
        componentRef.instance.vcr,
        defaultOpfErrorDialogOptions
      );

      expect(launchDialogService.openDialog).toHaveBeenCalled();
      expect(dialogSubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('startLoadIndicator / stopLoadIndicator', () => {
    it('should launch and clear spinner', () => {
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
      spyOn(launchDialogService, 'clear').and.callThrough();

      service.startLoadIndicator(componentRef.instance.vcr);
      expect(launchDialogService.launch).toHaveBeenCalled();

      service.startLoadIndicator(componentRef.instance.vcr);
      expect(launchDialogService.clear).toHaveBeenCalled();

      service.stopLoadIndicator();
      expect(launchDialogService.clear).toHaveBeenCalled();
    });
  });

  describe('reinitiatePaymentForm', () => {
    it('should emit reinitiate payment event', async () => {
      const testPaymentOptionId = 123;
      const result = await service.reinitiatePaymentForm(testPaymentOptionId);

      expect(
        opfPaymentEventsService.emitReinitiatePaymentEvent
      ).toHaveBeenCalledWith(testPaymentOptionId);
      expect(result).toBe(true);
    });
  });

  describe('handle3DSRedirect', () => {
    it('should update metadata and redirect to 3DS URL', async () => {
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
      spyOnProperty(windowRef, 'nativeWindow', 'get').and.returnValue({
        location: mockLocation,
      } as any);
      spyOn(windowRef, 'isBrowser').and.returnValue(true);

      const result = await service.handle3DSRedirect(
        mockThreeDsURL,
        mockPaymentSessionId
      );

      expect(opfMetadataStoreService.updateOpfMetadata).toHaveBeenCalledWith({
        opfPaymentSessionId: mockPaymentSessionId,
        is3DSRedirect: true,
        opf3DSRedirectReturnPath: mockReturnPath,
      });
      expect(locationHrefSpy).toHaveBeenCalledWith(mockThreeDsURL);
      expect(result).toBeUndefined();
    });
  });
});
