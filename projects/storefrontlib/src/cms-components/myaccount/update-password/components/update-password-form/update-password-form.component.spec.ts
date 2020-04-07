import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import * as testUtils from '../../../../../shared/utils/forms/form-test-utils';
import { UpdatePasswordFormComponent } from './update-password-form.component';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;
  const validPassword = 'testPass123!';

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

    oldPassword = component.updatePasswordForm.controls['oldPassword'];
    newPassword = component.updatePasswordForm.controls['newPassword'];
    newPasswordConfirm =
      component.updatePasswordForm.controls['newPasswordConfirm'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit() ', () => {
    it('should be called when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submitted, 'emit').and.stub();

      component.onSubmit();

      expect(component.updatePasswordForm.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
    it('should emit submited event when the form is valid', () => {
      spyOn(component.submitted, 'emit').and.stub();

      oldPassword.setValue(validPassword);
      newPassword.setValue(validPassword);
      newPasswordConfirm.setValue(validPassword);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.updatePasswordForm.valid).toBeTruthy();
      expect(component.submitted.emit).toHaveBeenCalled();
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
});
