import { TestBed } from '@angular/core/testing';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { PunchoutConnector } from '../connectors';
import { PunchoutAuthService } from '../services';
import { PunchoutService } from './punchout.service';

const mockSessionInput: PunchoutSessionInput = { punchoutSessionId: 'mockSid' };

const mockPunchoutSessionResponse: PunchoutSession = {
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

const mockPunchoutRequisitionResponse: PunchoutRequisition = {
  browseFormPostUrl: 'mockFormUrl',
  orderAsCXML: 'mockCXML',
};

const mockPunchoutInitialRequisition: PunchoutRequisition = {
  browseFormPostUrl: 'mockInitialFormUrl',
  orderAsCXML: 'mockInitialCXML',
};

const mockSessionId = '123abc';

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
const mockPunchoutState: PunchoutState = {
  punchoutSessionId: mockSessionId,
  punchoutSession: mockPunchoutSession,
  punchoutInitialRequisition: undefined,
  cancelRequisition: undefined,
  closePunchoutSession: false,
};

class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  setPunchoutState = () => {};
  getPunchoutState = () => of(mockPunchoutState);
  clearState = () => {};
  getPunchoutSessionId = () => mockPunchoutState.punchoutSessionId;
  updatePunchoutState = () => undefined;
}

class MockPunchoutConnector implements Partial<PunchoutConnector> {
  getPunchoutSession = () => of(mockPunchoutSessionResponse);
  getPunchoutSessionRequisition = () => of(mockPunchoutRequisitionResponse);
}

class MockPunchoutAuthService implements Partial<PunchoutAuthService> {
  silentLogout = vi.fn().mockImplementation(() => of(true));
  loginWithToken = vi.fn().mockImplementation(() => {});
  isUserLoggedIn = () => of(true);
  endPunchoutSession = vi.fn().mockImplementation(() => {});
}

const commandServiceMock = {
  create: vi.fn().mockImplementation((fn: any) => ({
    execute: fn,
  })),
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart = vi.fn();
  addEntries = vi.fn();
  removeEntry = vi.fn();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => of(mockPunchoutSession.customerId);
}

class MockGlobalMessageService {
  add = vi.fn();
}

