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
//import { PasswordVisibilityComponent } from './password-visibility.component';

const mockFormConfig: FormConfig = {
  form: {
    passwordVisibility: true,
  },
};

@Component({
  template: `
    <div>
      <form [formGroup]="form">
        <input type="password" formControlName="password" />
        <cx-password-visibility
          formCtrlName="password"
        ></cx-password-visibility>
        <input type="password" formControlName="passwordConfirm" />
        <cx-password-visibility
          formCtrlName="passwordConfirm"
        ></cx-password-visibility>
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

describe('PasswordVisibilityComponent', () => {
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

  it('should be created', () => {
    expect(component).toBeTruthy();
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
