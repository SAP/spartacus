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
import { I18nTestingModule } from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { ONE_TIME_PASSWORD_LOGIN_PURPOSE } from '../user-account-constants';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import { VerificationTokenFormComponent } from './verification-token-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);
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
@Pipe({
  name: 'cxUrl',
})
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
          SpinnerModule,
        ],
        declarations: [VerificationTokenFormComponent, MockUrlPipe],
        providers: [
          {
            provide: VerificationTokenFormComponentService,
            useClass: MockFormComponentService,
          },
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          ChangeDetectorRef,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationTokenFormComponent);
    service = TestBed.inject(VerificationTokenFormComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
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
        'example@example.com'
      );
    });
  });
});
