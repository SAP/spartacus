/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
  let statePersistenceServiceMock: any;
  let opfMetadataStoreServiceMock: any;

  beforeEach(() => {
    statePersistenceServiceMock = { syncWithStorage: vi.fn(), readStateFromStorage: vi.fn() };
    opfMetadataStoreServiceMock = { getOpfMetadataState: vi.fn(), updateOpfMetadata: vi.fn() };

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

    opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
      of(stateObservable.value?.metadata)
    );

    service.initSync();

    expect(statePersistenceServiceMock.syncWithStorage).toHaveBeenCalled();
  });

  it('should get and transform Opf state', async () => {
    const stateObservable = new BehaviorSubject<OpfMetadataModel>(
      mockOpfMetadata
    );
    opfMetadataStoreServiceMock.getOpfMetadataState.mockReturnValue(
      stateObservable
    );

    const { opfPaymentSessionId, ...expectedMetadata } = mockOpfMetadata;

    service['getOpfState']().subscribe((state: any) => {
      expect(state).toEqual({ metadata: expectedMetadata });    });
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
    vi.spyOn(Subscription.prototype, 'unsubscribe');
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
