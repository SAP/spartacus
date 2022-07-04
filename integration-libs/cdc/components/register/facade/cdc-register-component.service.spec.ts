import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
  UserProfileConnector,
  UserProfileService,
  UserRegisterService
} from 'feature-libs/user/profile/core';
import { UserSignUp } from 'feature-libs/user/profile/root';
import { CdcJsService } from 'integration-libs/cdc/root';
import { AuthService } from 'projects/core/src/auth';
import { User } from 'projects/core/src/model';
import { OCC_USER_ID_CURRENT } from 'projects/core/src/occ';
import { Observable, of } from 'rxjs';
import { CDCRegisterComponentService } from './cdc-register-component.service';
import createSpy = jasmine.createSpy;

const userRegisterFormData: UserSignUp = {
  titleCode: 'Mr.',
  firstName: 'firstName',
  lastName: 'lastName',
  uid: 'uid',
  password: 'password',
};

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user: any) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(false));
  registerUserWithoutScreenSet = createSpy().and.callFake((user: any) => of(user));
  onLoginEventHandler = createSpy();
}


describe('CdcLoginComponentService', () => {
  let cdcUserRegisterService: CDCRegisterComponentService;
  let connector: UserProfileConnector;
  let cdcJsService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserProfileService, useClass: MockUserProfileService },
        { provide: CdcJsService, useClass: MockCDCJsService },
        CDCRegisterComponentService,
      ],
    });

    cdcUserRegisterService = TestBed.inject(CDCRegisterComponentService);
    connector = TestBed.inject(UserProfileConnector);
    cdcJsService = TestBed.inject(CdcJsService);
  });

  it('should be created', () => {
    expect(cdcUserRegisterService).toBeTruthy();
  });

  it('should inject UserRegisterService', inject(
    [CDCRegisterComponentService],
    (userRegisterService: UserRegisterService) => {
      expect(userRegisterService).toBeTruthy();
    }
  ));

  it('should be able to register user through CDC', () => {
    cdcUserRegisterService.register(userRegisterFormData);
    expect(connector.register).not.toHaveBeenCalled();
    expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  fit('should be able to register user without CDC', () => {
    cdcJsService.didLoad = createSpy().and.returnValue(of(false));
    cdcUserRegisterService.register(userRegisterFormData);
    expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
    expect(connector.register).not.toHaveBeenCalled();
    expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    });
  });

  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    cdcUserRegisterService.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
