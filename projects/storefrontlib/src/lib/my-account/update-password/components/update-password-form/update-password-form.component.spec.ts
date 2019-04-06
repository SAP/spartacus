import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormUtils } from '../../../../utils/forms/form-utils';
import { UpdatePasswordFormComponent } from './update-password-form.component';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let el: DebugElement;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

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

  describe('Submiting the form ', () => {
    it('should call onSubmit() when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

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

      oldPassword.setValue('oldPass123!');
      newPassword.setValue('newPass456!');
      newPasswordConfirm.setValue('newPass456!');
      fixture.detectChanges();
      component.onSubmit();

      expect(component.form.valid).toBeTruthy();
      expect(component.submited.emit).toHaveBeenCalled();
    });
  });
});
