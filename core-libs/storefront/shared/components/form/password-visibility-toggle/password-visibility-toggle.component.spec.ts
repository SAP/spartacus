import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FeatureDirective,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon';
import { IconTestingModule } from '../../../../cms-components/misc/icon/testing/icon-testing.module';
import { FormConfig } from '../../../../shared/config/form-config';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';
import { PasswordVisibilityToggleModule } from './password-visibility-toggle.module';

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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconTestingModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordVisibilityToggleModule,
        PasswordVisibilityToggleComponent,
      ],
      providers: [
        {
          provide: FormConfig,
          useValue: mockFormConfig,
        },
        { provide: WindowRef, useClass: MockWinRef },
      ],
    })
      .overrideComponent(PasswordVisibilityToggleComponent, {
        remove: { imports: [FeatureDirective] },
        add: { imports: [MockFeatureDirective] },
      })
      .compileComponents();
  });

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

    expect(button.getAttribute('aria-label')).toEqual(
      'passwordVisibility.togglePassword'
    );
    expect(component.state.icon).toEqual(ICON_TYPE.EYE);
    expect(input.getAttribute('type')).toEqual('password');
  });

  it('should show password on visibility toggle', () => {
    vi.spyOn(component, 'toggle');
    const button: HTMLButtonElement = el.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(component.toggle).toHaveBeenCalledWith();
    expect(button.getAttribute('aria-label')).toEqual(
      'passwordVisibility.togglePassword'
    );
    expect(component.state.icon).toEqual(ICON_TYPE.EYE_SLASH);
    expect(input.getAttribute('type')).toEqual('text');
  });
});
