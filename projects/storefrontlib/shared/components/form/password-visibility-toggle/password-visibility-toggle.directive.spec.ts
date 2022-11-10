import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
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
  form: UntypedFormGroup = new UntypedFormGroup({
    password: new UntypedFormControl(),
    passwordConfirm: new UntypedFormControl(),
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
    const pwVisibilityComponent: HTMLElement = el.nativeElement.querySelector(
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
    const button: HTMLButtonElement = el.nativeElement.querySelector(
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
    const button: HTMLButtonElement = el.nativeElement.querySelector(
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
    const wrappers: HTMLDivElement[] = el.nativeElement.querySelectorAll(
      'div.cx-password-input-wrapper'
    );
    const form: HTMLFormElement = el.nativeElement.querySelector('form');

    expect(wrappers.length).toBe(2);
    wrappers.forEach((wrapper) => {
      expect(wrapper.parentNode).toEqual(form);
      expect(wrapper.children.length).toBe(2);
      expect(wrapper.children[0].tagName.toLowerCase()).toEqual('input');
      expect(wrapper.children[1].tagName.toLowerCase()).toEqual(
        'cx-password-visibility-toggle'
      );
    });
  });
});
