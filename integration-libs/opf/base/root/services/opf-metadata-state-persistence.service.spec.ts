/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { LANGUAGE_CONTEXT_ID, StatePersistenceService } from '@spartacus/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { OpfMetadataModel } from '../model';
import {
  OpfMetadataStatePersistanceService,
  SyncedOpfState,
} from './opf-metadata-state-persistence.service';
import { OpfMetadataStoreService } from './opf-metadata-store.service';

const mockOpfMetadata: OpfMetadataModel = {
  isPaymentInProgress: true,
  selectedPaymentOptionId: 111,
  termsAndConditionsChecked: true,
  opfPaymentSessionId: '111111',
  isTermsAndConditionsAlertClosed: false,
};

describe('OpfMetadataStatePersistanceService', () => {
  let service: OpfMetadataStatePersistanceService;
  let statePersistenceServiceMock: jasmine.SpyObj<StatePersistenceService>;
  let opfMetadataStoreServiceMock: jasmine.SpyObj<OpfMetadataStoreService>;

  beforeEach(() => {
    statePersistenceServiceMock = jasmine.createSpyObj(
      'StatePersistenceService',
      ['syncWithStorage', 'readStateFromStorage']
    );
    opfMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpMetadataStoreService',
      ['getOpfMetadataState', 'updateOpfMetadata']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfMetadataStatePersistanceService,
        {
          provide: StatePersistenceService,
          useValue: statePersistenceServiceMock,
        },
        {
          provide: OpfMetadataStoreService,
          useValue: opfMetadataStoreServiceMock,
        },
      ],
    });

    service = TestBed.inject(OpfMetadataStatePersistanceService);
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

    opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      of(stateObservable.value?.metadata)
    );

    service.initSync();

    expect(statePersistenceServiceMock.syncWithStorage).toHaveBeenCalled();
  });

  it('should get and transform Opf state', (done) => {
    const stateObservable = new BehaviorSubject<OpfMetadataModel>(
      mockOpfMetadata
    );
    opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      stateObservable
    );

    service['getOpfState']().subscribe((state: any) => {
      expect(state).toEqual({ metadata: mockOpfMetadata });
      done();
    });
  });

  it('should update OpfMetadataStoreService when onRead is called', () => {
    const mockSyncedOpfState: SyncedOpfState = {
      metadata: mockOpfMetadata,
    };

    service['onRead'](mockSyncedOpfState);

    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith(
      mockOpfMetadata
    );
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    service.ngOnDestroy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  });

  it('should `getActiveLanguage` method call `readStateFromStorage`', () => {
    service.getActiveLanguage();

    expect(
      statePersistenceServiceMock.readStateFromStorage
    ).toHaveBeenCalledWith({
      key: LANGUAGE_CONTEXT_ID,
    });
  });
});
