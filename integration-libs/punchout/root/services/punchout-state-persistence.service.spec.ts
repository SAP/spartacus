import { TestBed } from '@angular/core/testing';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom } from 'rxjs';
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
  let statePersistenceServiceMock: any;
  let punchoutFacade: PunchoutFacade;

  beforeEach(() => {
    statePersistenceServiceMock = {
      syncWithStorage: vi.fn(),
      readStateFromStorage: vi.fn(),
    };

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
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );
    vi.spyOn(service['subscription'], 'add').mockReturnValue(undefined as any);
    service.initSync();

    expect(service['subscription'].add).toHaveBeenCalled();
    expect(statePersistenceServiceMock.syncWithStorage).toHaveBeenCalled();
  });

  it('should onRead call request PunchoutSession', () => {
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      false
    );
    vi.spyOn(punchoutFacade, 'initPunchoutSession').mockReturnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](mockPunchoutState.punchoutSessionId);

    expect(punchoutFacade.initPunchoutSession).toHaveBeenCalled();
  });

  it('should onRead do nothing when user on punchout session page', () => {
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      true
    );
    vi.spyOn(punchoutFacade, 'initPunchoutSession').mockReturnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](mockPunchoutState.punchoutSessionId);
    expect(punchoutFacade.initPunchoutSession).not.toHaveBeenCalled();
  });

  it('should onRead do nothing when no sessionId stored', () => {
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      true
    );
    vi.spyOn(punchoutFacade, 'initPunchoutSession').mockReturnValue(
      of(mockPunchoutSession)
    );
    service['onRead'](undefined);
    expect(punchoutFacade.initPunchoutSession).not.toHaveBeenCalled();
  });

  it('should ngOnDestroy removes subscription', () => {
    vi.spyOn(service['subscription'], 'unsubscribe').mockReturnValue(
      undefined as any
    );
    service.ngOnDestroy();
    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should getPunchoutSessionId stores sessionId', async () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );
    const response = await firstValueFrom(service['getPunchoutSessionId']());
    expect(response).toEqual(mockPunchoutState.punchoutSessionId);
  });

  it('should getPunchoutSessionId stores sessionId', async () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );
    const response = await firstValueFrom(service['getPunchoutSessionId']());
    expect(response).toEqual(mockPunchoutState.punchoutSessionId);
  });

  it('should getPunchoutSessionId stores undefined when punchout has not started yet', async () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of({ ...mockPunchoutState, punchoutSessionId: undefined })
    );
    const response = await firstValueFrom(service['getPunchoutSessionId']());
    expect(response).toEqual(undefined);
  });

  it('should getPunchoutSessionId stores empty object when punchout has already started', async () => {
    service['hasPunchoutStarted'] = true;
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of({ ...mockPunchoutState, punchoutSessionId: undefined })
    );
    const response = await firstValueFrom(service['getPunchoutSessionId']());
    expect(response).toEqual('');
  });
});
