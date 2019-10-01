import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import * as testUtils from '../../../shared/utils/forms/form-test-utils';
import { FormUtils } from '../../../shared/utils/forms/form-utils';
import { CSAgentLoginFormComponent } from './csagent-login-form.component';

describe('CSAgentLoginFormComponent', () => {
  let component: CSAgentLoginFormComponent;
  let fixture: ComponentFixture<CSAgentLoginFormComponent>;
  let userIdFormControl: AbstractControl;
  let passwordFormControl: AbstractControl;
  let el: DebugElement;

  const validUserId = 'asagent';
  const validPassword = 'testPass123!';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CSAgentLoginFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSAgentLoginFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    userIdFormControl = component.form.controls['userId'];
    passwordFormControl = component.form.controls['password'];
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
      spyOn(component.submitEvent, 'emit').and.stub();

      component.onSubmit();

      expect(component.form.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event when the form is valid', () => {
      spyOn(component.submitEvent, 'emit').and.stub();

      userIdFormControl.setValue(validUserId);
      passwordFormControl.setValue(validPassword);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.form.valid).toBeTruthy();
      expect(component.submitEvent.emit).toHaveBeenCalled();
    });
  });

  describe('Error messages on form submit', () => {
    it('should NOT display when displaying the form', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeFalsy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeFalsy();
      });
    });
    it('should display when submit an empty form', () => {
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeTruthy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeTruthy();
      });
    });

    it('should NOT display when all field have valid values', () => {
      userIdFormControl.setValue(validUserId);
      passwordFormControl.setValue(validPassword);
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeFalsy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeFalsy();
      });
    });

    it('should display when the user submits invalid input', () => {
      userIdFormControl.setValue('');
      passwordFormControl.setValue('');
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeTruthy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeTruthy();
      });
    });
  });

  describe('Error messages without submit', () => {
    it('should NOT display for empty abandonment', () => {
      userIdFormControl.setValue('');
      userIdFormControl.markAsTouched();
      passwordFormControl.setValue('');
      passwordFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeFalsy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeFalsy();
      });
    });
    it('should NOT display until the user is finished typing', () => {
      userIdFormControl.setValue('');
      userIdFormControl.markAsDirty();
      passwordFormControl.setValue('');
      passwordFormControl.markAsDirty();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeFalsy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeFalsy();
      });
    });

    it('should display when the user is finished typing invalid input', () => {
      userIdFormControl.setValue('');
      userIdFormControl.markAsDirty();
      userIdFormControl.markAsTouched();
      passwordFormControl.setValue('');
      passwordFormControl.markAsDirty();
      passwordFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeTruthy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeTruthy();
      });
    });
    it('should NOT display when the user is finished typing valid input', () => {
      userIdFormControl.setValue(validUserId);
      userIdFormControl.markAsDirty();
      userIdFormControl.markAsTouched();
      passwordFormControl.setValue(validPassword);
      passwordFormControl.markAsDirty();
      passwordFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'userId')).toBeFalsy();
        expect(testUtils.isCtrlShowingError(fixture, 'password')).toBeFalsy();
      });
    });
  });

  it('should display spinner when login is running', () => {
    component.csAgentTokenLoading = true;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.query(By.css('div.sap-spinner'))).toBeTruthy();
      expect(el.query(By.css('form'))).toBeFalsy();
    });
  });
  it('should not display spinner when login is not running', () => {
    component.csAgentTokenLoading = false;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.query(By.css('div.sap-spinner'))).toBeFalsy();
      expect(el.query(By.css('form'))).toBeTruthy();
    });
  });
});
