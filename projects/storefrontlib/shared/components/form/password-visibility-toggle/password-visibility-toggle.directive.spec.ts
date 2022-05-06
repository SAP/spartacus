import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { I18nTestingModule, WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../../shared/config/form-config';
import { IconTestingModule } from '../../../../cms-components/misc/icon/testing/icon-testing.module';
import { PasswordVisibilityToggleModule } from './password-visibility-toggle.module';

const mockFormConfig: FormConfig = {
  form: {
    passwordVisibilityToggle: true,
  },
};

@Component({
  template: `
    <div>
      <form [formGroup]="form">
        <input
          type="password"
          formControlName="password"
          cxPasswordVisibilitySwitch
        />
        <input
          type="password"
          formControlName="passwordConfirm"
          cxPasswordVisibilitySwitch
        />
      </form>
    </div>
  `,
})
class MockFormComponent {
  form: FormGroup = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl(),
  });
}

class MockWinRef {
  document = window.document;
}

describe('PasswordVisibilityToggleDirective', () => {
  let component: MockFormComponent;
  let fixture: ComponentFixture<MockFormComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          IconTestingModule,
          FormsModule,
          ReactiveFormsModule,
          PasswordVisibilityToggleModule,
        ],
        declarations: [MockFormComponent],
        providers: [
          {
            provide: FormConfig,
            useValue: mockFormConfig,
          },
          { provide: WindowRef, useClass: MockWinRef },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create password visibility component', () => {
    const pwVisibilityComponent = el.nativeElement.querySelector(
      'cx-password-visibility-toggle'
    );
    expect(component).toBeTruthy();
    expect(pwVisibilityComponent).toBeTruthy();
  });

  it('should have password hidden by default', () => {
    const input = el.nativeElement.querySelector(
      'input[formControlName="password"][type="password"]'
    );
    expect(input).toBeTruthy();
  });

  it('should show password on visibility toggle', () => {
    const button = el.nativeElement.querySelector(
      'input[formControlName="password"][type="password"] + cx-password-visibility-toggle > button'
    );
    expect(button).toBeTruthy();

    button.click();
    fixture.detectChanges();

    let input = el.nativeElement.querySelector(
      'input[formControlName="password"][type="text"]'
    );
    expect(input).toBeTruthy();

    button.click();
    fixture.detectChanges();

    input = el.nativeElement.querySelector(
      'input[formControlName="password"][type="password"]'
    );
    expect(input).toBeTruthy();
  });

  it('should not change visibility for other password inputs', () => {
    const button = el.nativeElement.querySelector(
      'input[formControlName="password"][type="password"] + cx-password-visibility-toggle > button'
    );
    expect(button).toBeTruthy();

    button.click();
    fixture.detectChanges();
    const inputNotChanged = el.nativeElement.querySelectorAll(
      'input[formcontrolname="passwordConfirm"][type="password"]'
    );
    expect(inputNotChanged).toBeTruthy();
  });

  it('should verify that wrapper has been added properly', () => {
    expect(fixture.nativeElement.innerHTML).toContain(
      `<div><form novalidate="" ng-reflect-form="[object Object]" class="ng-untouched ng-pristine ng-valid"><div class="cx-password-input-wrapper"><input type="password" formcontrolname="password" cxpasswordvisibilityswitch="" ng-reflect-name="password" class="ng-untouched ng-pristine ng-valid"><cx-password-visibility-toggle><button type="button" aria-label="passwordVisibility.showPassword"><span aria-hidden="true"><cx-icon class="cx-icon" ng-reflect-type="EYE"></cx-icon></span></button></cx-password-visibility-toggle></div><!--container--><div class="cx-password-input-wrapper"><input type="password" formcontrolname="passwordConfirm" cxpasswordvisibilityswitch="" ng-reflect-name="passwordConfirm" class="ng-untouched ng-pristine ng-valid"><cx-password-visibility-toggle><button type="button" aria-label="passwordVisibility.showPassword"><span aria-hidden="true"><cx-icon class="cx-icon" ng-reflect-type="EYE"></cx-icon></span></button></cx-password-visibility-toggle></div><!--container--></form></div>`
    );
  });
});
