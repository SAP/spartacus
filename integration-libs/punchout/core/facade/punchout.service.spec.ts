import { TestBed } from '@angular/core/testing';
import { CommandService, RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { of, throwError } from 'rxjs';
import { PunchoutConnector } from '../connectors';
import { PunchoutAuthService } from '../services';
import { PunchoutService } from './punchout.service';
import createSpy = jasmine.createSpy;

const mockSid = 'mockSid';

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

class MockPunchoutConnector implements Partial<PunchoutConnector> {
  getPunchoutSession = () => of(mockPunchoutSessionResponse);
  getPunchoutSessionRequisition = () => of(mockPunchoutRequisitionResponse);
  // getPunchoutSession = createSpy(
  //   'PunchoutConnector.getPunchoutSession'
  // ).and.callFake(() => of(mockPunchoutSessionResponse));
  // getPunchoutSessionRequisition = createSpy(
  //   'PunchoutConnector.getPunchoutSessionRequisition'
  // ).and.callFake(() => of(mockPunchoutRequisitionResponse));
}

class MockPunchoutAuthService implements Partial<PunchoutAuthService> {
  logout = createSpy('PunchoutAuthService.logout').and.callFake(() => of(true));
  loginWithToken = createSpy('PunchoutAuthService.loginWithToken').and.callFake(
    () => {}
  );
}

const commandServiceMock = {
  create: createSpy().and.callFake((fn: any) => ({
    execute: fn,
  })),
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('Punchoutservice', () => {
  let service: PunchoutService;
  let connector: PunchoutConnector;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutService,
        { provide: PunchoutConnector, useClass: MockPunchoutConnector },
        { provide: PunchoutAuthService, useClass: MockPunchoutAuthService },
        { provide: CommandService, useValue: commandServiceMock },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    service = TestBed.inject(PunchoutService);
    connector = TestBed.inject(PunchoutConnector);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPunchoutSession should call connector', (done) => {
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of(mockPunchoutSessionResponse)
    );
    service.getPunchoutSession(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        expect(connector.getPunchoutSession).toHaveBeenCalledWith(mockSid);
        done();
      },
    });
  });

  it('getPunchoutSessionRequisition should call connector', (done) => {
    spyOn(connector, 'getPunchoutSessionRequisition').and.returnValue(
      of(mockPunchoutRequisitionResponse)
    );
    service.getPunchoutSessionRequisition(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        expect(connector.getPunchoutSessionRequisition).toHaveBeenCalledWith(
          mockSid
        );
        done();
      },
    });
  });

  it('getPunchoutSessionRequisition with empty param routes to error page', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    service.getPunchoutSession('').subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('getPunchoutSession routes to error page when failing', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      throwError(() => 'error')
    );
    service.getPunchoutSession(mockSid).subscribe({
      error: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('getPunchoutSession routes to error page when no auth token', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, token: undefined })
    );

    service.getPunchoutSession(mockSid).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith(PUNCHOUT_ERROR_PAGE_URL);
        done();
      },
    });
  });

  it('getPunchoutSession routes to home page when no product item', (done) => {
    spyOn(routingService, 'go').and.returnValue(Promise.resolve(true));
    spyOn(connector, 'getPunchoutSession').and.returnValue(
      of({ ...mockPunchoutSessionResponse, selectedItem: '' })
    );

    service.getPunchoutSession(mockSid).subscribe({
      next: () => {
        expect(routingService.go).toHaveBeenCalledWith('/');
        done();
      },
    });
  });
});
