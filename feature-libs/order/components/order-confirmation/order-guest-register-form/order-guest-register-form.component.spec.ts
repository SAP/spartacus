import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form.component';
import createSpy = jasmine.createSpy;

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  registerGuest = createSpy();
}

class MockRoutingService implements Partial<RoutingService> {
  go = jasmine.createSpy('go');
}

describe('OrderGuestRegisterFormComponent', () => {
  let component: OrderGuestRegisterFormComponent;
  let fixture: ComponentFixture<OrderGuestRegisterFormComponent>;

  let userRegisterFacade: UserRegisterFacade;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          ReactiveFormsModule,
          FormErrorsModule,
          PasswordVisibilityToggleModule,
        ],
        declarations: [OrderGuestRegisterFormComponent],
        providers: [
          { provide: AuthService, useClass: MockAuthService },
          { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuestRegisterFormComponent);

    userRegisterFacade = TestBed.inject(UserRegisterFacade);
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

    expect(userRegisterFacade.registerGuest).toHaveBeenCalledWith(
      'guid',
      password
    );
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
});
