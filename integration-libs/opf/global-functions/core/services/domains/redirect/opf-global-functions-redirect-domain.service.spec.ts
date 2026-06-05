/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { OpfPage } from '@spartacus/opf/base/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { WindowRef } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
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

describe('OpfGlobalFunctionsRedirectDomainService', () => {
  let service: OpfGlobalFunctionsRedirectDomainService;
  let sharedService: OpfGlobalFunctionsSharedService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;

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
    service = TestBed.inject(OpfGlobalFunctionsRedirectDomainService);
    sharedService = TestBed.inject(OpfGlobalFunctionsSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRedirectParams', () => {
    it('should return params map', () => {
      expect(service.getRedirectParams(paramsMap)).toEqual(paramsMap);
    });

    it('should return empty array when params map is not provided', () => {
      expect(service.getRedirectParams()).toEqual([]);
    });
  });

  describe('submitCompleteRedirect', () => {
    it('should delegate to shared service runSubmitComplete with review return path', async () => {
      spyOn(sharedService, 'runSubmitComplete').and.returnValue(
        Promise.resolve(true)
      );

      await service.submitCompleteRedirect(
        [],
        {
          onSuccess: () => {},
          onPending: () => {},
          onFailure: () => {},
        },
        mockPaymentSessionId
      );

      expect(sharedService.runSubmitComplete).toHaveBeenCalledWith(
        [],
        jasmine.any(Object),
        mockPaymentSessionId,
        OpfPage.CHECKOUT_REVIEW_PAGE,
        undefined
      );
    });

    it('should call submitCompletePayment through shared service', async () => {
      opfPaymentFacadeMock.submitCompletePayment.and.returnValue(of(true));

      await service.submitCompleteRedirect(
        [{ key: 'returnUrl', value: 'https://returnUrl/' }],
        {
          onSuccess: () => {},
          onPending: () => {},
          onFailure: () => {},
          onCancel: () => {},
        },
        mockPaymentSessionId
      );

      expect(opfPaymentFacadeMock.submitCompletePayment).toHaveBeenCalled();
      const callArgs =
        opfPaymentFacadeMock.submitCompletePayment.calls.mostRecent().args[0];
      expect(callArgs.returnPath).toBe('opfCheckoutPaymentAndReview');
    });
  });
});
