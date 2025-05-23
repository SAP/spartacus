import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PunchoutAuthService } from './punchout-auth.service';

const MOCK_TOKEN = 'abc';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove() {
    return;
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
  coreLogout(): Promise<void> {
    return Promise.resolve();
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  setItem() {
    return;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  setUserId(_: string): void {
    return;
  }
}

describe('PunchoutAuthService', () => {
  let service: PunchoutAuthService;
  let userIdService: UserIdService;
  let authService: AuthService;
  let authStorageService: AuthStorageService;
  let globalMessageService: GlobalMessageService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PunchoutAuthService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: Store, useValue: { dispatch: () => {} } },
      ],
    });
    service = TestBed.inject(PunchoutAuthService);
    userIdService = TestBed.inject(UserIdService);
    authStorageService = TestBed.inject(AuthStorageService);
    authService = TestBed.inject(AuthService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should loginWithToken triggers silent login', (done) => {
    spyOn(authStorageService, 'setItem');
    spyOn(userIdService, 'setUserId');
    spyOn(globalMessageService, 'remove');
    spyOn(store, 'dispatch');

    service.loginWithToken(MOCK_TOKEN);
    expect(authStorageService.setItem).toHaveBeenCalledWith(
      'access_token',
      MOCK_TOKEN
    );
    expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
    expect(globalMessageService.remove).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    done();
  });

  it('should logout when user is already logged-in', (done) => {
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(userIdService, 'setUserId');
    spyOn(globalMessageService, 'remove');

    service.silentLogout().subscribe({
      next: (value) => {
        expect(value).toEqual(true);
        expect(authService.coreLogout).toHaveBeenCalled();
        expect(globalMessageService.remove).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should not logout when user is not logged-in', (done) => {
    spyOn(authService, 'coreLogout').and.returnValue(Promise.resolve());
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(userIdService, 'setUserId');

    service.silentLogout().subscribe({
      next: (value) => {
        expect(value).toEqual(false);
        expect(authService.coreLogout).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should isLoggedIn fetch authService isLoggedIn first value only', (done) => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false, true, true));
    let count = 0;
    service.isUserLoggedIn().subscribe({
      next: (value) => {
        expect(value).toEqual(false);
        count++;
      },
      complete: () => {
        expect(count).toEqual(1);
        done();
      },
    });
  });
});
