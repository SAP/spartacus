import { TestBed } from '@angular/core/testing';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutConnector } from '../connectors';
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
  getPunchoutSession = createSpy(
    'PunchoutConnector.getPunchoutSession'
  ).and.callFake(() => of(mockPunchoutSessionResponse));
  getPunchoutSessionRequisition = createSpy(
    'PunchoutConnector.getPunchoutSessionRequisition'
  ).and.callFake(() => of(mockPunchoutRequisitionResponse));
}

describe('Punchoutservice', () => {
  let service: PunchoutService;
  let connector: PunchoutConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutService,
        { provide: PunchoutConnector, useClass: MockPunchoutConnector },
      ],
    });
    service = TestBed.inject(PunchoutService);
    connector = TestBed.inject(PunchoutConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPunchoutSession should call connector', (done) => {
    service.getPunchoutSession(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        expect(connector.getPunchoutSession).toHaveBeenCalledWith(mockSid);
        done();
      },
    });
  });

  it('getPunchoutSessionRequisition should call connector', (done) => {
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
});
