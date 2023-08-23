/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpfPaymentMetadata } from '../model';
import { OpfPaymentMetadataStoreService } from './opf-payment-metadata-store.service';
import { OpfService } from './opf.service';

describe('OpfService', () => {
  let service: OpfService;
  let opfPaymentMetadataStoreServiceMock: jasmine.SpyObj<OpfPaymentMetadataStoreService>;

  beforeEach(() => {
    opfPaymentMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfPaymentMetadataStoreService',
      ['updateOpfMetadata', 'clearOpfMetadata', 'getOpfMetadataState']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfService,
        {
          provide: OpfPaymentMetadataStoreService,
          useValue: opfPaymentMetadataStoreServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateOpfMetadataState with the provided payload', () => {
    const mockOpfMetadata: Partial<OpfPaymentMetadata> = {
      isPaymentInProgress: true,
    };

    service.updateOpfMetadataState(mockOpfMetadata);

    expect(
      opfPaymentMetadataStoreServiceMock.updateOpfMetadata
    ).toHaveBeenCalledWith(mockOpfMetadata);
  });

  it('should call clearOpfMetadataState', () => {
    service.clearOpfMetadataState();

    expect(
      opfPaymentMetadataStoreServiceMock.clearOpfMetadata
    ).toHaveBeenCalled();
  });

  it('should call getOpfMetadataState and return the observable', () => {
    const mockOpfMetadata: OpfPaymentMetadata = {
      isPaymentInProgress: true,
      selectedPaymentOptionId: 111,
      termsAndConditionsChecked: true,
    };

    const mockObservable = new BehaviorSubject<OpfPaymentMetadata>(
      mockOpfMetadata
    );
    opfPaymentMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      mockObservable
    );

    const result = service.getOpfMetadataState();

    expect(result).toBeInstanceOf(Observable);
    result.subscribe((metadata) => {
      expect(metadata).toEqual(mockOpfMetadata);
    });
  });
});
