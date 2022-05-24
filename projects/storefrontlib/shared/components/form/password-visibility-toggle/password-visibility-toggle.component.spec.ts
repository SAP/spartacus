import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../../shared/config/form-config';
import { IconTestingModule } from '../../../../cms-components/misc/icon/testing/icon-testing.module';
import { PasswordVisibilityToggleModule } from './password-visibility-toggle.module';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';

const mockFormConfig: FormConfig = {
  form: {
    passwordVisibilityToggle: true,
  },
};

class MockWinRef {
  document = window.document;
}

describe('PasswordVisibilityToggleComponent', () => {
  let component: PasswordVisibilityToggleComponent;
  let input: HTMLInputElement;
  let fixture: ComponentFixture<PasswordVisibilityToggleComponent>;
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
        declarations: [PasswordVisibilityToggleComponent],
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
    fixture = TestBed.createComponent(PasswordVisibilityToggleComponent);
    component = fixture.componentInstance;
    input = document.createElement('input');
    input.type = 'password';
    component.inputElement = input;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create password visibility toggle component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default state', () => {
    const button: HTMLButtonElement = el.nativeElement.querySelector('button');
    const icon: HTMLElement = el.nativeElement.querySelector('button cx-icon');

    expect(button.getAttribute('aria-label')).toEqual(
      'passwordVisibility.showPassword'
    );
    expect(icon.getAttribute('ng-reflect-type')).toEqual('EYE');
    expect(input.getAttribute('type')).toEqual('password');
  });

  it('should show password on visibility toggle', () => {
    spyOn(component, 'toggle').and.callThrough();
    const button: HTMLButtonElement = el.nativeElement.querySelector('button');
    const icon: HTMLElement = el.nativeElement.querySelector('button cx-icon');

    button.click();
    fixture.detectChanges();

    expect(component.toggle).toHaveBeenCalledWith();
    expect(button.getAttribute('aria-label')).toEqual(
      'passwordVisibility.hidePassword'
    );
    expect(icon.getAttribute('ng-reflect-type')).toEqual('EYE_SLASH');
    expect(input.getAttribute('type')).toEqual('text');
  });
});
