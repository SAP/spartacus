import {
  ChangeDetectorRef,
  DebugElement,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { RegisterVerificationTokenFormComponentService } from './verification-token-form-component.service';
import { RegisterVerificationTokenFormComponent } from './verification-token-form.component';
import { Store } from '@ngrx/store';
import { ONE_TIME_PASSWORD_REGISTRATION_PURPOSE } from '../user-registration-constants';
import { VerificationTokenFacade } from '@spartacus/user/account/root';
const isBusySubject = new BehaviorSubject(false);

class MockFormComponentService
  implements Partial<RegisterVerificationTokenFormComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl(),
    tokenCode: new UntypedFormControl(),
  });
  login = createSpy().and.stub();
  createVerificationToken = createSpy().and.returnValue(
    of({ tokenId: 'testTokenId', expiresIn: '300' })
  );
  displayMessage = createSpy('displayMessage').and.stub();
}

class MockRoutingService {
  go = createSpy();
}
class MockStore {
  dispatch = jasmine.createSpy();
  select = jasmine.createSpy().and.returnValue(of({}));
}
@Pipe({
  name: 'cxUrl',
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe = createSpy().and.stub();
}

describe('RegisterVerificationTokenFormComponent', () => {
  let component: RegisterVerificationTokenFormComponent;
  let fixture: ComponentFixture<RegisterVerificationTokenFormComponent>;
  let el: DebugElement;
  let service: RegisterVerificationTokenFormComponentService;
  let facade: VerificationTokenFacade;
  let launchDialogService: LaunchDialogService;
  let routineservice: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
        SpinnerModule,
      ],
      declarations: [RegisterVerificationTokenFormComponent, MockUrlPipe],
      providers: [
        { provide: Store, useClass: MockStore },
        {
          provide: RegisterVerificationTokenFormComponent,
          useClass: MockFormComponentService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        ChangeDetectorRef,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVerificationTokenFormComponent);
    service = TestBed.inject(RegisterVerificationTokenFormComponentService);
    facade = TestBed.inject(VerificationTokenFacade);
    launchDialogService = TestBed.inject(LaunchDialogService);
    routineservice = TestBed.inject(RoutingService);
    component = fixture.componentInstance;
    component.isUpdating$ = isBusySubject;
    el = fixture.debugElement;
    fixture.detectChanges();
    history.pushState(
      {
        tokenId: '<LGN[OZ8Ijx92S7pf3KcqtuUxOvM0l2XmZQX+4TUEzXcJyjI=]>',
        password: 'pw4all',
        loginId: 'test@sap.com',
      },
      ''
    );
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('button')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });
  });

  describe('refresh with no tokenId/loginId', () => {
    it('should navigate back to login page', () => {
      spyOn(service, 'displayMessage');
      history.pushState(
        {
          tokenId: '',
          loginId: '',
        },
        ''
      );
      component.ngOnInit();
      expect(routineservice.go).toHaveBeenCalledWith(['/login/register']);
      expect(service.displayMessage).toHaveBeenCalledWith(
        'verificationTokenForm.needInputCredentials',
        {}
      );
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      spyOn(service, 'registerUser').and.returnValue(
        of({
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          titleCode: 'Mr',
          password: 'Password123',
        })
      );
      component.form.setValue({
        tokenId: 'tokenId',
        tokenCode: '123',
      });
      component.onSubmit();
      expect(service.registerUser).toHaveBeenCalledWith(component.registerData);
    });

    it('should display info dialog', () => {
      component.openInfoDailog();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should display info dialog when keydown', () => {
      const event = {
        key: 'Enter',
        preventDefault: () => {},
      };
      component.onOpenInfoDailogKeyDown(event as KeyboardEvent);
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should resend OTP', () => {
      component.target = 'example@example.com';
      spyOn(component, 'startWaitTimeInterval');
      spyOn(service, 'displayMessage');
      spyOn(facade, 'createVerificationToken').and.returnValue(
        of({
          tokenId: 'tokenId',
          expiresIn: '300',
        })
      );

      component.resendOTP();

      expect(component.isResendDisabled).toBe(true);
      expect(component.waitTime).toBe(60);
      expect(component.startWaitTimeInterval).toHaveBeenCalled();
      expect(facade.createVerificationToken).toHaveBeenCalledWith({
        loginId: 'example@example.com',
        purpose: ONE_TIME_PASSWORD_REGISTRATION_PURPOSE,
      });
      expect(service.displayMessage).toHaveBeenCalledWith(
        'verificationTokenForm.createVerificationToken',
        { target: 'example@example.com' }
      );
    });

    it('should diplay error message when creat verification token up to rate limit', () => {
      history.pushState(
        {
          tokenId: '',
          loginId: 'JohnDoe@thebest.john.intheworld.com',
          errorStatus: 400,
          form: {
            titleCode: '0001',
            firstName: 'John',
            lastName: 'Doe',
            companyName: 'Company',
            email: '',
            country: { isocode: 'CA' },
            region: { isocode: 'CA-ON' },
            town: 'Townsville',
            line1: '123 Main St',
            line2: '',
            postalCode: '12345',
            phoneNumber: '1234567890',
            message: '',
          },
        },
        ''
      );

      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable();
      expect(component.upToRateLimit).toBe(true);
      component.waitTimeForRateLimit = 300;
      const errorMessageElement = fixture.debugElement.queryAll(
        By.css('.rate-limit-error-display')
      );
      expect(errorMessageElement).toBeTruthy();
    });
  });
});
