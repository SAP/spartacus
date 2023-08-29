// /*
//  * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { TestBed } from '@angular/core/testing';
// import { OpfPaymentMetadata } from '../model';
// import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';

// const initialState = {
//   termsAndConditionsChecked: false,
//   selectedPaymentOptionId: undefined,
//   isPaymentInProgress: false,
// };

// const state: OpfPaymentMetadata = {
//   isPaymentInProgress: true,
//   selectedPaymentOptionId: 111,
//   termsAndConditionsChecked: true,
// };

// describe('OpfPaymentMetadataStoreService', () => {
//   let service: OpfPaymentMetadataStoreService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [OpfPaymentMetadataStoreService],
//     });

//     service = TestBed.inject(OpfPaymentMetadataStoreService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should initialize with the initial state', () => {
//     expect(service.opfPaymentMetadataState.value).toEqual(initialState);
//   });

//   it('should return the current opfPaymentMetadataState as an observable', (done) => {
//     service.opfPaymentMetadataState.next(state);

//     service.getOpfMetadataState().subscribe((state) => {
//       expect(state).toEqual(state);
//       done();
//     });
//   });

//   it('should update opfPaymentMetadataState with the given payload', () => {
//     const mockedState: OpfPaymentMetadata = {
//       ...state,
//       isPaymentInProgress: false,
//     };

//     service.opfPaymentMetadataState.next(mockedState);

//     const updatedPayload = {
//       isPaymentInProgress: true,
//       termsAndConditionsChecked: false,
//     };

//     service.updateOpfMetadata(updatedPayload);

//     expect(service.opfPaymentMetadataState.value).toEqual({
//       ...mockedState,
//       ...updatedPayload,
//     });
//   });

//   it('should clear opfPaymentMetadataState and set it back to the initial state', () => {
//     const state = {
//       isPaymentInProgress: true,
//       termsAndConditionsChecked: true,
//       selectedPaymentOptionId: 111,
//     };

//     service.opfPaymentMetadataState.next(state);

//     service.clearOpfMetadata();

//     expect(service.opfPaymentMetadataState.value).toEqual(initialState);
//   });
// });
