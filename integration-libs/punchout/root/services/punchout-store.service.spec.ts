import { TestBed } from '@angular/core/testing';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
} from '../model';
import { PunchoutStoreService } from './punchout-store.service';

const INITIAL_STATE: PunchoutState = {
  punchoutSessionId: undefined,
  punchoutSession: undefined,
  cancelRequisition: undefined,
  punchoutInitialRequisition: undefined,
  closePunchoutSession: undefined,
};

const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCartId',
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

describe('PunchoutStoreService', () => {
  let service: PunchoutStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PunchoutStoreService],
    });

    service = TestBed.inject(PunchoutStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the initial state', () => {
    expect(service['punchoutState'].value).toEqual(INITIAL_STATE);
  });

  it('should return the current PunchoutStoreService as an observable', (done) => {
    service['punchoutState'].next(mockPunchoutState);

    service.getPunchoutState().subscribe({
      next: (state) => {
        expect(state).toEqual(mockPunchoutState);
        done();
      },
    });
  });

  it('should set PunchoutStoreService with the given payload', () => {
    const newMockedState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSessionId: 'newPunchoutSessionId',
    };

    service['punchoutState'].next(mockPunchoutState);
    service.setPunchoutState(newMockedState);

    expect(service['punchoutState'].value).toEqual(newMockedState);
  });

  it('should clearPunchoutState', () => {
    service.setPunchoutState(mockPunchoutState);
    service.clearPunchoutState();

    expect(service['punchoutState'].value).toEqual(INITIAL_STATE);
  });

  it('should getPunchoutSessionId', () => {
    service.setPunchoutState(mockPunchoutState);
    const response = service.getPunchoutSessionId();
    expect(response).toEqual(mockPunchoutState.punchoutSessionId);
  });

  it('should updatePunchoutState', () => {
    service.setPunchoutState(mockPunchoutState);
    service.updatePunchoutState({
      punchoutSessionId: 'updatedPunchoutSessionId',
    });
    expect(service['punchoutState'].value.punchoutSessionId).toEqual(
      'updatedPunchoutSessionId'
    );
    expect(
      service['punchoutState'].value.punchoutSession?.punchOutLevel
    ).toEqual(mockPunchoutState.punchoutSession?.punchOutLevel);
  });
});
