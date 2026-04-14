import { DebugElement, Pipe, PipeTransform } from '@angular/core';
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
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { BehaviorSubject } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { LoginFormComponent } from './login-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);
class MockLoginFormComponentService
  implements Partial<LoginFormComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    userId: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  login = createSpy().and.stub();
  handleCustomLoginError = createSpy().and.stub();
  showResetPassword = true;
}
@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let el: DebugElement;
  let service: LoginFormComponentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        SpinnerModule,
        LoginFormComponent,
        RouterModule.forRoot([]),
        I18nTestingModule,
      ],
      providers: [
        {
          provide: LoginFormComponentService,
          useClass: MockLoginFormComponentService,
        },
      ],
    })
      .overrideComponent(LoginFormComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, FeatureDirective],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    service = TestBed.inject(LoginFormComponentService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleLoginError() when component is created', () => {
    expect(service.handleCustomLoginError).toHaveBeenCalled();
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

  describe('showResetPassword', () => {
    it('should show the forgot password link when showResetPassword is true', () => {
      component.showResetPassword.set(true);
      fixture.detectChanges();
      expect(el.query(By.css('a.btn-link'))).toBeTruthy();
    });

    it('should hide the forgot password link when showResetPassword is false', () => {
      component.showResetPassword.set(false);
      fixture.detectChanges();
      expect(el.query(By.css('a.btn-link'))).toBeNull();
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
  });
});
