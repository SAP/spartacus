import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

import { UserToken } from './../../../auth/models/token-types.model';
import { LoginComponent } from './login.component';
import { UserService } from '@spartacus/core';
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '@spartacus/core';

const mockUserToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
};

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockAuthService: any;
  let mockRoutingService: any;
  let mockUserService: any;

  beforeEach(async(() => {
    mockRoutingService = {
      go: createSpy()
    };
    mockAuthService = {
      userToken$: new BehaviorSubject(null),
      login: createSpy(),
      logout: createSpy()
    };
    mockUserService = {
      user$: new BehaviorSubject(null),
      loadUserDetails: createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockDynamicSlotComponent],
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
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and clear user state', () => {
    component.logout();
    expect(component.isLogin).toEqual(false);
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith(['/login']);
  });

  it('should load user details when token exists', () => {
    mockAuthService.userToken$.next(mockUserToken);
    component.ngOnInit();

    expect(mockUserService.loadUserDetails).toHaveBeenCalledWith(
      mockUserToken.userId
    );
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(component.isLogin).toBeTruthy();
  });

  describe('UI tests', () => {
    it('should contain the dynamic slot: HeaderLinks', () => {
      mockUserService.user$.next(mockUserDetails);
      component.ngOnInit();
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('cx-dynamic-slot[position="HeaderLinks"]')
        )
      ).not.toBeNull();
    });

    it('should display the correct message depending on whether the user is logged on or not', () => {
      mockAuthService.userToken$.next({});
      mockUserService.user$.next({});
      component.ngOnInit();
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('a[routerLink="login"'))
      ).not.toBeNull();
    });
  });
});
