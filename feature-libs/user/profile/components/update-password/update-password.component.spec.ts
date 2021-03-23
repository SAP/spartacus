import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject } from 'rxjs';
import { UpdatePasswordComponent } from './update-password.component';
import { UpdatePasswordService } from './update-password.service';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

const isUpdatingSubject = new BehaviorSubject(false);
class MockUpdatePasswordService implements Partial<UpdatePasswordService> {
  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
    newPasswordConfirm: new FormControl(),
  });
  isUpdating$ = isUpdatingSubject;
  update(): void {}
  reset(): void {}
}

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  let updateEmailService: UpdatePasswordService;

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
    updateEmailService = TestBed.inject(UpdatePasswordService);

    fixture.detectChanges();

    oldPassword = component.form.controls.oldPassword;
    newPassword = component.form.controls.newPassword;
    newPasswordConfirm = component.form.controls.newPasswordConfirm;
  });

  function setFormValue() {
    const oldP = 'tester@sap.com';
    const newP = 'Qwe123!';

    oldPassword.setValue(oldP);
    newPassword.setValue(newP);
    newPasswordConfirm.setValue(newP);
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
    spyOn(updateEmailService, 'update').and.stub();

    setFormValue();

    component.onSubmit();
    expect(updateEmailService.update).toHaveBeenCalled();
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

    describe('Cancel Link', () => {
      it('should be disabled while loading', () => {
        isUpdatingSubject.next(true);
        fixture.detectChanges();
        const cancelLink: HTMLAnchorElement = el.query(By.css('a.btn'))
          .nativeElement;
        expect(cancelLink.classList).toContain('disabled');
      });
    });
  });
});
