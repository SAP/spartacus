import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormUtils } from '../../../../utils/forms/form-utils';
import { UpdatePasswordFormComponent } from './update-password-form.component';

fdescribe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;
  const validPassword = 'testPass123!';
  // const invalidPassword = 'invalid';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UpdatePasswordFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.ngOnInit();
    fixture.detectChanges();

    oldPassword = component.form.controls['oldPassword'];
    newPassword = component.form.controls['newPassword'];
    newPasswordConfirm = component.form.controls['newPasswordConfirm'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isNotValid() should delegate to FormUtils.isNotValidField()', () => {
    spyOn(FormUtils, 'isNotValidField').and.stub();

    component.isNotValid('oldPassword');
    expect(FormUtils.isNotValidField).toHaveBeenCalledWith(
      component.form,
      'oldPassword',
      component['submitClicked']
    );
  });

  describe('onSubmit() ', () => {
    it('should be called when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      clickSubmit();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submited, 'emit').and.stub();

      component.onSubmit();

      expect(component.form.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submited.emit).not.toHaveBeenCalled();
    });
    it('should emit submited event when the form is valid', () => {
      spyOn(component.submited, 'emit').and.stub();

      oldPassword.setValue(validPassword);
      newPassword.setValue(validPassword);
      newPasswordConfirm.setValue(validPassword);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.form.valid).toBeTruthy();
      expect(component.submited.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should be called call when the Cancel button is clicked', () => {
      spyOn(component, 'onCancel').and.stub();
      const cancelBtn = el.query(By.css('button[type="button"]'));
      cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should emit cancelled event', () => {
      spyOn(component.cancelled, 'emit').and.stub();
      component.onCancel();
      expect(component.cancelled.emit).toHaveBeenCalled();
    });
  });

  describe('Error messages on form submit', () => {
    it('should NOT display when displaying the form', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formControlDisplaysError('oldPassword')).toBeFalsy();
        expect(formControlDisplaysError('newPassword')).toBeFalsy();
        expect(formControlDisplaysError('newPasswordConfirm')).toBeFalsy();
      });
    });
    it('should display when submit an empty form', () => {
      clickSubmit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formControlDisplaysError('oldPassword')).toBeTruthy();
        expect(formControlDisplaysError('newPassword')).toBeTruthy();
        expect(formControlDisplaysError('newPasswordConfirm')).toBeFalsy();
      });
    });

    it('should NOT display whan all field have valid valiues', () => {
      oldPassword.setValue(validPassword);
      newPassword.setValue(validPassword);
      newPasswordConfirm.setValue(validPassword);
      clickSubmit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formControlDisplaysError('oldPassword')).toBeFalsy();
        expect(formControlDisplaysError('newPassword')).toBeFalsy();
        expect(formControlDisplaysError('newPasswordConfirm')).toBeFalsy();
      });
    });
  });

  function formControlDisplaysError(formControlName: string): boolean {
    const elementWithErrorMessage = fixture.debugElement.query(
      By.css(
        `input[formcontrolname="${formControlName}"] + div.invalid-feedback`
      )
    );

    if (!elementWithErrorMessage) {
      return false;
    }

    const errorMessage: string =
      elementWithErrorMessage.nativeElement.innerText;
    return errorMessage && errorMessage.trim().length > 0;
  }

  function clickSubmit() {
    const submitBtn = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
  }
});
