import { TestBed } from '@angular/core/testing';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { PunchoutAdapter } from './punchout.adapter';
import { PunchoutConnector } from './punchout.connector';

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
  getPunchoutSession = vi.fn().mockImplementation(() =>
    of(mockPunchoutSessionResponse)
  );
  getPunchoutSessionRequisition = vi.fn().mockImplementation(() => of(mockPunchoutRequisitionResponse));
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

  it('getPunchoutSession should call adapter', async () => {
    const result = await firstValueFrom(service.getPunchoutSession(mockSid));
    expect(result).toEqual(mockPunchoutSessionResponse);
    expect(adapter.getPunchoutSession).toHaveBeenCalledWith(mockSid);
  });

  it('getPunchoutSessionRequisition should call adapter', async () => {
    const result = await firstValueFrom(service.getPunchoutSessionRequisition(mockSid));
    expect(result).toEqual(mockPunchoutRequisitionResponse);
    expect(adapter.getPunchoutSessionRequisition).toHaveBeenCalledWith(
      mockSid,
      false
    );
  });

  it('getPunchoutSessionRequisition should call adapter with discardCartEntries true', async () => {
    const result = await firstValueFrom(service.getPunchoutSessionRequisition(mockSid, true));
    expect(result).toEqual(mockPunchoutRequisitionResponse);
    expect(adapter.getPunchoutSessionRequisition).toHaveBeenCalledWith(
      mockSid,
      true
    );
  });
});
