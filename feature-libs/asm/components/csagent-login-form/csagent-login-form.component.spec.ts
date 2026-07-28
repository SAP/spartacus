import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  FeatureDirective,
  MockTranslatePipe,
  MockTranslationService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../../core-libs/storefront/shared/test/mock-feature-directive';
import { DotSpinnerComponent } from '../dot-spinner/dot-spinner.component';
import { CSAgentLoginFormComponent } from './csagent-login-form.component';

describe('CSAgentLoginFormComponent', () => {
  let component: CSAgentLoginFormComponent;
  let fixture: ComponentFixture<CSAgentLoginFormComponent>;
  let userIdFormControl: AbstractControl;
  let passwordFormControl: AbstractControl;
  let el: DebugElement;

  const validUserId = 'asagent';
  const validPassword = 'testPass123!';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        CSAgentLoginFormComponent,
        DotSpinnerComponent,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(CSAgentLoginFormComponent, {
        remove: { imports: [TranslatePipe, FeatureDirective] },
        add: { imports: [MockTranslatePipe, MockFeatureDirective] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSAgentLoginFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    userIdFormControl = component.csAgentLoginForm.controls['userId'];
    passwordFormControl = component.csAgentLoginForm.controls['password'];
    expect(component).toBeTruthy();
  });

  describe('onSubmit() ', () => {
    beforeEach(() => {
      fixture.detectChanges();
      userIdFormControl = component.csAgentLoginForm.controls['userId'];
      passwordFormControl = component.csAgentLoginForm.controls['password'];
    });

    it('should be called when submit button is clicked', () => {
      vi.spyOn(component, 'onSubmit').mockImplementation(() => {});

      const submitBtn = fixture.debugElement.query(
        By.css('button[type="submit"]')
      );
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should not emit submitted event if the form is not valid', () => {
      vi.spyOn(component, 'onSubmit').mockImplementation(() => {});
      vi.spyOn(component.submitEvent, 'emit').mockImplementation(() => {});

      component.onSubmit();

      expect(component.csAgentLoginForm.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });

    it('should emit submitted event when the form is valid', () => {
      vi.spyOn(component.submitEvent, 'emit').mockImplementation(() => {});

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
    fixture.detectChanges();

    expect(el.query(By.css('cx-dot-spinner'))).toBeTruthy();
    expect(el.query(By.css('form'))).toBeFalsy();
  });

  it('should not display spinner when login is not running', () => {
    component.csAgentTokenLoading = false;
    fixture.detectChanges();

    expect(el.query(By.css('div.spinner'))).toBeFalsy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });
});
