import { TestBed } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchOutLevel, PunchOutOperation, PunchoutSession } from '../model';
import { PunchoutExpiredRefreshTokenHandler } from './punchout-expired-refresh-token-handler.service';
import { PunchoutDetectionService } from './punchout-detection.service';

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

class MockPunchoutDetectionService
  implements Partial<PunchoutDetectionService>
{
  isPunchoutSessionPage(): boolean {
    return true;
  }
  getPunchoutSessionId(): string | undefined {
    return mockSessionId;
  }
  isPunchoutSession(): boolean | undefined {
    return false;
  }
}

class MockAuthService implements Partial<AuthService> {
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
}

class MockPunchoutFacade implements Partial<PunchoutFacade> {
  getPunchoutSession = () => of(mockPunchoutSession);
  logoutPunchoutUser = () => of(true);
  endPunchoutSession = () => of();
}

describe('PunchoutExpiredRefreshTokenHandler', () => {
  let service: PunchoutExpiredRefreshTokenHandler;
  let punchoutDetectionService: PunchoutDetectionService;
  let punchoutfacade: PunchoutFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PunchoutFacade, useClass: MockPunchoutFacade },
        {
          provide: PunchoutDetectionService,
          useClass: MockPunchoutDetectionService,
        },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });
    service = TestBed.inject(PunchoutExpiredRefreshTokenHandler);
    punchoutDetectionService = TestBed.inject(PunchoutDetectionService);
    punchoutfacade = TestBed.inject(PunchoutFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when not in punchout page nor punchout session', async () => {
    vi.spyOn(punchoutfacade, 'logoutPunchoutUser');
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      false
    );
    vi.spyOn(punchoutDetectionService, 'isPunchoutSession').mockReturnValue(
      false
    );
    vi.spyOn(punchoutfacade, 'endPunchoutSession');

    const handled = await firstValueFrom(
      service.handleExpiredRefreshTokenIfApplicable()
    );
    expect(handled).toBe(false);
    expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalled();
    expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalled();
  });

  it('should logout punchout user when on punchout session page', async () => {
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      true
    );
    vi.spyOn(punchoutDetectionService, 'isPunchoutSession').mockReturnValue(
      true
    );
    vi.spyOn(punchoutfacade, 'endPunchoutSession');
    vi.spyOn(punchoutfacade, 'logoutPunchoutUser');

    const handled = await firstValueFrom(
      service.handleExpiredRefreshTokenIfApplicable()
    );
    expect(handled).toBe(true);
    expect(punchoutfacade.logoutPunchoutUser).toHaveBeenCalledWith();
    expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalledWith();
  });

  it('should end punchout session when punchout session already exists', async () => {
    vi.spyOn(punchoutDetectionService, 'isPunchoutSessionPage').mockReturnValue(
      false
    );
    vi.spyOn(punchoutDetectionService, 'isPunchoutSession').mockReturnValue(
      true
    );
    vi.spyOn(punchoutfacade, 'endPunchoutSession');
    vi.spyOn(punchoutfacade, 'logoutPunchoutUser');

    const handled = await firstValueFrom(
      service.handleExpiredRefreshTokenIfApplicable()
    );
    expect(handled).toBe(true);
    expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalledWith();
    expect(punchoutfacade.endPunchoutSession).toHaveBeenCalledWith();
  });
});
