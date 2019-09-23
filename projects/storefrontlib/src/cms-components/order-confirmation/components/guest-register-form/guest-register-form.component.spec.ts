import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  I18nTestingModule,
  UserToken,
  AuthService,
  UserService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { GuestRegisterFormComponent } from './guest-register-form.component';

import createSpy = jasmine.createSpy;

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockUserService {
  registerGuest = createSpy();
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

describe('GuestRegisterFormComponent', () => {
  let component: GuestRegisterFormComponent;
  let fixture: ComponentFixture<GuestRegisterFormComponent>;

  let userService: UserService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [GuestRegisterFormComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRegisterFormComponent);

    userService = TestBed.get(UserService as Type<UserService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register customer and redirect to homepage when submit', () => {
    const password = 'test password';
    component.guestRegisterForm.controls['password'].setValue(password);
    component.guid = 'guid';
    component.submit();

    expect(userService.registerGuest).toHaveBeenCalledWith('guid', password);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
});
