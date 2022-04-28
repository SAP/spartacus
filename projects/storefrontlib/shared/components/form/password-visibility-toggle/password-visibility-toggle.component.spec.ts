import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule, WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../../shared/config/form-config';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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

describe('PasswordVisibilityToggleComponent', () => {
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
  });

  it('should create password visibility component', () => {
    fixture.detectChanges();
    const pwVisibilityComponent = el.nativeElement.querySelector(
      'cx-password-visibility-toggle'
    );
    expect(component).toBeTruthy();
    expect(pwVisibilityComponent).toBeTruthy();
  });

  it('should have password hidden by default', () => {
    fixture.detectChanges();
    const input = el.nativeElement.querySelector('input[type="password"]');
    expect(input).toBeTruthy();
  });

  it('should show password on visibility toggle', () => {
    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.cx-show-hide-btn');
    expect(button).toBeTruthy();

    button.click();
    fixture.detectChanges();
    const input = el.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('should not change visibility for other password inputs', () => {
    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.cx-show-hide-btn');
    expect(button).toBeTruthy();

    button.click();
    fixture.detectChanges();
    const inputNotChanged = el.nativeElement.querySelectorAll(
      'input[formcontrolname="passwordConfirm"][type="password"]'
    );
    expect(inputNotChanged).toBeTruthy();
  });
});
