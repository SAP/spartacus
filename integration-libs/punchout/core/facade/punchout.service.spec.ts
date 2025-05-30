import { TestBed } from '@angular/core/testing';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductService,
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

const mockProduct: Product = {
  code: 'mockItemId',
  name: 'NV10',
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
  silentLogout = createSpy('PunchoutAuthService.logout').and.callFake(() =>
    of(true)
  );
  loginWithToken = createSpy('PunchoutAuthService.loginWithToken').and.callFake(
    () => {}
  );
  isUserLoggedIn = () => of(true);
  endPunchoutSession = createSpy(
    'PunchoutAuthService.endPunchoutSession'
  ).and.callFake(() => {});
}

const commandServiceMock = {
  create: createSpy().and.callFake((fn: any) => ({
    execute: fn,
  })),
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart = createSpy();
  addEntries = createSpy();
  removeEntry = createSpy();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => of(mockPunchoutSession.customerId);
}

class MockGlobalMessageService {
  add = createSpy();
}

class MockProductService implements Partial<ProductService> {
  get = createSpy('ProductService.get').and.callFake(() => of(mockProduct));
  hasError = createSpy('ProductService.hasError').and.callFake(() => of(false));
}

// const productService = jasmine.createSpyObj(
//   'ProductService',
//   ['get'],
//   ['hasError']
// );

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
        { provide: ProductService, useClass: MockProductService },
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

  it('should getPunchoutSession calls connector', (done) => {
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );
    service.initPunchoutSession(mockSessionInput).subscribe({
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

  it('should getPunchoutSession with empty param ends punchout session', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    service.initPunchoutSession({ punchoutSessionId: '' }).subscribe({
      error: () => {
        expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition without logged-in user ends punchout session', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutAuthService, 'isUserLoggedIn').and.returnValue(of(false));
    service.getPunchoutSessionRequisition().subscribe({
      error: () => {
        expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
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
      .initPunchoutSession({ ...mockSessionInput, isPageRefresh: true })
      .subscribe({
        next: () => {
          expect(routingService.go).not.toHaveBeenCalled();
          done();
        },
      });
  });

  it('should getPunchoutSession ends punchout session when request failed', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );
    service.initPunchoutSession(mockSessionInput).subscribe({
      error: () => {
        expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
        done();
      },
    });
  });

  it('should getPunchoutSession ends punchout session when no auth token', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );

    service.initPunchoutSession(mockSessionInput).subscribe({
      error: () => {
        expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
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

    service.initPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith('/');
        done();
      },
    });
  });

  it('should getPunchoutSession opens PUNCHOUT_INSPECT_PAGE_URL page when no product item and INSPECT Level ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({
        ...mockPunchoutSessionResponse,
        punchOutOperation: PunchOutOperation.INSPECT,
        selectedItem: '',
      })
    );

    service.initPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'punchoutInspect',
        });

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
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutInitialRequisition)
    );
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();
    service.initPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
        expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
          punchoutInitialRequisition: { ...mockPunchoutInitialRequisition },
        });
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition not redirect user when isInitialRequisition is true', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of({
        ...mockPunchoutState,
        cancelRequisition: undefined,
        closePunchoutSession: undefined,
      })
    );

    service.getPunchoutSessionRequisition(true).subscribe({
      complete: () => {
        expect(globalMessageService.add).not.toHaveBeenCalledWith(
          {
            key: 'punchout.noSufficientPermissions',
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
        expect(routingService.go).not.toHaveBeenCalledWith({ cxRoute: 'home' });
        done();
      },
    });
  });

  it('should getPunchoutSessionRequisition redirects to home page when isInitialRequisition is false', (done) => {
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of({
        ...mockPunchoutState,
        cancelRequisition: undefined,
        closePunchoutSession: undefined,
      })
    );

    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    service.getPunchoutSessionRequisition(false).subscribe({
      complete: () => {
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'punchout.noSufficientPermissions',
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
        done();
      },
    });
  });

  it('should getPunchoutSession opens pdp when selectedItem is present ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );

    service.initPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'product',
          params: mockProduct,
        });
        done();
      },
    });
  });

  it('should getPunchoutSession opens home when product not found ', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );

    service.initPunchoutSession(mockSessionInput).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'product',
          params: {
            code: mockPunchoutSessionResponse.selectedItem,
            name: mockProduct.name,
          },
        });
        done();
      },
    });
  });

  it('should logoutPunchoutUser calls punchoutAuthService silentLogout method', (done) => {
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockPunchoutState)
    );

    service.logoutPunchoutUser().subscribe({
      next: (result) => {
        expect(result).toEqual(true);
        expect(punchoutAuthService.silentLogout).toHaveBeenCalled();
        expect(punchoutAuthService.endPunchoutSession).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should endPunchoutSession calls punchoutAuthService endPunchoutSession method', (done) => {
    service.endPunchoutSession().subscribe({
      next: () => {
        expect(punchoutAuthService.endPunchoutSession).toHaveBeenCalledWith();
        done();
      },
    });
  });

  it('should closePunchoutSession revertToInitialCart in EDIT operation ', (done) => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutInitialRequisition: mockPunchoutInitialRequisition,
      closePunchoutSession: true,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.EDIT,
      },
    };
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockState)
    );
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();
    spyOn(connector, 'getPunchoutSessionRequisition').and.callThrough();

    service.closePunchoutSession().subscribe({
      next: () => {
        expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalled();
        expect(connector.getPunchoutSessionRequisition).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should closePunchoutSession set cancelRequisition in CREATE operation ', (done) => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.CREATE,
      },
    };
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockState)
    );
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();

    service.closePunchoutSession().subscribe({
      next: () => {
        expect(punchoutStoreService.updatePunchoutState).toHaveBeenCalledWith({
          cancelRequisition: true,
        });
        expect(multiCartFacade.addEntries).not.toHaveBeenCalled();
        expect(multiCartFacade.removeEntry).not.toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should closePunchoutSession only go to requisition page in INSPECT operation ', (done) => {
    const mockState: PunchoutState = {
      ...mockPunchoutState,
      punchoutSession: {
        ...mockPunchoutSession,
        punchOutOperation: PunchOutOperation.INSPECT,
      },
    };
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(punchoutStoreService, 'getPunchoutState').and.returnValue(
      of(mockState)
    );
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();

    service.closePunchoutSession().subscribe({
      next: () => {
        expect(punchoutStoreService.updatePunchoutState).not.toHaveBeenCalled();
        expect(multiCartFacade.addEntries).not.toHaveBeenCalled();
        expect(multiCartFacade.removeEntry).not.toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should submitRequisition call submitRequisition', () => {
    spyOn(routingService, 'go').and.callThrough();
    spyOn(punchoutStoreService, 'updatePunchoutState').and.callThrough();

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
