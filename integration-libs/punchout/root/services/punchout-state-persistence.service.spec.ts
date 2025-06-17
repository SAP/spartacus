import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import { PunchoutFacade } from '../facade';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
} from '../model';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStatePersistenceService } from './punchout-state-persistence.service';
import { PunchoutStoreService } from './punchout-store.service';

const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchOutLevel: PunchOutLevel.PRODUCT,
  punchOutOperation: PunchOutOperation.EDIT,
  selectedItem: 'mockItemId',
  token: {
    accessToken: 'mockToken',
    tokenType: 'Bearer',
  },
};

const mockSessionId = 'abc123';

const mockPunchoutState: PunchoutState = {
  punchoutSessionId: mockSessionId,
  punchoutSession: mockPunchoutSession,
};

class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  setPunchoutState = () => {};
  getPunchoutState = () => of(mockPunchoutState);
  clearState = () => {};
}

class MockPunchoutDetectionService
  implements Partial<PunchoutDetectionService>
{
  isPunchoutSessionPage = () => false;
}

class MockPunchoutFacade implements Partial<PunchoutFacade> {
  initPunchoutSession = () => of(mockPunchoutSession);
}

describe('PunchoutStatePersistenceService', () => {
  let service: PunchoutStatePersistenceService;
  let punchoutStoreService: PunchoutStoreService;
  let punchoutDetectionService: PunchoutDetectionService;
  let statePersistenceServiceMock: jasmine.SpyObj<StatePersistenceService>;
  let punchoutFacade: PunchoutFacade;

  beforeEach(() => {
    statePersistenceServiceMock = jasmine.createSpyObj(
      'StatePersistenceService',
      ['syncWithStorage', 'readStateFromStorage']
    );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: StatePersistenceService,
          useValue: statePersistenceServiceMock,
        },

        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        {
          provide: PunchoutDetectionService,
          useClass: MockPunchoutDetectionService,
        },
        {
          provide: PunchoutFacade,
          useClass: MockPunchoutFacade,
        },
      ],
    });
    service = TestBed.inject(PunchoutStatePersistenceService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutDetectionService = TestBed.inject(PunchoutDetectionService);
    punchoutFacade = TestBed.inject(PunchoutFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the synchronization with state and browser storage', () => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );
    spyOn(service['subscription'], 'add').and.returnValue();
    service.initSync();

    expect(service['subscription'].add).toHaveBeenCalled();
    expect(statePersistenceServiceMock.syncWithStorage).toHaveBeenCalled();
  });

  it('should onRead call request PunchoutSession', () => {
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(punchoutFacade, 'initPunchoutSession').and.returnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](mockPunchoutState.punchoutSessionId);

    expect(punchoutFacade.initPunchoutSession).toHaveBeenCalled();
  });

  it('should onRead do nothing when user on punchout session page', () => {
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    spyOn(punchoutFacade, 'initPunchoutSession').and.returnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](mockPunchoutState.punchoutSessionId);
    expect(punchoutFacade.initPunchoutSession).not.toHaveBeenCalled();
  });

  it('should onRead do nothing when no sessionId stored', () => {
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    spyOn(punchoutFacade, 'initPunchoutSession').and.returnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](undefined);
    expect(punchoutFacade.initPunchoutSession).not.toHaveBeenCalled();
  });

  it('should ngOnDestroy removes subscription', () => {
    spyOn(service['subscription'], 'unsubscribe').and.returnValue();
    service.ngOnDestroy();
    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should getPunchoutSessionId stores sessionId', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );
    service['getPunchoutSessionId']().subscribe({
      next: (response) => {
        expect(response).toEqual(mockPunchoutState.punchoutSessionId);
        done();
      },
    });
  });

  it('should getPunchoutSessionId stores sessionId', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );
    service['getPunchoutSessionId']().subscribe({
      next: (response) => {
        expect(response).toEqual(mockPunchoutState.punchoutSessionId);
        done();
      },
    });
  });

  it('should getPunchoutSessionId stores undefined when punchout has not started yet', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of({ ...mockPunchoutState, punchoutSessionId: undefined })
    );
    service['getPunchoutSessionId']().subscribe({
      next: (response) => {
        expect(response).toEqual(undefined);
        done();
      },
    });
  });

  it('should getPunchoutSessionId stores empty object when punchout has already started', (done) => {
    service['hasPunchoutStarted'] = true;
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of({ ...mockPunchoutState, punchoutSessionId: undefined })
    );
    service['getPunchoutSessionId']().subscribe({
      next: (response) => {
        expect(response).toEqual('');
        done();
      },
    });
  });
});
