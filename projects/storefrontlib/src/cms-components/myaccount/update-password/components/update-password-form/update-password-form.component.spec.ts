import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import * as testUtils from '../../../../../shared/utils/forms/form-test-utils';
import { FormUtils } from '../../../../../shared/utils/forms/form-utils';
import { UpdatePasswordFormComponent } from './update-password-form.component';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;
  const validPassword = 'testPass123!';
  const invalidPassword = 'invalid';
  const mismatchPassword = 'mismatch';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
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

      testUtils.clickSubmit(fixture);

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
    it('should be called when the Cancel button is clicked', () => {
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
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });
    it('should display when submit an empty form', () => {
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });

    it('should NOT display when all field have valid valies', () => {
      oldPassword.setValue(validPassword);
      newPassword.setValue(validPassword);
      newPasswordConfirm.setValue(validPassword);
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });

    it('should display when the user submits invalid input', () => {
      oldPassword.setValue('');
      newPassword.setValue(invalidPassword);
      newPasswordConfirm.setValue(mismatchPassword);
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeTruthy();
      });
    });
  });
  describe('Error messages without submit', () => {
    it('should NOT display for empty abandonment', () => {
      oldPassword.setValue('');
      oldPassword.markAsTouched();
      newPassword.setValue('');
      newPassword.markAsTouched();
      newPasswordConfirm.setValue('');
      newPasswordConfirm.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });
    it('should NOT display until the user is finished typing', () => {
      oldPassword.setValue('');
      oldPassword.markAsDirty();
      newPassword.setValue(invalidPassword);
      newPassword.markAsDirty();
      newPasswordConfirm.setValue(mismatchPassword);
      newPasswordConfirm.markAsDirty();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });

    it('should display when the user is finished typing invalid input', () => {
      oldPassword.setValue('');
      oldPassword.markAsDirty();
      oldPassword.markAsTouched();
      newPassword.setValue(invalidPassword);
      newPassword.markAsDirty();
      newPassword.markAsTouched();
      newPasswordConfirm.setValue(mismatchPassword);
      newPasswordConfirm.markAsDirty();
      newPasswordConfirm.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeTruthy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeTruthy();
      });
    });
    it('should NOT display when the user is finished typing valid input', () => {
      oldPassword.setValue(validPassword);
      oldPassword.markAsDirty();
      oldPassword.markAsTouched();
      newPassword.setValue(validPassword);
      newPassword.markAsDirty();
      newPassword.markAsTouched();
      newPasswordConfirm.setValue(validPassword);
      newPasswordConfirm.markAsDirty();
      newPasswordConfirm.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'oldPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPassword')
        ).toBeFalsy();
        expect(
          testUtils.isCtrlShowingError(fixture, 'newPasswordConfirm')
        ).toBeFalsy();
      });
    });
  });
});
