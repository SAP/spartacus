import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  AuthService,
  FeatureConfigService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = createSpy().and.returnValue(false);
}

describe('OrderGuestRegisterFormComponent', () => {
  let component: OrderGuestRegisterFormComponent;
  let fixture: ComponentFixture<OrderGuestRegisterFormComponent>;

  let userRegisterFacade: UserRegisterFacade;
  let routingService: RoutingService;
  let featureConfigService: FeatureConfigService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
      ],
      declarations: [OrderGuestRegisterFormComponent, MockFeatureDirective],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuestRegisterFormComponent);

    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    routingService = TestBed.inject(RoutingService);
    featureConfigService = TestBed.inject(FeatureConfigService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    describe('when authorizationCodeFlowByDefault is enabled', () => {
      beforeEach(() => {
        (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(true);
      });

      it('should register customer', () => {
        const password = 'StrongPass123!@#';
        component.guestRegisterForm.controls['password'].setValue(password);
        component.guestRegisterForm.controls['passwordconf'].setValue(password);
        component.guid = 'guid';
        component.submit();

        expect(userRegisterFacade.registerGuest).toHaveBeenCalledWith(
          'guid',
          password
        );
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });

    describe('when authorizationCodeFlowByDefault is disabled', () => {
      beforeEach(() => {
        (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(false);
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
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'authorizationCodeFlowByDefault'
        );
      });
    });
  });

  describe('password validators', () => {
    it('should have new validators when feature flag is enabled', () => {
      (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(true);

      fixture = TestBed.createComponent(OrderGuestRegisterFormComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      const passwordControl = component.guestRegisterForm.get(
        'password'
      ) as UntypedFormControl;
      const validators = passwordControl.validator
        ? passwordControl.validator({} as any)
        : [];

      expect(passwordControl).toBeTruthy();
      expect(validators).toEqual({
        required: true,
        cxMinOneDigit: true,
        cxMinOneUpperCaseCharacter: true,
        cxMinOneSpecialCharacter: true,
        cxMinEightCharactersLength: true,
        cxMaxCharactersLength: true,
      });
    });
  });
});
