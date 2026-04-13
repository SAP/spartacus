import { TestBed } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import { of } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchOutLevel, PunchOutOperation, PunchoutSession } from '../model';
import { PunchoutAuthHttpHeaderService } from './punchout-auth-http-header.service';
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

describe('PunchoutAuthHttpHeaderService', () => {
  let service: PunchoutAuthHttpHeaderService;
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
    service = TestBed.inject(PunchoutAuthHttpHeaderService);
    punchoutDetectionService = TestBed.inject(PunchoutDetectionService);
    punchoutfacade = TestBed.inject(PunchoutFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when not in punchout page nor punchout session', (done) => {
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(punchoutDetectionService, 'isPunchoutSession').and.returnValue(false);
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();

    service.handleExpiredRefreshTokenIfApplicable().subscribe((handled) => {
      expect(handled).toBe(false);
      expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalled();
      expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalled();
      done();
    });
  });

  it('should logout punchout user when on punchout session page', (done) => {
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      true
    );
    spyOn(punchoutDetectionService, 'isPunchoutSession').and.returnValue(true);
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();

    service.handleExpiredRefreshTokenIfApplicable().subscribe((handled) => {
      expect(handled).toBe(true);
      expect(punchoutfacade.logoutPunchoutUser).toHaveBeenCalledWith();
      expect(punchoutfacade.endPunchoutSession).not.toHaveBeenCalledWith();
      done();
    });
  });

  it('should end punchout session when punchout session already exists', (done) => {
    spyOn(punchoutDetectionService, 'isPunchoutSessionPage').and.returnValue(
      false
    );
    spyOn(punchoutDetectionService, 'isPunchoutSession').and.returnValue(true);
    spyOn(punchoutfacade, 'endPunchoutSession').and.callThrough();
    spyOn(punchoutfacade, 'logoutPunchoutUser').and.callThrough();

    service.handleExpiredRefreshTokenIfApplicable().subscribe((handled) => {
      expect(handled).toBe(true);
      expect(punchoutfacade.logoutPunchoutUser).not.toHaveBeenCalledWith();
      expect(punchoutfacade.endPunchoutSession).toHaveBeenCalledWith();
      done();
    });
  });
});
