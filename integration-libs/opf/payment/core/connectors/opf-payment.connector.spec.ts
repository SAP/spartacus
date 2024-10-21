/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  AfterRedirectScriptResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentInitiationConfig,
  PaymentMethod,
  PaymentSessionData,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
} from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { OpfPaymentAdapter } from './opf-payment.adapter';
import { OpfPaymentConnector } from './opf-payment.connector';
import createSpy = jasmine.createSpy;

const mockOpfPaymentVerificationPayload: OpfPaymentVerificationPayload = {
  responseMap: [],
};

const mockOpfPaymentVerificationResponse: OpfPaymentVerificationResponse = {
  result: 'test',
};

const mockSubmitPaymentRequest: SubmitRequest = {
  paymentMethod: 'card',
  encryptedToken: 'token',
  cartId: '123',
};

const mockSubmitPaymentResponse: SubmitResponse = {
  cartId: 'test',
  status: SubmitStatus.ACCEPTED,
  reasonCode: 'ok',
  paymentMethod: PaymentMethod.CREDIT_CARD,
  authorizedAmount: 123,
  customFields: [],
};

const mockSubmitCompleteRequest: SubmitCompleteRequest = {
  paymentSessionId: 'test',
};

const mockSubmitCompleteResponse: SubmitCompleteResponse = {
  cartId: 'test',
  status: SubmitStatus.ACCEPTED,
  reasonCode: 1,
  customFields: [],
};

const mockPaymentInitiationConfig: PaymentInitiationConfig = {
  config: {},
};

const mockInitiatePayment: PaymentSessionData = {
  paymentSessionId: 'test',
};

const mockAfterRedirectScriptsResponse: AfterRedirectScriptResponse = {
  afterRedirectScript: {},
};

class MockOpfPaymentAdapter implements OpfPaymentAdapter {
  verifyPayment = createSpy('verifyPayment').and.callFake(() =>
    of(mockOpfPaymentVerificationResponse)
  );
  submitPayment = createSpy('submitPayment').and.callFake(() =>
    of(mockSubmitPaymentResponse)
  );
  submitCompletePayment = createSpy('submitCompletePayment').and.callFake(() =>
    of(mockSubmitCompleteResponse)
  );
  initiatePayment = createSpy('initiatePayment').and.callFake(() =>
    of(mockInitiatePayment)
  );
  afterRedirectScripts = createSpy('afterRedirectScripts').and.callFake(() =>
    of(mockAfterRedirectScriptsResponse)
  );
}

describe('OpfPaymentConnector', () => {
  let service: OpfPaymentConnector;
  let adapter: OpfPaymentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentConnector,
        { provide: OpfPaymentAdapter, useClass: MockOpfPaymentAdapter },
      ],
    });

    service = TestBed.inject(OpfPaymentConnector);
    adapter = TestBed.inject(OpfPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('verifyPayment should call adapter', () => {
    let result;
    service
      .verifyPayment('paymentSessionId', mockOpfPaymentVerificationPayload)
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockOpfPaymentVerificationResponse);
    expect(adapter.verifyPayment).toHaveBeenCalledWith(
      'paymentSessionId',
      mockOpfPaymentVerificationPayload
    );
  });

  it('submitPayment should call adapter', () => {
    let result;
    service
      .submitPayment(mockSubmitPaymentRequest, 'accessCode', 'paymentSessionId')
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockSubmitPaymentResponse);
    expect(adapter.submitPayment).toHaveBeenCalledWith(
      mockSubmitPaymentRequest,
      'accessCode',
      'paymentSessionId'
    );
  });

  it('initiatePayment should call adapter', () => {
    let result;
    service
      .initiatePayment(mockPaymentInitiationConfig)
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockInitiatePayment);
    expect(adapter.initiatePayment).toHaveBeenCalledWith(
      mockPaymentInitiationConfig
    );
  });

  it('submitCompletePayment should call adapter', () => {
    let result;
    service
      .submitCompletePayment(
        mockSubmitCompleteRequest,
        'accessCode',
        'paymentSessionId'
      )
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockSubmitCompleteResponse);
    expect(adapter.submitCompletePayment).toHaveBeenCalledWith(
      mockSubmitCompleteRequest,
      'accessCode',
      'paymentSessionId'
    );
  });

  it('afterRedirectScripts should call adapter', () => {
    let result;
    service
      .afterRedirectScripts('paymentSessionId')
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockAfterRedirectScriptsResponse);
    expect(adapter.afterRedirectScripts).toHaveBeenCalledWith(
      'paymentSessionId'
    );
  });
});
