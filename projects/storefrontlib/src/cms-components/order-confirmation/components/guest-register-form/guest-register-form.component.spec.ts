import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FormErrorsModule } from '../../../../shared/index';
import { GuestRegisterFormComponent } from './guest-register-form.component';
import createSpy = jasmine.createSpy;

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
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
      imports: [I18nTestingModule, ReactiveFormsModule, FormErrorsModule],
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

    userService = TestBed.inject(UserService);
    routingService = TestBed.inject(RoutingService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register customer and redirect to homepage when submit', () => {
    const password = 'StrongPass123!@#';
    component.guestRegisterForm.controls['password'].setValue(password);
    component.guestRegisterForm.controls['passwordconf'].setValue(password);
    component.guid = 'guid';
    component.submit();

    expect(userService.registerGuest).toHaveBeenCalledWith('guid', password);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
});
