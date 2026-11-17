/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';
import {
  FeatureToggles,
  HttpErrorModel,
  MockTranslatePipe,
  TranslatePipe,
  WindowRef,
} from '@spartacus/core';
import { OpfKeyValueMap, OpfPage } from '@spartacus/opf/base/root';
import { SpinnerComponent } from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
import { OpfPaymentVerificationComponent } from './opf-payment-verification.component';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('OpfPaymentVerificationComponent', () => {
  let component: OpfPaymentVerificationComponent;
  let fixture: ComponentFixture<OpfPaymentVerificationComponent>;
  let routeMock: any;
  let opfPaymentVerificationServiceMock: any;
  let windowRefMock: any;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    routeMock = {
      snapshot: { queryParamMap: new Map() },
    } as any;
    opfPaymentVerificationServiceMock = { checkIfProcessingCartIdExist: vi.fn(), verifyResultUrl: vi.fn(), goToPage: vi.fn(), displayError: vi.fn(), clearPaymentSessionForReinitiation: vi.fn(), removeResourcesAndGlobalFunctions: vi.fn(), runHostedFieldsPattern: vi.fn(), runHostedPagePattern: vi.fn() };
    const mockNativeWindow = {
      top: null,
      location: { href: 'test-url' },
      document: { location: { href: 'test-url' } },
    } as any;
    windowRefMock = { nativeWindow: mockNativeWindow };
    featureToggles = {
      opfPaymentVerificationCheckProcessingCartOnErrorOnly: true,
    };

    TestBed.configureTestingModule({
      imports: [OpfPaymentVerificationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        {
          provide: OpfPaymentVerificationService,
          useValue: opfPaymentVerificationServiceMock,
        },
        {
          provide: FeatureToggles,
          useValue: featureToggles,
        },
        { provide: WindowRef, useValue: windowRefMock },
      ],
    })
      .overrideComponent(OpfPaymentVerificationComponent, {
        remove: {
          imports: [TranslatePipe, SpinnerComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockSpinnerComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OpfPaymentVerificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not call checkIfProcessingCartIdExist on init success path', () => {
      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(of());

      component.ngOnInit();
      expect(
        opfPaymentVerificationServiceMock.checkIfProcessingCartIdExist
      ).not.toHaveBeenCalled();
    });

    it('should handle success scenario', () => {
      const mockPaymentSessionId = 'sessionId';
      const mockResponseMap: Array<OpfKeyValueMap> = [];
      const mockAfterRedirectScriptFlag: string = 'false';
      const mockVerifyResult: {
        paymentSessionId: string;
        paramsMap: Array<OpfKeyValueMap>;
        afterRedirectScriptFlag: string;
      } = {
        paymentSessionId: mockPaymentSessionId,
        paramsMap: mockResponseMap,
        afterRedirectScriptFlag: mockAfterRedirectScriptFlag,
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResult)
      );
      opfPaymentVerificationServiceMock.runHostedFieldsPattern.mockReturnValue(
        of(true)
      );
      opfPaymentVerificationServiceMock.runHostedPagePattern.mockReturnValue(
        of(true)
      );

      component.ngOnInit();

      expect(
        opfPaymentVerificationServiceMock.verifyResultUrl
      ).toHaveBeenCalledWith(routeMock);
      expect(
        opfPaymentVerificationServiceMock.runHostedPagePattern
      ).toHaveBeenCalledWith(mockPaymentSessionId, mockResponseMap);
    });

    it('should handle error scenario', () => {
      const mockError: HttpErrorModel = { status: 500, message: 'Error' };

      const mockVerifyResult = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'false',
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResult)
      );
      opfPaymentVerificationServiceMock.runHostedPagePattern.mockReturnValue(
        throwError(() => mockError)
      );

      vi.spyOn(component, 'onError');

      component.ngOnInit();

      expect(
        opfPaymentVerificationServiceMock.checkIfProcessingCartIdExist
      ).toHaveBeenCalled();
      expect(component.onError).toHaveBeenCalledWith(mockError);
    });

    it('should call onError when payment fails', () => {
      const mockVerifyResult = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'false',
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResult)
      );
      opfPaymentVerificationServiceMock.runHostedPagePattern.mockReturnValue(
        of(false)
      );

      vi.spyOn(component, 'onError');

      component.ngOnInit();

      expect(component.onError).toHaveBeenCalledWith(undefined);
    });

    it('should handle HostedField pattern successful scenario', () => {
      const mockVerifyResultWithFlag = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'true',
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResultWithFlag)
      );
      opfPaymentVerificationServiceMock.runHostedFieldsPattern.mockReturnValue(
        of(true)
      );
      component.ngOnInit();

      expect(
        opfPaymentVerificationServiceMock.runHostedFieldsPattern
      ).toHaveBeenCalled();
      expect(
        opfPaymentVerificationServiceMock.runHostedPagePattern
      ).not.toHaveBeenCalled();
    });

    it('should call checkIfProcessingCartIdExist on init when feature toggle is disabled', () => {
      featureToggles.opfPaymentVerificationCheckProcessingCartOnErrorOnly =
        false;
      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(of());

      component.ngOnInit();

      expect(
        opfPaymentVerificationServiceMock.checkIfProcessingCartIdExist
      ).toHaveBeenCalled();
    });

    it('should not call checkIfProcessingCartIdExist in error path when feature toggle is disabled', () => {
      featureToggles.opfPaymentVerificationCheckProcessingCartOnErrorOnly =
        false;
      const mockError: HttpErrorModel = { status: 500, message: 'Error' };
      const mockVerifyResult = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'false',
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResult)
      );
      opfPaymentVerificationServiceMock.runHostedPagePattern.mockReturnValue(
        throwError(() => mockError)
      );

      component.ngOnInit();

      expect(
        opfPaymentVerificationServiceMock.checkIfProcessingCartIdExist
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('onError', () => {
    it('should call paymentService.displayError with the provided error and paymentService.goToPage with OpfPage.CHECKOUT_REVIEW_PAGE', () => {
      const mockError: HttpErrorModel = { status: 404, message: 'Not Found' };

      component.onError(mockError);

      expect(
        opfPaymentVerificationServiceMock.displayError
      ).toHaveBeenCalledWith(mockError);
      expect(
        opfPaymentVerificationServiceMock.clearPaymentSessionForReinitiation
      ).toHaveBeenCalled();
      expect(opfPaymentVerificationServiceMock.goToPage).toHaveBeenCalledWith(
        OpfPage.CHECKOUT_REVIEW_PAGE
      );
    });
  });

  describe('breakOutOfIframeIfNeeded', () => {
    it('should not break out when not in iframe', () => {
      const mockNativeWindow = windowRefMock.nativeWindow as any;
      mockNativeWindow.top = mockNativeWindow;

      component['breakOutOfIframeIfNeeded']();

      expect(mockNativeWindow.top.location.href).toBe('test-url');
    });

    it('should break out when in iframe', () => {
      const mockTopWindow = {
        location: { href: 'top-url' },
      };
      const mockNativeWindow = windowRefMock.nativeWindow as any;
      mockNativeWindow.top = mockTopWindow;
      mockNativeWindow.document.location.href = 'current-url';

      component['breakOutOfIframeIfNeeded']();

      expect(mockTopWindow.location.href).toBe('current-url');
    });
  });

  describe('ngOnDestroy', () => {
    it('should call removeResourcesAndGlobalFunctions in HostedField pattern', () => {
      const mockVerifyResultWithFlag = {
        paymentSessionId: '1',
        paramsMap: [],
        afterRedirectScriptFlag: 'true',
      };

      opfPaymentVerificationServiceMock.verifyResultUrl.mockReturnValue(
        of(mockVerifyResultWithFlag)
      );
      opfPaymentVerificationServiceMock.runHostedFieldsPattern.mockReturnValue(
        of(true)
      );
      component.ngOnInit();

      component.ngOnDestroy();

      expect(
        opfPaymentVerificationServiceMock.removeResourcesAndGlobalFunctions
      ).toHaveBeenCalled();
    });
  });
});
