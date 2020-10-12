import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CsAgentAuthService, I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '../../../shared/index';
import * as testUtils from '../../../shared/utils/forms/form-test-utils';
import { CSAgentLoginFormComponent } from './csagent-login-form.component';

describe('CSAgentLoginFormComponent', () => {
  let component: CSAgentLoginFormComponent;
  let fixture: ComponentFixture<CSAgentLoginFormComponent>;
  let userIdFormControl: AbstractControl;
  let passwordFormControl: AbstractControl;
  let el: DebugElement;

  class MockCsAgentAuthService {
    authorizeCustomerSupportAgent() {}
  }

  const validUserId = 'asagent';
  const validPassword = 'testPass123!';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
      ],
      declarations: [CSAgentLoginFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSAgentLoginFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    userIdFormControl = component.csAgentLoginForm.controls['userId'];
    passwordFormControl = component.csAgentLoginForm.controls['password'];
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

    it('should not emit submitted event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submitEvent, 'emit').and.stub();

      component.onSubmit();

      expect(component.csAgentLoginForm.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });

    it('should emit submitted event when the form is valid', () => {
      spyOn(component.submitEvent, 'emit').and.stub();

      userIdFormControl.setValue(validUserId);
      passwordFormControl.setValue(validPassword);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.csAgentLoginForm.valid).toBeTruthy();
      expect(component.submitEvent.emit).toHaveBeenCalled();
    });
  });

  it('should display spinner when login is running', () => {
    component.csAgentTokenLoading = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('div.spinner'))).toBeTruthy();
    expect(el.query(By.css('form'))).toBeFalsy();
  });
  it('should not display spinner when login is not running', () => {
    component.csAgentTokenLoading = false;
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('div.spinner'))).toBeFalsy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });
});
