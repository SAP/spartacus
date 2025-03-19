/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { OpfMetadataModel } from '../model';
import { OpfMetadataStoreService } from './opf-metadata-store.service';

const initialState: OpfMetadataModel = {
  termsAndConditionsChecked: false,
  selectedPaymentOptionId: undefined,
  isPaymentInProgress: false,
  opfPaymentSessionId: undefined,
  isTermsAndConditionsAlertClosed: false,
};

const state: OpfMetadataModel = {
  isPaymentInProgress: true,
  selectedPaymentOptionId: 111,
  termsAndConditionsChecked: true,
  opfPaymentSessionId: '111111',
  isTermsAndConditionsAlertClosed: false,
};

describe('OpfMetadataStoreService', () => {
  let service: OpfMetadataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfMetadataStoreService],
    });

    service = TestBed.inject(OpfMetadataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the initial state', () => {
    expect(service.opfMetadataState.value).toEqual(initialState);
  });

  it('should return the current OpfMetadataStoreService as an observable', (done) => {
    service.opfMetadataState.next(state);

    service.getOpfMetadataState().subscribe((state) => {
      expect(state).toEqual(state);
      done();
    });
  });

  it('should update OpfMetadataStoreService with the given payload', () => {
    const mockedState: OpfMetadataModel = {
      ...state,
      isPaymentInProgress: false,
    };

    service.opfMetadataState.next(mockedState);

    const updatedPayload = {
      isPaymentInProgress: true,
      termsAndConditionsChecked: false,
    };

    service.updateOpfMetadata(updatedPayload);

    expect(service.opfMetadataState.value).toEqual({
      ...mockedState,
      ...updatedPayload,
    });
  });

  it('should clear OpfMetadataStoreService and set it back to the initial state', () => {
    const state: OpfMetadataModel = {
      isPaymentInProgress: true,
      termsAndConditionsChecked: true,
      selectedPaymentOptionId: 111,
      opfPaymentSessionId: '111111',
      isTermsAndConditionsAlertClosed: false,
    };

    service.opfMetadataState.next(state);

    service.clearOpfMetadata();

    expect(service.opfMetadataState.value).toEqual(initialState);
  });
});
