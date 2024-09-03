/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { OpfPaymentMetadata } from '../model';
import {
  OpfStatePersistenceService,
  SyncedOpfState,
} from './opf-metadata-state-persistence.service';
import { OpfPaymentMetadataStoreService } from './opf-metadata-store.service';

const mockOpfMetadata: OpfPaymentMetadata = {
  isPaymentInProgress: true,
  selectedPaymentOptionId: 111,
  termsAndConditionsChecked: true,
  paymentSessionId: '111111',
};

describe('OpfStatePersistenceService', () => {
  let service: OpfStatePersistenceService;
  let statePersistenceServiceMock: jasmine.SpyObj<StatePersistenceService>;
  let opfPaymentMetadataStoreServiceMock: jasmine.SpyObj<OpfPaymentMetadataStoreService>;

  beforeEach(() => {
    statePersistenceServiceMock = jasmine.createSpyObj(
      'StatePersistenceService',
      ['syncWithStorage']
    );
    opfPaymentMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfPaymentMetadataStoreService',
      ['getOpfMetadataState', 'updateOpfMetadata']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfStatePersistenceService,
        {
          provide: StatePersistenceService,
          useValue: statePersistenceServiceMock,
        },
        {
          provide: OpfPaymentMetadataStoreService,
          useValue: opfPaymentMetadataStoreServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfStatePersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the synchronization with state and browser storage', () => {
    const mockSyncedOpfState: SyncedOpfState = {
      metadata: mockOpfMetadata,
    };

    const stateObservable = new BehaviorSubject<SyncedOpfState | undefined>(
      mockSyncedOpfState
    );
    opfPaymentMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      of(stateObservable.value?.metadata)
    );

    service.initSync();

    expect(statePersistenceServiceMock.syncWithStorage).toHaveBeenCalled();
  });

  it('should get and transform Opf state', (done) => {
    const stateObservable = new BehaviorSubject<OpfPaymentMetadata>(
      mockOpfMetadata
    );
    opfPaymentMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      stateObservable
    );

    service['getOpfState']().subscribe((state) => {
      expect(state).toEqual({ metadata: mockOpfMetadata });
      done();
    });
  });

  it('should update OpfPaymentMetadataStoreService when onRead is called', () => {
    const mockSyncedOpfState: SyncedOpfState = {
      metadata: mockOpfMetadata,
    };

    service['onRead'](mockSyncedOpfState);

    expect(
      opfPaymentMetadataStoreServiceMock.updateOpfMetadata
    ).toHaveBeenCalledWith(mockOpfMetadata);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    service.ngOnDestroy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  });
});
