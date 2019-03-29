import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import {
  AuthService,
  RoutingService,
  UserToken,
  UserService,
  User
} from '@spartacus/core';

import { Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  login = createSpy();
  getUserToken(): Observable<UserToken> {
    return of();
  }
}
class MockRoutingService {
  go = createSpy('go');
}
class MockUserService {
  get(): Observable<User> {
    return of();
  }
  load(_userId: string) {
    return of();
  }
}

const mockUserToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
};

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID'
};

@Component({
  selector: 'cx-page-slot',
  template: ''
})
class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: MockAuthService;
  let userService: MockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LoginComponent,
        MockDynamicSlotComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  canActivate: [{ GUARD_NAME: 'AuthGuard' }]
                }
              }
            }
          }
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load user details when token exists', () => {
    spyOn(userService, 'load').and.stub();
    spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));

    component.ngOnInit();

    expect(userService.load).toHaveBeenCalledWith(mockUserToken.userId);
    expect(authService.login).toHaveBeenCalled();
    expect(component.isLogin).toBeTruthy();
  });

  describe('UI tests', () => {
    it('should contain the dynamic slot: HeaderLinks', () => {
      spyOn(userService, 'get').and.returnValue(of(mockUserDetails));

      component.ngOnInit();
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('cx-page-slot[position="HeaderLinks"]')
        )
      ).not.toBeNull();
    });

    it('should display the correct message depending on whether the user is logged on or not', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of({} as UserToken));
      spyOn(userService, 'get').and.returnValue(of({} as User));

      component.ngOnInit();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'Sign In / Register'
      );

      component.user$ = of(mockUserDetails);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'Hi, First Last'
      );
    });
  });
});
