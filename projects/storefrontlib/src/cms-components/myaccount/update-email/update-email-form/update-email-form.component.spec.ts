import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FormUtils } from '../../../../shared/utils/forms/form-utils';
import { UpdateEmailFormComponent } from './update-email-form.component';

describe('UpdateEmailFormComponent', () => {
  let component: UpdateEmailFormComponent;
  let fixture: ComponentFixture<UpdateEmailFormComponent>;
  let el: DebugElement;
  let newUid: AbstractControl;
  let confirmNewUid: AbstractControl;
  let password: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [UpdateEmailFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    newUid = component.form.controls.email;
    confirmNewUid = component.form.controls.confirmEmail;
    password = component.form.controls.password;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isNotValid', () => {
    it('should delegate to FormUtils.isNotValidField()', () => {
      spyOn(FormUtils, 'isNotValidField').and.stub();

      component.isNotValid('email');
      expect(FormUtils.isNotValidField).toHaveBeenCalledWith(
        component.form,
        'email',
        component['submited']
      );
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit() when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.saveEmail, 'emit').and.stub();

      component.onSubmit();

      expect(component.form.valid).toBeFalsy();
      expect(component.saveEmail.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event for valid form', () => {
      spyOn(component.saveEmail, 'emit').and.stub();

      newUid.setValue('tester@sap.com');
      confirmNewUid.setValue('tester@sap.com');
      password.setValue('Qwe123!');
      fixture.detectChanges();

      component.onSubmit();
      expect(component.form.valid).toBeTruthy();
      expect(component.saveEmail.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should call onCancel() on click event', () => {
      spyOn(component, 'onCancel').and.stub();
      const cancelBtn = el.query(By.css('button[type="button"]'));
      cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should emit cancelled event', () => {
      spyOn(component.cancelEmail, 'emit').and.stub();
      component.onCancel();
      expect(component.cancelEmail.emit).toHaveBeenCalled();
    });
  });

  describe('when the form is invalid', () => {
    it('should display an error message', () => {
      newUid.setValue('');
      confirmNewUid.setValue('');
      password.setValue('');

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const error = el.queryAll(By.css('.form-group .invalid-feedback span'));

      expect(error).toBeTruthy();

      expect(error[0].nativeElement.innerText).not.toEqual('');
      expect(error[1].nativeElement.innerText).not.toEqual('');
    });
  });

  describe('when the email is invalid', () => {
    it('should display an error message', () => {
      newUid.setValue('tester@sap');
      confirmNewUid.setValue('tester@sap');
      password.setValue('Qwe123!');

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const error = el.query(
        By.css('.form-group:nth-of-type(1) .invalid-feedback span')
      );

      expect(error).toBeTruthy();

      expect(error.nativeElement.innerText).not.toEqual('');
    });
  });

  describe('when the email does not match', () => {
    it('should display an error message', () => {
      newUid.setValue('tester@sap.com');
      confirmNewUid.setValue('fake@sap.com');
      password.setValue('Qwe123!');

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const error = el.query(
        By.css('.form-group:nth-of-type(2) .invalid-feedback span')
      );

      expect(error).toBeTruthy();

      expect(error.nativeElement.innerText).not.toEqual('');
    });
  });
});
