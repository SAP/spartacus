import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
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
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject } from 'rxjs';
import { NewPasswordComponentService } from './new-password-component.service';
import { NewPasswordComponent } from './new-password.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isBusySubject = new BehaviorSubject(false);
class MockUpdatePasswordService
  implements Partial<NewPasswordComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    oldPassword: new UntypedFormControl(),
    newPassword: new UntypedFormControl(),
    newPasswordConfirm: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  updatePassword = createSpy().and.stub();
  resetForm = createSpy().and.stub();
}

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let el: DebugElement;

  let service: NewPasswordComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
          PasswordVisibilityToggleModule,
        ],
        declarations: [NewPasswordComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: NewPasswordComponentService,
            useClass: MockUpdatePasswordService,
          },
        ],
      })
        .overrideComponent(NewPasswordComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.inject(NewPasswordComponentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('button.btn-primary')
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
      const submitBtn = el.query(By.css('button.btn-primary'));
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
      expect(service.updatePassword).toHaveBeenCalled();
    });

    it('should clean input box', () => {
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(
        By.css('.myaccount-password-button-cancel')
      );
      buttons[0].triggerEventHandler('click', null);
      expect(el.queryAll(By.css('form-control')).length).toEqual(0);
    });

    it('should hide cx message strip when close clicked', () => {
      component.closeDialogConfirmationAlert();
      fixture.detectChanges();
      const cxMsg = el.query(By.css('cx-message'));
      expect(cxMsg).toBeNull();
    });
  });
});
