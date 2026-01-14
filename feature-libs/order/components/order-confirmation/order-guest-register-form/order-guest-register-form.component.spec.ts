import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  AuthRedirectService,
  FeatureConfigService,
  FeatureToggles,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form.component';
import createSpy = jasmine.createSpy;

const mockSecurePassword = 'strongPas$!123';
const mockInvalidPassword = 'strongPass$!123';

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = createSpy();
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  registerGuest = createSpy();
}

class MockRoutingService implements Partial<RoutingService> {
  getUrl = createSpy().and.returnValue('/');
}

/** Mock control for FeatureConfigService.isEnabled() */
const mockFeatureConfigServiceController: Pick<
  FeatureToggles,
  'authorizationCodeFlowByDefault'
> = {
  authorizationCodeFlowByDefault: false,
};

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = createSpy().and.callFake(
    () =>
      mockFeatureConfigServiceController.authorizationCodeFlowByDefault ?? false
  );
}

describe('OrderGuestRegisterFormComponent', () => {
  let component: OrderGuestRegisterFormComponent;
  let fixture: ComponentFixture<OrderGuestRegisterFormComponent>;

  let userRegisterFacade: UserRegisterFacade;
  let authRedirectService: AuthRedirectService;
  let routingService: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        OrderGuestRegisterFormComponent,
        MockFeatureDirective,
      ],
      providers: [
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuestRegisterFormComponent);

    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    authRedirectService = TestBed.inject(AuthRedirectService);
    routingService = TestBed.inject(RoutingService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    describe('when authorizationCodeFlowByDefault is enabled', () => {
      beforeEach(() => {
        mockFeatureConfigServiceController.authorizationCodeFlowByDefault =
          true;
      });

      it('should register customer without setting redirect URL', () => {
        const password = mockSecurePassword;
        component.guestRegisterForm.controls['password'].setValue(password);
        component.guestRegisterForm.controls['passwordconf'].setValue(password);
        component.guid = 'guid';
        component.submit();

        expect(userRegisterFacade.registerGuest).toHaveBeenCalledWith(
          'guid',
          password
        );
        expect(authRedirectService.setRedirectUrl).not.toHaveBeenCalled();
      });
    });

    describe('when authorizationCodeFlowByDefault is disabled', () => {
      beforeEach(() => {
        mockFeatureConfigServiceController.authorizationCodeFlowByDefault =
          false;
      });

      it('should set redirect URL to home and register customer', () => {
        const password = mockSecurePassword;
        component.guestRegisterForm.controls['password'].setValue(password);
        component.guestRegisterForm.controls['passwordconf'].setValue(password);
        component.guid = 'guid';
        component.submit();

        expect(authRedirectService.setRedirectUrl).toHaveBeenCalledWith('/');
        expect(routingService.getUrl).toHaveBeenCalledWith({ cxRoute: 'home' });
        expect(userRegisterFacade.registerGuest).toHaveBeenCalledWith(
          'guid',
          password
        );
      });
    });
  });

  describe('password validators', () => {
    it('should have secure password validators', () => {
      fixture = TestBed.createComponent(OrderGuestRegisterFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const passwordControl = component.guestRegisterForm.get(
        'password'
      ) as UntypedFormControl;
      const validations = {
        whenEmpty: passwordControl.validator?.({} as any),
        whenNotEmpty: passwordControl.validator?.({
          value: mockInvalidPassword,
        } as any),
      };

      expect(passwordControl).toBeTruthy();
      expect(validations.whenEmpty).toEqual({
        required: true,
        cxMinOneDigit: true,
        cxMinOneUpperCaseCharacter: true,
        cxMinOneSpecialCharacter: true,
        cxMinEightCharactersLength: true,
        cxMaxCharactersLength: true,
      });
      expect(validations.whenNotEmpty).toEqual({
        cxNoConsecutiveCharacters: true,
      });
    });
  });
});
