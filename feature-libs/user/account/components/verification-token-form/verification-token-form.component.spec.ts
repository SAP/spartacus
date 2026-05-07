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
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  MockTranslationService,
  RoutingService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
  WindowRef,
} from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import {
  ONE_TIME_PASSWORD_LOGIN_PURPOSE,
  OTP_LOGIN_STATE_STORAGE_KEY,
} from '../user-account-constants';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import { VerificationTokenFormComponent } from './verification-token-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
  get sessionStorage(): Storage | undefined {
    return undefined;
  }
}

class MockFormComponentService
  implements Partial<VerificationTokenFormComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl(),
    tokenCode: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  login = createSpy().and.stub();
  createVerificationToken = createSpy().and.returnValue(
    of({ tokenId: 'testTokenId', expiresIn: '300' })
  );
  displayMessage = createSpy('displayMessage').and.stub();
}

class MockRoutingService {
  go = createSpy();
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe = createSpy().and.stub();
}

describe('VerificationTokenFormComponent', () => {
  let component: VerificationTokenFormComponent;
  let fixture: ComponentFixture<VerificationTokenFormComponent>;
  let el: DebugElement;
  let service: VerificationTokenFormComponentService;
  let launchDialogService: LaunchDialogService;
  let routineservice: RoutingService;
  let winRef: WindowRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        SpinnerModule,
        VerificationTokenFormComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: VerificationTokenFormComponentService,
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
        { provide: WindowRef, useClass: MockWinRef },
        ChangeDetectorRef,
      ],
    })
      .overrideComponent(VerificationTokenFormComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationTokenFormComponent);
    service = TestBed.inject(VerificationTokenFormComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    routineservice = TestBed.inject(RoutingService);
    winRef = TestBed.inject(WindowRef);
    component = fixture.componentInstance;
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

  describe('refresh with no tokenId/pwd/loginId', () => {
    it('should navigate back to login page', () => {
      history.pushState(
        {
          tokenId: '',
          password: '',
          loginId: '',
        },
        ''
      );
      component.ngOnInit();
      expect(routineservice.go).toHaveBeenCalledWith(['/login']);
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
      component.onSubmit();
      expect(service.login).toHaveBeenCalled();
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
      component.password = 'password';
      spyOn(component, 'startWaitTimeInterval');

      component.resendOTP();

      expect(component.isResendDisabled).toBe(true);
      expect(component.waitTime).toBe(60);
      expect(component.startWaitTimeInterval).toHaveBeenCalled();
      expect(service.createVerificationToken).toHaveBeenCalledWith(
        'example@example.com',
        'password',
        ONE_TIME_PASSWORD_LOGIN_PURPOSE
      );
      expect(service.displayMessage).toHaveBeenCalledWith(
        'verificationTokenForm.createVerificationToken',
        { target: 'example@example.com' }
      );
    });
  });

  describe('Up To Rate Limit For Login', () => {
    it('should diplay error message when creat verification token up to rate limit', () => {
      history.pushState(
        {
          tokenId: '',
          loginId: 'JohnDoe@thebest.john.intheworld.com',
          titleCode: 'Mr',
          firstName: 'John',
          lastName: 'Doe',
          errorStatus: 400,
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

  describe('goBack', () => {
    it('should navigate to login and save credentials to sessionStorage', () => {
      component.target = 'user@example.com';
      component.password = 'myPass';
      const storageSpy = jasmine.createSpyObj<Storage>('Storage', [
        'getItem',
        'setItem',
        'removeItem',
      ]);
      spyOnProperty(winRef, 'sessionStorage', 'get').and.returnValue(
        storageSpy
      );

      component.goBack();

      expect(routineservice.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      expect(storageSpy.setItem).toHaveBeenCalledWith(
        OTP_LOGIN_STATE_STORAGE_KEY,
        JSON.stringify({ loginId: 'user@example.com', password: 'myPass' })
      );
    });
  });
});
