import { TestBed } from '@angular/core/testing';
import { MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { CommandService, RoutingService, UserIdService } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PunchoutInitialCart,
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutConnector } from '../connectors';
import { PunchoutAuthService } from '../services';
import { PunchoutService } from './punchout.service';
import createSpy = jasmine.createSpy;

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
  punchoutInitialCart: undefined,
  cancelRequisition: undefined,
};

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'product1', code: 'code1' },
  },
  {
    quantity: 1,
    product: { name: 'product2', code: 'cod2' },
  },
];

const mockStateEntries: { productCode: string; quantity: number }[] = [
  {
    quantity: 1,
    productCode: 'code1',
  },
  {
    quantity: 1,
    productCode: 'code2',
  },
  {
    quantity: 2,
    productCode: 'code3',
  },
];

const mockInitialCart: PunchoutInitialCart = { entries: mockStateEntries };
const mockCart = { entries: mockEntries };

class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  setPunchoutState = () => {};
  getPunchoutState = () => of(mockPunchoutState);
  clearState = () => {};
  getPunchoutSessionId = () => mockPunchoutState.punchoutSessionId;
}

class MockPunchoutConnector implements Partial<PunchoutConnector> {
  getPunchoutSession = () => of(mockPunchoutSessionResponse);
  getPunchoutSessionRequisition = () => of(mockPunchoutRequisitionResponse);
}

class MockPunchoutAuthService implements Partial<PunchoutAuthService> {
  logout = createSpy('PunchoutAuthService.logout').and.callFake(() => of(true));
  loginWithToken = createSpy('PunchoutAuthService.loginWithToken').and.callFake(
    () => {}
  );
  isUserLoggedIn = () => of(true);
}

const commandServiceMock = {
  create: createSpy().and.callFake((fn: any) => ({
    execute: fn,
  })),
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

// class MockMultiCartFacade implements Partial<MultiCartFacade> {
//   loadCart = () => {};
//   removeEntry = () => {};
//   addEntries = () => {};
//   getCart = () => of(mockCart);
//   isStable = () => of(true);
// }

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = createSpy().and.returnValue(of(mockCart));
  addEntry = createSpy();
  removeEntry = createSpy();
  isStable = createSpy().and.returnValue(of(true));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => of(mockPunchoutSession.customerId);
}

describe('Punchoutservice', () => {
  let service: PunchoutService;
  let connector: PunchoutConnector;
  let routingService: RoutingService;
  let punchoutStoreService: PunchoutStoreService;
  let punchoutAuthService: PunchoutAuthService;
  let multiCartFacade: MultiCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutService,
        { provide: PunchoutConnector, useClass: MockPunchoutConnector },
        { provide: PunchoutAuthService, useClass: MockPunchoutAuthService },
        { provide: CommandService, useValue: commandServiceMock },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: MockPunchoutStoreService, useClass: PunchoutStoreService },
        { provide: MockMultiCartFacade, useClass: MultiCartFacade },
        { provide: MockUserIdService, useClass: UserIdService },
      ],
    });
    service = TestBed.inject(PunchoutService);
    connector = TestBed.inject(PunchoutConnector);
    routingService = TestBed.inject(RoutingService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
    punchoutAuthService = TestBed.inject(PunchoutAuthService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPunchoutSession calls connector', (done) => {
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );
    service.getPunchoutSession(mockSessionInput).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        expect(connector.getPunchoutSession).toHaveBeenCalledWith(
          mockSessionInput.punchoutSessionId
        );
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition calls connector', (done) => {
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );

    service.getPunchoutSessionRequisition().subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        expect(connector.getPunchoutSessionRequisition).toHaveBeenCalledWith(
          mockSessionId,
          undefined
        );
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition with empty param opens error page', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    service.getPunchoutSession({ punchoutSessionId: '' }).subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition without logged-in user opens error page', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutAuthService, 'isUserLoggedIn').and.returnValue(of(false));
    service.getPunchoutSessionRequisition().subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('should getPunchoutSession stays on page when isPageRefresh is true', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    service
      .getPunchoutSession({ ...mockSessionInput, isPageRefresh: true })
      .subscribe({
        next: () => {
          expect(routingService.go).not.toHaveBeenCalled();
          done();
        },
      });
  });

  it('should getPunchoutSession opens error page when request failed', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );
    service.getPunchoutSession(mockSessionInput).subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('should getPunchoutSession opens error page when no auth token', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );

    service.getPunchoutSession(mockSessionInput).subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('should getPunchoutSession opens home page when no product item and CREATE Level ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({
        ...mockPunchoutSessionResponse,
        punchOutOperation: PunchOutOperation.CREATE,
        selectedItem: '',
      })
    );

    service.getPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith('/');
        done();
      },
    });
  });

  it('should getPunchoutSession opens cart page when no product item and EDIT Level ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({
        ...mockPunchoutSessionResponse,
        selectedItem: '',
      })
    );

    service.getPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
        done();
      },
    });
  });

  it('should getPunchoutSession opens pdp when selectedItem is present ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );

    service.getPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'product',
          params: { code: mockPunchoutSessionResponse.selectedItem },
        });
        done();
      },
    });
  });

  it('should logoutPunchoutUser calls punchoutAuthService logout method', (done) => {
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );

    service.logoutPunchoutUser().subscribe({
      next: (result) => {
        expect(result).toEqual(true);
        expect(punchoutAuthService.logout).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should closePunchoutSession ', (done) => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutInitialCart: mockInitialCart,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.EDIT,
      },
    };
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockState)
    );
    // spyOn(multiCartFacade, 'deleteCart').and.callThrough();
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();
    spyOn(multiCartFacade, 'addEntries').and.callThrough();
    spyOn(multiCartFacade, 'isStable').and.callThrough();

    service.closePunchoutSession().subscribe({
      next: () => {
        expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalled();
        done();
      },
    });
  });
});