describe('Punchoutservice', () => {
  let service: PunchoutService;
  let connector: PunchoutConnector;
  let routingService: RoutingService;
  let punchoutStoreService: PunchoutStoreService;
  let punchoutAuthService: PunchoutAuthService;
  let multiCartFacade: MultiCartFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutService,
        { provide: PunchoutConnector, useClass: MockPunchoutConnector },
        { provide: PunchoutAuthService, useClass: MockPunchoutAuthService },
        { provide: CommandService, useValue: commandServiceMock },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });
    service = TestBed.inject(PunchoutService);
    connector = TestBed.inject(PunchoutConnector);
    routingService = TestBed.inject(RoutingService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutAuthService = TestBed.inject(PunchoutAuthService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPunchoutSession calls connector', async () => {
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of(mockPunchoutSessionResponse)
    );
    const result = await firstValueFrom(
      service.initPunchoutSession(mockSessionInput)
    );
    expect(result).toEqual(mockPunchoutSessionResponse);
    expect(connector.getPunchoutSession).toHaveBeenCalledWith(
      mockSessionInput.punchoutSessionId
    );
  });

  it('should getPunchoutSessionRequisition calls connector', async () => {
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutRequisitionResponse)
    );
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );

    const result = await firstValueFrom(
      service.getPunchoutSessionRequisition()
    );
    expect(result).toEqual(mockPunchoutRequisitionResponse);
    expect(connector.getPunchoutSessionRequisition).toHaveBeenCalledWith(
      mockSessionId,
      undefined
    );
  });

  it('should getPunchoutSession with empty param ends punchout session', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    await expect(
      firstValueFrom(service.initPunchoutSession({ punchoutSessionId: '' }))
    ).rejects.toBeTruthy();
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSessionRequisition without logged-in user ends punchout session', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutAuthService, 'isUserLoggedIn').mockReturnValue(of(false));
    await expect(
      firstValueFrom(service.getPunchoutSessionRequisition())
    ).rejects.toBeTruthy();
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSessionRequisition call end session when user is not logged-in', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutAuthService, 'isUserLoggedIn').mockReturnValue(of(false));
    await expect(
      firstValueFrom(service.getPunchoutSessionRequisition())
    ).rejects.toBeTruthy();
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSession stays on page when isPageRefresh is true', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutRequisitionResponse)
    );
    await firstValueFrom(
      service.initPunchoutSession({ ...mockSessionInput, isPageRefresh: true })
    );
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should getPunchoutSession ends punchout session when request failed', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );
    await expect(
      firstValueFrom(service.initPunchoutSession(mockSessionInput))
    ).rejects.toBeTruthy();
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSession ends punchout session when no auth token', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );

    await expect(
      firstValueFrom(service.initPunchoutSession(mockSessionInput))
    ).rejects.toBeTruthy();
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSession opens home page when no product item and CREATE Level ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of({
        ...mockPunchoutSessionResponse,
        punchOutOperation: PunchOutOperation.CREATE,
        selectedItem: '',
      })
    );

    await firstValueFrom(service.initPunchoutSession(mockSessionInput));
    expect(routingService.go).toHaveBeenCalledWith('/');
  });

  it('should getPunchoutSession opens PUNCHOUT_INSPECT_PAGE_URL page when no product item and INSPECT Level ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of({
        ...mockPunchoutSessionResponse,
        punchOutOperation: PunchOutOperation.INSPECT,
        selectedItem: '',
      })
    );

    await firstValueFrom(service.initPunchoutSession(mockSessionInput));
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'punchoutInspect',
    });
  });

  it('should getPunchoutSession opens cart page when no product item and EDIT Level ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of({
        ...mockPunchoutSessionResponse,
        selectedItem: '',
      })
    );
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutInitialRequisition)
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');
    await firstValueFrom(service.initPunchoutSession(mockSessionInput));
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      punchoutInitialRequisition: { ...mockPunchoutInitialRequisition },
    });
  });

  it('should requestPunchoutSession return existing cachedPunchoutSessionResponse ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of(mockPunchoutSessionResponse)
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');
    service['cachedPunchoutSessionResponse'] = mockPunchoutSessionResponse;
    await firstValueFrom(service.requestPunchoutSession('123'));
    expect(connector.getPunchoutSession).not.toHaveBeenCalled();
    expect(service['cachedPunchoutSessionResponse']).toEqual(
      mockPunchoutSessionResponse
    );
  });

  it('should getPunchoutSessionRequisition not redirect user when isInitialRequisition is true', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutRequisitionResponse)
    );
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of({
        ...mockPunchoutState,
        cancelRequisition: undefined,
        closePunchoutSession: undefined,
      })
    );

    await firstValueFrom(service.getPunchoutSessionRequisition(true));
    expect(globalMessageService.add).not.toHaveBeenCalledWith(
      {
        key: 'punchout.noSufficientPermissions',
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    expect(routingService.go).not.toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should getPunchoutSessionRequisition redirects to home page when isInitialRequisition is false', async () => {
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutRequisitionResponse)
    );
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of({
        ...mockPunchoutState,
        cancelRequisition: undefined,
        closePunchoutSession: undefined,
      })
    );

    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    await lastValueFrom(service.getPunchoutSessionRequisition(false), {
      defaultValue: null,
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'punchout.noSufficientPermissions',
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should getPunchoutSession opens pdp when selectedItem is present ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(connector, 'getPunchoutSession').mockReturnValue(
      of(mockPunchoutSessionResponse)
    );

    await firstValueFrom(service.initPunchoutSession(mockSessionInput));
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { code: mockPunchoutSessionResponse.selectedItem, name: '' },
    });
  });

  it('should logoutPunchoutUser calls punchoutAuthService silentLogout method', async () => {
    vi.spyOn(connector, 'getPunchoutSessionRequisition').mockReturnValue(
      of(mockPunchoutRequisitionResponse)
    );
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );

    const result = await firstValueFrom(service.logoutPunchoutUser());
    expect(result).toEqual(true);
    expect(punchoutAuthService.silentLogout).toHaveBeenCalled();
    expect(punchoutAuthService.endPunchoutSession).not.toHaveBeenCalled();
  });

  it('should endPunchoutSession calls punchoutAuthService endPunchoutSession method', async () => {
    await firstValueFrom(service.endPunchoutSession());
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
  });

  it('should getPunchoutSessionRequisition return InitialPunchoutRequisition when closePunchoutSession is true', async () => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutInitialRequisition: mockPunchoutInitialRequisition,
      closePunchoutSession: true,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.EDIT,
      },
    };
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockState)
    );
    vi.spyOn(connector, 'getPunchoutSessionRequisition');

    const result = await firstValueFrom(
      service.getPunchoutSessionRequisition()
    );
    expect(result).toEqual(mockPunchoutInitialRequisition);
    expect(connector.getPunchoutSessionRequisition).not.toHaveBeenCalled();
  });

  it('should getPunchoutSessionRequisition end session if connector fails', async () => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSessionId: undefined,
      punchoutInitialRequisition: undefined,
      closePunchoutSession: true,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.EDIT,
      },
    };
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockState)
    );
    vi.spyOn(connector, 'getPunchoutSessionRequisition');

    await expect(
      firstValueFrom(service.getPunchoutSessionRequisition())
    ).rejects.toSatisfy((result) =>
      String(result).includes('Punchout Session Id missing')
    );
    expect(connector.getPunchoutSessionRequisition).not.toHaveBeenCalled();
  });

  it('should closePunchoutSession end Punchout session if any error occurs ', async () => {
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      throwError(() => new Error('Error occurred'))
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');
    vi.spyOn(connector, 'getPunchoutSessionRequisition');

    await expect(
      firstValueFrom(service.closePunchoutSession())
    ).rejects.toSatisfy((error) => String(error).includes('Error occurred'));
    expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalled();
  });

  it('should closePunchoutSession revertToInitialCart in EDIT operation ', async () => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutInitialRequisition: mockPunchoutInitialRequisition,
      closePunchoutSession: true,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.EDIT,
      },
    };
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockState)
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');
    vi.spyOn(connector, 'getPunchoutSessionRequisition');

    await firstValueFrom(service.closePunchoutSession());
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalled();
    expect(connector.getPunchoutSessionRequisition).not.toHaveBeenCalled();
  });

  it('should closePunchoutSession set cancelRequisition in CREATE operation ', async () => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.CREATE,
      },
    };
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockState)
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');

    await firstValueFrom(service.closePunchoutSession());
    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: true,
    });
    expect(multiCartFacade.addEntries).not.toHaveBeenCalled();
    expect(multiCartFacade.removeEntry).not.toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should closePunchoutSession only go to requisition page in INSPECT operation ', async () => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.INSPECT,
      },
    };
    vi.spyOn(routingService, 'go').mockReturnValue(Promise.resolve(true));
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockState)
    );
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');

    await firstValueFrom(service.closePunchoutSession());
    expect(punchoutStoreService.updatePunchoutState).not.toHaveBeenCalled();
    expect(multiCartFacade.addEntries).not.toHaveBeenCalled();
    expect(multiCartFacade.removeEntry).not.toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should submitRequisition call submitRequisition', () => {
    vi.spyOn(routingService, 'go');
    vi.spyOn(punchoutStoreService, 'updatePunchoutState');

    service.submitRequisition(true);

    expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
      cancelRequisition: true,
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'punchout.redirectToProcurementSystem',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'punchoutRequisition',
    });
  });
});
