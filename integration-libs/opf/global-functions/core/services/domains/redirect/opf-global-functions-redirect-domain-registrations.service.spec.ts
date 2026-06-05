/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { WindowRef } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { OpfGlobalFunctionsRedirectDomainRegistrationsService } from './opf-global-functions-redirect-domain-registrations.service';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';
import { OpfGlobalFunctionsRedirectDomainService } from './opf-global-functions-redirect-domain.service';

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

describe('OpfGlobalFunctionsRedirectDomainRegistrationsService', () => {
  let service: OpfGlobalFunctionsRedirectDomainRegistrationsService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let container: OpfPaymentGlobalMethods;

  const mockPaymentSessionId = 'mockSessionId';
  const paramsMap = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' },
  ];

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      providers: [
        OpfGlobalFunctionsSharedService,
        OpfGlobalFunctionsRedirectDomainService,
        OpfGlobalFunctionsRedirectDomainRegistrationsService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        {
          provide: LaunchDialogService,
          useValue: jasmine.createSpyObj('LaunchDialogService', [
            'launch',
            'clear',
            'openDialog',
          ]),
        },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsRedirectDomainRegistrationsService);
    container = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerAll', () => {
    it('should register redirect functions when paymentSessionId is provided', () => {
      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
        paramsMap,
      });

      expect(container.submitCompleteRedirect).toBeDefined();
      expect(container.getRedirectParams).toBeDefined();
    });

    it('should not register redirect functions when paymentSessionId is missing', () => {
      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: '',
        vcr: {} as ViewContainerRef,
        paramsMap,
      });

      expect(container.submitCompleteRedirect).not.toBeDefined();
      expect(container.getRedirectParams).not.toBeDefined();
    });

    it('should handle submitCompleteRedirect through registered function', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
        paramsMap,
      });

      container.submitCompleteRedirect?.({
        cartId: 'mock-cart',
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
      });

      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
    });

    it('should pass submitCancel callback through registered function', () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));
      const submitCancel = (): void => {};

      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
        paramsMap,
      });

      (container.submitCompleteRedirect as any)?.({
        cartId: 'mock-cart',
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
        submitCancel,
      });

      const callArgs =
        opfPaymentFacadeMock.submitCompletePayment.calls.mostRecent().args[0];
      expect((callArgs.callbacks as any).onCancel).toBe(submitCancel);
      expect(callArgs.returnPath).toBe('opfCheckoutPaymentAndReview');
    });

    it('should handle getRedirectParams through registered function', () => {
      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.REDIRECT,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
        paramsMap,
      });

      expect(container.getRedirectParams?.()).toEqual(paramsMap);
    });
  });
});
