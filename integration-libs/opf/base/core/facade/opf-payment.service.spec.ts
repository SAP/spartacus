// /*
//  * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { TestBed } from '@angular/core/testing';
// import { CommandService } from '@spartacus/core';
// import { Observable, of } from 'rxjs';
// import {
//   OpfPaymentVerificationPayload,
//   OpfPaymentVerificationResponse,
//   SubmitInput,
//   SubmitRequest,
//   SubmitResponse,
// } from '../../root/model';
// import { OpfPaymentConnector } from '../connectors';
// import { OpfPaymentHostedFieldsService } from '../services';
// import { OpfPaymentService } from './opf-payment.service';

// class MockPaymentConnector {
//   verifyPayment(
//     paymentSessionId: string,
//     payload: OpfPaymentVerificationPayload
//   ): Observable<OpfPaymentVerificationResponse> {
//     return of({
//       paymentSessionId,
//       payload,
//     } as unknown) as Observable<OpfPaymentVerificationResponse>;
//   }
// }

// class MockOpfPaymentHostedFieldsService {
//   submitPayment(
//     submitRequest: SubmitRequest,
//     otpKey: string,
//     paymentSessionId: string
//   ): Observable<SubmitResponse> {
//     return of(
//       submitRequest,
//       otpKey,
//       paymentSessionId
//     ) as Observable<SubmitResponse>;
//   }

//   submitCompletePayment(): Observable<boolean> {
//     return of(true);
//   }
// }

// const mockSubmitInput = {
//   cartId: '123',
// } as SubmitInput;

// describe('OpfPaymentService', () => {
//   let service: OpfPaymentService;
//   let paymentConnector: MockPaymentConnector;
//   let opfPaymentHostedFieldsServiceSpy: OpfPaymentHostedFieldsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         OpfPaymentService,
//         CommandService,
//         {
//           provide: OpfPaymentConnector,
//           useClass: MockPaymentConnector,
//         },
//         {
//           provide: OpfPaymentHostedFieldsService,
//           useClass: MockOpfPaymentHostedFieldsService,
//         },
//       ],
//     });

//     service = TestBed.inject(OpfPaymentService);
//     paymentConnector = TestBed.inject(OpfPaymentConnector);
//     opfPaymentHostedFieldsServiceSpy = TestBed.inject(
//       OpfPaymentHostedFieldsService
//     );
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should call verifyPayment from connector with the correct payload', () => {
//     const paymentSessionId = 'exampleSessionId';
//     const paymentVerificationPayload = {
//       responseMap: [
//         {
//           key: 'key',
//           value: 'value',
//         },
//       ],
//     } as OpfPaymentVerificationPayload;
//     const connectorVerifySpy = spyOn(
//       paymentConnector,
//       'verifyPayment'
//     ).and.callThrough();

//     service.verifyPayment(paymentSessionId, paymentVerificationPayload);

//     expect(connectorVerifySpy).toHaveBeenCalledWith(
//       paymentSessionId,
//       paymentVerificationPayload
//     );
//   });

//   it('should call submitPayment from opfPaymentHostedFieldsService with the correct payload', () => {
//     const submitPaymentSpy = spyOn(
//       opfPaymentHostedFieldsServiceSpy,
//       'submitPayment'
//     ).and.callThrough();

//     service.submitPayment(mockSubmitInput);

//     expect(submitPaymentSpy).toHaveBeenCalledWith(mockSubmitInput);
//   });

//   it('should call submitCompletePayment from opfPaymentHostedFieldsService with the correct payload', () => {
//     const submitCompletePaymentSpy = spyOn(
//       opfPaymentHostedFieldsServiceSpy,
//       'submitCompletePayment'
//     ).and.callThrough();

//     service.submitCompletePayment(mockSubmitInput);

//     expect(submitCompletePaymentSpy).toHaveBeenCalledWith(mockSubmitInput);
//   });
// });
