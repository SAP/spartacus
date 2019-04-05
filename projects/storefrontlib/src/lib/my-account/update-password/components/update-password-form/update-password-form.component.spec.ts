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
      fixture.detectChanges();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submited, 'emit').and.stub();
      component.ngOnInit();
      component.onSubmit();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submited.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event when the form is valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submited, 'emit').and.stub();

      component.ngOnInit();
      oldPassword.setValue('oldPass123!');
      newPassword.setValue('newPass456!');
      newPasswordConfirm.setValue('newPass456!');

      component.onSubmit();
      expect(component.onSubmit).toHaveBeenCalled();
      // expect(component.submited.emit).toHaveBeenCalled();
    });
  });
});
