import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { Subject } from 'rxjs';
import { UpdatePasswordComponent } from './update-password.component';
import { UpdatePasswordService } from './update-password.service';
import { FormErrorsModule } from '@spartacus/storefront';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlTestingModule } from '../../../../../core/src/routing/configurable-routes/url-translation/testing/url-testing.module';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isUpdatingSubject = new Subject();
class MockUpdatePasswordService {
  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
    newPasswordConfirm: new FormControl(),
  });
  isUpdating$ = isUpdatingSubject;
  reset(): void {}

  save(): void {}
}

fdescribe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  let updatePasswordService: UpdatePasswordService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          RouterTestingModule,
          UrlTestingModule,
        ],
        declarations: [UpdatePasswordComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UpdatePasswordService,
            useClass: MockUpdatePasswordService,
          },
        ],
      })
        .overrideComponent(UpdatePasswordComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    updatePasswordService = TestBed.inject(UpdatePasswordService);

    fixture.detectChanges();

    oldPassword = component.form.controls.oldPassword;
    newPassword = component.form.controls.newPassword;
    newPasswordConfirm = component.form.controls.newPasswordConfirm;
  });

  function setFormValue() {
    const oldPwd = 'Qwe123!';
    const newPwd = 'Qwe123!';

    oldPassword.setValue(oldPwd);
    newPassword.setValue(newPwd);
    newPasswordConfirm.setValue(newPwd);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner when updating', () => {
    isUpdatingSubject.next(true);
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should call updateEmail on submit', () => {
    spyOn(updatePasswordService, 'save').and.stub();

    setFormValue();

    component.onSubmit();
    expect(updatePasswordService.save).toHaveBeenCalled();
  });

  describe('Form Interactions', () => {
    describe('Submit button', () => {
      it('should be disabled while loading', () => {
        // updateEmailService.isUpdating$ = of(true);
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        expect(submitBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should call onSubmit() when clicked', () => {
        spyOn(component, 'onSubmit').and.stub();
        isUpdatingSubject.next(false);
        fixture.detectChanges();
        const submitBtn = el.query(By.css('button[type="submit"]'));
        submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });

    describe('Cancel Button', () => {
      it('should be disabled while loading', () => {
        // updateEmailService.isUpdating$ = of(true);
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        expect(cancelBtn.nativeElement.disabled).toBeTruthy();
      });

      it('should go to home when clicked', () => {
        isUpdatingSubject.next(false);
        fixture.detectChanges();
        const cancelBtn = el.query(By.css('button[type="button"]'));
        expect(
          cancelBtn.nativeElement.getAttribute('ng-reflect-router-link')
        ).toContain('home');
      });
    });
  });
});
