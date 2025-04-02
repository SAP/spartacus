import { TestBed } from '@angular/core/testing';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutAdapter } from './punchout.adapter';
import { PunchoutConnector } from './punchout.connector';
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

class MockPunchoutAdapter implements PunchoutAdapter {
  getPunchoutSession = createSpy('getPunchoutSession').and.callFake(() =>
    of(mockPunchoutSessionResponse)
  );
  getPunchoutSessionRequisition = createSpy(
    'getPunchoutSessionRequisition'
  ).and.callFake(() => of(mockPunchoutRequisitionResponse));
}

describe('PunchoutConnector', () => {
  let service: PunchoutConnector;
  let adapter: PunchoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutConnector,
        { provide: PunchoutAdapter, useClass: MockPunchoutAdapter },
      ],
    });
    service = TestBed.inject(PunchoutConnector);
    adapter = TestBed.inject(PunchoutAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPunchoutSession should call adapter', (done) => {
    service.getPunchoutSession(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        expect(adapter.getPunchoutSession).toHaveBeenCalledWith(mockSid);
        done();
      },
    });
  });

  it('getPunchoutSessionRequisition should call adapter', (done) => {
    service.getPunchoutSessionRequisition(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        expect(adapter.getPunchoutSessionRequisition).toHaveBeenCalledWith(
          mockSid,
          false
        );
        done();
      },
    });
  });

  it('getPunchoutSessionRequisition should call adapter with discardCartEntries true', (done) => {
    service.getPunchoutSessionRequisition(mockSid, true).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        expect(adapter.getPunchoutSessionRequisition).toHaveBeenCalledWith(
          mockSid,
          true
        );
        done();
      },
    });
  });
});
