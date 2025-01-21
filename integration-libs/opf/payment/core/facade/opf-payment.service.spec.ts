/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CommandService, QueryService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentSubmitCompleteInput,
  OpfPaymentSubmitInput,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '../../root/model';
import { OpfPaymentConnector } from '../connectors';
import { OpfPaymentHostedFieldsService } from '../services';
import { OpfPaymentService } from './opf-payment.service';

class MockPaymentConnector implements Partial<OpfPaymentConnector> {
  verifyPayment(
    _paymentSessionId: string,
    _payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return of({
      result: 'result',
    }) as Observable<OpfPaymentVerificationResponse>;
  }
  getAfterRedirectScripts(
    _paymentSessionId: string
  ): Observable<OpfPaymentAfterRedirectScriptResponse> {
    return of({ afterRedirectScript: {} });
  }
}

class MockOpfPaymentHostedFieldsService {
  submitPayment(): Observable<boolean> {
    return of(true);
  }

  submitCompletePayment(): Observable<boolean> {
    return of(true);
  }
}

const mockSubmitInput = {
  paymentSessionId: 'sessionId',
} as OpfPaymentSubmitInput;

const mockSubmitCompleteInput: OpfPaymentSubmitCompleteInput = {
  additionalData: [{ key: 'key', value: 'value' }],
  paymentSessionId: 'sessionId',
  returnPath: 'checkout',
  callbacks: {
    onSuccess: () => {},
    onPending: () => {},
    onFailure: () => {},
  },
};

describe('OpfPaymentService', () => {
  let service: OpfPaymentService;
  let paymentConnector: MockPaymentConnector;
  let opfPaymentHostedFieldsServiceSpy: OpfPaymentHostedFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentService,
        QueryService,
        CommandService,
        {
          provide: OpfPaymentConnector,
          useClass: MockPaymentConnector,
        },
        {
          provide: OpfPaymentHostedFieldsService,
          useClass: MockOpfPaymentHostedFieldsService,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentService);
    paymentConnector = TestBed.inject(OpfPaymentConnector);
    opfPaymentHostedFieldsServiceSpy = TestBed.inject(
      OpfPaymentHostedFieldsService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call submitPayment with proper payload after submitPaymentCommand execution', () => {
    const submitPaymentSpy = spyOn(
      opfPaymentHostedFieldsServiceSpy,
      'submitPayment'
    ).and.callThrough();

    const submitInput: OpfPaymentSubmitInput = {
      paymentSessionId: 'sessionId',
    } as OpfPaymentSubmitInput;

    service['submitPaymentCommand'].execute({ submitInput });

    expect(submitPaymentSpy).toHaveBeenCalledWith(submitInput);
  });

  it('should call verifyPayment with proper payload after verifyPaymentCommand execution', () => {
    const verifyPaymentSpy = spyOn(
      paymentConnector,
      'verifyPayment'
    ).and.callThrough();

    const verifyPaymentPayload = {
      paymentSessionId: 'exampleSessionId',
      paymentVerificationPayload: {
        responseMap: [],
      },
    };

    service['verifyPaymentCommand'].execute(verifyPaymentPayload);

    expect(verifyPaymentSpy).toHaveBeenCalledWith(
      verifyPaymentPayload.paymentSessionId,
      verifyPaymentPayload.paymentVerificationPayload
    );
  });

  it('should call submitCompletePayment with proper payload after submitCompletePaymentCommand execution', () => {
    const submitCompletePaymentSpy = spyOn(
      opfPaymentHostedFieldsServiceSpy,
      'submitCompletePayment'
    ).and.callThrough();

    const submitCompleteInput: OpfPaymentSubmitCompleteInput = {
      paymentSessionId: 'sessionId',
    } as OpfPaymentSubmitCompleteInput;

    service['submitCompletePaymentCommand'].execute({ submitCompleteInput });

    expect(submitCompletePaymentSpy).toHaveBeenCalledWith(submitCompleteInput);
  });

  it('should call verifyPayment from connector with the correct payload', () => {
    const paymentSessionId = 'exampleSessionId';
    const paymentVerificationPayload = {
      responseMap: [
        {
          key: 'key',
          value: 'value',
        },
      ],
    } as OpfPaymentVerificationPayload;
    const connectorVerifySpy = spyOn(
      paymentConnector,
      'verifyPayment'
    ).and.callThrough();

    service.verifyPayment(paymentSessionId, paymentVerificationPayload);

    expect(connectorVerifySpy).toHaveBeenCalledWith(
      paymentSessionId,
      paymentVerificationPayload
    );
  });

  it('should call submitPayment from opfPaymentHostedFieldsService with the correct payload', () => {
    const submitPaymentSpy = spyOn(
      opfPaymentHostedFieldsServiceSpy,
      'submitPayment'
    ).and.callThrough();

    service.submitPayment(mockSubmitInput);

    expect(submitPaymentSpy).toHaveBeenCalledWith(mockSubmitInput);
  });

  it('should call submitCompletePayment from opfPaymentHostedFieldsService with the correct payload', () => {
    const submitCompletePaymentSpy = spyOn(
      opfPaymentHostedFieldsServiceSpy,
      'submitCompletePayment'
    ).and.callThrough();

    service.submitCompletePayment(mockSubmitCompleteInput);

    expect(submitCompletePaymentSpy).toHaveBeenCalledWith(
      mockSubmitCompleteInput
    );
  });

  it('should return true when payment submission is successful', (done) => {
    const result = service.submitPayment(mockSubmitInput);

    result.subscribe((response) => {
      expect(response).toBe(true);
      done();
    });
  });

  it('should return a successful payment verification response', (done) => {
    const paymentSessionId = 'exampleSessionId';
    const paymentVerificationPayload = {
      responseMap: [
        {
          key: 'key',
          value: 'value',
        },
      ],
    } as OpfPaymentVerificationPayload;

    const expectedResult = {
      result: 'result',
    } as OpfPaymentVerificationResponse;

    const result = service.verifyPayment(
      paymentSessionId,
      paymentVerificationPayload
    );

    result.subscribe((response) => {
      expect(response).toEqual(expectedResult);
      done();
    });
  });

  it('should return true when payment submission is completed successfully', (done) => {
    const result = service.submitCompletePayment(mockSubmitCompleteInput);

    result.subscribe((response) => {
      expect(response).toBe(true);
      done();
    });
  });

  it('should call getAfterRedirectScripts from connector with the correct payload', () => {
    const paymentSessionId = 'exampleSessionId';

    const connectorSpy = spyOn(
      paymentConnector,
      'getAfterRedirectScripts'
    ).and.callThrough();

    service.getAfterRedirectScripts(paymentSessionId);

    expect(connectorSpy).toHaveBeenCalledWith(paymentSessionId);
  });

  //   const connectorCtaSpy = spyOn(
  //     paymentConnector,
  //     'getCtaScripts'
  //   ).and.callThrough();

  //   service.getCtaScripts(MockCtaRequest).subscribe(() => {
  //     expect(connectorCtaSpy).toHaveBeenCalledWith(MockCtaRequest);
  //     done();
  //   });
  // });
});
