import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CSAgentLoginFormComponent } from './csagent-login-form.component';

describe('CSAgentLoginFormComponent', () => {
  let component: CSAgentLoginFormComponent;
  let fixture: ComponentFixture<CSAgentLoginFormComponent>;
  let userIdFormControl: AbstractControl;
  let passwordFormControl: AbstractControl;
  let el: DebugElement;

  const validUserId = 'asagent';
  const validPassword = 'testPass123!';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
        declarations: [CSAgentLoginFormComponent],
      }).compileComponents();
    })
  );

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

      const submitBtn = fixture.debugElement.query(
        By.css('button[type="submit"]')
      );
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

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
