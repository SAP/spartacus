import { AuthService } from '@spartacus/core';
import { CdcJsService } from '../service';
import { EMPTY, Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CdcAuthGuard } from './cdc-auth.guard';

const validSession = { errorCode: 0, errorMessage: '' };
const invalidSession = { errorCode: 403005, errorMessage: 'Unauthorized user' };

class MockAuthService implements Partial<AuthService> {
  logout(): void {}
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
}

class MockCdcJsService implements Partial<CdcJsService> {
  verifySession(): Observable<{ errorCode: number; errorMessage: string }> {
    return of(validSession);
  }
  invokeAPI(): Observable<any> {
    return EMPTY;
  }
}

describe('CdcAuthGuard', () => {
  let guard: CdcAuthGuard;
  let authService: AuthService;
  let cdcService: CdcJsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
      ],
      imports: [StoreModule.forRoot({})],
    });
    guard = TestBed.inject(CdcAuthGuard);
    authService = TestBed.inject(AuthService);
    cdcService = TestBed.inject(CdcJsService);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('When user session is valid in CDC', () => {
    it('should call the generic auth guard', () => {
      spyOn(cdcService, 'verifySession').and.returnValue(of(validSession)); //CDC session is valid
      spyOn(authService, 'logout').and.returnValue();
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true)); //Commerce session is valid
      guard.canActivate().subscribe(() => {
        expect(cdcService.verifySession).toHaveBeenCalled();
        expect(authService.logout).not.toHaveBeenCalled();
        expect(authService.isUserLoggedIn).toHaveBeenCalled();
      });
    });
  });
  describe('When user session is not valid in CDC', () => {
    it('should logout user from storefront and call the generic auth guard', () => {
      spyOn(cdcService, 'verifySession').and.returnValue(of(invalidSession)); // CDC session is invalid
      spyOn(authService, 'logout').and.returnValue();
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true)); // Commerce session is valid
      guard.canActivate().subscribe(() => {
        expect(cdcService.verifySession).toHaveBeenCalled();
        expect(authService.logout).toHaveBeenCalled();
        expect(authService.isUserLoggedIn).toHaveBeenCalled();
      });
    });
  });
});
