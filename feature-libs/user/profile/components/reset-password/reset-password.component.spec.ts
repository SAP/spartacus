import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { ResetPasswordComponent } from './reset-password.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);
const tokenSubject: BehaviorSubject<any> = new BehaviorSubject('123');

class MockResetPasswordService
  implements Partial<ResetPasswordComponentService>
{
  resetToken$ = tokenSubject;
  form: FormGroup = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl(),
  });
  isUpdating$ = isBusySubject;
  resetPassword = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let el: DebugElement;
  let service: ResetPasswordComponentService;

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
        declarations: [ResetPasswordComponent],
        providers: [
          {
            provide: ResetPasswordComponentService,
            useClass: MockResetPasswordService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    service = TestBed.inject(ResetPasswordComponentService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    tokenSubject.next('123');
    fixture.detectChanges();
  });

  it('should be created', () => {
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
    it('should not have reset form when token is missing', () => {
      tokenSubject.next(undefined);
      fixture.detectChanges();
      const form = el.query(By.css('form'));
      expect(form).toBeNull();
    });

    it('should call onSubmit() method on submit', () => {
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.onSubmit('123');
      expect(service.resetPassword).toHaveBeenCalledWith('123');
    });
  });
});
